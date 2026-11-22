import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/audit-logs")
@tag("AuditLogs")
interface AuditLogs {
  @get
  @doc("Tra cứu nhật ký thao tác hệ thống append-only (chỉ Admin có quyền xem, NFR-05).")
  @opExample(#{
    returnType: #{
      data: #[
        #{
          id: "550e8400-e29b-41d4-a716-446655440901",
          actorUserId: "550e8400-e29b-41d4-a716-446655440100",
          actorDisplayName: "Quản trị viên Trung tâm",
          action: "PROFILE_PRIVILEGE_CHANGED",
          entityType: "profiles",
          entityId: "550e8400-e29b-41d4-a716-446655440101",
          beforeData: #{ can_review_applications: false },
          afterData: #{ can_review_applications: true },
          reason: null,
          createdAt: utcDateTime.fromISO("2026-11-17T09:00:00Z"),
        }
      ],
      meta: #{ page: 1, limit: 20, total: 1 },
    },
  })
  list(...AuditLogListQuery):
    | PaginatedResponse<AuditLog>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError;
}
