import { z } from "zod"
import type { AppRole } from "@/types/navigation"

export interface AuthUser {
  id: string
  email: string
  displayName: string
  role: AppRole
  canReviewApplications?: boolean
  isActive?: boolean
}

/**
 * Schema xác thực form đăng nhập với thông báo lỗi tiếng Việt đồng bộ.
 * Mật khẩu yêu cầu tối thiểu 8 ký tự và tối đa 128 ký tự.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email đăng nhập")
    .email("Email không đúng định dạng"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có tối thiểu 8 ký tự")
    .max(128, "Mật khẩu không được vượt quá 128 ký tự"),
})

export type LoginFormValues = z.input<typeof loginSchema>
export type LoginFormOutput = z.output<typeof loginSchema>

/**
 * Các tài khoản mẫu được cấu hình sẵn theo Database Design v0.6 và phục vụ kiểm thử AC-3
 */
export const DEMO_ACCOUNTS = [
  {
    role: "admin" as AppRole,
    roleLabel: "Quản trị viên",
    email: "admin@mathinsight.edu.vn",
    password: "admin123",
    displayName: "Nguyễn Quốc Huy",
    description:
      "Toàn quyền quản trị: lớp, học sinh, giáo viên, phân quyền và audit logs",
    canReviewApplications: true,
    isActive: true,
  },
  {
    role: "teacher" as AppRole,
    roleLabel: "Giáo viên",
    email: "teacher@mathinsight.edu.vn",
    password: "teacher123",
    displayName: "Thầy Hoàng Anh",
    description:
      "Quản lý lớp phụ trách, điểm danh QR, xem học sinh, duyệt đơn tuyển sinh",
    canReviewApplications: true,
    isActive: true,
  },
  {
    role: "student" as AppRole,
    roleLabel: "Học sinh",
    email: "student@mathinsight.edu.vn",
    password: "student123",
    displayName: "Em Minh Khôi",
    description:
      "Theo dõi lớp đang học, xem lịch học và xuất trình mã điểm danh cá nhân",
    canReviewApplications: false,
    isActive: true,
  },
  {
    role: "teacher" as AppRole,
    roleLabel: "Giáo viên (Đã khóa)",
    email: "inactive.teacher@mathinsight.edu.vn",
    password: "teacher123",
    displayName: "Cô Mai (Ngừng hoạt động)",
    description:
      "Tài khoản giáo viên đã khóa để kiểm thử AC-3: chặn đăng nhập tài khoản ngừng hoạt động",
    canReviewApplications: false,
    isActive: false,
  },
]
