import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";

using Http;
using Common;

namespace MathInsight;

model Student {
  id: Uuid;

  @minLength(1)
  @maxLength(50)
  studentCode: string;

  @minLength(1)
  @maxLength(255)
  fullName: string;

  dateOfBirth: plainDate | null;

  @maxLength(50)
  gradeLevel: string | null;

  @maxLength(20)
  studentPhone: string | null;

  studentEmail: Email | null;

  @maxLength(255)
  guardianName: string | null;

  @maxLength(50)
  guardianRelation: string | null;

  @maxLength(20)
  guardianPhone: string | null;

  guardianEmail: Email | null;
  status: StudentStatus;
  authUserId: Uuid | null;
  accountStatus: AccountStatus;
  invitedAt: utcDateTime | null;

  @minValue(0)
  inviteAttempts: int32;

  inviteLastError: string | null;
  ...Timestamps;
}

model StudentListQuery {
  ...PaginationQuery;

  @query
  status?: StudentStatus;

  @query
  accountStatus?: AccountStatus;

  @query
  classId?: Uuid;

  @query
  @maxLength(50)
  gradeLevel?: string;

  @query
  @maxLength(100)
  search?: string;
}

model CreateStudentRequest {
  @minLength(1)
  @maxLength(50)
  studentCode?: string;

  @minLength(1)
  @maxLength(255)
  fullName: string;

  dateOfBirth?: plainDate | null;

  @maxLength(50)
  gradeLevel?: string | null;

  @maxLength(20)
  studentPhone?: string | null;

  studentEmail?: Email | null;

  @maxLength(255)
  guardianName?: string | null;

  @maxLength(50)
  guardianRelation?: string | null;

  @maxLength(20)
  guardianPhone?: string | null;

  guardianEmail?: Email | null;
  status?: StudentStatus = StudentStatus.active;
  initialClassId?: Uuid | null;
}

model UpdateStudentRequest {
  @minLength(1)
  @maxLength(255)
  fullName?: string;

  dateOfBirth?: plainDate | null;

  @maxLength(50)
  gradeLevel?: string | null;

  @maxLength(20)
  studentPhone?: string | null;

  studentEmail?: Email | null;

  @maxLength(255)
  guardianName?: string | null;

  @maxLength(50)
  guardianRelation?: string | null;

  @maxLength(20)
  guardianPhone?: string | null;

  guardianEmail?: Email | null;
  status?: StudentStatus;
}

model InviteStudentAccountRequest {
  email?: Email;
}

model LinkStudentAccountRequest {
  authUserId: Uuid;
}
