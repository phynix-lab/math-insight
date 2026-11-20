<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Quy ước của dự án

Dự án tổ chức dạng pnpm monorepo (`pnpm-workspace.yaml`). Ứng dụng frontend
Next.js App Router nằm trong `packages/web` (`@math-insight/web`). Khi thêm
hoặc chỉnh sửa mã nguồn trong `packages/web`, hãy tuân theo các quy ước sau:

- Trước khi sửa mã Next.js, đọc hướng dẫn tương ứng trong
  `packages/web/node_modules/next/dist/docs/` theo phiên bản đang cài. Với API,
  đọc tài liệu Route Handler và lưu ý `params` của dynamic route là một promise.
- Luồng xử lý API: `app/api/**/route.ts` (HTTP và response) →
  `server/services/` (nghiệp vụ ứng dụng) → `server/repositories/` (truy cập dữ
  liệu). Helper HTTP dùng chung phía server đặt trong `server/utils/`.
- Không đặt mã server trong `lib/api/`; thư mục này chứa các hàm phía browser
  gọi endpoint của ứng dụng. Không import module trong `server/` vào Client
  Component.
- Đặt schema request dùng chung trong `types/` bằng Zod. Suy ra TypeScript type
  bằng `z.input`, `z.output` hoặc `z.infer`, không khai báo lặp lại cấu trúc dữ
  liệu. Schema dùng chung không được phụ thuộc vào mã chỉ chạy phía server.
- Route Handler dùng helper parse request và tạo response trong
  `server/utils/route-utils.ts`. Xác thực input ở ranh giới API trước khi gọi
  service; không đặt logic lưu trữ trong route.
- Dùng React Query cho truy vấn và mutation phía client. Provider là
  `components/providers/QueryProvider.tsx`; các hàm gọi endpoint đặt trong
  `lib/api/`.
- Dùng React Hook Form cùng `zodResolver` cho form cần validation. Tái sử dụng
  `components/form/TextField/TextField.tsx` cho input thông thường và ưu tiên
  component trong `components/ui/` trước khi tạo primitive mới.
- Mặc định dùng Server Component. Chỉ thêm `"use client"` khi module cần state,
  event handler, effect hoặc API của trình duyệt.
- Tách UI nghiệp vụ theo domain vào `features/<domain>/<Component>/<Component>.tsx`
  (ví dụ `features/todos/TodoList/TodoList.tsx`, `features/todos/AddTodo/AddTodo.tsx`);
  file `app/**/page.tsx` chỉ xử lý layout và bọc `SuspenseWrapper`.
- Mỗi module chỉ chạy phía server trong `server/` cần có
  `import "server-only"` ở đầu file.
- Dữ liệu Task hiện được lưu trong bộ nhớ tạm tại
  `server/repositories/task.repository.ts`, không tồn tại sau khi server khởi
  động lại. Giữ rõ giới hạn này trong ví dụ và tài liệu cho đến khi có database
  lưu trữ bền vững.

## Skill của dự án

Khi triển khai tính năng trong repository này, hãy làm theo
`.agents/skills/math-insight-project/SKILL.md`. Khi viết hoặc sửa code và
comment, áp dụng thêm `.agents/skills/math-insight-code-style/SKILL.md`.
