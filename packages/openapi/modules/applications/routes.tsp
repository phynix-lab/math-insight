import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/applications")
@tag("Applications")
interface Applications {
  @get
  @route("/public/classes")
  @doc("Danh sách lớp đang mở tuyển sinh cho form đăng ký công khai (không lộ PII, FR-010).")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440201",
          classCode: "TOAN9A-2026",
          name: "Toán 9A - Ôn thi vào 10",
          gradeLevel: "Khối 9",
          scheduleText: "Thứ 3, Thứ 5 (18:00 - 19:30)",
        },
        #{
          id: "550e8400-e29b-41d4-a716-446655440202",
          classCode: "TOAN12B-2026",
          name: "Toán 12B - Luyện đề THPT",
          gradeLevel: "Khối 12",
          scheduleText: "Thứ 2, Thứ 4, Thứ 6 (19:00 - 20:30)",
        }
      ],
    },
  })
  listPublicClasses(): ApiResponse<PublicClassOption[]>;

  @post
  @route("/public")
  @doc("Gửi đơn đăng ký học sinh công khai qua server/Edge Function có captcha và rate limit (FR-010, FR-011).")
  submitPublic(@body body: SubmitPublicApplicationRequest):
    | ApiCreatedResponse<PublicApplicationReceipt>
    | BadRequestError
    | TooManyRequestsError;

  @get
  @doc("Danh sách đơn đăng ký cho Admin hoặc giáo viên được bật can_review_applications (FR-012).")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440501",
          applicationCode: "APP-2026-0001",
          studentFullName: "Trần Quốc Anh",
          studentDob: plainDate.fromISO("2012-06-10"),
          requestedGrade: "Khối 9",
          requestedClassId: "550e8400-e29b-41d4-a716-446655440201",
          requestedClassName: "Toán 9A - Ôn thi vào 10",
          studentPhone: null,
          studentEmail: "quocanh.tran@example.com",
          guardianName: "Trần Văn Bình",
          guardianRelation: "Bố",
          guardianPhone: "0918222333",
          guardianEmail: "binh.tran@example.com",
          applicantNote: "Muốn học ca tối thứ 3 và thứ 5.",
          consentAt: utcDateTime.fromISO("2026-11-19T12:00:00Z"),
          consentVersion: "v1.0",
          status: ApplicationStatus.pending_review,
          reviewedBy: null,
          reviewedByName: null,
          reviewedAt: null,
          reviewNote: null,
          createdStudentId: null,
          createdAt: utcDateTime.fromISO("2026-11-19T12:00:00Z"),
          updatedAt: utcDateTime.fromISO("2026-11-19T12:00:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 1 },
    },
  })
  list(...ApplicationListQuery):
    | PaginatedResponse<EnrollmentApplication>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError;

  @get
  @doc("Xem chi tiết đơn đăng ký kèm lịch sử đổi trạng thái và cảnh báo nghi trùng hồ sơ (FR-011, FR-014).")
  @opExample(#{
    parameters: #{ id: "550e8400-e29b-41d4-a716-446655440501" },
    returnType: #{
      data: #{
        id: "550e8400-e29b-41d4-a716-446655440501",
        applicationCode: "APP-2026-0001",
        studentFullName: "Trần Quốc Anh",
        studentDob: plainDate.fromISO("2012-06-10"),
        requestedGrade: "Khối 9",
        requestedClassId: "550e8400-e29b-41d4-a716-446655440201",
        requestedClassName: "Toán 9A - Ôn thi vào 10",
        studentPhone: null,
        studentEmail: "quocanh.tran@example.com",
        guardianName: "Trần Văn Bình",
        guardianRelation: "Bố",
        guardianPhone: "0918222333",
        guardianEmail: "binh.tran@example.com",
        applicantNote: "Muốn học ca tối thứ 3 và thứ 5.",
        consentAt: utcDateTime.fromISO("2026-11-19T12:00:00Z"),
        consentVersion: "v1.0",
        status: ApplicationStatus.pending_review,
        reviewedBy: null,
        reviewedByName: null,
        reviewedAt: null,
        reviewNote: null,
        createdStudentId: null,
        createdAt: utcDateTime.fromISO("2026-11-19T12:00:00Z"),
        updatedAt: utcDateTime.fromISO("2026-11-19T12:00:00Z"),
        statusHistory: #[
          #{
            id: "550e8400-e29b-41d4-a716-446655440511",
            applicationId: "550e8400-e29b-41d4-a716-446655440501",
            fromStatus: null,
            toStatus: ApplicationStatus.pending_review,
            changedBy: null,
            changedByName: null,
            note: null,
            changedAt: utcDateTime.fromISO("2026-11-19T12:00:00Z"),
          }
        ],
        duplicateCandidates: #[],
      },
    },
  })
  get(@path id: Uuid):
    | ApiResponse<EnrollmentApplicationDetail>
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError;

  @post
  @route("/{id}/approve")
  @doc("Duyệt đơn: tạo tối đa 1 hồ sơ học sinh (hoặc liên kết hồ sơ có sẵn), ghi danh lớp và gửi lời mời account (FR-013, FR-014).")
  approve(@path id: Uuid, @body body: ApproveApplicationRequest):
    | ApiResponse<ApproveApplicationResult>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @post
  @route("/{id}/reject")
  @doc("Từ chối đơn đăng ký; bắt buộc ghi rõ reviewNote (FR-012).")
  reject(@path id: Uuid, @body body: ReviewApplicationDecisionRequest):
    | ApiResponse<EnrollmentApplication>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;

  @post
  @route("/{id}/request-info")
  @doc("Chuyển đơn sang trạng thái cần bổ sung thông tin; bắt buộc ghi rõ reviewNote (FR-011, FR-012).")
  requestInfo(@path id: Uuid, @body body: ReviewApplicationDecisionRequest):
    | ApiResponse<EnrollmentApplication>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError
    | NotFoundError
    | ConflictError;
}
