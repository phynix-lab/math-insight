---
name: math-insight-project
description: Triển khai hoặc chỉnh sửa tính năng trong packages/web (Next.js App Router, page/layout, SuspenseWrapper, features/<domain>, React Query hooks, form React Hook Form + Zod, shadcn Base UI, hoặc Route Handler/server).
---

# Kiến trúc và quy trình triển khai Math Insight (`packages/web`)

Áp dụng skill này khi tạo hoặc sửa mã nguồn trong `packages/web`. Kết hợp với:
- `math-insight-api-contract` khi cần thêm/sửa API contract, schema sinh tự động hoặc MSW mock.
- `math-insight-code-style` cho quy chuẩn TypeScript, đặt tên, format và comment.

## Bước 1: Kiểm tra trước khi viết code

1. Với mọi API/quy ước Next.js (App Router, `page.tsx`, `layout.tsx`, Server/Client Component, Route Handler), đọc hướng dẫn tương ứng trong `packages/web/node_modules/next/dist/docs/` theo phiên bản đang cài.
2. Kiểm tra endpoint/hook/schema đã có trong `packages/web/lib/api/generated/` và `packages/web/types/generated/`. Nếu thiếu endpoint hoặc trường dữ liệu, chạy quy trình `math-insight-api-contract` trước.
3. Kiểm tra primitive đã có trong `packages/web/components/ui/` và `packages/web/components/form/` trước khi thêm mới.

## Bước 2: Kiến trúc Frontend (App Router + Feature)

### Phân ranh Server / Client Component & `page.tsx`
- Mặc định dùng **Server Component** cho `app/**/page.tsx` và `app/**/layout.tsx`. Chỉ thêm `"use client"` cho component cần state, event handler, effect, React Query hook hoặc browser API.
- `app/**/page.tsx` chỉ lo bố cục trang và bọc các Client Component tải dữ liệu bằng `SuspenseWrapper` (`@/components/SuspenseWrapper`).
- `SuspenseWrapper` kết hợp `QueryErrorResetBoundary` + `react-error-boundary` + `Suspense` + guard `useIsClient()` để tránh fetch URL tương đối `/api/...` lúc SSR prerender và có sẵn nút "Thử lại" khi lỗi.
- Provider gốc đặt theo thứ tự trong `app/layout.tsx`: `ThemeProvider` → `MockProvider` → `QueryProvider`.

### Tổ chức Feature (`features/<domain>/`)
- Đặt UI nghiệp vụ theo domain tại `features/<domain>/<Component>/<Component>.tsx` (mẫu tham chiếu: `features/todos/TodoList/TodoList.tsx`, `features/todos/AddTodo/AddTodo.tsx`).
- Tải dữ liệu bằng Suspense hook do Orval sinh ra (`use*Suspense`) bên trong component được bọc bởi `SuspenseWrapper`.
- Thực hiện ghi dữ liệu bằng mutation hook sinh ra (`use*Create`, `use*Update`, `use*Delete`) và làm mới cache bằng query key helper sinh ra (`queryClient.invalidateQueries({ queryKey: get*QueryKey() })`).
- Dùng `QueryProvider` (`@/components/providers/QueryProvider`) — không khởi tạo `QueryClient` riêng lẻ trong feature.

### Form & Validation
- Dùng **React Hook Form** + `zodResolver` cùng schema Zod v4 từ `@/types/generated/mathInsightAPI.schemas.zod` (hoặc schema domain trong `types/` nếu chỉ dùng cục bộ không thuộc API contract).
- Tái sử dụng `TextField` (`@/components/form/TextField/TextField`) cho input text chuẩn; khi tạo field mới (Select, Textarea, Checkbox...), bọc bằng `Controller` và primitive `Field`, `FieldLabel`, `FieldError` trong `@/components/ui/field` giữ đầy đủ `data-invalid`, `aria-invalid`, `aria-describedby`.

### UI Primitives & Styling (`shadcn` `base-nova` + Tailwind v4)
- Dự án dùng shadcn style **`base-nova`** xây trên **`@base-ui/react`** (không dùng Radix UI / `asChild` — dùng API của Base UI như `render` prop khi cần tùy biến element), icon từ `lucide-react`, gộp class bằng `cn` và `cva`.
- Thêm component shadcn mới bằng CLI đúng workspace:
  ```bash
  pnpm --dir packages/web dlx shadcn@latest add <component>
  ```
- Styling bằng Tailwind CSS v4 (cấu hình CSS variables trong `app/globals.css`).

## Bước 3: Tầng Server / BFF nội bộ (khi viết Next.js Route Handler)

Áp dụng khi cần triển khai endpoint trực tiếp trong Next.js (`app/api/`):
- Luồng bắt buộc: `app/api/**/route.ts` (HTTP, validate, status code) → `server/services/` (nghiệp vụ) → `server/repositories/` (truy cập dữ liệu).
- Mọi module chỉ chạy phía server trong `server/` phải có `import "server-only"` ở dòng đầu tiên; tách biệt hoàn toàn với Client Component và `lib/api/`.
- Route Handler dùng Web `Request`/`Response` và helper trong `server/utils/route-utils.ts` (`parseRequestBody`, `notFoundResponse`). Với dynamic route (`[id]`), luôn `await params` (`params: Promise<{ ... }>`).
- Xác thực mọi request body bằng schema Zod ở ranh giới Route Handler trước khi gọi service.
- Lưu ý giới hạn hiện tại: `server/repositories/task.repository.ts` là bộ nhớ tạm in-memory dùng cho demo, dữ liệu mất khi restart server — không giả định lưu trữ bền vững cho tới khi nối DB.

## Tiêu chí hoàn tất

- Không chỉnh sửa thủ công file trong `lib/api/generated/` hay `types/generated/`.
- Mọi component gọi `use*Suspense` được bọc trong `SuspenseWrapper`.
- Chạy và báo rõ kết quả các lệnh kiểm tra phù hợp: `pnpm typecheck`, `pnpm lint`, và `pnpm build` (khi đổi route/layout/config). Không khẳng định pass nếu chưa chạy.
