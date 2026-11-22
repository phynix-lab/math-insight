import "@typespec/http";
import "../../common/errors.tsp";
import "../../common/responses.tsp";
import "../sessions/enums.tsp";
import "./models.tsp";

using Http;
using Common;

namespace MathInsight;

@route("/dashboard")
@tag("Dashboard")
interface Dashboard {
  @get
  @route("/overview")
  @doc("Tổng quan vận hành: học sinh đang hoạt động, buổi học hôm nay kèm chuyên cần và số đơn chờ xử lý (FR-040, FR-041).")
  @opExample(#{
    returnType: #{
      data: #{
        activeStudentCount: 42,
        activeClassCount: 2,
        pendingApplicationCount: 3,
        todaySessions: #[
          #{
            sessionId: "550e8400-e29b-41d4-a716-446655440601",
            classId: "550e8400-e29b-41d4-a716-446655440201",
            classCode: "TOAN9A-2026",
            className: "Toán 9A - Ôn thi vào 10",
            sessionNo: 12,
            startsAt: utcDateTime.fromISO("2026-11-21T11:00:00Z"),
            endsAt: utcDateTime.fromISO("2026-11-21T12:30:00Z"),
            effectiveStatus: SessionEffectiveStatus.open,
            expectedCount: 18,
            recordedCount: 15,
            presentCount: 14,
            lateCount: 1,
            absentCount: 0,
            excusedCount: 0,
          }
        ],
        asOf: utcDateTime.fromISO("2026-11-21T11:10:00Z"),
      },
    },
  })
  getOverview(...DashboardOverviewQuery):
    | ApiResponse<DashboardOverview>
    | BadRequestError
    | UnauthorizedError
    | ForbiddenError;
}
