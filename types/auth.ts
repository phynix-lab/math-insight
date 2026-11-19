import type { AppRole } from "@/types/navigation"

export interface AuthUser {
  id: string
  email: string
  displayName: string
  role: AppRole
  canReviewApplications?: boolean
}

/**
 * 3 tài khoản mẫu được cấu hình sẵn theo 3 vai trò trong Database Design v0.6
 */
export const DEMO_ACCOUNTS = [
  {
    role: "admin" as AppRole,
    roleLabel: "Quản trị viên",
    email: "admin@mathinsight.edu.vn",
    password: "admin123",
    displayName: "Nguyễn Quốc Huy",
    description: "Toàn quyền quản trị: lớp, học sinh, giáo viên, phân quyền và audit logs",
    canReviewApplications: true,
  },
  {
    role: "teacher" as AppRole,
    roleLabel: "Giáo viên",
    email: "teacher@mathinsight.edu.vn",
    password: "teacher123",
    displayName: "Thầy Hoàng Anh",
    description: "Quản lý lớp phụ trách, điểm danh QR, xem học sinh, duyệt đơn tuyển sinh",
    canReviewApplications: true,
  },
  {
    role: "student" as AppRole,
    roleLabel: "Học sinh",
    email: "student@mathinsight.edu.vn",
    password: "student123",
    displayName: "Em Minh Khôi",
    description: "Theo dõi lớp đang học, xem lịch học và xuất trình mã điểm danh cá nhân",
    canReviewApplications: false,
  },
]
