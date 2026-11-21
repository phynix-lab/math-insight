import "@typespec/http";
import "../../common/types.tsp";
import "../sessions/enums.tsp";

using Http;
using Common;

namespace MathInsight;

model TodaySessionOverview {
  sessionId: Uuid;
  classId: Uuid;
  classCode: string;
  className: string;

  @minValue(1)
  sessionNo: int32;

  startsAt: utcDateTime;
  endsAt: utcDateTime;
  effectiveStatus: SessionEffectiveStatus;

  @minValue(0)
  expectedCount: int32;

  @minValue(0)
  recordedCount: int32;

  @minValue(0)
  presentCount: int32;

  @minValue(0)
  lateCount: int32;

  @minValue(0)
  absentCount: int32;

  @minValue(0)
  excusedCount: int32;
}

model DashboardOverview {
  @minValue(0)
  activeStudentCount: int32;

  @minValue(0)
  activeClassCount: int32;

  @minValue(0)
  pendingApplicationCount: int32;

  todaySessions: TodaySessionOverview[];
  asOf: utcDateTime;
}

model DashboardOverviewQuery {
  @query
  date?: plainDate;
}
