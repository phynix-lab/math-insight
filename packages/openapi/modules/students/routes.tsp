import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "../classes/enums.tsp";
import "../classes/models.tsp";
import "./enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/students")
@tag("Students")
interface Students {
  @get
  @doc("Danh sách học sinh theo phân quyền RLS (Admin: tất cả, Teacher: học sinh lớp mình phụ trách).")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440301",
          studentCode: "HS-2026-0001",
          fullName: "Lê Hoàng Gia Bảo",
          dateOfBirth: plainDate.fromISO("2012-04-15"),
          gradeLevel: "Khối 9",
          studentPhone: "0988111222",
          studentEmail: "giabao.le@example.com",
          guardianName: "Lê Văn Hùng",
          guardianRelation: "Bố",
          guardianPhone: "0909111222",
          guardianEmail: "hung.le@example.com",
          status: StudentStatus.active,
          authUserId: "550e8400-e29b-41d4-a716-446655440199",
          accountStatus: AccountStatus.linked,
          invitedAt: utcDateTime.fromISO("2026-09-05T09:00:00Z"),
          inviteAttempts: 1,
          inviteLastError: null,
          createdAt: utcDateTime.fromISO("2026-09-05T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-09-06T07:30:00Z"),
        },
        #{
          id: "550e8400-e29b-41d4-a716-446655440302",
          studentCode: "HS-2026-0002",
          fullName: "Phạm Ngọc Khánh Linh",
          dateOfBirth: plainDate.fromISO("2012-08-22"),
          gradeLevel: "Khối 9",
          studentPhone: null,
          studentEmail: "khanhlinh.pham@example.com",
          guardianName: "Nguyễn Thị Mai",
          guardianRelation: "Mẹ",
          guardianPhone: "0909333444",
          guardianEmail: "mai.nguyen@example.com",
          status: StudentStatus.active,
          authUserId: null,
          accountStatus: AccountStatus.invited,
          invitedAt: utcDateTime.fromISO("2026-11-18T10:00:00Z"),
          inviteAttempts: 1,
          inviteLastError: null,
          createdAt: utcDateTime.fromISO("2026-11-18T09:30:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-18T10:00:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 2 },
    },
  })
  list(...StudentListQuery):
    | PaginatedResponse<Student>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError;

  @post
  @doc("Tạo hồ sơ học sinh thủ công và tùy chọn ghi danh lớp ban đầu (Admin, FR-003).")
  create(@body body: CreateStudentRequest):
    | ApiCreatedResponse<Student>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | ConflictError;

  @get
  @route("/me")
  @doc("Học sinh xem hồ sơ cá nhân liên kết với tài khoản đăng nhập (FR-004).")
  @opExample(#{
    returnType: #{
      data: #{
        id: "550e8400-e29b-41d4-a716-446655440301",
        studentCode: "HS-2026-0001",
        fullName: "Lê Hoàng Gia Bảo",
        dateOfBirth: plainDate.fromISO("2012-04-15"),
        gradeLevel: "Khối 9",
        studentPhone: "0988111222",
        studentEmail: "giabao.le@example.com",
        guardianName: "Lê Văn Hùng",
        guardianRelation: "Bố",
        guardianPhone: "0909111222",
        guardianEmail: "hung.le@example.com",
        status: StudentStatus.active,
        authUserId: "550e8400-e29b-41d4-a716-446655440199",
        accountStatus: AccountStatus.linked,
        invitedAt: utcDateTime.fromISO("2026-09-05T09:00:00Z"),
        inviteAttempts: 1,
        inviteLastError: null,
        createdAt: utcDateTime.fromISO("2026-09-05T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-09-06T07:30:00Z"),
      },
    },
  })
  getMe():
    | ApiResponse<Student>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @get
  @doc("Xem chi tiết hồ sơ học sinh.")
  @opExample(#{
    parameters: #{ id: "550e8400-e29b-41d4-a716-446655440301" },
    returnType: #{
      data: #{
        id: "550e8400-e29b-41d4-a716-446655440301",
        studentCode: "HS-2026-0001",
        fullName: "Lê Hoàng Gia Bảo",
        dateOfBirth: plainDate.fromISO("2012-04-15"),
        gradeLevel: "Khối 9",
        studentPhone: "0988111222",
        studentEmail: "giabao.le@example.com",
        guardianName: "Lê Văn Hùng",
        guardianRelation: "Bố",
        guardianPhone: "0909111222",
        guardianEmail: "hung.le@example.com",
        status: StudentStatus.active,
        authUserId: "550e8400-e29b-41d4-a716-446655440199",
        accountStatus: AccountStatus.linked,
        invitedAt: utcDateTime.fromISO("2026-09-05T09:00:00Z"),
        inviteAttempts: 1,
        inviteLastError: null,
        createdAt: utcDateTime.fromISO("2026-09-05T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-09-06T07:30:00Z"),
      },
    },
  })
  get(@path id: Uuid):
    | ApiResponse<Student>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @patch
  @doc("Cập nhật hồ sơ học sinh (Admin, FR-003).")
  update(@path id: Uuid, @body body: UpdateStudentRequest):
    | ApiResponse<Student>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @get
  @route("/{id}/enrollments")
  @doc("Lịch sử tham gia lớp học của một học sinh (FR-003).")
  @opExample(#{
    parameters: #{ id: "550e8400-e29b-41d4-a716-446655440301" },
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440401",
          studentId: "550e8400-e29b-41d4-a716-446655440301",
          studentCode: "HS-2026-0001",
          studentFullName: "Lê Hoàng Gia Bảo",
          classId: "550e8400-e29b-41d4-a716-446655440201",
          classCode: "TOAN9A-2026",
          className: "Toán 9A - Ôn thi vào 10",
          startDate: plainDate.fromISO("2026-09-05"),
          endDate: null,
          status: EnrollmentStatus.active,
          createdAt: utcDateTime.fromISO("2026-09-05T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-09-05T08:00:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 1 },
    },
  })
  listEnrollments(@path id: Uuid, ...EnrollmentListQuery):
    | PaginatedResponse<Enrollment>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @post
  @route("/{id}/invite-account")
  @doc("Gửi hoặc gửi lại lời mời kích hoạt tài khoản cho hồ sơ học sinh mà không tạo hồ sơ trùng (Admin, FR-004, FR-013).")
  inviteAccount(@path id: Uuid, @body body: InviteStudentAccountRequest):
    | ApiResponse<Student>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @post
  @route("/{id}/link-account")
  @doc("Liên kết tài khoản đăng nhập có sẵn với hồ sơ học sinh (Admin, FR-004).")
  linkAccount(@path id: Uuid, @body body: LinkStudentAccountRequest):
    | ApiResponse<Student>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;
}
