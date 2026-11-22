import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/attendance")
@tag("Attendance")
interface Attendance {
  @post
  @route("/qr-tokens")
  @doc("Học sinh yêu cầu phát hành token QR ngắn hạn phía server cho buổi học đang mở; không chứa PII (FR-021, FR-022).")
  issueQrToken(@body body: IssueQrTokenRequest):
    | ApiCreatedResponse<AttendanceQrToken>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @post
  @route("/scan")
  @doc("Giáo viên phụ trách/dạy thay hoặc Admin quét QR điểm danh; trả về tên học sinh để đối chiếu và chống ghi trùng (FR-023, FR-024).")
  scanQr(@body body: ScanQrAttendanceRequest):
    | ApiResponse<ScanQrAttendanceResult>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @post
  @route("/manual")
  @doc("Điểm danh thủ công khi QR/camera lỗi hoặc ngoài giờ; bắt buộc ghi lý do và được audit (FR-025).")
  recordManual(@body body: ManualAttendanceRequest):
    | ApiCreatedResponse<AttendanceRecord>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @patch
  @route("/records/{id}")
  @doc("Cập nhật trạng thái điểm danh đã ghi; bắt buộc ghi lý do và được audit (FR-026).")
  updateRecord(@path id: Uuid, @body body: UpdateAttendanceRecordRequest):
    | ApiResponse<AttendanceRecord>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @get
  @route("/sessions/{sessionId}")
  @doc("Bảng điểm danh của buổi học gồm tổng dự kiến, đã điểm danh, chưa điểm danh và danh sách từng học sinh (FR-027).")
  @opExample(#{
    parameters: #{ sessionId: "550e8400-e29b-41d4-a716-446655440601" },
    returnType: #{
      data: #{
        sessionId: "550e8400-e29b-41d4-a716-446655440601",
        summary: #{
          expectedCount: 2,
          recordedCount: 1,
          unrecordedCount: 1,
          presentCount: 1,
          lateCount: 0,
          absentCount: 0,
          excusedCount: 0,
        },
        items: #[
          #{
            studentId: "550e8400-e29b-41d4-a716-446655440301",
            studentCode: "HS-2026-0001",
            studentFullName: "Lê Hoàng Gia Bảo",
            enrollmentId: "550e8400-e29b-41d4-a716-446655440401",
            record: #{
              id: "550e8400-e29b-41d4-a716-446655440701",
              sessionId: "550e8400-e29b-41d4-a716-446655440601",
              studentId: "550e8400-e29b-41d4-a716-446655440301",
              studentCode: "HS-2026-0001",
              studentFullName: "Lê Hoàng Gia Bảo",
              status: AttendanceStatus.present,
              method: AttendanceMethod.qr,
              tokenId: "550e8400-e29b-41d4-a716-446655440801",
              recordedAt: utcDateTime.fromISO("2026-11-21T10:55:00Z"),
              recordedBy: "550e8400-e29b-41d4-a716-446655440101",
              recordedByName: "Thầy Nguyễn Minh Quân",
              reason: null,
              createdAt: utcDateTime.fromISO("2026-11-21T10:55:00Z"),
              updatedAt: utcDateTime.fromISO("2026-11-21T10:55:00Z"),
            },
          },
          #{
            studentId: "550e8400-e29b-41d4-a716-446655440302",
            studentCode: "HS-2026-0002",
            studentFullName: "Phạm Ngọc Khánh Linh",
            enrollmentId: "550e8400-e29b-41d4-a716-446655440402",
            record: null,
          }
        ],
      },
    },
  })
  getSessionBoard(@path sessionId: Uuid):
    | ApiResponse<SessionAttendanceBoard>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @get
  @route("/records")
  @doc("Tra cứu lịch sử điểm danh theo lớp, buổi học, học sinh hoặc khoảng thời gian (FR-027).")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440701",
          sessionId: "550e8400-e29b-41d4-a716-446655440601",
          studentId: "550e8400-e29b-41d4-a716-446655440301",
          studentCode: "HS-2026-0001",
          studentFullName: "Lê Hoàng Gia Bảo",
          status: AttendanceStatus.present,
          method: AttendanceMethod.qr,
          tokenId: "550e8400-e29b-41d4-a716-446655440801",
          recordedAt: utcDateTime.fromISO("2026-11-21T10:55:00Z"),
          recordedBy: "550e8400-e29b-41d4-a716-446655440101",
          recordedByName: "Thầy Nguyễn Minh Quân",
          reason: null,
          createdAt: utcDateTime.fromISO("2026-11-21T10:55:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-21T10:55:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 1 },
    },
  })
  listRecords(...AttendanceHistoryQuery):
    | PaginatedResponse<AttendanceRecord>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError;
}
