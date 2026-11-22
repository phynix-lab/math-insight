import "server-only"

import type { AppRole } from "@/types/navigation"

export interface StoredUser {
  id: string
  email: string
  passwordHash: string
  displayName: string
  phone: string | null
  isActive: boolean
  canReviewApplications: boolean
  roles: AppRole[]
  studentId: string | null
}

/**
 * Danh sách người dùng hệ thống phục vụ xác thực phía Server.
 * Bao gồm các tài khoản theo chuẩn Database Design v0.6 và tài khoản test AC-3.
 */
const INITIAL_USERS: StoredUser[] = [
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
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "teacher@mathinsight.edu.vn",
    passwordHash: "teacher123",
    displayName: "Thầy Hoàng Anh",
    phone: "0902345678",
    isActive: true,
    canReviewApplications: true,
    roles: ["teacher"],
    studentId: null,
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
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    email: "inactive.teacher@mathinsight.edu.vn",
    passwordHash: "teacher123",
    displayName: "Cô Mai (Ngừng hoạt động)",
    phone: "0904567890",
    isActive: false, // Phục vụ kiểm thử AC-3: tài khoản ngừng hoạt động
    canReviewApplications: false,
    roles: ["teacher"],
    studentId: null,
  },
]

export const authRepository = {
  async findByEmail(email: string): Promise<StoredUser | null> {
    const normalized = email.trim().toLowerCase()
    const user = INITIAL_USERS.find((u) => u.email.toLowerCase() === normalized)
    return user ? { ...user } : null
  },

  async findById(id: string): Promise<StoredUser | null> {
    const user = INITIAL_USERS.find((u) => u.id === id)
    return user ? { ...user } : null
  },
}
