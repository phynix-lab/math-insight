---
name: math-insight-code-style
description: Viết, refactor hoặc rà soát mã nguồn TypeScript/TSX/TypeSpec trong Math Insight theo chuẩn đặt tên, kiểu dữ liệu, format Prettier/Tailwind, accessibility và comment.
---

# Quy chuẩn Code và Comment của Math Insight

Áp dụng skill này khi viết, chỉnh sửa hoặc review mã nguồn trong toàn bộ monorepo (`packages/web`, `packages/openapi`). Kết hợp với `math-insight-project` hoặc `math-insight-api-contract` khi đụng tới kiến trúc hoặc API.

## Nguyên tắc viết code

- **Bắt chước pattern lân cận**: Đọc file cùng thư mục trước khi sửa để khớp cấu trúc, import alias (`@/...`) và đặt tên. Chỉ giới thiệu pattern mới khi pattern hiện có không đáp ứng được.
- **TypeScript chặt chẽ**: Tránh `any` và ép kiểu cưỡng bức (`as unknown as ...`). Ưu tiên kiểu sinh ra từ Orval/TypeSpec (`@/lib/api/generated/model`, `@/types/generated/*.zod.ts`) hoặc suy ra bằng `z.input`/`z.output`/`z.infer`, dùng `unknown` kèm validation ở ranh giới dữ liệu ngoài.
- **Đặt tên rõ ràng**: Dùng tiếng Anh cho identifier, tên file, tên type/hook/model; dùng tiếng Việt cho nhãn giao diện, thông báo lỗi và ví dụ dữ liệu hướng tới người dùng.
- **Hàm và component gọn, một trách nhiệm**: Dùng early return xử lý nhánh lỗi/rỗng trước; tách magic number/string lặp lại thành hằng số có tên rõ nghĩa; chỉ tách abstraction khi tái sử dụng thật sự hoặc làm luồng đọc rõ hơn.
- **Tái sử dụng stack hiện có**: Ưu tiên `components/ui/`, `components/form/`, `lib/utils.ts` và dependency đã cài trong `package.json`. Chỉ thêm thư viện mới khi stack hiện tại không giải quyết hợp lý.
- **Accessibility cơ bản**: Mọi input có label hoặc `aria-label`, trạng thái lỗi gắn `aria-invalid` + `aria-describedby`, thông báo lỗi đặt `role="alert"`.
- **Format nhất quán**: Tuân theo `.prettierrc` (không dấu `;`, nháy kép `"`, indent 2 space, tự sắp xếp class Tailwind cho `cn`/`cva`) và ESLint (`packages/web/eslint.config.mjs`). Giữ diff tập trung vào phạm vi yêu cầu, bỏ qua thư mục generated (`lib/api/generated/`, `types/generated/`, `docs/openapi/`).

## Nguyên tắc viết comment

- Comment giải thích **lý do, ràng buộc hoặc quyết định thiết kế** không tự bộc lộ qua code; tránh tường thuật từng dòng lệnh hiển nhiên.
- Viết comment mới bằng **tiếng Việt ngắn gọn**, giữ nguyên thuật ngữ kỹ thuật, tên API, thư viện và identifier tiếng Anh.
- Dùng JSDoc (`@param`, `@returns`) cho component, hook, helper dùng chung khi người gọi cần biết mục đích, tham số hoặc giới hạn sử dụng; không bắt buộc với hàm nội bộ ngắn đã tự rõ qua tên và kiểu.
- Cập nhật hoặc xóa comment về giới hạn/hành vi tạm ngay khi code thay đổi. Mọi `TODO` phải nêu rõ việc cụ thể cần làm.

## Rà soát trước khi hoàn tất

- Loại bỏ import, biến, type và comment thừa.
- Đối chiếu comment, tên hàm, kiểu dữ liệu và validation khớp với hành vi mới nhất.
- Chạy `pnpm format` (hoặc `pnpm --filter @math-insight/openapi format` với `.tsp`) nếu cần, xác nhận `pnpm typecheck` và `pnpm lint` sạch lỗi.
