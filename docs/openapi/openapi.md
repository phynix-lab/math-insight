# Math Insight API

- **OpenAPI Version:** `3.2.0`
- **API Version:** `1.0.0`

## Contents

**Operations**

- [GET /applications](#scalar-operation-get-applications)
- [POST /applications/public](#scalar-operation-post-applicationspublic)
- [GET /applications/public/classes](#scalar-operation-get-applicationspublicclasses)
- [GET /applications/{id}](#scalar-operation-get-applicationsid)
- [POST /applications/{id}/approve](#scalar-operation-post-applicationsidapprove)
- [POST /applications/{id}/reject](#scalar-operation-post-applicationsidreject)
- [POST /applications/{id}/request-info](#scalar-operation-post-applicationsidrequest-info)
- [POST /attendance/manual](#scalar-operation-post-attendancemanual)
- [POST /attendance/qr-tokens](#scalar-operation-post-attendanceqr-tokens)
- [GET /attendance/records](#scalar-operation-get-attendancerecords)
- [PATCH /attendance/records/{id}](#scalar-operation-patch-attendancerecordsid)
- [POST /attendance/scan](#scalar-operation-post-attendancescan)
- [GET /attendance/sessions/{sessionId}](#scalar-operation-get-attendancesessionssessionid)
- [GET /audit-logs](#scalar-operation-get-audit-logs)
- [POST /auth/login](#scalar-operation-post-authlogin)
- [POST /auth/logout](#scalar-operation-post-authlogout)
- [GET /auth/me](#scalar-operation-get-authme)
- [POST /auth/refresh](#scalar-operation-post-authrefresh)
- [GET /classes](#scalar-operation-get-classes)
- [POST /classes](#scalar-operation-post-classes)
- [GET /classes/{id}](#scalar-operation-get-classesid)
- [PATCH /classes/{id}](#scalar-operation-patch-classesid)
- [GET /classes/{id}/enrollments](#scalar-operation-get-classesidenrollments)
- [POST /classes/{id}/enrollments](#scalar-operation-post-classesidenrollments)
- [PATCH /classes/{id}/enrollments/{enrollmentId}](#scalar-operation-patch-classesidenrollmentsenrollmentid)
- [GET /dashboard/overview](#scalar-operation-get-dashboardoverview)
- [GET /sessions](#scalar-operation-get-sessions)
- [POST /sessions](#scalar-operation-post-sessions)
- [GET /sessions/{id}](#scalar-operation-get-sessionsid)
- [PATCH /sessions/{id}](#scalar-operation-patch-sessionsid)
- [POST /sessions/{id}/close](#scalar-operation-post-sessionsidclose)
- [GET /students](#scalar-operation-get-students)
- [POST /students](#scalar-operation-post-students)
- [GET /students/me](#scalar-operation-get-studentsme)
- [GET /students/{id}](#scalar-operation-get-studentsid)
- [PATCH /students/{id}](#scalar-operation-patch-studentsid)
- [GET /students/{id}/enrollments](#scalar-operation-get-studentsidenrollments)
- [POST /students/{id}/invite-account](#scalar-operation-post-studentsidinvite-account)
- [POST /students/{id}/link-account](#scalar-operation-post-studentsidlink-account)
- [GET /todos](#scalar-operation-get-todos)
- [POST /todos](#scalar-operation-post-todos)
- [GET /todos/{id}](#scalar-operation-get-todosid)
- [PATCH /todos/{id}](#scalar-operation-patch-todosid)
- [DELETE /todos/{id}](#scalar-operation-delete-todosid)
- [GET /users](#scalar-operation-get-users)
- [POST /users](#scalar-operation-post-users)
- [PATCH /users/me](#scalar-operation-patch-usersme)
- [GET /users/{userId}](#scalar-operation-get-usersuserid)
- [PATCH /users/{userId}](#scalar-operation-patch-usersuserid)
- [PUT /users/{userId}/roles](#scalar-operation-put-usersuseridroles)

**Schemas**

- [AccountStatus](#scalar-schema-accountstatus)
- [AppRole](#scalar-schema-approle)
- [ApplicationStatus](#scalar-schema-applicationstatus)
- [ApplicationStatusHistoryItem](#scalar-schema-applicationstatushistoryitem)
- [ApproveApplicationRequest](#scalar-schema-approveapplicationrequest)
- [ApproveApplicationResult](#scalar-schema-approveapplicationresult)
- [AttendanceMethod](#scalar-schema-attendancemethod)
- [AttendanceQrToken](#scalar-schema-attendanceqrtoken)
- [AttendanceRecord](#scalar-schema-attendancerecord)
- [AttendanceStatus](#scalar-schema-attendancestatus)
- [AuditLog](#scalar-schema-auditlog)
- [AuthSession](#scalar-schema-authsession)
- [ClassItem](#scalar-schema-classitem)
- [ClassSession](#scalar-schema-classsession)
- [ClassSessionDetail](#scalar-schema-classsessiondetail)
- [ClassStatus](#scalar-schema-classstatus)
- [CloseSessionResult](#scalar-schema-closesessionresult)
- [Common.Email](#scalar-schema-commonemail)
- [Common.ErrorBody](#scalar-schema-commonerrorbody)
- [Common.IdPayload](#scalar-schema-commonidpayload)
- [Common.PageMeta](#scalar-schema-commonpagemeta)
- [Common.Uuid](#scalar-schema-commonuuid)
- [Common.ValidationIssue](#scalar-schema-commonvalidationissue)
- [CreateClassRequest](#scalar-schema-createclassrequest)
- [CreateEnrollmentRequest](#scalar-schema-createenrollmentrequest)
- [CreateSessionRequest](#scalar-schema-createsessionrequest)
- [CreateStudentRequest](#scalar-schema-createstudentrequest)
- [CreateTodoRequest](#scalar-schema-createtodorequest)
- [CreateUserRequest](#scalar-schema-createuserrequest)
- [CurrentUser](#scalar-schema-currentuser)
- [DashboardOverview](#scalar-schema-dashboardoverview)
- [DuplicateCandidate](#scalar-schema-duplicatecandidate)
- [Enrollment](#scalar-schema-enrollment)
- [EnrollmentApplication](#scalar-schema-enrollmentapplication)
- [EnrollmentApplicationDetail](#scalar-schema-enrollmentapplicationdetail)
- [EnrollmentStatus](#scalar-schema-enrollmentstatus)
- [InviteStudentAccountRequest](#scalar-schema-invitestudentaccountrequest)
- [IssueQrTokenRequest](#scalar-schema-issueqrtokenrequest)
- [LinkStudentAccountRequest](#scalar-schema-linkstudentaccountrequest)
- [LoginRequest](#scalar-schema-loginrequest)
- [ManualAttendanceRequest](#scalar-schema-manualattendancerequest)
- [PublicApplicationReceipt](#scalar-schema-publicapplicationreceipt)
- [PublicClassOption](#scalar-schema-publicclassoption)
- [QrScanOutcome](#scalar-schema-qrscanoutcome)
- [ReviewApplicationDecisionRequest](#scalar-schema-reviewapplicationdecisionrequest)
- [ScanQrAttendanceRequest](#scalar-schema-scanqrattendancerequest)
- [ScanQrAttendanceResult](#scalar-schema-scanqrattendanceresult)
- [SessionAttendanceBoard](#scalar-schema-sessionattendanceboard)
- [SessionAttendanceSummary](#scalar-schema-sessionattendancesummary)
- [SessionEffectiveStatus](#scalar-schema-sessioneffectivestatus)
- [SessionRosterEntry](#scalar-schema-sessionrosterentry)
- [SessionStatus](#scalar-schema-sessionstatus)
- [Student](#scalar-schema-student)
- [StudentStatus](#scalar-schema-studentstatus)
- [SubmitPublicApplicationRequest](#scalar-schema-submitpublicapplicationrequest)
- [TodaySessionOverview](#scalar-schema-todaysessionoverview)
- [Todo](#scalar-schema-todo)
- [TodoPriority](#scalar-schema-todopriority)
- [UpdateAttendanceRecordRequest](#scalar-schema-updateattendancerecordrequest)
- [UpdateClassRequest](#scalar-schema-updateclassrequest)
- [UpdateEnrollmentRequest](#scalar-schema-updateenrollmentrequest)
- [UpdateMyProfileRequest](#scalar-schema-updatemyprofilerequest)
- [UpdateSessionRequest](#scalar-schema-updatesessionrequest)
- [UpdateStudentRequest](#scalar-schema-updatestudentrequest)
- [UpdateTodoRequest](#scalar-schema-updatetodorequest)
- [UpdateUserRequest](#scalar-schema-updateuserrequest)
- [UpdateUserRolesRequest](#scalar-schema-updateuserrolesrequest)
- [UserProfile](#scalar-schema-userprofile)

<a id="scalar-context-global-servers"></a>

## Servers

- **URL:** `/api`
  - **Description:** API base path

## Tags

### Todos

### Auth

### Users

### Classes

### Students

### Applications

### Sessions

### Attendance

### Dashboard

### AuditLogs

## Operations

<a id="scalar-operation-get-applications"></a>

### GET /applications

- **Method:** `GET`
- **Path:** `/applications`
- **Operation ID:** `Applications_list`
- **Tags:** Applications

Danh sách đơn đăng ký cho Admin hoặc giáo viên được bật can_review_applications (FR-012).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`status`**: `string`, possible values: `"pending_review", "need_more_info", "approved", "rejected"`, explode: `false`
- **`requestedClassId`**: `string`, format: `uuid`, explode: `false`
- **`requestedGrade`**: `string`, maxLength: `50`, explode: `false`
- **`search`**: `string`, maxLength: `100`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [EnrollmentApplication](#scalar-schema-enrollmentapplication)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440501",
      "applicationCode": "APP-2026-0001",
      "studentFullName": "Trần Quốc Anh",
      "studentDob": "2012-06-10",
      "requestedGrade": "Khối 9",
      "requestedClassId": "550e8400-e29b-41d4-a716-446655440201",
      "requestedClassName": "Toán 9A - Ôn thi vào 10",
      "studentPhone": null,
      "studentEmail": "quocanh.tran@example.com",
      "guardianName": "Trần Văn Bình",
      "guardianRelation": "Bố",
      "guardianPhone": "0918222333",
      "guardianEmail": "binh.tran@example.com",
      "applicantNote": "Muốn học ca tối thứ 3 và thứ 5.",
      "consentAt": "2026-11-19T12:00:00Z",
      "consentVersion": "v1.0",
      "status": "pending_review",
      "reviewedBy": null,
      "reviewedByName": null,
      "reviewedAt": null,
      "reviewNote": null,
      "createdStudentId": null,
      "createdAt": "2026-11-19T12:00:00Z",
      "updatedAt": "2026-11-19T12:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

##### 400, 401, 403

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

<a id="scalar-example-1"></a>

**Generated example:**

```json
{
  "error": "",
  "details": [
    {
      "path": [
        ""
      ],
      "message": ""
    }
  ]
}
```

<a id="scalar-operation-post-applicationspublic"></a>

### POST /applications/public

- **Method:** `POST`
- **Path:** `/applications/public`
- **Operation ID:** `Applications_submitPublic`
- **Tags:** Applications

Gửi đơn đăng ký học sinh công khai qua server/Edge Function có captcha và rate limit (FR-010, FR-011).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[SubmitPublicApplicationRequest](#scalar-schema-submitpublicapplicationrequest)

<a id="scalar-example-2"></a>

**Generated example:**

```json
{
  "studentFullName": "",
  "studentDob": "2026-11-21",
  "requestedGrade": "",
  "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "applicantNote": "",
  "consentAccepted": true,
  "consentVersion": "",
  "captchaToken": ""
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [PublicApplicationReceipt](#scalar-schema-publicapplicationreceipt)

<a id="scalar-example-3"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "applicationCode": "",
    "status": "pending_review",
    "createdAt": "2026-11-21T01:01:43.457Z"
  }
}
```

##### 400, 429

- `400` The server could not understand the request due to invalid syntax.
- `429` Client error

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-applicationspublicclasses"></a>

### GET /applications/public/classes

- **Method:** `GET`
- **Path:** `/applications/public/classes`
- **Operation ID:** `Applications_listPublicClasses`
- **Tags:** Applications

Danh sách lớp đang mở tuyển sinh cho form đăng ký công khai (không lộ PII, FR-010).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [PublicClassOption](#scalar-schema-publicclassoption)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440201",
      "classCode": "TOAN9A-2026",
      "name": "Toán 9A - Ôn thi vào 10",
      "gradeLevel": "Khối 9",
      "scheduleText": "Thứ 3, Thứ 5 (18:00 - 19:30)"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440202",
      "classCode": "TOAN12B-2026",
      "name": "Toán 12B - Luyện đề THPT",
      "gradeLevel": "Khối 12",
      "scheduleText": "Thứ 2, Thứ 4, Thứ 6 (19:00 - 20:30)"
    }
  ]
}
```

<a id="scalar-operation-get-applicationsid"></a>

### GET /applications/{id}

- **Method:** `GET`
- **Path:** `/applications/{id}`
- **Operation ID:** `Applications_get`
- **Tags:** Applications

Xem chi tiết đơn đăng ký kèm lịch sử đổi trạng thái và cảnh báo nghi trùng hồ sơ (FR-011, FR-014).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [EnrollmentApplicationDetail](#scalar-schema-enrollmentapplicationdetail)

**Example:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440501",
    "applicationCode": "APP-2026-0001",
    "studentFullName": "Trần Quốc Anh",
    "studentDob": "2012-06-10",
    "requestedGrade": "Khối 9",
    "requestedClassId": "550e8400-e29b-41d4-a716-446655440201",
    "requestedClassName": "Toán 9A - Ôn thi vào 10",
    "studentPhone": null,
    "studentEmail": "quocanh.tran@example.com",
    "guardianName": "Trần Văn Bình",
    "guardianRelation": "Bố",
    "guardianPhone": "0918222333",
    "guardianEmail": "binh.tran@example.com",
    "applicantNote": "Muốn học ca tối thứ 3 và thứ 5.",
    "consentAt": "2026-11-19T12:00:00Z",
    "consentVersion": "v1.0",
    "status": "pending_review",
    "reviewedBy": null,
    "reviewedByName": null,
    "reviewedAt": null,
    "reviewNote": null,
    "createdStudentId": null,
    "createdAt": "2026-11-19T12:00:00Z",
    "updatedAt": "2026-11-19T12:00:00Z",
    "statusHistory": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440511",
        "applicationId": "550e8400-e29b-41d4-a716-446655440501",
        "fromStatus": null,
        "toStatus": "pending_review",
        "changedBy": null,
        "changedByName": null,
        "note": null,
        "changedAt": "2026-11-19T12:00:00Z"
      }
    ],
    "duplicateCandidates": []
  }
}
```

##### 401, 403, 404

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-applicationsidapprove"></a>

### POST /applications/{id}/approve

- **Method:** `POST`
- **Path:** `/applications/{id}/approve`
- **Operation ID:** `Applications_approve`
- **Tags:** Applications

Duyệt đơn: tạo tối đa 1 hồ sơ học sinh (hoặc liên kết hồ sơ có sẵn), ghi danh lớp và gửi lời mời account (FR-013, FR-014).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[ApproveApplicationRequest](#scalar-schema-approveapplicationrequest)

<a id="scalar-example-4"></a>

**Generated example:**

```json
{
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "existingStudentId": "123e4567-e89b-12d3-a456-426614174000",
  "sendInvite": true,
  "inviteEmail": "hello@example.com",
  "reviewNote": ""
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [ApproveApplicationResult](#scalar-schema-approveapplicationresult)

<a id="scalar-example-5"></a>

**Generated example:**

```json
{
  "data": {
    "application": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "applicationCode": "",
      "studentFullName": "",
      "studentDob": "2026-11-21",
      "requestedGrade": "",
      "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
      "requestedClassName": "",
      "studentPhone": "",
      "studentEmail": "hello@example.com",
      "guardianName": "",
      "guardianRelation": "",
      "guardianPhone": "",
      "guardianEmail": "hello@example.com",
      "applicantNote": "",
      "consentAt": "2026-11-21T01:01:43.463Z",
      "consentVersion": "",
      "status": "pending_review",
      "reviewedBy": "123e4567-e89b-12d3-a456-426614174000",
      "reviewedByName": "",
      "reviewedAt": "2026-11-21T01:01:43.463Z",
      "reviewNote": "",
      "createdStudentId": "123e4567-e89b-12d3-a456-426614174000",
      "createdAt": "2026-11-21T01:01:43.463Z",
      "updatedAt": "2026-11-21T01:01:43.463Z"
    },
    "student": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "studentCode": "",
      "fullName": "",
      "dateOfBirth": "2026-11-21",
      "gradeLevel": "",
      "studentPhone": "",
      "studentEmail": "hello@example.com",
      "guardianName": "",
      "guardianRelation": "",
      "guardianPhone": "",
      "guardianEmail": "hello@example.com",
      "status": "active",
      "authUserId": "123e4567-e89b-12d3-a456-426614174000",
      "accountStatus": "not_invited",
      "invitedAt": "2026-11-21T01:01:43.463Z",
      "inviteAttempts": 0,
      "inviteLastError": "",
      "createdAt": "2026-11-21T01:01:43.463Z",
      "updatedAt": "2026-11-21T01:01:43.463Z"
    },
    "enrollment": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "studentId": "123e4567-e89b-12d3-a456-426614174000",
      "studentCode": "",
      "studentFullName": "",
      "classId": "123e4567-e89b-12d3-a456-426614174000",
      "classCode": "",
      "className": "",
      "startDate": "2026-11-21",
      "endDate": "2026-11-21",
      "status": "active",
      "createdAt": "2026-11-21T01:01:43.464Z",
      "updatedAt": "2026-11-21T01:01:43.464Z"
    }
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-applicationsidreject"></a>

### POST /applications/{id}/reject

- **Method:** `POST`
- **Path:** `/applications/{id}/reject`
- **Operation ID:** `Applications_reject`
- **Tags:** Applications

Từ chối đơn đăng ký; bắt buộc ghi rõ reviewNote (FR-012).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[ReviewApplicationDecisionRequest](#scalar-schema-reviewapplicationdecisionrequest)

<a id="scalar-example-6"></a>

**Generated example:**

```json
{
  "reviewNote": ""
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [EnrollmentApplication](#scalar-schema-enrollmentapplication)

<a id="scalar-example-7"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "applicationCode": "",
    "studentFullName": "",
    "studentDob": "2026-11-21",
    "requestedGrade": "",
    "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
    "requestedClassName": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "applicantNote": "",
    "consentAt": "2026-11-21T01:01:43.466Z",
    "consentVersion": "",
    "status": "pending_review",
    "reviewedBy": "123e4567-e89b-12d3-a456-426614174000",
    "reviewedByName": "",
    "reviewedAt": "2026-11-21T01:01:43.466Z",
    "reviewNote": "",
    "createdStudentId": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2026-11-21T01:01:43.466Z",
    "updatedAt": "2026-11-21T01:01:43.466Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-applicationsidrequest-info"></a>

### POST /applications/{id}/request-info

- **Method:** `POST`
- **Path:** `/applications/{id}/request-info`
- **Operation ID:** `Applications_requestInfo`
- **Tags:** Applications

Chuyển đơn sang trạng thái cần bổ sung thông tin; bắt buộc ghi rõ reviewNote (FR-011, FR-012).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[ReviewApplicationDecisionRequest](#scalar-schema-reviewapplicationdecisionrequest)

[Generated example](#scalar-example-6)

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [EnrollmentApplication](#scalar-schema-enrollmentapplication)

<a id="scalar-example-8"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "applicationCode": "",
    "studentFullName": "",
    "studentDob": "2026-11-21",
    "requestedGrade": "",
    "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
    "requestedClassName": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "applicantNote": "",
    "consentAt": "2026-11-21T01:01:43.468Z",
    "consentVersion": "",
    "status": "pending_review",
    "reviewedBy": "123e4567-e89b-12d3-a456-426614174000",
    "reviewedByName": "",
    "reviewedAt": "2026-11-21T01:01:43.468Z",
    "reviewNote": "",
    "createdStudentId": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2026-11-21T01:01:43.469Z",
    "updatedAt": "2026-11-21T01:01:43.469Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-attendancemanual"></a>

### POST /attendance/manual

- **Method:** `POST`
- **Path:** `/attendance/manual`
- **Operation ID:** `Attendance_recordManual`
- **Tags:** Attendance

Điểm danh thủ công khi QR/camera lỗi hoặc ngoài giờ; bắt buộc ghi lý do và được audit (FR-025).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[ManualAttendanceRequest](#scalar-schema-manualattendancerequest)

<a id="scalar-example-9"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "present",
  "reason": ""
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [AttendanceRecord](#scalar-schema-attendancerecord)

<a id="scalar-example-10"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "studentId": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "studentFullName": "",
    "status": "present",
    "method": "qr",
    "tokenId": "123e4567-e89b-12d3-a456-426614174000",
    "recordedAt": "2026-11-21T01:01:43.470Z",
    "recordedBy": "123e4567-e89b-12d3-a456-426614174000",
    "recordedByName": "",
    "reason": "",
    "createdAt": "2026-11-21T01:01:43.470Z",
    "updatedAt": "2026-11-21T01:01:43.470Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-attendanceqr-tokens"></a>

### POST /attendance/qr-tokens

- **Method:** `POST`
- **Path:** `/attendance/qr-tokens`
- **Operation ID:** `Attendance_issueQrToken`
- **Tags:** Attendance

Học sinh yêu cầu phát hành token QR ngắn hạn phía server cho buổi học đang mở; không chứa PII (FR-021, FR-022).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[IssueQrTokenRequest](#scalar-schema-issueqrtokenrequest)

<a id="scalar-example-11"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [AttendanceQrToken](#scalar-schema-attendanceqrtoken)

<a id="scalar-example-12"></a>

**Generated example:**

```json
{
  "data": {
    "token": "",
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "expiresAt": "2026-11-21T01:01:43.472Z",
    "ttlSeconds": 1
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-attendancerecords"></a>

### GET /attendance/records

- **Method:** `GET`
- **Path:** `/attendance/records`
- **Operation ID:** `Attendance_listRecords`
- **Tags:** Attendance

Tra cứu lịch sử điểm danh theo lớp, buổi học, học sinh hoặc khoảng thời gian (FR-027).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`classId`**: `string`, format: `uuid`, explode: `false`
- **`sessionId`**: `string`, format: `uuid`, explode: `false`
- **`studentId`**: `string`, format: `uuid`, explode: `false`
- **`status`**: `string`, possible values: `"present", "late", "absent", "excused"`, explode: `false`
- **`method`**: `string`, possible values: `"qr", "manual", "system"`, explode: `false`
- **`from`**: `string`, format: `date-time`, explode: `false`
- **`to`**: `string`, format: `date-time`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [AttendanceRecord](#scalar-schema-attendancerecord)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440701",
      "sessionId": "550e8400-e29b-41d4-a716-446655440601",
      "studentId": "550e8400-e29b-41d4-a716-446655440301",
      "studentCode": "HS-2026-0001",
      "studentFullName": "Lê Hoàng Gia Bảo",
      "status": "present",
      "method": "qr",
      "tokenId": "550e8400-e29b-41d4-a716-446655440801",
      "recordedAt": "2026-11-21T10:55:00Z",
      "recordedBy": "550e8400-e29b-41d4-a716-446655440101",
      "recordedByName": "Thầy Nguyễn Minh Quân",
      "reason": null,
      "createdAt": "2026-11-21T10:55:00Z",
      "updatedAt": "2026-11-21T10:55:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

##### 400, 401, 403

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-attendancerecordsid"></a>

### PATCH /attendance/records/{id}

- **Method:** `PATCH`
- **Path:** `/attendance/records/{id}`
- **Operation ID:** `Attendance_updateRecord`
- **Tags:** Attendance

Cập nhật trạng thái điểm danh đã ghi; bắt buộc ghi lý do và được audit (FR-026).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateAttendanceRecordRequest](#scalar-schema-updateattendancerecordrequest)

<a id="scalar-example-13"></a>

**Generated example:**

```json
{
  "status": "present",
  "reason": ""
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [AttendanceRecord](#scalar-schema-attendancerecord)

<a id="scalar-example-14"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "studentId": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "studentFullName": "",
    "status": "present",
    "method": "qr",
    "tokenId": "123e4567-e89b-12d3-a456-426614174000",
    "recordedAt": "2026-11-21T01:01:43.476Z",
    "recordedBy": "123e4567-e89b-12d3-a456-426614174000",
    "recordedByName": "",
    "reason": "",
    "createdAt": "2026-11-21T01:01:43.476Z",
    "updatedAt": "2026-11-21T01:01:43.476Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-attendancescan"></a>

### POST /attendance/scan

- **Method:** `POST`
- **Path:** `/attendance/scan`
- **Operation ID:** `Attendance_scanQr`
- **Tags:** Attendance

Giáo viên phụ trách/dạy thay hoặc Admin quét QR điểm danh; trả về tên học sinh để đối chiếu và chống ghi trùng (FR-023, FR-024).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[ScanQrAttendanceRequest](#scalar-schema-scanqrattendancerequest)

<a id="scalar-example-15"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "token": "",
  "status": "present"
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [ScanQrAttendanceResult](#scalar-schema-scanqrattendanceresult)

<a id="scalar-example-16"></a>

**Generated example:**

```json
{
  "data": {
    "outcome": "recorded",
    "record": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "sessionId": "123e4567-e89b-12d3-a456-426614174000",
      "studentId": "123e4567-e89b-12d3-a456-426614174000",
      "studentCode": "",
      "studentFullName": "",
      "status": "present",
      "method": "qr",
      "tokenId": "123e4567-e89b-12d3-a456-426614174000",
      "recordedAt": "2026-11-21T01:01:43.478Z",
      "recordedBy": "123e4567-e89b-12d3-a456-426614174000",
      "recordedByName": "",
      "reason": "",
      "createdAt": "2026-11-21T01:01:43.478Z",
      "updatedAt": "2026-11-21T01:01:43.478Z"
    },
    "studentCode": "",
    "studentFullName": ""
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-attendancesessionssessionid"></a>

### GET /attendance/sessions/{sessionId}

- **Method:** `GET`
- **Path:** `/attendance/sessions/{sessionId}`
- **Operation ID:** `Attendance_getSessionBoard`
- **Tags:** Attendance

Bảng điểm danh của buổi học gồm tổng dự kiến, đã điểm danh, chưa điểm danh và danh sách từng học sinh (FR-027).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`sessionId` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [SessionAttendanceBoard](#scalar-schema-sessionattendanceboard)

**Example:**

```json
{
  "data": {
    "sessionId": "550e8400-e29b-41d4-a716-446655440601",
    "summary": {
      "expectedCount": 2,
      "recordedCount": 1,
      "unrecordedCount": 1,
      "presentCount": 1,
      "lateCount": 0,
      "absentCount": 0,
      "excusedCount": 0
    },
    "items": [
      {
        "studentId": "550e8400-e29b-41d4-a716-446655440301",
        "studentCode": "HS-2026-0001",
        "studentFullName": "Lê Hoàng Gia Bảo",
        "enrollmentId": "550e8400-e29b-41d4-a716-446655440401",
        "record": {
          "id": "550e8400-e29b-41d4-a716-446655440701",
          "sessionId": "550e8400-e29b-41d4-a716-446655440601",
          "studentId": "550e8400-e29b-41d4-a716-446655440301",
          "studentCode": "HS-2026-0001",
          "studentFullName": "Lê Hoàng Gia Bảo",
          "status": "present",
          "method": "qr",
          "tokenId": "550e8400-e29b-41d4-a716-446655440801",
          "recordedAt": "2026-11-21T10:55:00Z",
          "recordedBy": "550e8400-e29b-41d4-a716-446655440101",
          "recordedByName": "Thầy Nguyễn Minh Quân",
          "reason": null,
          "createdAt": "2026-11-21T10:55:00Z",
          "updatedAt": "2026-11-21T10:55:00Z"
        }
      },
      {
        "studentId": "550e8400-e29b-41d4-a716-446655440302",
        "studentCode": "HS-2026-0002",
        "studentFullName": "Phạm Ngọc Khánh Linh",
        "enrollmentId": "550e8400-e29b-41d4-a716-446655440402",
        "record": null
      }
    ]
  }
}
```

##### 401, 403, 404

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-audit-logs"></a>

### GET /audit-logs

- **Method:** `GET`
- **Path:** `/audit-logs`
- **Operation ID:** `AuditLogs_list`
- **Tags:** AuditLogs

Tra cứu nhật ký thao tác hệ thống append-only (chỉ Admin có quyền xem, NFR-05).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`actorUserId`**: `string`, format: `uuid`, explode: `false`
- **`action`**: `string`, maxLength: `100`, explode: `false`
- **`entityType`**: `string`, maxLength: `100`, explode: `false`
- **`entityId`**: `string`, format: `uuid`, explode: `false`
- **`from`**: `string`, format: `date-time`, explode: `false`
- **`to`**: `string`, format: `date-time`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [AuditLog](#scalar-schema-auditlog)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440901",
      "actorUserId": "550e8400-e29b-41d4-a716-446655440100",
      "actorDisplayName": "Quản trị viên Trung tâm",
      "action": "PROFILE_PRIVILEGE_CHANGED",
      "entityType": "profiles",
      "entityId": "550e8400-e29b-41d4-a716-446655440101",
      "beforeData": {
        "can_review_applications": false
      },
      "afterData": {
        "can_review_applications": true
      },
      "reason": null,
      "createdAt": "2026-11-17T09:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

##### 400, 401, 403

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-authlogin"></a>

### POST /auth/login

- **Method:** `POST`
- **Path:** `/auth/login`
- **Operation ID:** `Auth_login`
- **Tags:** Auth

Đăng nhập bằng email và mật khẩu qua Supabase Auth (FR-001).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[LoginRequest](#scalar-schema-loginrequest)

<a id="scalar-example-17"></a>

**Generated example:**

```json
{
  "email": "hello@example.com",
  "password": ""
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [AuthSession](#scalar-schema-authsession)

<a id="scalar-example-18"></a>

**Generated example:**

```json
{
  "data": {
    "user": {
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "email": "hello@example.com",
      "displayName": "",
      "phone": "",
      "isActive": true,
      "canReviewApplications": true,
      "roles": [
        "admin"
      ],
      "studentId": "123e4567-e89b-12d3-a456-426614174000"
    },
    "expiresAt": "2026-11-21T01:01:43.485Z"
  }
}
```

##### 400, 401

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-authlogout"></a>

### POST /auth/logout

- **Method:** `POST`
- **Path:** `/auth/logout`
- **Operation ID:** `Auth_logout`
- **Tags:** Auth

Đăng xuất và hủy phiên làm việc hiện tại (FR-001).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Responses

##### 204 There is no content to send for this request, but the headers may be useful.

##### 401 Access is unauthorized.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-authme"></a>

### GET /auth/me

- **Method:** `GET`
- **Path:** `/auth/me`
- **Operation ID:** `Auth_me`
- **Tags:** Auth

Lấy thông tin tài khoản, vai trò và hồ sơ học sinh liên kết của người dùng hiện tại.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [CurrentUser](#scalar-schema-currentuser)

**Example:**

```json
{
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440101",
    "email": "quan.nguyen@mathinsight.vn",
    "displayName": "Thầy Nguyễn Minh Quân",
    "phone": "0901234567",
    "isActive": true,
    "canReviewApplications": true,
    "roles": [
      "teacher"
    ],
    "studentId": null
  }
}
```

##### 401 Access is unauthorized.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-authrefresh"></a>

### POST /auth/refresh

- **Method:** `POST`
- **Path:** `/auth/refresh`
- **Operation ID:** `Auth_refresh`
- **Tags:** Auth

Làm mới phiên đăng nhập bằng refresh cookie.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [AuthSession](#scalar-schema-authsession)

<a id="scalar-example-19"></a>

**Generated example:**

```json
{
  "data": {
    "user": {
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "email": "hello@example.com",
      "displayName": "",
      "phone": "",
      "isActive": true,
      "canReviewApplications": true,
      "roles": [
        "admin"
      ],
      "studentId": "123e4567-e89b-12d3-a456-426614174000"
    },
    "expiresAt": "2026-11-21T01:01:43.488Z"
  }
}
```

##### 401 Access is unauthorized.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-classes"></a>

### GET /classes

- **Method:** `GET`
- **Path:** `/classes`
- **Operation ID:** `Classes_list`
- **Tags:** Classes

Danh sách lớp học theo phạm vi phân quyền RLS (Admin: tất cả, Teacher: lớp phụ trách, Student: lớp đang học).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`status`**: `string`, possible values: `"upcoming", "active", "inactive"`, explode: `false`
- **`teacherUserId`**: `string`, format: `uuid`, explode: `false`
- **`gradeLevel`**: `string`, maxLength: `50`, explode: `false`
- **`search`**: `string`, maxLength: `100`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [ClassItem](#scalar-schema-classitem)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440201",
      "classCode": "TOAN9A-2026",
      "name": "Toán 9A - Ôn thi vào 10",
      "gradeLevel": "Khối 9",
      "teacherUserId": "550e8400-e29b-41d4-a716-446655440101",
      "teacherName": "Thầy Nguyễn Minh Quân",
      "scheduleText": "Thứ 3, Thứ 5 (18:00 - 19:30)",
      "room": "P.201",
      "maxStudents": 25,
      "startDate": "2026-09-05",
      "endDate": "2027-05-30",
      "status": "active",
      "activeStudentCount": 18,
      "createdAt": "2026-09-01T08:00:00Z",
      "updatedAt": "2026-11-15T10:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440202",
      "classCode": "TOAN12B-2026",
      "name": "Toán 12B - Luyện đề THPT",
      "gradeLevel": "Khối 12",
      "teacherUserId": "550e8400-e29b-41d4-a716-446655440102",
      "teacherName": "Cô Trần Thu Hà",
      "scheduleText": "Thứ 2, Thứ 4, Thứ 6 (19:00 - 20:30)",
      "room": "P.302",
      "maxStudents": 30,
      "startDate": "2026-09-10",
      "endDate": "2027-06-15",
      "status": "active",
      "activeStudentCount": 24,
      "createdAt": "2026-09-02T08:00:00Z",
      "updatedAt": "2026-11-16T09:15:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 2
  }
}
```

##### 400, 401

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-classes"></a>

### POST /classes

- **Method:** `POST`
- **Path:** `/classes`
- **Operation ID:** `Classes_create`
- **Tags:** Classes

Tạo lớp học mới và gán giáo viên phụ trách (Admin, FR-002).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[CreateClassRequest](#scalar-schema-createclassrequest)

<a id="scalar-example-20"></a>

**Generated example:**

```json
{
  "classCode": "",
  "name": "",
  "gradeLevel": "",
  "teacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "scheduleText": "",
  "room": "",
  "maxStudents": 1,
  "startDate": "2026-11-21",
  "endDate": "2026-11-21",
  "status": "upcoming"
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [ClassItem](#scalar-schema-classitem)

<a id="scalar-example-21"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "name": "",
    "gradeLevel": "",
    "teacherUserId": "123e4567-e89b-12d3-a456-426614174000",
    "teacherName": "",
    "scheduleText": "",
    "room": "",
    "maxStudents": 1,
    "startDate": "2026-11-21",
    "endDate": "2026-11-21",
    "status": "upcoming",
    "activeStudentCount": 0,
    "createdAt": "2026-11-21T01:01:43.492Z",
    "updatedAt": "2026-11-21T01:01:43.492Z"
  }
}
```

##### 400, 401, 403, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-classesid"></a>

### GET /classes/{id}

- **Method:** `GET`
- **Path:** `/classes/{id}`
- **Operation ID:** `Classes_get`
- **Tags:** Classes

Xem chi tiết lớp học.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [ClassItem](#scalar-schema-classitem)

**Example:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440201",
    "classCode": "TOAN9A-2026",
    "name": "Toán 9A - Ôn thi vào 10",
    "gradeLevel": "Khối 9",
    "teacherUserId": "550e8400-e29b-41d4-a716-446655440101",
    "teacherName": "Thầy Nguyễn Minh Quân",
    "scheduleText": "Thứ 3, Thứ 5 (18:00 - 19:30)",
    "room": "P.201",
    "maxStudents": 25,
    "startDate": "2026-09-05",
    "endDate": "2027-05-30",
    "status": "active",
    "activeStudentCount": 18,
    "createdAt": "2026-09-01T08:00:00Z",
    "updatedAt": "2026-11-15T10:00:00Z"
  }
}
```

##### 401, 403, 404

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-classesid"></a>

### PATCH /classes/{id}

- **Method:** `PATCH`
- **Path:** `/classes/{id}`
- **Operation ID:** `Classes_update`
- **Tags:** Classes

Cập nhật thông tin lớp, giáo viên phụ trách hoặc ngừng hoạt động lớp (Admin, FR-002).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateClassRequest](#scalar-schema-updateclassrequest)

<a id="scalar-example-22"></a>

**Generated example:**

```json
{
  "name": "",
  "gradeLevel": "",
  "teacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "scheduleText": "",
  "room": "",
  "maxStudents": 1,
  "startDate": "2026-11-21",
  "endDate": "2026-11-21",
  "status": "upcoming"
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [ClassItem](#scalar-schema-classitem)

<a id="scalar-example-23"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "name": "",
    "gradeLevel": "",
    "teacherUserId": "123e4567-e89b-12d3-a456-426614174000",
    "teacherName": "",
    "scheduleText": "",
    "room": "",
    "maxStudents": 1,
    "startDate": "2026-11-21",
    "endDate": "2026-11-21",
    "status": "upcoming",
    "activeStudentCount": 0,
    "createdAt": "2026-11-21T01:01:43.494Z",
    "updatedAt": "2026-11-21T01:01:43.494Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-classesidenrollments"></a>

### GET /classes/{id}/enrollments

- **Method:** `GET`
- **Path:** `/classes/{id}/enrollments`
- **Operation ID:** `Classes_listEnrollments`
- **Tags:** Classes

Danh sách ghi danh học sinh của lớp (FR-003).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`status`**: `string`, possible values: `"active", "ended", "cancelled"`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [Enrollment](#scalar-schema-enrollment)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440401",
      "studentId": "550e8400-e29b-41d4-a716-446655440301",
      "studentCode": "HS-2026-0001",
      "studentFullName": "Lê Hoàng Gia Bảo",
      "classId": "550e8400-e29b-41d4-a716-446655440201",
      "classCode": "TOAN9A-2026",
      "className": "Toán 9A - Ôn thi vào 10",
      "startDate": "2026-09-05",
      "endDate": null,
      "status": "active",
      "createdAt": "2026-09-05T08:00:00Z",
      "updatedAt": "2026-09-05T08:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

##### 400, 401, 403, 404

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-classesidenrollments"></a>

### POST /classes/{id}/enrollments

- **Method:** `POST`
- **Path:** `/classes/{id}/enrollments`
- **Operation ID:** `Classes_createEnrollment`
- **Tags:** Classes

Ghi danh học sinh vào lớp; chặn trùng ghi danh đang active (Admin, FR-003).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[CreateEnrollmentRequest](#scalar-schema-createenrollmentrequest)

<a id="scalar-example-24"></a>

**Generated example:**

```json
{
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "startDate": "2026-11-21"
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [Enrollment](#scalar-schema-enrollment)

<a id="scalar-example-25"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentId": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "studentFullName": "",
    "classId": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "className": "",
    "startDate": "2026-11-21",
    "endDate": "2026-11-21",
    "status": "active",
    "createdAt": "2026-11-21T01:01:43.497Z",
    "updatedAt": "2026-11-21T01:01:43.497Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-classesidenrollmentsenrollmentid"></a>

### PATCH /classes/{id}/enrollments/{enrollmentId}

- **Method:** `PATCH`
- **Path:** `/classes/{id}/enrollments/{enrollmentId}`
- **Operation ID:** `Classes_updateEnrollment`
- **Tags:** Classes

Cập nhật trạng thái ghi danh (ended/cancelled yêu cầu endDate, Admin, FR-003).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`
- **`enrollmentId` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateEnrollmentRequest](#scalar-schema-updateenrollmentrequest)

<a id="scalar-example-26"></a>

**Generated example:**

```json
{
  "status": "active",
  "endDate": "2026-11-21"
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Enrollment](#scalar-schema-enrollment)

<a id="scalar-example-27"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentId": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "studentFullName": "",
    "classId": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "className": "",
    "startDate": "2026-11-21",
    "endDate": "2026-11-21",
    "status": "active",
    "createdAt": "2026-11-21T01:01:43.499Z",
    "updatedAt": "2026-11-21T01:01:43.499Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-dashboardoverview"></a>

### GET /dashboard/overview

- **Method:** `GET`
- **Path:** `/dashboard/overview`
- **Operation ID:** `Dashboard_getOverview`
- **Tags:** Dashboard

Tổng quan vận hành: học sinh đang hoạt động, buổi học hôm nay kèm chuyên cần và số đơn chờ xử lý (FR-040, FR-041).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`date`**: `string`, format: `date`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [DashboardOverview](#scalar-schema-dashboardoverview)

**Example:**

```json
{
  "data": {
    "activeStudentCount": 42,
    "activeClassCount": 2,
    "pendingApplicationCount": 3,
    "todaySessions": [
      {
        "sessionId": "550e8400-e29b-41d4-a716-446655440601",
        "classId": "550e8400-e29b-41d4-a716-446655440201",
        "classCode": "TOAN9A-2026",
        "className": "Toán 9A - Ôn thi vào 10",
        "sessionNo": 12,
        "startsAt": "2026-11-21T11:00:00Z",
        "endsAt": "2026-11-21T12:30:00Z",
        "effectiveStatus": "open",
        "expectedCount": 18,
        "recordedCount": 15,
        "presentCount": 14,
        "lateCount": 1,
        "absentCount": 0,
        "excusedCount": 0
      }
    ],
    "asOf": "2026-11-21T11:10:00Z"
  }
}
```

##### 400, 401, 403

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-sessions"></a>

### GET /sessions

- **Method:** `GET`
- **Path:** `/sessions`
- **Operation ID:** `Sessions_list`
- **Tags:** Sessions

Danh sách buổi học (đọc từ v_class_sessions kèm effective_status) theo phạm vi RLS.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`classId`**: `string`, format: `uuid`, explode: `false`
- **`status`**: `string`, possible values: `"scheduled", "cancelled"`, explode: `false`
- **`effectiveStatus`**: `string`, possible values: `"scheduled", "open", "closed", "cancelled"`, explode: `false`
- **`from`**: `string`, format: `date-time`, explode: `false`
- **`to`**: `string`, format: `date-time`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [ClassSession](#scalar-schema-classsession)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440601",
      "classId": "550e8400-e29b-41d4-a716-446655440201",
      "classCode": "TOAN9A-2026",
      "className": "Toán 9A - Ôn thi vào 10",
      "sessionNo": 12,
      "title": "Hệ phương trình bậc nhất hai ẩn",
      "startsAt": "2026-11-21T11:00:00Z",
      "endsAt": "2026-11-21T12:30:00Z",
      "attendanceOpensAt": "2026-11-21T10:45:00Z",
      "attendanceClosesAt": "2026-11-21T12:45:00Z",
      "substituteTeacherUserId": null,
      "substituteTeacherName": null,
      "status": "scheduled",
      "effectiveStatus": "open",
      "closedAt": null,
      "createdBy": "550e8400-e29b-41d4-a716-446655440101",
      "createdAt": "2026-11-18T08:00:00Z",
      "updatedAt": "2026-11-18T08:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

##### 400, 401

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-sessions"></a>

### POST /sessions

- **Method:** `POST`
- **Path:** `/sessions`
- **Operation ID:** `Sessions_create`
- **Tags:** Sessions

Tạo buổi học mới cho lớp đang hoạt động kèm cửa sổ điểm danh (Admin hoặc giáo viên phụ trách, FR-020).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[CreateSessionRequest](#scalar-schema-createsessionrequest)

<a id="scalar-example-28"></a>

**Generated example:**

```json
{
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "sessionNo": 1,
  "title": "",
  "startsAt": "2026-11-21T01:01:43.504Z",
  "endsAt": "2026-11-21T01:01:43.504Z",
  "attendanceOpensAt": "2026-11-21T01:01:43.504Z",
  "attendanceClosesAt": "2026-11-21T01:01:43.504Z",
  "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [ClassSession](#scalar-schema-classsession)

<a id="scalar-example-29"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "classId": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "className": "",
    "sessionNo": 1,
    "title": "",
    "startsAt": "2026-11-21T01:01:43.504Z",
    "endsAt": "2026-11-21T01:01:43.504Z",
    "attendanceOpensAt": "2026-11-21T01:01:43.504Z",
    "attendanceClosesAt": "2026-11-21T01:01:43.504Z",
    "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
    "substituteTeacherName": "",
    "status": "scheduled",
    "effectiveStatus": "scheduled",
    "closedAt": "2026-11-21T01:01:43.504Z",
    "createdBy": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2026-11-21T01:01:43.504Z",
    "updatedAt": "2026-11-21T01:01:43.504Z"
  }
}
```

##### 400, 401, 403, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-sessionsid"></a>

### GET /sessions/{id}

- **Method:** `GET`
- **Path:** `/sessions/{id}`
- **Operation ID:** `Sessions_get`
- **Tags:** Sessions

Xem chi tiết buổi học và tổng hợp điểm danh (FR-020, FR-027).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [ClassSessionDetail](#scalar-schema-classsessiondetail)

**Example:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440601",
    "classId": "550e8400-e29b-41d4-a716-446655440201",
    "classCode": "TOAN9A-2026",
    "className": "Toán 9A - Ôn thi vào 10",
    "sessionNo": 12,
    "title": "Hệ phương trình bậc nhất hai ẩn",
    "startsAt": "2026-11-21T11:00:00Z",
    "endsAt": "2026-11-21T12:30:00Z",
    "attendanceOpensAt": "2026-11-21T10:45:00Z",
    "attendanceClosesAt": "2026-11-21T12:45:00Z",
    "substituteTeacherUserId": null,
    "substituteTeacherName": null,
    "status": "scheduled",
    "effectiveStatus": "open",
    "closedAt": null,
    "createdBy": "550e8400-e29b-41d4-a716-446655440101",
    "createdAt": "2026-11-18T08:00:00Z",
    "updatedAt": "2026-11-18T08:00:00Z",
    "attendanceSummary": {
      "expectedCount": 18,
      "recordedCount": 15,
      "unrecordedCount": 3,
      "presentCount": 14,
      "lateCount": 1,
      "absentCount": 0,
      "excusedCount": 0
    }
  }
}
```

##### 401, 403, 404

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-sessionsid"></a>

### PATCH /sessions/{id}

- **Method:** `PATCH`
- **Path:** `/sessions/{id}`
- **Operation ID:** `Sessions_update`
- **Tags:** Sessions

Cập nhật thời gian, cửa sổ điểm danh, giáo viên dạy thay hoặc hủy buổi học (FR-020).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateSessionRequest](#scalar-schema-updatesessionrequest)

<a id="scalar-example-30"></a>

**Generated example:**

```json
{
  "title": "",
  "startsAt": "2026-11-21T01:01:43.506Z",
  "endsAt": "2026-11-21T01:01:43.506Z",
  "attendanceOpensAt": "2026-11-21T01:01:43.506Z",
  "attendanceClosesAt": "2026-11-21T01:01:43.506Z",
  "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "scheduled"
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [ClassSession](#scalar-schema-classsession)

<a id="scalar-example-31"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "classId": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "className": "",
    "sessionNo": 1,
    "title": "",
    "startsAt": "2026-11-21T01:01:43.507Z",
    "endsAt": "2026-11-21T01:01:43.507Z",
    "attendanceOpensAt": "2026-11-21T01:01:43.507Z",
    "attendanceClosesAt": "2026-11-21T01:01:43.507Z",
    "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
    "substituteTeacherName": "",
    "status": "scheduled",
    "effectiveStatus": "scheduled",
    "closedAt": "2026-11-21T01:01:43.507Z",
    "createdBy": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2026-11-21T01:01:43.507Z",
    "updatedAt": "2026-11-21T01:01:43.507Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-sessionsidclose"></a>

### POST /sessions/{id}/close

- **Method:** `POST`
- **Path:** `/sessions/{id}/close`
- **Operation ID:** `Sessions_close`
- **Tags:** Sessions

Đóng buổi học (gọi close_session idempotent): sinh bản ghi absent (method = system) cho học sinh chưa điểm danh và thu hồi token QR còn lại.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [CloseSessionResult](#scalar-schema-closesessionresult)

<a id="scalar-example-32"></a>

**Generated example:**

```json
{
  "data": {
    "session": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "classId": "123e4567-e89b-12d3-a456-426614174000",
      "classCode": "",
      "className": "",
      "sessionNo": 1,
      "title": "",
      "startsAt": "2026-11-21T01:01:43.509Z",
      "endsAt": "2026-11-21T01:01:43.509Z",
      "attendanceOpensAt": "2026-11-21T01:01:43.509Z",
      "attendanceClosesAt": "2026-11-21T01:01:43.509Z",
      "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
      "substituteTeacherName": "",
      "status": "scheduled",
      "effectiveStatus": "scheduled",
      "closedAt": "2026-11-21T01:01:43.509Z",
      "createdBy": "123e4567-e89b-12d3-a456-426614174000",
      "createdAt": "2026-11-21T01:01:43.509Z",
      "updatedAt": "2026-11-21T01:01:43.509Z"
    },
    "generatedAbsentCount": 0,
    "revokedTokenCount": 0
  }
}
```

##### 401, 403, 404, 409

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-students"></a>

### GET /students

- **Method:** `GET`
- **Path:** `/students`
- **Operation ID:** `Students_list`
- **Tags:** Students

Danh sách học sinh theo phân quyền RLS (Admin: tất cả, Teacher: học sinh lớp mình phụ trách).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`status`**: `string`, possible values: `"active", "paused", "left"`, explode: `false`
- **`accountStatus`**: `string`, possible values: `"not_invited", "invited", "invite_failed", "linked"`, explode: `false`
- **`classId`**: `string`, format: `uuid`, explode: `false`
- **`gradeLevel`**: `string`, maxLength: `50`, explode: `false`
- **`search`**: `string`, maxLength: `100`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [Student](#scalar-schema-student)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440301",
      "studentCode": "HS-2026-0001",
      "fullName": "Lê Hoàng Gia Bảo",
      "dateOfBirth": "2012-04-15",
      "gradeLevel": "Khối 9",
      "studentPhone": "0988111222",
      "studentEmail": "giabao.le@example.com",
      "guardianName": "Lê Văn Hùng",
      "guardianRelation": "Bố",
      "guardianPhone": "0909111222",
      "guardianEmail": "hung.le@example.com",
      "status": "active",
      "authUserId": "550e8400-e29b-41d4-a716-446655440199",
      "accountStatus": "linked",
      "invitedAt": "2026-09-05T09:00:00Z",
      "inviteAttempts": 1,
      "inviteLastError": null,
      "createdAt": "2026-09-05T08:00:00Z",
      "updatedAt": "2026-09-06T07:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440302",
      "studentCode": "HS-2026-0002",
      "fullName": "Phạm Ngọc Khánh Linh",
      "dateOfBirth": "2012-08-22",
      "gradeLevel": "Khối 9",
      "studentPhone": null,
      "studentEmail": "khanhlinh.pham@example.com",
      "guardianName": "Nguyễn Thị Mai",
      "guardianRelation": "Mẹ",
      "guardianPhone": "0909333444",
      "guardianEmail": "mai.nguyen@example.com",
      "status": "active",
      "authUserId": null,
      "accountStatus": "invited",
      "invitedAt": "2026-11-18T10:00:00Z",
      "inviteAttempts": 1,
      "inviteLastError": null,
      "createdAt": "2026-11-18T09:30:00Z",
      "updatedAt": "2026-11-18T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 2
  }
}
```

##### 400, 401, 403

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-students"></a>

### POST /students

- **Method:** `POST`
- **Path:** `/students`
- **Operation ID:** `Students_create`
- **Tags:** Students

Tạo hồ sơ học sinh thủ công và tùy chọn ghi danh lớp ban đầu (Admin, FR-003).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[CreateStudentRequest](#scalar-schema-createstudentrequest)

<a id="scalar-example-33"></a>

**Generated example:**

```json
{
  "studentCode": "",
  "fullName": "",
  "dateOfBirth": "2026-11-21",
  "gradeLevel": "",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "status": "active",
  "initialClassId": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [Student](#scalar-schema-student)

<a id="scalar-example-34"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "fullName": "",
    "dateOfBirth": "2026-11-21",
    "gradeLevel": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "status": "active",
    "authUserId": "123e4567-e89b-12d3-a456-426614174000",
    "accountStatus": "not_invited",
    "invitedAt": "2026-11-21T01:01:43.514Z",
    "inviteAttempts": 0,
    "inviteLastError": "",
    "createdAt": "2026-11-21T01:01:43.514Z",
    "updatedAt": "2026-11-21T01:01:43.514Z"
  }
}
```

##### 400, 401, 403, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-studentsme"></a>

### GET /students/me

- **Method:** `GET`
- **Path:** `/students/me`
- **Operation ID:** `Students_getMe`
- **Tags:** Students

Học sinh xem hồ sơ cá nhân liên kết với tài khoản đăng nhập (FR-004).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Student](#scalar-schema-student)

**Example:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440301",
    "studentCode": "HS-2026-0001",
    "fullName": "Lê Hoàng Gia Bảo",
    "dateOfBirth": "2012-04-15",
    "gradeLevel": "Khối 9",
    "studentPhone": "0988111222",
    "studentEmail": "giabao.le@example.com",
    "guardianName": "Lê Văn Hùng",
    "guardianRelation": "Bố",
    "guardianPhone": "0909111222",
    "guardianEmail": "hung.le@example.com",
    "status": "active",
    "authUserId": "550e8400-e29b-41d4-a716-446655440199",
    "accountStatus": "linked",
    "invitedAt": "2026-09-05T09:00:00Z",
    "inviteAttempts": 1,
    "inviteLastError": null,
    "createdAt": "2026-09-05T08:00:00Z",
    "updatedAt": "2026-09-06T07:30:00Z"
  }
}
```

##### 401, 403, 404

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-studentsid"></a>

### GET /students/{id}

- **Method:** `GET`
- **Path:** `/students/{id}`
- **Operation ID:** `Students_get`
- **Tags:** Students

Xem chi tiết hồ sơ học sinh.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Student](#scalar-schema-student)

**Example:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440301",
    "studentCode": "HS-2026-0001",
    "fullName": "Lê Hoàng Gia Bảo",
    "dateOfBirth": "2012-04-15",
    "gradeLevel": "Khối 9",
    "studentPhone": "0988111222",
    "studentEmail": "giabao.le@example.com",
    "guardianName": "Lê Văn Hùng",
    "guardianRelation": "Bố",
    "guardianPhone": "0909111222",
    "guardianEmail": "hung.le@example.com",
    "status": "active",
    "authUserId": "550e8400-e29b-41d4-a716-446655440199",
    "accountStatus": "linked",
    "invitedAt": "2026-09-05T09:00:00Z",
    "inviteAttempts": 1,
    "inviteLastError": null,
    "createdAt": "2026-09-05T08:00:00Z",
    "updatedAt": "2026-09-06T07:30:00Z"
  }
}
```

##### 401, 403, 404

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-studentsid"></a>

### PATCH /students/{id}

- **Method:** `PATCH`
- **Path:** `/students/{id}`
- **Operation ID:** `Students_update`
- **Tags:** Students

Cập nhật hồ sơ học sinh (Admin, FR-003).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateStudentRequest](#scalar-schema-updatestudentrequest)

<a id="scalar-example-35"></a>

**Generated example:**

```json
{
  "fullName": "",
  "dateOfBirth": "2026-11-21",
  "gradeLevel": "",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "status": "active"
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Student](#scalar-schema-student)

<a id="scalar-example-36"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "fullName": "",
    "dateOfBirth": "2026-11-21",
    "gradeLevel": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "status": "active",
    "authUserId": "123e4567-e89b-12d3-a456-426614174000",
    "accountStatus": "not_invited",
    "invitedAt": "2026-11-21T01:01:43.517Z",
    "inviteAttempts": 0,
    "inviteLastError": "",
    "createdAt": "2026-11-21T01:01:43.517Z",
    "updatedAt": "2026-11-21T01:01:43.517Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-studentsidenrollments"></a>

### GET /students/{id}/enrollments

- **Method:** `GET`
- **Path:** `/students/{id}/enrollments`
- **Operation ID:** `Students_listEnrollments`
- **Tags:** Students

Lịch sử tham gia lớp học của một học sinh (FR-003).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`status`**: `string`, possible values: `"active", "ended", "cancelled"`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [Enrollment](#scalar-schema-enrollment)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440401",
      "studentId": "550e8400-e29b-41d4-a716-446655440301",
      "studentCode": "HS-2026-0001",
      "studentFullName": "Lê Hoàng Gia Bảo",
      "classId": "550e8400-e29b-41d4-a716-446655440201",
      "classCode": "TOAN9A-2026",
      "className": "Toán 9A - Ôn thi vào 10",
      "startDate": "2026-09-05",
      "endDate": null,
      "status": "active",
      "createdAt": "2026-09-05T08:00:00Z",
      "updatedAt": "2026-09-05T08:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

##### 400, 401, 403, 404

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-studentsidinvite-account"></a>

### POST /students/{id}/invite-account

- **Method:** `POST`
- **Path:** `/students/{id}/invite-account`
- **Operation ID:** `Students_inviteAccount`
- **Tags:** Students

Gửi hoặc gửi lại lời mời kích hoạt tài khoản cho hồ sơ học sinh mà không tạo hồ sơ trùng (Admin, FR-004, FR-013).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[InviteStudentAccountRequest](#scalar-schema-invitestudentaccountrequest)

<a id="scalar-example-37"></a>

**Generated example:**

```json
{
  "email": "hello@example.com"
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Student](#scalar-schema-student)

<a id="scalar-example-38"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "fullName": "",
    "dateOfBirth": "2026-11-21",
    "gradeLevel": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "status": "active",
    "authUserId": "123e4567-e89b-12d3-a456-426614174000",
    "accountStatus": "not_invited",
    "invitedAt": "2026-11-21T01:01:43.522Z",
    "inviteAttempts": 0,
    "inviteLastError": "",
    "createdAt": "2026-11-21T01:01:43.522Z",
    "updatedAt": "2026-11-21T01:01:43.522Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-studentsidlink-account"></a>

### POST /students/{id}/link-account

- **Method:** `POST`
- **Path:** `/students/{id}/link-account`
- **Operation ID:** `Students_linkAccount`
- **Tags:** Students

Liên kết tài khoản đăng nhập có sẵn với hồ sơ học sinh (Admin, FR-004).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[LinkStudentAccountRequest](#scalar-schema-linkstudentaccountrequest)

<a id="scalar-example-39"></a>

**Generated example:**

```json
{
  "authUserId": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Student](#scalar-schema-student)

<a id="scalar-example-40"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "fullName": "",
    "dateOfBirth": "2026-11-21",
    "gradeLevel": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "status": "active",
    "authUserId": "123e4567-e89b-12d3-a456-426614174000",
    "accountStatus": "not_invited",
    "invitedAt": "2026-11-21T01:01:43.524Z",
    "inviteAttempts": 0,
    "inviteLastError": "",
    "createdAt": "2026-11-21T01:01:43.524Z",
    "updatedAt": "2026-11-21T01:01:43.524Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-todos"></a>

### GET /todos

- **Method:** `GET`
- **Path:** `/todos`
- **Operation ID:** `Todos_list`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`completed`**: `boolean`, explode: `false`
- **`priority`**: `string`, possible values: `"low", "medium", "high"`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [Todo](#scalar-schema-todo)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Ôn tập giải tích chương 1",
      "description": "Làm 10 bài tập giới hạn hàm số và đạo hàm cơ bản",
      "priority": "high",
      "completed": false,
      "createdAt": "2026-11-20T08:00:00Z",
      "updatedAt": "2026-11-20T08:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "title": "Hoàn thành bài tập đại số tuyến tính",
      "description": "Giải hệ phương trình bằng phép khử Gauss và ma trận nghịch đảo",
      "priority": "medium",
      "completed": true,
      "createdAt": "2026-11-19T14:00:00Z",
      "updatedAt": "2026-11-20T07:45:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "title": "Đọc tài liệu xác suất thống kê",
      "description": "Tóm tắt phân phối chuẩn và định lý Bayes",
      "priority": "low",
      "completed": false,
      "createdAt": "2026-11-18T10:15:00Z",
      "updatedAt": "2026-11-18T10:15:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 3
  }
}
```

##### 400 The server could not understand the request due to invalid syntax.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-todos"></a>

### POST /todos

- **Method:** `POST`
- **Path:** `/todos`
- **Operation ID:** `Todos_create`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[CreateTodoRequest](#scalar-schema-createtodorequest)

<a id="scalar-example-41"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "medium",
  "completed": false
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [Common.IdPayload](#scalar-schema-commonidpayload)

<a id="scalar-example-42"></a>

**Generated example:**

```json
{
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

##### 400 The server could not understand the request due to invalid syntax.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-todosid"></a>

### GET /todos/{id}

- **Method:** `GET`
- **Path:** `/todos/{id}`
- **Operation ID:** `Todos_get`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [Todo](#scalar-schema-todo)

**Example:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Ôn tập giải tích chương 1",
    "description": "Làm 10 bài tập giới hạn hàm số và đạo hàm cơ bản",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-11-20T08:00:00Z",
    "updatedAt": "2026-11-20T08:30:00Z"
  }
}
```

##### 404 The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-todosid"></a>

### PATCH /todos/{id}

- **Method:** `PATCH`
- **Path:** `/todos/{id}`
- **Operation ID:** `Todos_update`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateTodoRequest](#scalar-schema-updatetodorequest)

<a id="scalar-example-43"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "low",
  "completed": true
}
```

#### Responses

##### 204 There is no content to send for this request, but the headers may be useful.

##### 400, 404

- `400` The server could not understand the request due to invalid syntax.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-delete-todosid"></a>

### DELETE /todos/{id}

- **Method:** `DELETE`
- **Path:** `/todos/{id}`
- **Operation ID:** `Todos_delete`
- **Tags:** Todos

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`id` (required)**: `string`, format: `uuid`

#### Responses

##### 204 There is no content to send for this request, but the headers may be useful.

##### 404 The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-users"></a>

### GET /users

- **Method:** `GET`
- **Path:** `/users`
- **Operation ID:** `Users_list`
- **Tags:** Users

Danh sách tài khoản và quyền trong trung tâm (Admin).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Query parameters

- **`page`**: `integer`, format: `int32`, default: `1`, minimum: `1`, explode: `false`
- **`limit`**: `integer`, format: `int32`, default: `20`, minimum: `1`, maximum: `100`, explode: `false`
- **`role`**: `string`, possible values: `"admin", "teacher", "student"`, explode: `false`
- **`isActive`**: `boolean`, explode: `false`
- **`search`**: `string`, maxLength: `100`, explode: `false`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: array of [UserProfile](#scalar-schema-userprofile)
- **`meta` (required)**: [Common.PageMeta](#scalar-schema-commonpagemeta)

**Example:**

```json
{
  "data": [
    {
      "userId": "550e8400-e29b-41d4-a716-446655440101",
      "displayName": "Thầy Nguyễn Minh Quân",
      "phone": "0901234567",
      "email": "quan.nguyen@mathinsight.vn",
      "isActive": true,
      "canReviewApplications": true,
      "roles": [
        "teacher"
      ],
      "createdAt": "2026-10-01T08:00:00Z",
      "updatedAt": "2026-11-17T09:00:00Z"
    },
    {
      "userId": "550e8400-e29b-41d4-a716-446655440102",
      "displayName": "Cô Trần Thu Hà",
      "phone": "0912345678",
      "email": "ha.tran@mathinsight.vn",
      "isActive": true,
      "canReviewApplications": false,
      "roles": [
        "teacher"
      ],
      "createdAt": "2026-10-05T08:00:00Z",
      "updatedAt": "2026-11-10T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 2
  }
}
```

##### 400, 401, 403

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-post-users"></a>

### POST /users

- **Method:** `POST`
- **Path:** `/users`
- **Operation ID:** `Users_create`
- **Tags:** Users

Tạo tài khoản giáo viên hoặc quản trị viên mới (Admin).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[CreateUserRequest](#scalar-schema-createuserrequest)

<a id="scalar-example-44"></a>

**Generated example:**

```json
{
  "email": "hello@example.com",
  "displayName": "",
  "phone": "",
  "roles": [
    "admin"
  ],
  "canReviewApplications": false
}
```

#### Responses

##### 201 The request has succeeded and a new resource has been created as a result.

**Content type:** `application/json`

- **`data` (required)**: [UserProfile](#scalar-schema-userprofile)

<a id="scalar-example-45"></a>

**Generated example:**

```json
{
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "displayName": "",
    "phone": "",
    "email": "hello@example.com",
    "isActive": true,
    "canReviewApplications": true,
    "roles": [
      "admin"
    ],
    "createdAt": "2026-11-21T01:01:43.533Z",
    "updatedAt": "2026-11-21T01:01:43.533Z"
  }
}
```

##### 400, 401, 403, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-usersme"></a>

### PATCH /users/me

- **Method:** `PATCH`
- **Path:** `/users/me`
- **Operation ID:** `Users_updateMe`
- **Tags:** Users

Tự cập nhật tên hiển thị và số điện thoại của tài khoản đang đăng nhập.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateMyProfileRequest](#scalar-schema-updatemyprofilerequest)

<a id="scalar-example-46"></a>

**Generated example:**

```json
{
  "displayName": "",
  "phone": ""
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [UserProfile](#scalar-schema-userprofile)

<a id="scalar-example-47"></a>

**Generated example:**

```json
{
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "displayName": "",
    "phone": "",
    "email": "hello@example.com",
    "isActive": true,
    "canReviewApplications": true,
    "roles": [
      "admin"
    ],
    "createdAt": "2026-11-21T01:01:43.535Z",
    "updatedAt": "2026-11-21T01:01:43.535Z"
  }
}
```

##### 400, 401

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-get-usersuserid"></a>

### GET /users/{userId}

- **Method:** `GET`
- **Path:** `/users/{userId}`
- **Operation ID:** `Users_get`
- **Tags:** Users

Xem chi tiết tài khoản theo userId (Admin hoặc chính user).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`userId` (required)**: `string`, format: `uuid`

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [UserProfile](#scalar-schema-userprofile)

**Example:**

```json
{
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440101",
    "displayName": "Thầy Nguyễn Minh Quân",
    "phone": "0901234567",
    "email": "quan.nguyen@mathinsight.vn",
    "isActive": true,
    "canReviewApplications": true,
    "roles": [
      "teacher"
    ],
    "createdAt": "2026-10-01T08:00:00Z",
    "updatedAt": "2026-11-17T09:00:00Z"
  }
}
```

##### 401, 403, 404

- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-patch-usersuserid"></a>

### PATCH /users/{userId}

- **Method:** `PATCH`
- **Path:** `/users/{userId}`
- **Operation ID:** `Users_update`
- **Tags:** Users

Admin cập nhật hồ sơ, trạng thái hoạt động hoặc cờ duyệt đơn (FR-012).

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`userId` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateUserRequest](#scalar-schema-updateuserrequest)

<a id="scalar-example-48"></a>

**Generated example:**

```json
{
  "displayName": "",
  "phone": "",
  "isActive": true,
  "canReviewApplications": true
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [UserProfile](#scalar-schema-userprofile)

<a id="scalar-example-49"></a>

**Generated example:**

```json
{
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "displayName": "",
    "phone": "",
    "email": "hello@example.com",
    "isActive": true,
    "canReviewApplications": true,
    "roles": [
      "admin"
    ],
    "createdAt": "2026-11-21T01:01:43.537Z",
    "updatedAt": "2026-11-21T01:01:43.537Z"
  }
}
```

##### 400, 401, 403, 404

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

<a id="scalar-operation-put-usersuseridroles"></a>

### PUT /users/{userId}/roles

- **Method:** `PUT`
- **Path:** `/users/{userId}/roles`
- **Operation ID:** `Users_updateRoles`
- **Tags:** Users

Admin cập nhật danh sách vai trò; bị chặn gỡ role teacher nếu còn phụ trách lớp chưa inactive.

**Servers:** [Inherited servers](#scalar-context-global-servers)

#### Path parameters

- **`userId` (required)**: `string`, format: `uuid`

#### Request body

**Required:** `true`

**Content type:** `application/json`

[UpdateUserRolesRequest](#scalar-schema-updateuserrolesrequest)

<a id="scalar-example-50"></a>

**Generated example:**

```json
{
  "roles": [
    "admin"
  ]
}
```

#### Responses

##### 200 The request has succeeded.

**Content type:** `application/json`

- **`data` (required)**: [UserProfile](#scalar-schema-userprofile)

<a id="scalar-example-51"></a>

**Generated example:**

```json
{
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "displayName": "",
    "phone": "",
    "email": "hello@example.com",
    "isActive": true,
    "canReviewApplications": true,
    "roles": [
      "admin"
    ],
    "createdAt": "2026-11-21T01:01:43.539Z",
    "updatedAt": "2026-11-21T01:01:43.539Z"
  }
}
```

##### 400, 401, 403, 404, 409

- `400` The server could not understand the request due to invalid syntax.
- `401` Access is unauthorized.
- `403` Access is forbidden.
- `404` The server cannot find the requested resource.
- `409` The request conflicts with the current state of the server.

**Content type:** `application/json`

[Common.ErrorBody](#scalar-schema-commonerrorbody)

[Generated example](#scalar-example-1)

## Schemas

<a id="scalar-schema-accountstatus"></a>

### AccountStatus

**Type:** `string`, possible values: `"not_invited", "invited", "invite_failed", "linked"`

<a id="scalar-schema-approle"></a>

### AppRole

**Type:** `string`, possible values: `"admin", "teacher", "student"`

<a id="scalar-schema-applicationstatus"></a>

### ApplicationStatus

**Type:** `string`, possible values: `"pending_review", "need_more_info", "approved", "rejected"`

<a id="scalar-schema-applicationstatushistoryitem"></a>

### ApplicationStatusHistoryItem

**Type:** `object`

- **`applicationId` (required)**: `string`, format: `uuid`
- **`changedAt` (required)**: `string`, format: `date-time`
- **`changedBy` (required)**: `string | null`, format: `uuid`
- **`changedByName` (required)**: `string | null`
- **`fromStatus` (required)**: `string | null`, possible values: `"pending_review", "need_more_info", "approved", "rejected"`
- **`id` (required)**: `string`, format: `uuid`
- **`note` (required)**: `string | null`
- **`toStatus` (required)**: `string`, possible values: `"pending_review", "need_more_info", "approved", "rejected"`

<a id="scalar-example-52"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "applicationId": "123e4567-e89b-12d3-a456-426614174000",
  "fromStatus": "pending_review",
  "toStatus": "pending_review",
  "changedBy": "123e4567-e89b-12d3-a456-426614174000",
  "changedByName": "",
  "note": "",
  "changedAt": "2026-11-21T01:01:43.541Z"
}
```

<a id="scalar-schema-approveapplicationrequest"></a>

### ApproveApplicationRequest

**Type:** `object`

- **`classId`**: `string | null`, format: `uuid`
- **`existingStudentId`**: `string | null`, format: `uuid`
- **`inviteEmail`**: `string | null`, format: `email`
- **`reviewNote`**: `string`, maxLength: `1000`

  **Any of:**
  - `string`
  - `null`
- **`sendInvite`**: `boolean`, default: `true`

<a id="scalar-example-53"></a>

**Generated example:**

```json
{
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "existingStudentId": "123e4567-e89b-12d3-a456-426614174000",
  "sendInvite": true,
  "inviteEmail": "hello@example.com",
  "reviewNote": ""
}
```

<a id="scalar-schema-approveapplicationresult"></a>

### ApproveApplicationResult

**Type:** `object`

- **`application` (required)**: [EnrollmentApplication](#scalar-schema-enrollmentapplication)
- **`enrollment` (required)**: [Enrollment](#scalar-schema-enrollment) | `null`
- **`student` (required)**: [Student](#scalar-schema-student)

<a id="scalar-example-54"></a>

**Generated example:**

```json
{
  "application": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "applicationCode": "",
    "studentFullName": "",
    "studentDob": "2026-11-21",
    "requestedGrade": "",
    "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
    "requestedClassName": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "applicantNote": "",
    "consentAt": "2026-11-21T01:01:43.544Z",
    "consentVersion": "",
    "status": "pending_review",
    "reviewedBy": "123e4567-e89b-12d3-a456-426614174000",
    "reviewedByName": "",
    "reviewedAt": "2026-11-21T01:01:43.544Z",
    "reviewNote": "",
    "createdStudentId": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2026-11-21T01:01:43.544Z",
    "updatedAt": "2026-11-21T01:01:43.544Z"
  },
  "student": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "fullName": "",
    "dateOfBirth": "2026-11-21",
    "gradeLevel": "",
    "studentPhone": "",
    "studentEmail": "hello@example.com",
    "guardianName": "",
    "guardianRelation": "",
    "guardianPhone": "",
    "guardianEmail": "hello@example.com",
    "status": "active",
    "authUserId": "123e4567-e89b-12d3-a456-426614174000",
    "accountStatus": "not_invited",
    "invitedAt": "2026-11-21T01:01:43.544Z",
    "inviteAttempts": 0,
    "inviteLastError": "",
    "createdAt": "2026-11-21T01:01:43.544Z",
    "updatedAt": "2026-11-21T01:01:43.544Z"
  },
  "enrollment": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "studentId": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "studentFullName": "",
    "classId": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "className": "",
    "startDate": "2026-11-21",
    "endDate": "2026-11-21",
    "status": "active",
    "createdAt": "2026-11-21T01:01:43.545Z",
    "updatedAt": "2026-11-21T01:01:43.545Z"
  }
}
```

<a id="scalar-schema-attendancemethod"></a>

### AttendanceMethod

**Type:** `string`, possible values: `"qr", "manual", "system"`

<a id="scalar-schema-attendanceqrtoken"></a>

### AttendanceQrToken

**Type:** `object`

- **`expiresAt` (required)**: `string`, format: `date-time`
- **`sessionId` (required)**: `string`, format: `uuid`
- **`token` (required)**: `string`, minLength: `1`
- **`ttlSeconds` (required)**: `integer`, format: `int32`, minimum: `1`

<a id="scalar-example-55"></a>

**Generated example:**

```json
{
  "token": "",
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "expiresAt": "2026-11-21T01:01:43.545Z",
  "ttlSeconds": 1
}
```

<a id="scalar-schema-attendancerecord"></a>

### AttendanceRecord

**Type:** `object`

- **`createdAt` (required)**: `string`, format: `date-time`
- **`id` (required)**: `string`, format: `uuid`
- **`method` (required)**: `string`, possible values: `"qr", "manual", "system"`
- **`reason` (required)**: `string | null`
- **`recordedAt` (required)**: `string`, format: `date-time`
- **`recordedBy` (required)**: `string | null`, format: `uuid`
- **`recordedByName` (required)**: `string | null`
- **`sessionId` (required)**: `string`, format: `uuid`
- **`status` (required)**: `string`, possible values: `"present", "late", "absent", "excused"`
- **`studentCode` (required)**: `string`
- **`studentFullName` (required)**: `string`
- **`studentId` (required)**: `string`, format: `uuid`
- **`tokenId` (required)**: `string | null`, format: `uuid`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-56"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "studentCode": "",
  "studentFullName": "",
  "status": "present",
  "method": "qr",
  "tokenId": "123e4567-e89b-12d3-a456-426614174000",
  "recordedAt": "2026-11-21T01:01:43.546Z",
  "recordedBy": "123e4567-e89b-12d3-a456-426614174000",
  "recordedByName": "",
  "reason": "",
  "createdAt": "2026-11-21T01:01:43.546Z",
  "updatedAt": "2026-11-21T01:01:43.546Z"
}
```

<a id="scalar-schema-attendancestatus"></a>

### AttendanceStatus

**Type:** `string`, possible values: `"present", "late", "absent", "excused"`

<a id="scalar-schema-auditlog"></a>

### AuditLog

**Type:** `object`

- **`action` (required)**: `string`, maxLength: `100`
- **`actorDisplayName` (required)**: `string | null`
- **`actorUserId` (required)**: `string | null`, format: `uuid`
- **`afterData` (required)**: `object | null`

  **Additional properties:**

  `any`
- **`beforeData` (required)**: `object | null`

  **Additional properties:**

  `any`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`entityId` (required)**: `string | null`, format: `uuid`
- **`entityType` (required)**: `string`, maxLength: `100`
- **`id` (required)**: `string`, format: `uuid`
- **`reason` (required)**: `string | null`

<a id="scalar-example-57"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "actorUserId": "123e4567-e89b-12d3-a456-426614174000",
  "actorDisplayName": "",
  "action": "",
  "entityType": "",
  "entityId": "123e4567-e89b-12d3-a456-426614174000",
  "beforeData": {
    "additionalProperty": null
  },
  "afterData": {
    "additionalProperty": null
  },
  "reason": "",
  "createdAt": "2026-11-21T01:01:43.548Z"
}
```

<a id="scalar-schema-authsession"></a>

### AuthSession

**Type:** `object`

- **`expiresAt` (required)**: `string`, format: `date-time`
- **`user` (required)**: [CurrentUser](#scalar-schema-currentuser)

<a id="scalar-example-58"></a>

**Generated example:**

```json
{
  "user": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "email": "hello@example.com",
    "displayName": "",
    "phone": "",
    "isActive": true,
    "canReviewApplications": true,
    "roles": [
      "admin"
    ],
    "studentId": "123e4567-e89b-12d3-a456-426614174000"
  },
  "expiresAt": "2026-11-21T01:01:43.549Z"
}
```

<a id="scalar-schema-classitem"></a>

### ClassItem

**Type:** `object`

- **`activeStudentCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`classCode` (required)**: `string`, minLength: `1`, maxLength: `50`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`endDate` (required)**: `string | null`, format: `date`
- **`gradeLevel` (required)**: `string`, minLength: `1`, maxLength: `50`
- **`id` (required)**: `string`, format: `uuid`
- **`maxStudents` (required)**: `number`, minimum: `1`

  **Any of:**
  - `integer`, format: `int32`
  - `null`
- **`name` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`room` (required)**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`scheduleText` (required)**: `string | null`
- **`startDate` (required)**: `string | null`, format: `date`
- **`status` (required)**: `string`, possible values: `"upcoming", "active", "inactive"`
- **`teacherName` (required)**: `string`
- **`teacherUserId` (required)**: `string`, format: `uuid`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-59"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "classCode": "",
  "name": "",
  "gradeLevel": "",
  "teacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "teacherName": "",
  "scheduleText": "",
  "room": "",
  "maxStudents": 1,
  "startDate": "2026-11-21",
  "endDate": "2026-11-21",
  "status": "upcoming",
  "activeStudentCount": 0,
  "createdAt": "2026-11-21T01:01:43.550Z",
  "updatedAt": "2026-11-21T01:01:43.550Z"
}
```

<a id="scalar-schema-classsession"></a>

### ClassSession

**Type:** `object`

- **`attendanceClosesAt` (required)**: `string`, format: `date-time`
- **`attendanceOpensAt` (required)**: `string`, format: `date-time`
- **`classCode` (required)**: `string`
- **`classId` (required)**: `string`, format: `uuid`
- **`className` (required)**: `string`
- **`closedAt` (required)**: `string | null`, format: `date-time`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`createdBy` (required)**: `string`, format: `uuid`
- **`effectiveStatus` (required)**: `string`, possible values: `"scheduled", "open", "closed", "cancelled"`
- **`endsAt` (required)**: `string`, format: `date-time`
- **`id` (required)**: `string`, format: `uuid`
- **`sessionNo` (required)**: `integer`, format: `int32`, minimum: `1`
- **`startsAt` (required)**: `string`, format: `date-time`
- **`status` (required)**: `string`, possible values: `"scheduled", "cancelled"`
- **`substituteTeacherName` (required)**: `string | null`
- **`substituteTeacherUserId` (required)**: `string | null`, format: `uuid`
- **`title` (required)**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-60"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "classCode": "",
  "className": "",
  "sessionNo": 1,
  "title": "",
  "startsAt": "2026-11-21T01:01:43.552Z",
  "endsAt": "2026-11-21T01:01:43.552Z",
  "attendanceOpensAt": "2026-11-21T01:01:43.552Z",
  "attendanceClosesAt": "2026-11-21T01:01:43.552Z",
  "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "substituteTeacherName": "",
  "status": "scheduled",
  "effectiveStatus": "scheduled",
  "closedAt": "2026-11-21T01:01:43.552Z",
  "createdBy": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2026-11-21T01:01:43.552Z",
  "updatedAt": "2026-11-21T01:01:43.552Z"
}
```

<a id="scalar-schema-classsessiondetail"></a>

### ClassSessionDetail

**Type:** `object`

- **`attendanceClosesAt` (required)**: `string`, format: `date-time`
- **`attendanceOpensAt` (required)**: `string`, format: `date-time`
- **`attendanceSummary` (required)**: [SessionAttendanceSummary](#scalar-schema-sessionattendancesummary)
- **`classCode` (required)**: `string`
- **`classId` (required)**: `string`, format: `uuid`
- **`className` (required)**: `string`
- **`closedAt` (required)**: `string | null`, format: `date-time`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`createdBy` (required)**: `string`, format: `uuid`
- **`effectiveStatus` (required)**: `string`, possible values: `"scheduled", "open", "closed", "cancelled"`
- **`endsAt` (required)**: `string`, format: `date-time`
- **`id` (required)**: `string`, format: `uuid`
- **`sessionNo` (required)**: `integer`, format: `int32`, minimum: `1`
- **`startsAt` (required)**: `string`, format: `date-time`
- **`status` (required)**: `string`, possible values: `"scheduled", "cancelled"`
- **`substituteTeacherName` (required)**: `string | null`
- **`substituteTeacherUserId` (required)**: `string | null`, format: `uuid`
- **`title` (required)**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-61"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "classCode": "",
  "className": "",
  "sessionNo": 1,
  "title": "",
  "startsAt": "2026-11-21T01:01:43.553Z",
  "endsAt": "2026-11-21T01:01:43.553Z",
  "attendanceOpensAt": "2026-11-21T01:01:43.553Z",
  "attendanceClosesAt": "2026-11-21T01:01:43.553Z",
  "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "substituteTeacherName": "",
  "status": "scheduled",
  "effectiveStatus": "scheduled",
  "closedAt": "2026-11-21T01:01:43.553Z",
  "createdBy": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2026-11-21T01:01:43.553Z",
  "updatedAt": "2026-11-21T01:01:43.553Z",
  "attendanceSummary": {
    "expectedCount": 0,
    "recordedCount": 0,
    "unrecordedCount": 0,
    "presentCount": 0,
    "lateCount": 0,
    "absentCount": 0,
    "excusedCount": 0
  }
}
```

<a id="scalar-schema-classstatus"></a>

### ClassStatus

**Type:** `string`, possible values: `"upcoming", "active", "inactive"`

<a id="scalar-schema-closesessionresult"></a>

### CloseSessionResult

**Type:** `object`

- **`generatedAbsentCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`revokedTokenCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`session` (required)**: [ClassSession](#scalar-schema-classsession)

<a id="scalar-example-62"></a>

**Generated example:**

```json
{
  "session": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "classId": "123e4567-e89b-12d3-a456-426614174000",
    "classCode": "",
    "className": "",
    "sessionNo": 1,
    "title": "",
    "startsAt": "2026-11-21T01:01:43.555Z",
    "endsAt": "2026-11-21T01:01:43.555Z",
    "attendanceOpensAt": "2026-11-21T01:01:43.555Z",
    "attendanceClosesAt": "2026-11-21T01:01:43.555Z",
    "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
    "substituteTeacherName": "",
    "status": "scheduled",
    "effectiveStatus": "scheduled",
    "closedAt": "2026-11-21T01:01:43.555Z",
    "createdBy": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2026-11-21T01:01:43.555Z",
    "updatedAt": "2026-11-21T01:01:43.555Z"
  },
  "generatedAbsentCount": 0,
  "revokedTokenCount": 0
}
```

<a id="scalar-schema-commonemail"></a>

### Common.Email

**Type:** `string`, format: `email`

<a id="scalar-schema-commonerrorbody"></a>

### Common.ErrorBody

**Type:** `object`

- **`error` (required)**: `string`
- **`details`**: array of [Common.ValidationIssue](#scalar-schema-commonvalidationissue)

<a id="scalar-example-63"></a>

**Generated example:**

```json
{
  "error": "",
  "details": [
    {
      "path": [
        ""
      ],
      "message": ""
    }
  ]
}
```

<a id="scalar-schema-commonidpayload"></a>

### Common.IdPayload

**Type:** `object`

- **`id` (required)**: `string`, format: `uuid`

<a id="scalar-example-64"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

<a id="scalar-schema-commonpagemeta"></a>

### Common.PageMeta

**Type:** `object`

- **`limit` (required)**: `integer`, format: `int32`, minimum: `1`
- **`page` (required)**: `integer`, format: `int32`, minimum: `1`
- **`total` (required)**: `integer`, format: `int32`, minimum: `0`

<a id="scalar-example-65"></a>

**Generated example:**

```json
{
  "page": 1,
  "limit": 1,
  "total": 0
}
```

<a id="scalar-schema-commonuuid"></a>

### Common.Uuid

**Type:** `string`, format: `uuid`

<a id="scalar-schema-commonvalidationissue"></a>

### Common.ValidationIssue

**Type:** `object`

- **`message` (required)**: `string`
- **`path` (required)**: `array`

  **Items:**

  **Any of:**
  - `string`
  - `integer`, format: `int32`

<a id="scalar-example-66"></a>

**Generated example:**

```json
{
  "path": [
    ""
  ],
  "message": ""
}
```

<a id="scalar-schema-createclassrequest"></a>

### CreateClassRequest

**Type:** `object`

- **`classCode` (required)**: `string`, minLength: `1`, maxLength: `50`
- **`gradeLevel` (required)**: `string`, minLength: `1`, maxLength: `50`
- **`name` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`teacherUserId` (required)**: `string`, format: `uuid`
- **`endDate`**: `string | null`, format: `date`
- **`maxStudents`**: `number`, minimum: `1`

  **Any of:**
  - `integer`, format: `int32`
  - `null`
- **`room`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`scheduleText`**: `string | null`
- **`startDate`**: `string | null`, format: `date`
- **`status`**: `string`, possible values: `"upcoming", "active", "inactive"`, default: `"upcoming"`

<a id="scalar-example-67"></a>

**Generated example:**

```json
{
  "classCode": "",
  "name": "",
  "gradeLevel": "",
  "teacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "scheduleText": "",
  "room": "",
  "maxStudents": 1,
  "startDate": "2026-11-21",
  "endDate": "2026-11-21",
  "status": "upcoming"
}
```

<a id="scalar-schema-createenrollmentrequest"></a>

### CreateEnrollmentRequest

**Type:** `object`

- **`studentId` (required)**: `string`, format: `uuid`
- **`startDate`**: `string`, format: `date`

<a id="scalar-example-68"></a>

**Generated example:**

```json
{
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "startDate": "2026-11-21"
}
```

<a id="scalar-schema-createsessionrequest"></a>

### CreateSessionRequest

**Type:** `object`

- **`attendanceClosesAt` (required)**: `string`, format: `date-time`
- **`attendanceOpensAt` (required)**: `string`, format: `date-time`
- **`classId` (required)**: `string`, format: `uuid`
- **`endsAt` (required)**: `string`, format: `date-time`
- **`sessionNo` (required)**: `integer`, format: `int32`, minimum: `1`
- **`startsAt` (required)**: `string`, format: `date-time`
- **`substituteTeacherUserId`**: `string | null`, format: `uuid`
- **`title`**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-69"></a>

**Generated example:**

```json
{
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "sessionNo": 1,
  "title": "",
  "startsAt": "2026-11-21T01:01:43.559Z",
  "endsAt": "2026-11-21T01:01:43.559Z",
  "attendanceOpensAt": "2026-11-21T01:01:43.559Z",
  "attendanceClosesAt": "2026-11-21T01:01:43.559Z",
  "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000"
}
```

<a id="scalar-schema-createstudentrequest"></a>

### CreateStudentRequest

**Type:** `object`

- **`fullName` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`dateOfBirth`**: `string | null`, format: `date`
- **`gradeLevel`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`guardianEmail`**: `string | null`, format: `email`
- **`guardianName`**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`guardianPhone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`
- **`guardianRelation`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`initialClassId`**: `string | null`, format: `uuid`
- **`status`**: `string`, possible values: `"active", "paused", "left"`, default: `"active"`
- **`studentCode`**: `string`, minLength: `1`, maxLength: `50`
- **`studentEmail`**: `string | null`, format: `email`
- **`studentPhone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-70"></a>

**Generated example:**

```json
{
  "studentCode": "",
  "fullName": "",
  "dateOfBirth": "2026-11-21",
  "gradeLevel": "",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "status": "active",
  "initialClassId": "123e4567-e89b-12d3-a456-426614174000"
}
```

<a id="scalar-schema-createtodorequest"></a>

### CreateTodoRequest

**Type:** `object`

- **`title` (required)**: `string`, minLength: `1`, maxLength: `120`
- **`completed`**: `boolean`, default: `false`
- **`description`**: `string`, default: `""`, maxLength: `500`
- **`priority`**: `string`, possible values: `"low", "medium", "high"`, default: `"medium"`

<a id="scalar-example-71"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "medium",
  "completed": false
}
```

<a id="scalar-schema-createuserrequest"></a>

### CreateUserRequest

**Type:** `object`

- **`displayName` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`email` (required)**: `string`, format: `email`
- **`roles` (required)**: `array`, minItems: `1`

  **Items:**

  `string`, possible values: `"admin", "teacher", "student"`
- **`canReviewApplications`**: `boolean`, default: `false`
- **`phone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-72"></a>

**Generated example:**

```json
{
  "email": "hello@example.com",
  "displayName": "",
  "phone": "",
  "roles": [
    "admin"
  ],
  "canReviewApplications": false
}
```

<a id="scalar-schema-currentuser"></a>

### CurrentUser

**Type:** `object`

- **`canReviewApplications` (required)**: `boolean`
- **`displayName` (required)**: `string`
- **`email` (required)**: `string | null`, format: `email`
- **`isActive` (required)**: `boolean`
- **`phone` (required)**: `string | null`
- **`roles` (required)**: `array`

  **Items:**

  `string`, possible values: `"admin", "teacher", "student"`
- **`studentId` (required)**: `string | null`, format: `uuid`
- **`userId` (required)**: `string`, format: `uuid`

<a id="scalar-example-73"></a>

**Generated example:**

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "email": "hello@example.com",
  "displayName": "",
  "phone": "",
  "isActive": true,
  "canReviewApplications": true,
  "roles": [
    "admin"
  ],
  "studentId": "123e4567-e89b-12d3-a456-426614174000"
}
```

<a id="scalar-schema-dashboardoverview"></a>

### DashboardOverview

**Type:** `object`

- **`activeClassCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`activeStudentCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`asOf` (required)**: `string`, format: `date-time`
- **`pendingApplicationCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`todaySessions` (required)**: array of [TodaySessionOverview](#scalar-schema-todaysessionoverview)

<a id="scalar-example-74"></a>

**Generated example:**

```json
{
  "activeStudentCount": 0,
  "activeClassCount": 0,
  "pendingApplicationCount": 0,
  "todaySessions": [
    {
      "sessionId": "123e4567-e89b-12d3-a456-426614174000",
      "classId": "123e4567-e89b-12d3-a456-426614174000",
      "classCode": "",
      "className": "",
      "sessionNo": 1,
      "startsAt": "2026-11-21T01:01:43.563Z",
      "endsAt": "2026-11-21T01:01:43.563Z",
      "effectiveStatus": "scheduled",
      "expectedCount": 0,
      "recordedCount": 0,
      "presentCount": 0,
      "lateCount": 0,
      "absentCount": 0,
      "excusedCount": 0
    }
  ],
  "asOf": "2026-11-21T01:01:43.564Z"
}
```

<a id="scalar-schema-duplicatecandidate"></a>

### DuplicateCandidate

**Type:** `object`

- **`fullName` (required)**: `string`
- **`guardianPhone` (required)**: `string | null`
- **`matchReason` (required)**: `string`
- **`studentCode` (required)**: `string`
- **`studentId` (required)**: `string`, format: `uuid`
- **`studentPhone` (required)**: `string | null`

<a id="scalar-example-75"></a>

**Generated example:**

```json
{
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "studentCode": "",
  "fullName": "",
  "guardianPhone": "",
  "studentPhone": "",
  "matchReason": ""
}
```

<a id="scalar-schema-enrollment"></a>

### Enrollment

**Type:** `object`

- **`classCode` (required)**: `string`
- **`classId` (required)**: `string`, format: `uuid`
- **`className` (required)**: `string`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`endDate` (required)**: `string | null`, format: `date`
- **`id` (required)**: `string`, format: `uuid`
- **`startDate` (required)**: `string`, format: `date`
- **`status` (required)**: `string`, possible values: `"active", "ended", "cancelled"`
- **`studentCode` (required)**: `string`
- **`studentFullName` (required)**: `string`
- **`studentId` (required)**: `string`, format: `uuid`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-76"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "studentCode": "",
  "studentFullName": "",
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "classCode": "",
  "className": "",
  "startDate": "2026-11-21",
  "endDate": "2026-11-21",
  "status": "active",
  "createdAt": "2026-11-21T01:01:43.566Z",
  "updatedAt": "2026-11-21T01:01:43.566Z"
}
```

<a id="scalar-schema-enrollmentapplication"></a>

### EnrollmentApplication

**Type:** `object`

- **`applicantNote` (required)**: `string | null`
- **`applicationCode` (required)**: `string`
- **`consentAt` (required)**: `string`, format: `date-time`
- **`consentVersion` (required)**: `string`, maxLength: `50`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`createdStudentId` (required)**: `string | null`, format: `uuid`
- **`guardianEmail` (required)**: `string | null`, format: `email`
- **`guardianName` (required)**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`guardianPhone` (required)**: `string`, minLength: `8`, maxLength: `20`
- **`guardianRelation` (required)**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`id` (required)**: `string`, format: `uuid`
- **`requestedClassId` (required)**: `string | null`, format: `uuid`
- **`requestedClassName` (required)**: `string | null`
- **`requestedGrade` (required)**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`reviewedAt` (required)**: `string | null`, format: `date-time`
- **`reviewedBy` (required)**: `string | null`, format: `uuid`
- **`reviewedByName` (required)**: `string | null`
- **`reviewNote` (required)**: `string | null`
- **`status` (required)**: `string`, possible values: `"pending_review", "need_more_info", "approved", "rejected"`
- **`studentDob` (required)**: `string | null`, format: `date`
- **`studentEmail` (required)**: `string | null`, format: `email`
- **`studentFullName` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`studentPhone` (required)**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-77"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "applicationCode": "",
  "studentFullName": "",
  "studentDob": "2026-11-21",
  "requestedGrade": "",
  "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
  "requestedClassName": "",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "applicantNote": "",
  "consentAt": "2026-11-21T01:01:43.568Z",
  "consentVersion": "",
  "status": "pending_review",
  "reviewedBy": "123e4567-e89b-12d3-a456-426614174000",
  "reviewedByName": "",
  "reviewedAt": "2026-11-21T01:01:43.568Z",
  "reviewNote": "",
  "createdStudentId": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2026-11-21T01:01:43.568Z",
  "updatedAt": "2026-11-21T01:01:43.568Z"
}
```

<a id="scalar-schema-enrollmentapplicationdetail"></a>

### EnrollmentApplicationDetail

**Type:** `object`

- **`applicantNote` (required)**: `string | null`
- **`applicationCode` (required)**: `string`
- **`consentAt` (required)**: `string`, format: `date-time`
- **`consentVersion` (required)**: `string`, maxLength: `50`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`createdStudentId` (required)**: `string | null`, format: `uuid`
- **`duplicateCandidates` (required)**: array of [DuplicateCandidate](#scalar-schema-duplicatecandidate)
- **`guardianEmail` (required)**: `string | null`, format: `email`
- **`guardianName` (required)**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`guardianPhone` (required)**: `string`, minLength: `8`, maxLength: `20`
- **`guardianRelation` (required)**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`id` (required)**: `string`, format: `uuid`
- **`requestedClassId` (required)**: `string | null`, format: `uuid`
- **`requestedClassName` (required)**: `string | null`
- **`requestedGrade` (required)**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`reviewedAt` (required)**: `string | null`, format: `date-time`
- **`reviewedBy` (required)**: `string | null`, format: `uuid`
- **`reviewedByName` (required)**: `string | null`
- **`reviewNote` (required)**: `string | null`
- **`status` (required)**: `string`, possible values: `"pending_review", "need_more_info", "approved", "rejected"`
- **`statusHistory` (required)**: array of [ApplicationStatusHistoryItem](#scalar-schema-applicationstatushistoryitem)
- **`studentDob` (required)**: `string | null`, format: `date`
- **`studentEmail` (required)**: `string | null`, format: `email`
- **`studentFullName` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`studentPhone` (required)**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-78"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "applicationCode": "",
  "studentFullName": "",
  "studentDob": "2026-11-21",
  "requestedGrade": "",
  "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
  "requestedClassName": "",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "applicantNote": "",
  "consentAt": "2026-11-21T01:01:43.570Z",
  "consentVersion": "",
  "status": "pending_review",
  "reviewedBy": "123e4567-e89b-12d3-a456-426614174000",
  "reviewedByName": "",
  "reviewedAt": "2026-11-21T01:01:43.570Z",
  "reviewNote": "",
  "createdStudentId": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2026-11-21T01:01:43.570Z",
  "updatedAt": "2026-11-21T01:01:43.570Z",
  "statusHistory": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "applicationId": "123e4567-e89b-12d3-a456-426614174000",
      "fromStatus": "pending_review",
      "toStatus": "pending_review",
      "changedBy": "123e4567-e89b-12d3-a456-426614174000",
      "changedByName": "",
      "note": "",
      "changedAt": "2026-11-21T01:01:43.571Z"
    }
  ],
  "duplicateCandidates": [
    {
      "studentId": "123e4567-e89b-12d3-a456-426614174000",
      "studentCode": "",
      "fullName": "",
      "guardianPhone": "",
      "studentPhone": "",
      "matchReason": ""
    }
  ]
}
```

<a id="scalar-schema-enrollmentstatus"></a>

### EnrollmentStatus

**Type:** `string`, possible values: `"active", "ended", "cancelled"`

<a id="scalar-schema-invitestudentaccountrequest"></a>

### InviteStudentAccountRequest

**Type:** `object`

- **`email`**: `string`, format: `email`

<a id="scalar-example-79"></a>

**Generated example:**

```json
{
  "email": "hello@example.com"
}
```

<a id="scalar-schema-issueqrtokenrequest"></a>

### IssueQrTokenRequest

**Type:** `object`

- **`sessionId` (required)**: `string`, format: `uuid`

<a id="scalar-example-80"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000"
}
```

<a id="scalar-schema-linkstudentaccountrequest"></a>

### LinkStudentAccountRequest

**Type:** `object`

- **`authUserId` (required)**: `string`, format: `uuid`

<a id="scalar-example-81"></a>

**Generated example:**

```json
{
  "authUserId": "123e4567-e89b-12d3-a456-426614174000"
}
```

<a id="scalar-schema-loginrequest"></a>

### LoginRequest

**Type:** `object`

- **`email` (required)**: `string`, format: `email`
- **`password` (required)**: `string`, minLength: `8`, maxLength: `128`

<a id="scalar-example-82"></a>

**Generated example:**

```json
{
  "email": "hello@example.com",
  "password": ""
}
```

<a id="scalar-schema-manualattendancerequest"></a>

### ManualAttendanceRequest

**Type:** `object`

- **`reason` (required)**: `string`, minLength: `1`, maxLength: `500`
- **`sessionId` (required)**: `string`, format: `uuid`
- **`status` (required)**: `string`, possible values: `"present", "late", "absent", "excused"`
- **`studentId` (required)**: `string`, format: `uuid`

<a id="scalar-example-83"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "present",
  "reason": ""
}
```

<a id="scalar-schema-publicapplicationreceipt"></a>

### PublicApplicationReceipt

**Type:** `object`

- **`applicationCode` (required)**: `string`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`id` (required)**: `string`, format: `uuid`
- **`status` (required)**: `string`, possible values: `"pending_review", "need_more_info", "approved", "rejected"`

<a id="scalar-example-84"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "applicationCode": "",
  "status": "pending_review",
  "createdAt": "2026-11-21T01:01:43.575Z"
}
```

<a id="scalar-schema-publicclassoption"></a>

### PublicClassOption

**Type:** `object`

- **`classCode` (required)**: `string`
- **`gradeLevel` (required)**: `string`
- **`id` (required)**: `string`, format: `uuid`
- **`name` (required)**: `string`
- **`scheduleText` (required)**: `string | null`

<a id="scalar-example-85"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "classCode": "",
  "name": "",
  "gradeLevel": "",
  "scheduleText": ""
}
```

<a id="scalar-schema-qrscanoutcome"></a>

### QrScanOutcome

**Type:** `string`, possible values: `"recorded", "already_recorded"`

<a id="scalar-schema-reviewapplicationdecisionrequest"></a>

### ReviewApplicationDecisionRequest

**Type:** `object`

- **`reviewNote` (required)**: `string`, minLength: `1`, maxLength: `1000`

<a id="scalar-example-86"></a>

**Generated example:**

```json
{
  "reviewNote": ""
}
```

<a id="scalar-schema-scanqrattendancerequest"></a>

### ScanQrAttendanceRequest

**Type:** `object`

- **`sessionId` (required)**: `string`, format: `uuid`
- **`token` (required)**: `string`, minLength: `1`
- **`status`**: `string`, possible values: `"present", "late", "absent", "excused"`, default: `"present"`

<a id="scalar-example-87"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "token": "",
  "status": "present"
}
```

<a id="scalar-schema-scanqrattendanceresult"></a>

### ScanQrAttendanceResult

**Type:** `object`

- **`outcome` (required)**: `string`, possible values: `"recorded", "already_recorded"`
- **`record` (required)**: [AttendanceRecord](#scalar-schema-attendancerecord)
- **`studentCode` (required)**: `string`
- **`studentFullName` (required)**: `string`

<a id="scalar-example-88"></a>

**Generated example:**

```json
{
  "outcome": "recorded",
  "record": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "studentId": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "studentFullName": "",
    "status": "present",
    "method": "qr",
    "tokenId": "123e4567-e89b-12d3-a456-426614174000",
    "recordedAt": "2026-11-21T01:01:43.577Z",
    "recordedBy": "123e4567-e89b-12d3-a456-426614174000",
    "recordedByName": "",
    "reason": "",
    "createdAt": "2026-11-21T01:01:43.577Z",
    "updatedAt": "2026-11-21T01:01:43.577Z"
  },
  "studentCode": "",
  "studentFullName": ""
}
```

<a id="scalar-schema-sessionattendanceboard"></a>

### SessionAttendanceBoard

**Type:** `object`

- **`items` (required)**: array of [SessionRosterEntry](#scalar-schema-sessionrosterentry)
- **`sessionId` (required)**: `string`, format: `uuid`
- **`summary` (required)**: [SessionAttendanceSummary](#scalar-schema-sessionattendancesummary)

<a id="scalar-example-89"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "summary": {
    "expectedCount": 0,
    "recordedCount": 0,
    "unrecordedCount": 0,
    "presentCount": 0,
    "lateCount": 0,
    "absentCount": 0,
    "excusedCount": 0
  },
  "items": [
    {
      "studentId": "123e4567-e89b-12d3-a456-426614174000",
      "studentCode": "",
      "studentFullName": "",
      "enrollmentId": "123e4567-e89b-12d3-a456-426614174000",
      "record": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "sessionId": "123e4567-e89b-12d3-a456-426614174000",
        "studentId": "123e4567-e89b-12d3-a456-426614174000",
        "studentCode": "",
        "studentFullName": "",
        "status": "present",
        "method": "qr",
        "tokenId": "123e4567-e89b-12d3-a456-426614174000",
        "recordedAt": "2026-11-21T01:01:43.578Z",
        "recordedBy": "123e4567-e89b-12d3-a456-426614174000",
        "recordedByName": "",
        "reason": "",
        "createdAt": "2026-11-21T01:01:43.578Z",
        "updatedAt": "2026-11-21T01:01:43.578Z"
      }
    }
  ]
}
```

<a id="scalar-schema-sessionattendancesummary"></a>

### SessionAttendanceSummary

**Type:** `object`

- **`absentCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`excusedCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`expectedCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`lateCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`presentCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`recordedCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`unrecordedCount` (required)**: `integer`, format: `int32`, minimum: `0`

<a id="scalar-example-90"></a>

**Generated example:**

```json
{
  "expectedCount": 0,
  "recordedCount": 0,
  "unrecordedCount": 0,
  "presentCount": 0,
  "lateCount": 0,
  "absentCount": 0,
  "excusedCount": 0
}
```

<a id="scalar-schema-sessioneffectivestatus"></a>

### SessionEffectiveStatus

**Type:** `string`, possible values: `"scheduled", "open", "closed", "cancelled"`

<a id="scalar-schema-sessionrosterentry"></a>

### SessionRosterEntry

**Type:** `object`

- **`enrollmentId` (required)**: `string`, format: `uuid`
- **`record` (required)**: [AttendanceRecord](#scalar-schema-attendancerecord) | `null`
- **`studentCode` (required)**: `string`
- **`studentFullName` (required)**: `string`
- **`studentId` (required)**: `string`, format: `uuid`

<a id="scalar-example-91"></a>

**Generated example:**

```json
{
  "studentId": "123e4567-e89b-12d3-a456-426614174000",
  "studentCode": "",
  "studentFullName": "",
  "enrollmentId": "123e4567-e89b-12d3-a456-426614174000",
  "record": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "sessionId": "123e4567-e89b-12d3-a456-426614174000",
    "studentId": "123e4567-e89b-12d3-a456-426614174000",
    "studentCode": "",
    "studentFullName": "",
    "status": "present",
    "method": "qr",
    "tokenId": "123e4567-e89b-12d3-a456-426614174000",
    "recordedAt": "2026-11-21T01:01:43.580Z",
    "recordedBy": "123e4567-e89b-12d3-a456-426614174000",
    "recordedByName": "",
    "reason": "",
    "createdAt": "2026-11-21T01:01:43.580Z",
    "updatedAt": "2026-11-21T01:01:43.580Z"
  }
}
```

<a id="scalar-schema-sessionstatus"></a>

### SessionStatus

**Type:** `string`, possible values: `"scheduled", "cancelled"`

<a id="scalar-schema-student"></a>

### Student

**Type:** `object`

- **`accountStatus` (required)**: `string`, possible values: `"not_invited", "invited", "invite_failed", "linked"`
- **`authUserId` (required)**: `string | null`, format: `uuid`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`dateOfBirth` (required)**: `string | null`, format: `date`
- **`fullName` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`gradeLevel` (required)**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`guardianEmail` (required)**: `string | null`, format: `email`
- **`guardianName` (required)**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`guardianPhone` (required)**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`
- **`guardianRelation` (required)**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`id` (required)**: `string`, format: `uuid`
- **`inviteAttempts` (required)**: `integer`, format: `int32`, minimum: `0`
- **`invitedAt` (required)**: `string | null`, format: `date-time`
- **`inviteLastError` (required)**: `string | null`
- **`status` (required)**: `string`, possible values: `"active", "paused", "left"`
- **`studentCode` (required)**: `string`, minLength: `1`, maxLength: `50`
- **`studentEmail` (required)**: `string | null`, format: `email`
- **`studentPhone` (required)**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-92"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "studentCode": "",
  "fullName": "",
  "dateOfBirth": "2026-11-21",
  "gradeLevel": "",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "status": "active",
  "authUserId": "123e4567-e89b-12d3-a456-426614174000",
  "accountStatus": "not_invited",
  "invitedAt": "2026-11-21T01:01:43.581Z",
  "inviteAttempts": 0,
  "inviteLastError": "",
  "createdAt": "2026-11-21T01:01:43.581Z",
  "updatedAt": "2026-11-21T01:01:43.581Z"
}
```

<a id="scalar-schema-studentstatus"></a>

### StudentStatus

**Type:** `string`, possible values: `"active", "paused", "left"`

<a id="scalar-schema-submitpublicapplicationrequest"></a>

### SubmitPublicApplicationRequest

**Type:** `object`

- **`captchaToken` (required)**: `string`, minLength: `1`
- **`consentAccepted` (required)**: `boolean`
- **`consentVersion` (required)**: `string`, minLength: `1`, maxLength: `50`
- **`guardianPhone` (required)**: `string`, minLength: `8`, maxLength: `20`
- **`studentFullName` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`applicantNote`**: `string`, maxLength: `1000`

  **Any of:**
  - `string`
  - `null`
- **`guardianEmail`**: `string | null`, format: `email`
- **`guardianName`**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`guardianRelation`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`requestedClassId`**: `string | null`, format: `uuid`
- **`requestedGrade`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`studentDob`**: `string | null`, format: `date`
- **`studentEmail`**: `string | null`, format: `email`
- **`studentPhone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-93"></a>

**Generated example:**

```json
{
  "studentFullName": "",
  "studentDob": "2026-11-21",
  "requestedGrade": "",
  "requestedClassId": "123e4567-e89b-12d3-a456-426614174000",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "applicantNote": "",
  "consentAccepted": true,
  "consentVersion": "",
  "captchaToken": ""
}
```

<a id="scalar-schema-todaysessionoverview"></a>

### TodaySessionOverview

**Type:** `object`

- **`absentCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`classCode` (required)**: `string`
- **`classId` (required)**: `string`, format: `uuid`
- **`className` (required)**: `string`
- **`effectiveStatus` (required)**: `string`, possible values: `"scheduled", "open", "closed", "cancelled"`
- **`endsAt` (required)**: `string`, format: `date-time`
- **`excusedCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`expectedCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`lateCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`presentCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`recordedCount` (required)**: `integer`, format: `int32`, minimum: `0`
- **`sessionId` (required)**: `string`, format: `uuid`
- **`sessionNo` (required)**: `integer`, format: `int32`, minimum: `1`
- **`startsAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-94"></a>

**Generated example:**

```json
{
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "classId": "123e4567-e89b-12d3-a456-426614174000",
  "classCode": "",
  "className": "",
  "sessionNo": 1,
  "startsAt": "2026-11-21T01:01:43.585Z",
  "endsAt": "2026-11-21T01:01:43.585Z",
  "effectiveStatus": "scheduled",
  "expectedCount": 0,
  "recordedCount": 0,
  "presentCount": 0,
  "lateCount": 0,
  "absentCount": 0,
  "excusedCount": 0
}
```

<a id="scalar-schema-todo"></a>

### Todo

**Type:** `object`

- **`completed` (required)**: `boolean`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`description` (required)**: `string`, maxLength: `500`
- **`id` (required)**: `string`, format: `uuid`
- **`priority` (required)**: `string`, possible values: `"low", "medium", "high"`
- **`title` (required)**: `string`, minLength: `1`, maxLength: `120`
- **`updatedAt` (required)**: `string`, format: `date-time`

<a id="scalar-example-95"></a>

**Generated example:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "",
  "description": "",
  "priority": "low",
  "completed": true,
  "createdAt": "2026-11-21T01:01:43.586Z",
  "updatedAt": "2026-11-21T01:01:43.586Z"
}
```

<a id="scalar-schema-todopriority"></a>

### TodoPriority

**Type:** `string`, possible values: `"low", "medium", "high"`

<a id="scalar-schema-updateattendancerecordrequest"></a>

### UpdateAttendanceRecordRequest

**Type:** `object`

- **`reason` (required)**: `string`, minLength: `1`, maxLength: `500`
- **`status` (required)**: `string`, possible values: `"present", "late", "absent", "excused"`

<a id="scalar-example-96"></a>

**Generated example:**

```json
{
  "status": "present",
  "reason": ""
}
```

<a id="scalar-schema-updateclassrequest"></a>

### UpdateClassRequest

**Type:** `object`

- **`endDate`**: `string | null`, format: `date`
- **`gradeLevel`**: `string`, minLength: `1`, maxLength: `50`
- **`maxStudents`**: `number`, minimum: `1`

  **Any of:**
  - `integer`, format: `int32`
  - `null`
- **`name`**: `string`, minLength: `1`, maxLength: `255`
- **`room`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`scheduleText`**: `string | null`
- **`startDate`**: `string | null`, format: `date`
- **`status`**: `string`, possible values: `"upcoming", "active", "inactive"`
- **`teacherUserId`**: `string`, format: `uuid`

<a id="scalar-example-97"></a>

**Generated example:**

```json
{
  "name": "",
  "gradeLevel": "",
  "teacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "scheduleText": "",
  "room": "",
  "maxStudents": 1,
  "startDate": "2026-11-21",
  "endDate": "2026-11-21",
  "status": "upcoming"
}
```

<a id="scalar-schema-updateenrollmentrequest"></a>

### UpdateEnrollmentRequest

**Type:** `object`

- **`status` (required)**: `string`, possible values: `"active", "ended", "cancelled"`
- **`endDate`**: `string | null`, format: `date`

<a id="scalar-example-98"></a>

**Generated example:**

```json
{
  "status": "active",
  "endDate": "2026-11-21"
}
```

<a id="scalar-schema-updatemyprofilerequest"></a>

### UpdateMyProfileRequest

**Type:** `object`

- **`displayName`**: `string`, minLength: `1`, maxLength: `255`
- **`phone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-99"></a>

**Generated example:**

```json
{
  "displayName": "",
  "phone": ""
}
```

<a id="scalar-schema-updatesessionrequest"></a>

### UpdateSessionRequest

**Type:** `object`

- **`attendanceClosesAt`**: `string`, format: `date-time`
- **`attendanceOpensAt`**: `string`, format: `date-time`
- **`endsAt`**: `string`, format: `date-time`
- **`startsAt`**: `string`, format: `date-time`
- **`status`**: `string`, possible values: `"scheduled", "cancelled"`
- **`substituteTeacherUserId`**: `string | null`, format: `uuid`
- **`title`**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-100"></a>

**Generated example:**

```json
{
  "title": "",
  "startsAt": "2026-11-21T01:01:43.589Z",
  "endsAt": "2026-11-21T01:01:43.589Z",
  "attendanceOpensAt": "2026-11-21T01:01:43.589Z",
  "attendanceClosesAt": "2026-11-21T01:01:43.589Z",
  "substituteTeacherUserId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "scheduled"
}
```

<a id="scalar-schema-updatestudentrequest"></a>

### UpdateStudentRequest

**Type:** `object`

- **`dateOfBirth`**: `string | null`, format: `date`
- **`fullName`**: `string`, minLength: `1`, maxLength: `255`
- **`gradeLevel`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`guardianEmail`**: `string | null`, format: `email`
- **`guardianName`**: `string`, maxLength: `255`

  **Any of:**
  - `string`
  - `null`
- **`guardianPhone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`
- **`guardianRelation`**: `string`, maxLength: `50`

  **Any of:**
  - `string`
  - `null`
- **`status`**: `string`, possible values: `"active", "paused", "left"`
- **`studentEmail`**: `string | null`, format: `email`
- **`studentPhone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-101"></a>

**Generated example:**

```json
{
  "fullName": "",
  "dateOfBirth": "2026-11-21",
  "gradeLevel": "",
  "studentPhone": "",
  "studentEmail": "hello@example.com",
  "guardianName": "",
  "guardianRelation": "",
  "guardianPhone": "",
  "guardianEmail": "hello@example.com",
  "status": "active"
}
```

<a id="scalar-schema-updatetodorequest"></a>

### UpdateTodoRequest

**Type:** `object`

- **`completed`**: `boolean`
- **`description`**: `string`, maxLength: `500`
- **`priority`**: `string`, possible values: `"low", "medium", "high"`
- **`title`**: `string`, minLength: `1`, maxLength: `120`

<a id="scalar-example-102"></a>

**Generated example:**

```json
{
  "title": "",
  "description": "",
  "priority": "low",
  "completed": true
}
```

<a id="scalar-schema-updateuserrequest"></a>

### UpdateUserRequest

**Type:** `object`

- **`canReviewApplications`**: `boolean`
- **`displayName`**: `string`, minLength: `1`, maxLength: `255`
- **`isActive`**: `boolean`
- **`phone`**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`

<a id="scalar-example-103"></a>

**Generated example:**

```json
{
  "displayName": "",
  "phone": "",
  "isActive": true,
  "canReviewApplications": true
}
```

<a id="scalar-schema-updateuserrolesrequest"></a>

### UpdateUserRolesRequest

**Type:** `object`

- **`roles` (required)**: `array`, minItems: `1`

  **Items:**

  `string`, possible values: `"admin", "teacher", "student"`

<a id="scalar-example-104"></a>

**Generated example:**

```json
{
  "roles": [
    "admin"
  ]
}
```

<a id="scalar-schema-userprofile"></a>

### UserProfile

**Type:** `object`

- **`canReviewApplications` (required)**: `boolean`
- **`createdAt` (required)**: `string`, format: `date-time`
- **`displayName` (required)**: `string`, minLength: `1`, maxLength: `255`
- **`email` (required)**: `string | null`, format: `email`
- **`isActive` (required)**: `boolean`
- **`phone` (required)**: `string`, maxLength: `20`

  **Any of:**
  - `string`
  - `null`
- **`roles` (required)**: `array`

  **Items:**

  `string`, possible values: `"admin", "teacher", "student"`
- **`updatedAt` (required)**: `string`, format: `date-time`
- **`userId` (required)**: `string`, format: `uuid`

<a id="scalar-example-105"></a>

**Generated example:**

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "displayName": "",
  "phone": "",
  "email": "hello@example.com",
  "isActive": true,
  "canReviewApplications": true,
  "roles": [
    "admin"
  ],
  "createdAt": "2026-11-21T01:01:43.592Z",
  "updatedAt": "2026-11-21T01:01:43.592Z"
}
```
