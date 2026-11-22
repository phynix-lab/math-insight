import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";

using Http;
using Common;

namespace MathInsight;

model AuditLog {
  id: Uuid;
  actorUserId: Uuid | null;
  actorDisplayName: string | null;

  @maxLength(100)
  action: string;

  @maxLength(100)
  entityType: string;

  entityId: Uuid | null;
  beforeData: Record<unknown> | null;
  afterData: Record<unknown> | null;
  reason: string | null;
  createdAt: utcDateTime;
}

model AuditLogListQuery {
  ...PaginationQuery;

  @query
  actorUserId?: Uuid;

  @query
  @maxLength(100)
  action?: string;

  @query
  @maxLength(100)
  entityType?: string;

  @query
  entityId?: Uuid;

  @query
  from?: utcDateTime;

  @query
  to?: utcDateTime;
}
