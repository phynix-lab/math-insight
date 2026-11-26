import "server-only"

import type { AppRole } from "@/types/navigation"

export interface StoredUserProfile {
  userId: string
  displayName: string
  phone: string | null
  email: string
  isActive: boolean
  canReviewApplications: boolean
  roles: AppRole[]
  createdAt: string
  updatedAt: string
}

export interface StoredUserAccount {
  id: string
  email: string
  passwordHash: string
  displayName: string
  phone: string | null
  isActive: boolean
  canReviewApplications: boolean
  roles: AppRole[]
  studentId: string | null
  createdAt: string
  updatedAt: string
}

export interface StoredClass {
  id: string
  name: string
  code: string
  teacherUserId: string | null
  status: "upcoming" | "active" | "inactive"
}

export interface StoredAuditLog {
  id: string
  actorUserId: string | null
  actorDisplayName: string | null
  action: string
  entityType: string
  entityId: string | null
  beforeData: Record<string, unknown> | null
  afterData: Record<string, unknown> | null
  reason: string | null
  createdAt: string
}

// Bộ dữ liệu in-memory đồng bộ chuẩn Database Design v0.6 và TypeSpec contract
const INITIAL_USERS: StoredUserAccount[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "admin@mathinsight.edu.vn",
    passwordHash: "admin123",
    displayName: "Nguyễn Quốc Huy",
    phone: "0901234567",
    isActive: true,
    canReviewApplications: true,
    roles: ["admin"],
    studentId: null,
    createdAt: "2026-10-01T08:00:00Z",
    updatedAt: "2026-11-20T08:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "teacher@mathinsight.edu.vn",
    passwordHash: "teacher123",
    displayName: "Thầy Hoàng Anh",
    phone: "0902345678",
    isActive: true,
    canReviewApplications: false,
    roles: ["teacher"],
    studentId: null,
    createdAt: "2026-10-05T08:00:00Z",
    updatedAt: "2026-11-20T08:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440101",
    email: "quan.nguyen@mathinsight.vn",
    passwordHash: "teacher123",
    displayName: "Thầy Nguyễn Minh Quân",
    phone: "0901234567",
    isActive: true,
    canReviewApplications: true,
    roles: ["teacher"],
    studentId: null,
    createdAt: "2026-10-01T08:00:00Z",
    updatedAt: "2026-11-17T09:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440102",
    email: "ha.tran@mathinsight.vn",
    passwordHash: "teacher123",
    displayName: "Cô Trần Thu Hà",
    phone: "0912345678",
    isActive: true,
    canReviewApplications: false,
    roles: ["teacher"],
    studentId: null,
    createdAt: "2026-10-05T08:00:00Z",
    updatedAt: "2026-11-10T10:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    email: "student@mathinsight.edu.vn",
    passwordHash: "student123",
    displayName: "Em Minh Khôi",
    phone: "0903456789",
    isActive: true,
    canReviewApplications: false,
    roles: ["student"],
    studentId: "550e8400-e29b-41d4-a716-446655440099",
    createdAt: "2026-10-10T08:00:00Z",
    updatedAt: "2026-11-20T08:30:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    email: "inactive.teacher@mathinsight.edu.vn",
    passwordHash: "teacher123",
    displayName: "Cô Mai (Ngừng hoạt động)",
    phone: "0904567890",
    isActive: false,
    canReviewApplications: false,
    roles: ["teacher"],
    studentId: null,
    createdAt: "2026-10-15T08:00:00Z",
    updatedAt: "2026-11-20T08:30:00Z",
  },
]

// Lớp học phục vụ kiểm tra AC-4 (giáo viên phụ trách lớp chưa inactive)
const INITIAL_CLASSES: StoredClass[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440201",
    name: "Toán Nâng Cao 10A1",
    code: "MATH10-A1",
    teacherUserId: "550e8400-e29b-41d4-a716-446655440002", // Thầy Hoàng Anh
    status: "active",
  },
]

const INITIAL_AUDIT_LOGS: StoredAuditLog[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440301",
    actorUserId: "550e8400-e29b-41d4-a716-446655440001",
    actorDisplayName: "Nguyễn Quốc Huy",
    action: "USER_LOGIN",
    entityType: "auth",
    entityId: "550e8400-e29b-41d4-a716-446655440001",
    beforeData: null,
    afterData: null,
    reason: null,
    createdAt: "2026-11-20T08:00:00Z",
  },
]

declare global {
  var __memoryStore:
    | {
        users: StoredUserAccount[]
        classes: StoredClass[]
        auditLogs: StoredAuditLog[]
      }
    | undefined
}

if (!globalThis.__memoryStore) {
  globalThis.__memoryStore = {
    users: [...INITIAL_USERS],
    classes: [...INITIAL_CLASSES],
    auditLogs: [...INITIAL_AUDIT_LOGS],
  }
}

export const memoryStore = globalThis.__memoryStore
