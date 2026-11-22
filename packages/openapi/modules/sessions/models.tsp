import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";

using Http;
using Common;

namespace MathInsight;

model SessionAttendanceSummary {
  @minValue(0)
  expectedCount: int32;

  @minValue(0)
  recordedCount: int32;

  @minValue(0)
  unrecordedCount: int32;

  @minValue(0)
  presentCount: int32;

  @minValue(0)
  lateCount: int32;

  @minValue(0)
  absentCount: int32;

  @minValue(0)
  excusedCount: int32;
}

model ClassSession {
  id: Uuid;
  classId: Uuid;
  classCode: string;
  className: string;

  @minValue(1)
  sessionNo: int32;

  @maxLength(255)
  title: string | null;

  startsAt: utcDateTime;
  endsAt: utcDateTime;
  attendanceOpensAt: utcDateTime;
  attendanceClosesAt: utcDateTime;
  substituteTeacherUserId: Uuid | null;
  substituteTeacherName: string | null;
  status: SessionStatus;
  effectiveStatus: SessionEffectiveStatus;
  closedAt: utcDateTime | null;
  createdBy: Uuid;
  ...Timestamps;
}

model ClassSessionDetail {
  ...ClassSession;
  attendanceSummary: SessionAttendanceSummary;
}

model SessionListQuery {
  ...PaginationQuery;

  @query
  classId?: Uuid;

  @query
  status?: SessionStatus;

  @query
  effectiveStatus?: SessionEffectiveStatus;

  @query
  from?: utcDateTime;

  @query
  to?: utcDateTime;
}

model CreateSessionRequest {
  classId: Uuid;

  @minValue(1)
  sessionNo: int32;

  @maxLength(255)
  title?: string | null;

  startsAt: utcDateTime;
  endsAt: utcDateTime;
  attendanceOpensAt: utcDateTime;
  attendanceClosesAt: utcDateTime;
  substituteTeacherUserId?: Uuid | null;
}

model UpdateSessionRequest {
  @maxLength(255)
  title?: string | null;

  startsAt?: utcDateTime;
  endsAt?: utcDateTime;
  attendanceOpensAt?: utcDateTime;
  attendanceClosesAt?: utcDateTime;
  substituteTeacherUserId?: Uuid | null;
  status?: SessionStatus;
}

model CloseSessionResult {
  session: ClassSession;

  @minValue(0)
  generatedAbsentCount: int32;

  @minValue(0)
  revokedTokenCount: int32;
}
