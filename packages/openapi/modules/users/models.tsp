import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";

using Http;
using Common;

namespace MathInsight;

model UserProfile {
  userId: Uuid;

  @minLength(1)
  @maxLength(255)
  displayName: string;

  @maxLength(20)
  phone: string | null;

  email: Email | null;
  isActive: boolean;
  canReviewApplications: boolean;
  roles: AppRole[];
  ...Timestamps;
}

model UserListQuery {
  ...PaginationQuery;

  @query
  role?: AppRole;

  @query
  isActive?: boolean;

  @query
  @maxLength(100)
  search?: string;
}

model CreateUserRequest {
  email: Email;

  @minLength(1)
  @maxLength(255)
  displayName: string;

  @maxLength(20)
  phone?: string | null;

  roles?: AppRole[];

  canReviewApplications?: boolean = false;
}

model UpdateMyProfileRequest {
  @minLength(1)
  @maxLength(255)
  displayName?: string;

  @maxLength(20)
  phone?: string | null;
}

model UpdateUserRequest {
  @minLength(1)
  @maxLength(255)
  displayName?: string;

  @maxLength(20)
  phone?: string | null;

  isActive?: boolean;
  canReviewApplications?: boolean;
}

model UpdateUserRolesRequest {
  @minItems(1)
  roles: AppRole[];
}
