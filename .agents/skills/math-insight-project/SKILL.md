---
name: math-insight-project
description: Tạo hoặc chỉnh sửa tính năng trong dự án Math Insight theo quy ước Next.js, phân tầng server, Zod, React Query và form.
---

# Quy trình làm việc với dự án Math Insight

Áp dụng skill này khi triển khai hoặc chỉnh sửa mã nguồn trong dự án Math
Insight. Đọc `AGENTS.md` ở thư mục gốc trước; đây là tài liệu tổng hợp các quy
tắc của dự án.

## Trước khi sửa mã nguồn

- Kiểm tra các file liên quan và giữ nhất quán với cách triển khai hiện có.
- Trước khi viết mã liên quan đến Next.js, đọc hướng dẫn tương ứng trong
  `node_modules/next/dist/docs/` theo phiên bản đang cài. Chọn tài liệu App
  Router phù hợp với page, layout, Server/Client Component hoặc Route Handler.
- Kiểm tra xem schema Zod hoặc UI component dùng chung đã có chưa trước khi
  tạo thêm.

## Kiến trúc

- Luồng API: `app/api/**/route.ts` → `server/services/` →
  `server/repositories/`.
- Route Handler xử lý HTTP method, đọc và xác thực request, chọn status code
  và tạo response. Dùng helper trong `server/utils/route-utils.ts`.
- Service chứa nghiệp vụ ứng dụng và điều phối repository. Repository chịu
  trách nhiệm truy cập dữ liệu, có thể được thay bằng adapter lưu trữ bền vững.
- Schema Zod và type dùng chung nằm trong `types/`; đảm bảo cả browser lẫn
  server đều import được.
- Hàm fetch chạy phía browser nằm trong `lib/api/`. Dùng React Query để tải dữ
  liệu, thực hiện mutation và cập nhật cache.
- Dùng `components/providers/QueryProvider.tsx` để cung cấp React Query. Với
  form, dùng React Hook Form kết hợp `zodResolver`; tái sử dụng
  `components/form/TextField/TextField.tsx` cho input thông thường.
- Ưu tiên các primitive trong `components/ui/` và quy tắc style hiện có trước
  khi tạo cách triển khai song song.

## Chi tiết triển khai

- Đặt module chỉ chạy phía server trong `server/`; không import chúng vào
  Client Component hoặc module schema dùng chung.
- Thêm `import "server-only"` ở đầu mỗi module chỉ chạy phía server để Next.js
  phát hiện nếu module bị import nhầm vào Client Component.
- Xác thực request body không đáng tin cậy bằng schema Zod dùng chung trước
  khi gọi service. Suy ra type từ schema thay vì khai báo lại cấu trúc field.
- Dùng API Web `Request` và `Response` trong Route Handler. Với dynamic route,
  `await` promise `params` theo yêu cầu của phiên bản Next.js hiện tại.
- Mặc định dùng Server Component; chỉ thêm `"use client"` khi cần tương tác
  hoặc API của trình duyệt.
- Repository Task hiện lưu dữ liệu tạm trong bộ nhớ. Không mô tả dữ liệu này
  là bền vững hoặc giả định dữ liệu được giữ lại sau khi server khởi động lại,
  trừ khi đã thay đổi cách triển khai repository.

## Hoàn tất

- Rà soát các file đã sửa để đảm bảo type nhất quán và import chính xác.
- Khi phù hợp, chạy lệnh kiểm tra liên quan (`npm run typecheck`,
  `npm run lint` hoặc `npm run build`) và ghi rõ đã chạy lệnh nào. Không khẳng
  định kiểm tra thành công nếu chưa chạy.
