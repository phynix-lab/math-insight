import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "../sessions/models.tsp";
import "./enums.tsp";

using Http;
using Common;

namespace MathInsight;

model AttendanceQrToken {
  @minLength(1)
  token: string;

  sessionId: Uuid;
  expiresAt: utcDateTime;

  @minValue(1)
  ttlSeconds: int32;
}

model IssueQrTokenRequest {
  sessionId: Uuid;
}

model ScanQrAttendanceRequest {
  sessionId: Uuid;

  @minLength(1)
  token: string;

  status?: AttendanceStatus = AttendanceStatus.present;
}

model AttendanceRecord {
  id: Uuid;
  sessionId: Uuid;
  studentId: Uuid;
  studentCode: string;
  studentFullName: string;
  status: AttendanceStatus;
  method: AttendanceMethod;
  tokenId: Uuid | null;
  recordedAt: utcDateTime;
  recordedBy: Uuid | null;
  recordedByName: string | null;
  reason: string | null;
  ...Timestamps;
}

model ScanQrAttendanceResult {
  outcome: QrScanOutcome;
  record: AttendanceRecord;
  studentCode: string;
  studentFullName: string;
}

model ManualAttendanceRequest {
  sessionId: Uuid;
  studentId: Uuid;
  status: AttendanceStatus;

  @minLength(1)
  @maxLength(500)
  reason: string;
}

model UpdateAttendanceRecordRequest {
  status: AttendanceStatus;

  @minLength(1)
  @maxLength(500)
  reason: string;
}

model SessionRosterEntry {
  studentId: Uuid;
  studentCode: string;
  studentFullName: string;
  enrollmentId: Uuid;
  record: AttendanceRecord | null;
}

model SessionAttendanceBoard {
  sessionId: Uuid;
  summary: SessionAttendanceSummary;
  items: SessionRosterEntry[];
}

model AttendanceHistoryQuery {
  ...PaginationQuery;

  @query
  classId?: Uuid;

  @query
  sessionId?: Uuid;

  @query
  studentId?: Uuid;

  @query
  status?: AttendanceStatus;

  @query
  method?: AttendanceMethod;

  @query
  from?: utcDateTime;

  @query
  to?: utcDateTime;
}
