import "../../common/types.tsp";
import "../users/enums.tsp";

using Common;

namespace MathInsight;

model CurrentUser {
  userId: Uuid;
  email: Email | null;
  displayName: string;
  phone: string | null;
  isActive: boolean;
  canReviewApplications: boolean;
  roles: AppRole[];
  studentId: Uuid | null;
}

model LoginRequest {
  email: Email;

  @minLength(8)
  @maxLength(128)
  password: string;
}

model AuthSession {
  user: CurrentUser;
  expiresAt: utcDateTime;
}
