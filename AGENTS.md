<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Kiến trúc & Quy ước dự án Math Insight

Monorepo sử dụng `pnpm` workspace (`pnpm-workspace.yaml`) gồm 2 package chính:
- `packages/openapi` (`@math-insight/openapi`): nguồn sự thật cho API contract bằng **TypeSpec**, biên dịch ra `docs/openapi/openapi.json` và `docs/openapi/openapi.md`.
- `packages/web` (`@math-insight/web`): ứng dụng **Next.js App Router** (React 19, Tailwind CSS v4, shadcn `base-nova` trên `@base-ui/react`, TanStack React Query, React Hook Form, Zod v4, Orval, MSW).

## Bất biến kiến trúc

- **Contract-first API**: Định nghĩa endpoint, model, enum và `@opExample` trong `packages/openapi/`, sau đó đồng bộ sang web bằng `pnpm --filter @math-insight/openapi build && pnpm --filter @math-insight/web generate:api`. Các thư mục `docs/openapi/`, `packages/web/lib/api/generated/`, `packages/web/types/generated/` là file sinh tự động — sửa TypeSpec và chạy sync thay vì sửa tay.
- **Đọc docs Next.js theo phiên bản cài**: Trước khi viết mã Next.js, đọc tài liệu tương ứng tại `packages/web/node_modules/next/dist/docs/`. Lưu ý `params` trong dynamic Route Handler là `Promise`.
- **Server Component mặc định & `SuspenseWrapper`**: Chỉ thêm `"use client"` khi cần tương tác, hook hoặc browser API. File `app/**/page.tsx` chỉ lo layout và bọc component tải dữ liệu bằng `SuspenseWrapper`; UI nghiệp vụ đặt trong `features/<domain>/<Component>/<Component>.tsx`.
- **Dữ liệu & Form phía client**: Dùng React Query hooks (ưu tiên `use*Suspense` + `get*QueryKey()`) và Zod v4 schemas sinh từ Orval; form dùng React Hook Form + `zodResolver` + `components/form/TextField/TextField.tsx` và primitive trong `components/ui/` (`@base-ui/react`).
- **Mock API**: MSW tự nạp handler sinh từ Orval tại `packages/web/mocks/handlers.ts`, điều khiển bằng biến môi trường `ENABLE_MOCK=true` qua `MockProvider`.
- **Tầng Server / BFF & Database (Prisma)**: Khi viết Route Handler trong `packages/web`, theo luồng `app/api/**/route.ts` → `server/services/` → `server/repositories/`, bọc route cần xác thực bằng `withAuth` tại `server/utils/auth-guard.ts`, dùng `server/utils/route-utils.ts`, và thêm `import "server-only"` ở đầu mỗi file trong `server/`. Tách biệt `server/` khỏi Client Component và `lib/api/`. Prisma 7 đặt tại `packages/web/prisma/schema.prisma`, `packages/web/prisma.config.ts` (tách 3 môi trường theo `APP_ENV`), singleton tại `packages/web/server/db/prisma.ts`, còn `packages/web/server/db/generated/` là file sinh tự động (không sửa tay).

## Skills của dự án

Đọc và áp dụng skill tương ứng trước khi sửa mã:
- **Tính năng & kiến trúc web** (Next.js, `app/`, `features/`, `SuspenseWrapper`, form, shadcn Base UI, `server/`): `.agents/skills/math-insight-project/SKILL.md`
- **API contract, codegen & mock** (TypeSpec, OpenAPI, Orval, `customFetch`, MSW): `.agents/skills/math-insight-api-contract/SKILL.md`
- **Chuẩn code, kiểu dữ liệu, format & comment**: `.agents/skills/math-insight-code-style/SKILL.md`
