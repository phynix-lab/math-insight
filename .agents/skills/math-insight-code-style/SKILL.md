---
name: math-insight-code-style
description: Viết hoặc chỉnh sửa mã nguồn trong Math Insight theo nguyên tắc đặt tên, cấu trúc, tái sử dụng và comment của dự án.
---

# Nguyên tắc code và comment của Math Insight

Áp dụng skill này khi tạo hoặc chỉnh sửa mã nguồn trong repository Math
Insight. Kết hợp với `math-insight-project` khi công việc liên quan đến kiến
trúc hoặc framework của dự án.

## Nguyên tắc viết code

- Trước tiên đọc các file lân cận để bắt chước cách tổ chức, format và cách đặt
  tên đang dùng. Không tạo thêm một pattern mới nếu pattern hiện có đáp ứng yêu
  cầu.
- Viết TypeScript có kiểu rõ ràng ở ranh giới giữa các lớp và khi dữ liệu đi
  qua API. Tránh `any`; ưu tiên suy luận kiểu, `unknown` kèm validation, hoặc
  type suy ra từ schema Zod.
- Chọn tên mô tả ý nghĩa và vai trò. Dùng tiếng Anh cho identifier trong mã
  nguồn; dùng tiếng Việt cho nội dung giao diện hướng tới người dùng khi phù
  hợp với ngữ cảnh hiện có.
- Giữ hàm và component tập trung vào một nhiệm vụ. Tách helper khi logic được
  dùng lại hoặc khi việc tách tên hàm giúp luồng xử lý dễ hiểu hơn; tránh tạo
  abstraction chỉ để bọc một dòng code đơn giản.
- Tái sử dụng component, schema, helper và dependency đã có. Chỉ thêm thư viện
  mới khi nhu cầu không được đáp ứng hợp lý bằng stack hiện tại.
- Giữ accessibility cơ bản cho giao diện: input có tên truy cập được, trạng
  thái validation được truyền tới input, và thông báo lỗi được trình bày rõ.
- Giữ code format nhất quán với Prettier và quy tắc ESLint hiện có. Không sửa
  các file không liên quan chỉ để áp một phong cách cá nhân.

## Nguyên tắc viết comment

- Comment giải thích lý do, ràng buộc hoặc quyết định không thể hiện rõ qua
  code; không diễn giải lại từng dòng code.
- Viết comment mới bằng tiếng Việt, ngắn gọn và cụ thể. Giữ nguyên các thuật
  ngữ kỹ thuật, tên API, tên thư viện và identifier tiếng Anh khi cần.
- Dùng JSDoc cho component, helper hoặc API dùng chung khi người gọi cần biết
  mục đích, tham số, kết quả hoặc giới hạn sử dụng. Dùng `@param` và `@returns`
  khi các thông tin đó giúp người đọc sử dụng đúng hàm.
- Không bắt buộc JSDoc cho mọi hàm nội bộ đơn giản hoặc hàm mà ý nghĩa đã rõ
  qua tên và kiểu dữ liệu.
- Comment về giới hạn hoặc hành vi tạm thời phải được cập nhật khi code thay
  đổi. Không để lại TODO chung chung nếu chưa nêu được việc cần làm cụ thể.

## Rà soát trước khi hoàn tất

- Xóa import, biến và comment không còn cần thiết.
- Đảm bảo comment vẫn đúng với hành vi hiện tại và không mâu thuẫn với tên
  hàm, kiểu dữ liệu hoặc validation.
- Giữ diff tập trung vào yêu cầu; nêu rõ các bước kiểm tra đã chạy nếu có.
