import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "../classes/models.tsp";
import "../students/models.tsp";
import "./enums.tsp";

using Http;
using Common;

namespace MathInsight;

model PublicClassOption {
  id: Uuid;
  classCode: string;
  name: string;
  gradeLevel: string;
  scheduleText: string | null;
}

model ApplicationStatusHistoryItem {
  id: Uuid;
  applicationId: Uuid;
  fromStatus: ApplicationStatus | null;
  toStatus: ApplicationStatus;
  changedBy: Uuid | null;
  changedByName: string | null;
  note: string | null;
  changedAt: utcDateTime;
}

model DuplicateCandidate {
  studentId: Uuid;
  studentCode: string;
  fullName: string;
  guardianPhone: string | null;
  studentPhone: string | null;
  matchReason: string;
}

model EnrollmentApplication {
  id: Uuid;
  applicationCode: string;

  @minLength(1)
  @maxLength(255)
  studentFullName: string;

  studentDob: plainDate | null;

  @maxLength(50)
  requestedGrade: string | null;

  requestedClassId: Uuid | null;
  requestedClassName: string | null;

  @maxLength(20)
  studentPhone: string | null;

  studentEmail: Email | null;

  @maxLength(255)
  guardianName: string | null;

  @maxLength(50)
  guardianRelation: string | null;

  @minLength(8)
  @maxLength(20)
  guardianPhone: string;

  guardianEmail: Email | null;
  applicantNote: string | null;
  consentAt: utcDateTime;

  @maxLength(50)
  consentVersion: string;

  status: ApplicationStatus;
  reviewedBy: Uuid | null;
  reviewedByName: string | null;
  reviewedAt: utcDateTime | null;
  reviewNote: string | null;
  createdStudentId: Uuid | null;
  ...Timestamps;
}

model EnrollmentApplicationDetail {
  ...EnrollmentApplication;
  statusHistory: ApplicationStatusHistoryItem[];
  duplicateCandidates: DuplicateCandidate[];
}

model ApplicationListQuery {
  ...PaginationQuery;

  @query
  status?: ApplicationStatus;

  @query
  requestedClassId?: Uuid;

  @query
  @maxLength(50)
  requestedGrade?: string;

  @query
  @maxLength(100)
  search?: string;
}

model SubmitPublicApplicationRequest {
  @minLength(1)
  @maxLength(255)
  studentFullName: string;

  studentDob?: plainDate | null;

  @maxLength(50)
  requestedGrade?: string | null;

  requestedClassId?: Uuid | null;

  @maxLength(20)
  studentPhone?: string | null;

  studentEmail?: Email | null;

  @maxLength(255)
  guardianName?: string | null;

  @maxLength(50)
  guardianRelation?: string | null;

  @minLength(8)
  @maxLength(20)
  guardianPhone: string;

  guardianEmail?: Email | null;

  @maxLength(1000)
  applicantNote?: string | null;

  consentAccepted: boolean;

  @minLength(1)
  @maxLength(50)
  consentVersion: string;

  @minLength(1)
  captchaToken: string;
}

model PublicApplicationReceipt {
  id: Uuid;
  applicationCode: string;
  status: ApplicationStatus;
  createdAt: utcDateTime;
}

model ApproveApplicationRequest {
  classId?: Uuid | null;
  existingStudentId?: Uuid | null;
  sendInvite?: boolean = true;
  inviteEmail?: Email | null;

  @maxLength(1000)
  reviewNote?: string | null;
}

model ApproveApplicationResult {
  application: EnrollmentApplication;
  student: Student;
  enrollment: Enrollment | null;
}

model ReviewApplicationDecisionRequest {
  @minLength(1)
  @maxLength(1000)
  reviewNote: string;
}
