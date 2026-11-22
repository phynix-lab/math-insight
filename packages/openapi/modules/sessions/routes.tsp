import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/sessions")
@tag("Sessions")
interface Sessions {
  @get
  @doc("Danh sách buổi học (đọc từ v_class_sessions kèm effective_status) theo phạm vi RLS.")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440601",
          classId: "550e8400-e29b-41d4-a716-446655440201",
          classCode: "TOAN9A-2026",
          className: "Toán 9A - Ôn thi vào 10",
          sessionNo: 12,
          title: "Hệ phương trình bậc nhất hai ẩn",
          startsAt: utcDateTime.fromISO("2026-11-21T11:00:00Z"),
          endsAt: utcDateTime.fromISO("2026-11-21T12:30:00Z"),
          attendanceOpensAt: utcDateTime.fromISO("2026-11-21T10:45:00Z"),
          attendanceClosesAt: utcDateTime.fromISO("2026-11-21T12:45:00Z"),
          substituteTeacherUserId: null,
          substituteTeacherName: null,
          status: SessionStatus.scheduled,
          effectiveStatus: SessionEffectiveStatus.open,
          closedAt: null,
          createdBy: "550e8400-e29b-41d4-a716-446655440101",
          createdAt: utcDateTime.fromISO("2026-11-18T08:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-18T08:00:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 1 },
    },
  })
  list(...SessionListQuery):
    | PaginatedResponse<ClassSession>
    | BadRequestError
    | UnauthorizedError;

  @post
  @doc("Tạo buổi học mới cho lớp đang hoạt động kèm cửa sổ điểm danh (Admin hoặc giáo viên phụ trách, FR-020).")
  create(@body body: CreateSessionRequest):
    | ApiCreatedResponse<ClassSession>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | ConflictError;

  @get
  @doc("Xem chi tiết buổi học và tổng hợp điểm danh (FR-020, FR-027).")
  @opExample(#{
    parameters: #{ id: "550e8400-e29b-41d4-a716-446655440601" },
    returnType: #{
      data: #{
        id: "550e8400-e29b-41d4-a716-446655440601",
        classId: "550e8400-e29b-41d4-a716-446655440201",
        classCode: "TOAN9A-2026",
        className: "Toán 9A - Ôn thi vào 10",
        sessionNo: 12,
        title: "Hệ phương trình bậc nhất hai ẩn",
        startsAt: utcDateTime.fromISO("2026-11-21T11:00:00Z"),
        endsAt: utcDateTime.fromISO("2026-11-21T12:30:00Z"),
        attendanceOpensAt: utcDateTime.fromISO("2026-11-21T10:45:00Z"),
        attendanceClosesAt: utcDateTime.fromISO("2026-11-21T12:45:00Z"),
        substituteTeacherUserId: null,
        substituteTeacherName: null,
        status: SessionStatus.scheduled,
        effectiveStatus: SessionEffectiveStatus.open,
        closedAt: null,
        createdBy: "550e8400-e29b-41d4-a716-446655440101",
        createdAt: utcDateTime.fromISO("2026-11-18T08:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-11-18T08:00:00Z"),
        attendanceSummary: #{
          expectedCount: 18,
          recordedCount: 15,
          unrecordedCount: 3,
          presentCount: 14,
          lateCount: 1,
          absentCount: 0,
          excusedCount: 0,
        },
      },
    },
  })
  get(@path id: Uuid):
    | ApiResponse<ClassSessionDetail>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @patch
  @doc("Cập nhật thời gian, cửa sổ điểm danh, giáo viên dạy thay hoặc hủy buổi học (FR-020).")
  update(@path id: Uuid, @body body: UpdateSessionRequest):
    | ApiResponse<ClassSession>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @post
  @route("/{id}/close")
  @doc("Đóng buổi học (gọi close_session idempotent): sinh bản ghi absent (method = system) cho học sinh chưa điểm danh và thu hồi token QR còn lại.")
  close(@path id: Uuid):
    | ApiResponse<CloseSessionResult>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;
}
