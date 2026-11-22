import "@typespec/http";
import "../../common/responses.tsp";
import "../../common/types.tsp";
import "./enums.tsp";

using Http;
using Common;

namespace MathInsight;

model ClassItem {
  id: Uuid;

  @minLength(1)
  @maxLength(50)
  classCode: string;

  @minLength(1)
  @maxLength(255)
  name: string;

  @minLength(1)
  @maxLength(50)
  gradeLevel: string;

  teacherUserId: Uuid;
  teacherName: string;
  scheduleText: string | null;

  @maxLength(50)
  room: string | null;

  @minValue(1)
  maxStudents: int32 | null;

  startDate: plainDate | null;
  endDate: plainDate | null;
  status: ClassStatus;

  @minValue(0)
  activeStudentCount: int32;

  ...Timestamps;
}

model ClassListQuery {
  ...PaginationQuery;

  @query
  status?: ClassStatus;

  @query
  teacherUserId?: Uuid;

  @query
  @maxLength(50)
  gradeLevel?: string;

  @query
  @maxLength(100)
  search?: string;
}

model CreateClassRequest {
  @minLength(1)
  @maxLength(50)
  classCode: string;

  @minLength(1)
  @maxLength(255)
  name: string;

  @minLength(1)
  @maxLength(50)
  gradeLevel: string;

  teacherUserId: Uuid;
  scheduleText?: string | null;

  @maxLength(50)
  room?: string | null;

  @minValue(1)
  maxStudents?: int32 | null;

  startDate?: plainDate | null;
  endDate?: plainDate | null;
  status?: ClassStatus = ClassStatus.upcoming;
}

model UpdateClassRequest {
  @minLength(1)
  @maxLength(255)
  name?: string;

  @minLength(1)
  @maxLength(50)
  gradeLevel?: string;

  teacherUserId?: Uuid;
  scheduleText?: string | null;

  @maxLength(50)
  room?: string | null;

  @minValue(1)
  maxStudents?: int32 | null;

  startDate?: plainDate | null;
  endDate?: plainDate | null;
  status?: ClassStatus;
}

model Enrollment {
  id: Uuid;
  studentId: Uuid;
  studentCode: string;
  studentFullName: string;
  classId: Uuid;
  classCode: string;
  className: string;
  startDate: plainDate;
  endDate: plainDate | null;
  status: EnrollmentStatus;
  ...Timestamps;
}

model EnrollmentListQuery {
  ...PaginationQuery;

  @query
  status?: EnrollmentStatus;
}

model CreateEnrollmentRequest {
  studentId: Uuid;
  startDate?: plainDate;
}

model UpdateEnrollmentRequest {
  status: EnrollmentStatus;
  endDate?: plainDate | null;
}
