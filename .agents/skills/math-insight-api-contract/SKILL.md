---
name: math-insight-api-contract
description: Định nghĩa hoặc cập nhật API contract bằng TypeSpec (packages/openapi), build OpenAPI JSON/Markdown, sinh code bằng Orval (React Query, Zod v4, MSW) hoặc cấu hình mock API (ENABLE_MOCK).
---

# Quy trình Contract-First API (TypeSpec → OpenAPI → Orval → MSW)

Mọi endpoint, model, enum và mock dữ liệu API của Math Insight đi theo luồng một chiều:

```
packages/openapi/**/*.tsp
  ──(tsp compile + generate-markdown)──► docs/openapi/{openapi.json,openapi.md}
  ──(orval)──► packages/web/lib/api/generated/  (React Query hooks, models, MSW mocks)
               packages/web/types/generated/    (Zod v4 schemas + input/output types)
```

Các thư mục output (`docs/openapi/`, `packages/web/lib/api/generated/`, `packages/web/types/generated/`) là file sinh tự động, bị ignore bởi ESLint/Prettier. Muốn thay đổi contract, luôn sửa TypeSpec rồi chạy lại pipeline đồng bộ.

## Bước 1: Định nghĩa contract trong `packages/openapi/`

1. Tổ chức domain mới theo mẫu `packages/openapi/modules/todos/`:
   - `modules/<domain>/enums.tsp`: enum thuộc `namespace MathInsight;`
   - `modules/<domain>/models.tsp`: entity model, query model, request payload kèm decorator validation (`@minLength`, `@maxLength`, `@minValue`, `@maxValue`, giá trị mặc định)
   - `modules/<domain>/routes.tsp`: `interface <Domain>` gắn `@route("/<domain>")` và `@tag("<Domain>")`
   - `modules/<domain>/index.tsp`: import `./enums.tsp`, `./models.tsp`, `./routes.tsp`
2. Import `./modules/<domain>/index.tsp` vào `packages/openapi/main.tsp`.
3. Tái sử dụng kiểu dùng chung từ `namespace Common;` thay vì định nghĩa lại:
   - `common/types.tsp`: `Uuid`, `Timestamps`
   - `common/responses.tsp`: `IdPayload`, `ApiResponse<T>`, `ApiCreatedResponse<T>`, `PaginatedResponse<T>`, `PaginationQuery`, `PageMeta`
   - `common/errors.tsp`: `BadRequestError` (400), `UnauthorizedError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ConflictError` (409)
   - `Http.NoContentResponse` cho `PATCH`/`DELETE` trả 204
4. Thêm `@opExample` thực tế (tiếng Việt phù hợp ngữ cảnh Math Insight) cho các `@get` operation trong `routes.tsp`. `orval.config.ts` bật `useExamples: true` nên MSW mock lấy trực tiếp dữ liệu từ `@opExample`.

## Bước 2: Đồng bộ OpenAPI và sinh code cho web

Chạy tuần tự hai lệnh (hoặc VS Code task `API: Sync All (TypeSpec -> Orval)`):

```bash
pnpm --filter @math-insight/openapi build
pnpm --filter @math-insight/web generate:api
```

- `openapi build` chạy `tsp compile . --warn-as-error` và `node scripts/generate-markdown.mjs` — mọi cảnh báo TypeSpec đều làm fail build.
- `generate:api` chạy `packages/web/orval.config.ts` với `clean: true`, tự xóa file generated cũ và sinh mới:
  - Target `api`: React Query hooks (`useSuspenseQuery: true`), query key helper (`get<Op>QueryKey`), TypeScript models, MSW handlers (`*.msw.ts`, `index.msw.ts`), gọi qua mutator `lib/api/custom-fetch.ts`.
  - Target `zod`: Zod v4 schemas (`types/generated/mathInsightAPI.schemas.zod.ts`, `types/generated/<tag>/<tag>.zod.ts`) với `generateReusableSchemas: true`.

## Quy ước dùng code sinh ra và MSW

- **`customFetch` (`packages/web/lib/api/custom-fetch.ts`)**: Mọi request sinh bởi Orval tự gửi `credentials: "include"`, parse lỗi thành `ApiError` (`status`, `body`, `message` đọc từ `body.error`) và đi qua hook single-flight 401 refresh. Khi thêm auth/header toàn cục, sửa tập trung tại đây.
- **Zod v4 dual export**: `types/generated/mathInsightAPI.schemas.zod.ts` export cùng tên cho cả schema runtime và type `zod.input`, kèm `<Name>Output` cho `zod.output`. Khi dùng trong React Hook Form, import tách rõ type và schema (xem `packages/web/features/todos/AddTodo/AddTodo.tsx`).
- **MSW mock (`packages/web/mocks/`)**:
  - `mocks/handlers.ts` tự gom toàn bộ handler từ `@/lib/api/generated/index.msw` — thêm module mới ở TypeSpec sẽ tự có mock sau khi sync.
  - Khi cần override hành vi mock cụ thể (trạng thái lỗi, stateful CRUD), đặt handler tùy chỉnh trước `...generatedHandlers` trong `mocks/handlers.ts`.
  - Bật mock bằng `ENABLE_MOCK=true` (đã đọc trong `app/layout.tsx` và khởi tạo qua `components/providers/MockProvider.tsx` trước khi render children).

## Tiêu chí hoàn tất

- `pnpm --filter @math-insight/openapi format` (nếu sửa `.tsp`) và `pnpm --filter @math-insight/openapi build` thành công không cảnh báo.
- `pnpm --filter @math-insight/web generate:api` thành công, toàn bộ file trong `docs/openapi/`, `packages/web/lib/api/generated/`, `packages/web/types/generated/` đồng bộ với `.tsp`.
- `pnpm typecheck` và `pnpm lint` pass sau khi cập nhật caller phía web.
