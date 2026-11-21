import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/classes")
@tag("Classes")
interface Classes {
  @get
  @doc("Danh sách lớp học theo phạm vi phân quyền RLS (Admin: tất cả, Teacher: lớp phụ trách, Student: lớp đang học).")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440201",
          classCode: "TOAN9A-2026",
          name: "Toán 9A - Ôn thi vào 10",
          gradeLevel: "Khối 9",
          teacherUserId: "550e8400-e29b-41d4-a716-446655440101",
          teacherName: "Thầy Nguyễn Minh Quân",
          scheduleText: "Thứ 3, Thứ 5 (18:00 - 19:30)",
          room: "P.201",
          maxStudents: 25,
          startDate: plainDate.fromISO("2026-09-05"),
          endDate: plainDate.fromISO("2027-05-30"),
          status: ClassStatus.active,
          activeStudentCount: 18,
          createdAt: utcDateTime.fromISO("2026-09-01T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-15T10:00:00Z"),
        },
        #{
          id: "550e8400-e29b-41d4-a716-446655440202",
          classCode: "TOAN12B-2026",
          name: "Toán 12B - Luyện đề THPT",
          gradeLevel: "Khối 12",
          teacherUserId: "550e8400-e29b-41d4-a716-446655440102",
          teacherName: "Cô Trần Thu Hà",
          scheduleText: "Thứ 2, Thứ 4, Thứ 6 (19:00 - 20:30)",
          room: "P.302",
          maxStudents: 30,
          startDate: plainDate.fromISO("2026-09-10"),
          endDate: plainDate.fromISO("2027-06-15"),
          status: ClassStatus.active,
          activeStudentCount: 24,
          createdAt: utcDateTime.fromISO("2026-09-02T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-16T09:15:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 2 },
    },
  })
  list(...ClassListQuery):
    | PaginatedResponse<ClassItem>
    | BadRequestError
    | UnauthorizedError;

  @post
  @doc("Tạo lớp học mới và gán giáo viên phụ trách (Admin, FR-002).")
  create(@body body: CreateClassRequest):
    | ApiCreatedResponse<ClassItem>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | ConflictError;

  @get
  @doc("Xem chi tiết lớp học.")
  @opExample(#{
    parameters: #{ id: "550e8400-e29b-41d4-a716-446655440201" },
    returnType: #{
      data: #{
        id: "550e8400-e29b-41d4-a716-446655440201",
        classCode: "TOAN9A-2026",
        name: "Toán 9A - Ôn thi vào 10",
        gradeLevel: "Khối 9",
        teacherUserId: "550e8400-e29b-41d4-a716-446655440101",
        teacherName: "Thầy Nguyễn Minh Quân",
        scheduleText: "Thứ 3, Thứ 5 (18:00 - 19:30)",
        room: "P.201",
        maxStudents: 25,
        startDate: plainDate.fromISO("2026-09-05"),
        endDate: plainDate.fromISO("2027-05-30"),
        status: ClassStatus.active,
        activeStudentCount: 18,
        createdAt: utcDateTime.fromISO("2026-09-01T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-11-15T10:00:00Z"),
      },
    },
  })
  get(@path id: Uuid):
    | ApiResponse<ClassItem>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @patch
  @doc("Cập nhật thông tin lớp, giáo viên phụ trách hoặc ngừng hoạt động lớp (Admin, FR-002).")
  update(@path id: Uuid, @body body: UpdateClassRequest):
    | ApiResponse<ClassItem>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @get
  @route("/{id}/enrollments")
  @doc("Danh sách ghi danh học sinh của lớp (FR-003).")
  @opExample(#{
    parameters: #{ id: "550e8400-e29b-41d4-a716-446655440201" },
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
  @route("/{id}/enrollments")
  @doc("Ghi danh học sinh vào lớp; chặn trùng ghi danh đang active (Admin, FR-003).")
  createEnrollment(@path id: Uuid, @body body: CreateEnrollmentRequest):
    | ApiCreatedResponse<Enrollment>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @patch
  @route("/{id}/enrollments/{enrollmentId}")
  @doc("Cập nhật trạng thái ghi danh (ended/cancelled yêu cầu endDate, Admin, FR-003).")
  updateEnrollment(
    @path id: Uuid,
    @path enrollmentId: Uuid,
    @body body: UpdateEnrollmentRequest,
  ):
    | ApiResponse<Enrollment>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;
}
