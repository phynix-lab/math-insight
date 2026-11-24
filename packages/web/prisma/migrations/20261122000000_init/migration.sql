-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateEnum
CREATE TYPE "app_role" AS ENUM ('admin', 'teacher', 'student');

-- CreateEnum
CREATE TYPE "application_status" AS ENUM ('pending_review', 'need_more_info', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "attendance_status" AS ENUM ('present', 'late', 'absent', 'excused');

-- CreateEnum
CREATE TYPE "attendance_method" AS ENUM ('qr', 'manual', 'system');

-- CreateEnum
CREATE TYPE "class_status" AS ENUM ('upcoming', 'active', 'inactive');

-- CreateEnum
CREATE TYPE "enrollment_status" AS ENUM ('active', 'ended', 'cancelled');

-- CreateEnum
CREATE TYPE "session_status" AS ENUM ('scheduled', 'cancelled');

-- CreateEnum
CREATE TYPE "student_status" AS ENUM ('active', 'paused', 'left');

-- CreateEnum
CREATE TYPE "account_status" AS ENUM ('not_invited', 'invited', 'invite_failed', 'linked');

-- CreateTable
CREATE TABLE "profiles" (
    "user_id" UUID NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "can_review_applications" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "role" "app_role" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "student_code" VARCHAR(50) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "date_of_birth" DATE,
    "grade_level" VARCHAR(50),
    "student_phone" VARCHAR(20),
    "student_email" CITEXT,
    "guardian_name" VARCHAR(255),
    "guardian_relation" VARCHAR(50),
    "guardian_phone" VARCHAR(20),
    "guardian_email" CITEXT,
    "status" "student_status" NOT NULL DEFAULT 'active',
    "auth_user_id" UUID,
    "account_status" "account_status" NOT NULL DEFAULT 'not_invited',
    "invited_at" TIMESTAMPTZ,
    "invite_attempts" INTEGER NOT NULL DEFAULT 0,
    "invite_last_error" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "class_code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "grade_level" VARCHAR(50) NOT NULL,
    "teacher_user_id" UUID NOT NULL,
    "schedule_text" TEXT,
    "room" VARCHAR(50),
    "max_students" INTEGER,
    "start_date" DATE,
    "end_date" DATE,
    "status" "class_status" NOT NULL DEFAULT 'upcoming',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "student_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "start_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "end_date" DATE,
    "status" "enrollment_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "class_id" UUID NOT NULL,
    "session_no" INTEGER,
    "title" VARCHAR(255),
    "starts_at" TIMESTAMPTZ NOT NULL,
    "ends_at" TIMESTAMPTZ NOT NULL,
    "attendance_opens_at" TIMESTAMPTZ NOT NULL,
    "attendance_closes_at" TIMESTAMPTZ NOT NULL,
    "substitute_teacher_user_id" UUID,
    "status" "session_status" NOT NULL DEFAULT 'scheduled',
    "closed_at" TIMESTAMPTZ,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "used_at" TIMESTAMPTZ,
    "revoked_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attendance_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_records" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "status" "attendance_status" NOT NULL,
    "method" "attendance_method" NOT NULL,
    "token_id" UUID,
    "recorded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recorded_by" UUID,
    "reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("id")
);

-- CreateSequence
CREATE SEQUENCE IF NOT EXISTS "application_code_seq";

-- CreateTable
CREATE TABLE "enrollment_applications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_code" VARCHAR(50) NOT NULL DEFAULT ((('APP-'::text || to_char(now(), 'YYYY'::text)) || '-'::text) || lpad((nextval('application_code_seq'::regclass))::text, 4, '0'::text)),
    "student_full_name" VARCHAR(255) NOT NULL,
    "student_dob" DATE,
    "requested_grade" VARCHAR(50),
    "requested_class_id" UUID,
    "student_phone" VARCHAR(20),
    "student_email" CITEXT,
    "guardian_name" VARCHAR(255),
    "guardian_relation" VARCHAR(50),
    "guardian_phone" VARCHAR(20) NOT NULL,
    "guardian_email" CITEXT,
    "applicant_note" TEXT,
    "consent_at" TIMESTAMPTZ NOT NULL,
    "consent_version" VARCHAR(20) NOT NULL,
    "status" "application_status" NOT NULL DEFAULT 'pending_review',
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMPTZ,
    "review_note" TEXT,
    "created_student_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollment_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_status_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_id" UUID NOT NULL,
    "from_status" "application_status",
    "to_status" "application_status" NOT NULL,
    "changed_by" UUID,
    "note" TEXT,
    "changed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "actor_user_id" UUID,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(100) NOT NULL,
    "entity_id" UUID,
    "before_data" JSONB,
    "after_data" JSONB,
    "reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_roles_role_idx" ON "user_roles"("role");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_key" ON "user_roles"("user_id", "role");

-- CreateIndex
CREATE UNIQUE INDEX "students_student_code_key" ON "students"("student_code");

-- CreateIndex
CREATE UNIQUE INDEX "students_auth_user_id_key" ON "students"("auth_user_id");

-- CreateIndex
CREATE INDEX "students_status_idx" ON "students"("status");

-- CreateIndex
CREATE INDEX "students_account_status_idx" ON "students"("account_status");

-- CreateIndex
CREATE INDEX "students_guardian_phone_idx" ON "students"("guardian_phone");

-- CreateIndex
CREATE UNIQUE INDEX "classes_class_code_key" ON "classes"("class_code");

-- CreateIndex
CREATE INDEX "classes_teacher_user_id_idx" ON "classes"("teacher_user_id");

-- CreateIndex
CREATE INDEX "classes_status_idx" ON "classes"("status");

-- CreateIndex
CREATE INDEX "enrollments_student_id_class_id_idx" ON "enrollments"("student_id", "class_id");

-- CreateIndex
CREATE INDEX "enrollments_class_id_status_idx" ON "enrollments"("class_id", "status");

-- CreateIndex
CREATE INDEX "class_sessions_class_id_starts_at_idx" ON "class_sessions"("class_id", "starts_at");

-- CreateIndex
CREATE INDEX "class_sessions_status_idx" ON "class_sessions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_tokens_token_hash_key" ON "attendance_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "attendance_tokens_session_id_student_id_idx" ON "attendance_tokens"("session_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_records_token_id_key" ON "attendance_records"("token_id");

-- CreateIndex
CREATE INDEX "attendance_records_student_id_recorded_at_idx" ON "attendance_records"("student_id", "recorded_at");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_records_session_id_student_id_key" ON "attendance_records"("session_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_applications_application_code_key" ON "enrollment_applications"("application_code");

-- CreateIndex
CREATE INDEX "enrollment_applications_status_created_at_idx" ON "enrollment_applications"("status", "created_at");

-- CreateIndex
CREATE INDEX "enrollment_applications_requested_class_id_idx" ON "enrollment_applications"("requested_class_id");

-- CreateIndex
CREATE INDEX "application_status_history_application_id_changed_at_idx" ON "application_status_history"("application_id", "changed_at");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_actor_user_id_created_at_idx" ON "audit_logs"("actor_user_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "profiles"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_teacher_user_id_fkey" FOREIGN KEY ("teacher_user_id") REFERENCES "profiles"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_sessions" ADD CONSTRAINT "class_sessions_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_sessions" ADD CONSTRAINT "class_sessions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "profiles"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_sessions" ADD CONSTRAINT "class_sessions_substitute_teacher_user_id_fkey" FOREIGN KEY ("substitute_teacher_user_id") REFERENCES "profiles"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_tokens" ADD CONSTRAINT "attendance_tokens_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "class_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_tokens" ADD CONSTRAINT "attendance_tokens_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "class_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "attendance_tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_recorded_by_fkey" FOREIGN KEY ("recorded_by") REFERENCES "profiles"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_applications" ADD CONSTRAINT "enrollment_applications_requested_class_id_fkey" FOREIGN KEY ("requested_class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_applications" ADD CONSTRAINT "enrollment_applications_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "profiles"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_applications" ADD CONSTRAINT "enrollment_applications_created_student_id_fkey" FOREIGN KEY ("created_student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_status_history" ADD CONSTRAINT "application_status_history_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "enrollment_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_status_history" ADD CONSTRAINT "application_status_history_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "profiles"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "profiles"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateView
CREATE OR REPLACE VIEW "v_class_sessions" AS
SELECT
    cs."id",
    cs."class_id",
    cs."session_no",
    cs."title",
    cs."starts_at",
    cs."ends_at",
    cs."attendance_opens_at",
    cs."attendance_closes_at",
    cs."substitute_teacher_user_id",
    cs."status",
    CASE
        WHEN cs."status" = 'cancelled'::"session_status" THEN 'cancelled'
        WHEN cs."closed_at" IS NOT NULL OR now() > cs."attendance_closes_at" THEN 'closed'
        WHEN now() >= cs."attendance_opens_at" THEN 'open'
        ELSE 'scheduled'
    END AS "effective_status",
    cs."closed_at",
    cs."created_by",
    cs."created_at",
    cs."updated_at"
FROM "class_sessions" cs;
