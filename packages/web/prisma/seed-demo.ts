import { resolve } from "node:path"
import pg from "pg"
import { loadAppEnv, requireEnv } from "./env.ts"
import { hashPassword } from "./password.ts"
import { seedAdmin, type SqlClient } from "./seed.ts"

const DEMO_IDS = {
  teacherUser: "550e8400-e29b-41d4-a716-446655440002",
  studentUser: "550e8400-e29b-41d4-a716-446655440003",
  inactiveTeacherUser: "550e8400-e29b-41d4-a716-446655440004",
  studentLinked: "550e8400-e29b-41d4-a716-446655440099",
  studentTwo: "550e8400-e29b-41d4-a716-446655440100",
  studentThree: "550e8400-e29b-41d4-a716-446655440101",
  classTen: "550e8400-e29b-41d4-a716-446655440201",
  classEleven: "550e8400-e29b-41d4-a716-446655440202",
  enrollmentOne: "550e8400-e29b-41d4-a716-446655440301",
  enrollmentTwo: "550e8400-e29b-41d4-a716-446655440302",
  enrollmentThree: "550e8400-e29b-41d4-a716-446655440303",
  sessionOpen: "550e8400-e29b-41d4-a716-446655440401",
  sessionScheduled: "550e8400-e29b-41d4-a716-446655440402",
  attendanceOne: "550e8400-e29b-41d4-a716-446655440501",
  applicationOne: "550e8400-e29b-41d4-a716-446655440601",
  applicationHistoryOne: "550e8400-e29b-41d4-a716-446655440701",
} as const

interface DemoProfileSeed {
  userId: string
  email: string
  password: string
  displayName: string
  phone: string
  isActive: boolean
  canReviewApplications: boolean
  role: "teacher" | "student"
}

const DEMO_PROFILES: DemoProfileSeed[] = [
  {
    userId: DEMO_IDS.teacherUser,
    email: "teacher@mathinsight.edu.vn",
    password: "teacher123",
    displayName: "Thầy Hoàng Anh",
    phone: "0902345678",
    isActive: true,
    canReviewApplications: true,
    role: "teacher",
  },
  {
    userId: DEMO_IDS.studentUser,
    email: "student@mathinsight.edu.vn",
    password: "student123",
    displayName: "Em Minh Khôi",
    phone: "0903456789",
    isActive: true,
    canReviewApplications: false,
    role: "student",
  },
  {
    userId: DEMO_IDS.inactiveTeacherUser,
    email: "inactive.teacher@mathinsight.edu.vn",
    password: "teacher123",
    displayName: "Cô Mai (Ngừng hoạt động)",
    phone: "0904567890",
    isActive: false,
    canReviewApplications: false,
    role: "teacher",
  },
]

// Seed non-production demo users and domain data idempotently.
// Admin credentials are still sourced strictly from environment variables via seedAdmin.
export async function seedDemo(db: SqlClient): Promise<void> {
  const admin = await seedAdmin(db)

  for (const profile of DEMO_PROFILES) {
    const passwordHash = hashPassword(profile.password)
    const userRes = await db.query(
      `
      INSERT INTO "users" ("id", "email", "password_hash")
      VALUES ($1, $2, $3)
      ON CONFLICT ("email") DO UPDATE SET
        "password_hash" = EXCLUDED."password_hash",
        "updated_at" = now()
      RETURNING "id"
      `,
      [profile.userId, profile.email, passwordHash]
    )

    const userId = String(userRes.rows[0]?.id ?? profile.userId)
    await db.query(
      `
      INSERT INTO "profiles" (
        "user_id",
        "display_name",
        "phone",
        "is_active",
        "can_review_applications"
      )
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT ("user_id") DO UPDATE SET
        "display_name" = EXCLUDED."display_name",
        "phone" = EXCLUDED."phone",
        "is_active" = EXCLUDED."is_active",
        "can_review_applications" = EXCLUDED."can_review_applications",
        "updated_at" = now()
      `,
      [
        userId,
        profile.displayName,
        profile.phone,
        profile.isActive,
        profile.canReviewApplications,
      ]
    )

    await db.query(
      `
      INSERT INTO "user_roles" ("user_id", "role")
      VALUES ($1, $2::"app_role")
      ON CONFLICT ("user_id", "role") DO NOTHING
      `,
      [userId, profile.role]
    )
  }

  await db.query(
    `
    INSERT INTO "students" (
      "id", "student_code", "full_name", "grade_level",
      "student_phone", "student_email",
      "guardian_name", "guardian_relation", "guardian_phone", "guardian_email",
      "status", "auth_user_id", "account_status"
    )
    VALUES
      (
        $1, 'HS-2026-0001', 'Em Minh Khôi', 'Lớp 10',
        '0903456789', 'student@mathinsight.edu.vn',
        'Nguyễn Văn Minh', 'Bố', '0911111111', 'phuhuynh.khoi@example.com',
        'active'::"student_status", $4, 'linked'::"account_status"
      ),
      (
        $2, 'HS-2026-0002', 'Trần Gia Hân', 'Lớp 10',
        '0905555111', 'giahan@example.com',
        'Trần Thị Lan', 'Mẹ', '0912222222', 'phuhuynh.han@example.com',
        'active'::"student_status", NULL, 'not_invited'::"account_status"
      ),
      (
        $3, 'HS-2026-0003', 'Lê Đức Anh', 'Lớp 11',
        '0906666222', 'ducanh@example.com',
        'Lê Văn Hùng', 'Bố', '0913333333', 'phuhuynh.anh@example.com',
        'active'::"student_status", NULL, 'invited'::"account_status"
      )
    ON CONFLICT ("student_code") DO UPDATE SET
      "full_name" = EXCLUDED."full_name",
      "grade_level" = EXCLUDED."grade_level",
      "auth_user_id" = EXCLUDED."auth_user_id",
      "account_status" = EXCLUDED."account_status",
      "updated_at" = now()
    `,
    [
      DEMO_IDS.studentLinked,
      DEMO_IDS.studentTwo,
      DEMO_IDS.studentThree,
      DEMO_IDS.studentUser,
    ]
  )

  await db.query(
    `
    INSERT INTO "classes" (
      "id", "class_code", "name", "grade_level", "teacher_user_id",
      "schedule_text", "room", "max_students", "start_date", "status"
    )
    VALUES
      (
        $1, 'TOAN10-A1', 'Toán 10 Chuyên đề Hàm số', 'Lớp 10', $3,
        'Thứ 3 & Thứ 5 (18:00 - 19:30)', 'P.201', 20, CURRENT_DATE - 14,
        'active'::"class_status"
      ),
      (
        $2, 'TOAN11-B1', 'Toán 11 Tổ hợp & Xác suất', 'Lớp 11', $3,
        'Thứ 4 & Thứ 6 (18:00 - 19:30)', 'P.202', 20, CURRENT_DATE + 7,
        'upcoming'::"class_status"
      )
    ON CONFLICT ("class_code") DO UPDATE SET
      "name" = EXCLUDED."name",
      "teacher_user_id" = EXCLUDED."teacher_user_id",
      "status" = EXCLUDED."status",
      "updated_at" = now()
    `,
    [DEMO_IDS.classTen, DEMO_IDS.classEleven, DEMO_IDS.teacherUser]
  )

  await db.query(
    `
    INSERT INTO "enrollments" ("id", "student_id", "class_id", "status")
    VALUES
      ($1, $4, $7, 'active'::"enrollment_status"),
      ($2, $5, $7, 'active'::"enrollment_status"),
      ($3, $6, $8, 'active'::"enrollment_status")
    ON CONFLICT ("id") DO NOTHING
    `,
    [
      DEMO_IDS.enrollmentOne,
      DEMO_IDS.enrollmentTwo,
      DEMO_IDS.enrollmentThree,
      DEMO_IDS.studentLinked,
      DEMO_IDS.studentTwo,
      DEMO_IDS.studentThree,
      DEMO_IDS.classTen,
      DEMO_IDS.classEleven,
    ]
  )

  await db.query(
    `
    INSERT INTO "class_sessions" (
      "id", "class_id", "session_no", "title",
      "starts_at", "ends_at", "attendance_opens_at", "attendance_closes_at",
      "status", "created_by"
    )
    VALUES
      (
        $1, $3, 1, 'Buổi 1: Khảo sát hàm bậc hai',
        now() - interval '15 minutes', now() + interval '75 minutes',
        now() - interval '30 minutes', now() + interval '45 minutes',
        'scheduled'::"session_status", $4
      ),
      (
        $2, $3, 2, 'Buổi 2: Bài tập nâng cao hàm số',
        now() + interval '2 days', now() + interval '2 days 90 minutes',
        now() + interval '2 days' - interval '15 minutes',
        now() + interval '2 days 45 minutes',
        'scheduled'::"session_status", $4
      )
    ON CONFLICT ("id") DO UPDATE SET
      "starts_at" = EXCLUDED."starts_at",
      "ends_at" = EXCLUDED."ends_at",
      "attendance_opens_at" = EXCLUDED."attendance_opens_at",
      "attendance_closes_at" = EXCLUDED."attendance_closes_at",
      "updated_at" = now()
    `,
    [
      DEMO_IDS.sessionOpen,
      DEMO_IDS.sessionScheduled,
      DEMO_IDS.classTen,
      admin.userId,
    ]
  )

  await db.query(
    `
    INSERT INTO "attendance_records" (
      "id", "session_id", "student_id", "status", "method", "recorded_by"
    )
    VALUES (
      $1, $2, $3, 'present'::"attendance_status", 'manual'::"attendance_method", $4
    )
    ON CONFLICT ("session_id", "student_id") DO NOTHING
    `,
    [
      DEMO_IDS.attendanceOne,
      DEMO_IDS.sessionOpen,
      DEMO_IDS.studentLinked,
      DEMO_IDS.teacherUser,
    ]
  )

  await db.query(
    `
    INSERT INTO "enrollment_applications" (
      "id", "application_code", "student_full_name", "requested_grade",
      "requested_class_id", "guardian_name", "guardian_relation",
      "guardian_phone", "guardian_email", "applicant_note",
      "consent_at", "consent_version", "status"
    )
    VALUES (
      $1, 'APP-2026-9001', 'Phạm Khánh Linh', 'Lớp 10',
      $2, 'Phạm Thị Hương', 'Mẹ',
      '0914444444', 'phuhuynh.linh@example.com',
      'Mong muốn học lớp Toán 10 buổi tối thứ 3 và thứ 5.',
      now(), 'v1.0', 'pending_review'::"application_status"
    )
    ON CONFLICT ("application_code") DO NOTHING
    `,
    [DEMO_IDS.applicationOne, DEMO_IDS.classTen]
  )

  await db.query(
    `
    INSERT INTO "application_status_history" (
      "id", "application_id", "from_status", "to_status", "note"
    )
    VALUES (
      $1, $2, NULL, 'pending_review'::"application_status", 'Nộp đơn đăng ký demo'
    )
    ON CONFLICT ("id") DO NOTHING
    `,
    [DEMO_IDS.applicationHistoryOne, DEMO_IDS.applicationOne]
  )
}

async function main() {
  const appEnv = loadAppEnv()
  if (appEnv === "production") {
    throw new Error("Refusing to run demo data seed in production environment")
  }

  const connectionString = requireEnv("DATABASE_URL")
  const pool = new pg.Pool({ connectionString })

  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await seedDemo(client)
    await client.query("COMMIT")
    console.log(`[seed-demo:${appEnv}] Demo accounts and sample data ready`)
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

const isEntryPoint =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === import.meta.filename

if (isEntryPoint) {
  main().catch((error) => {
    console.error(
      "[seed-demo] Failed:",
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  })
}
