/**
 * Các vai trò người dùng trong hệ thống Math Insight,
 * khớp với enum app_role trong Database Design v0.6.
 */
export type AppRole = "admin" | "teacher" | "student"

export interface RoleConfig {
  label: string
  description: string
  badgeVariant?: "default" | "secondary" | "outline"
}

export const ROLE_CONFIGS: Record<AppRole, RoleConfig> = {
  admin: {
    label: "Quản trị viên",
    description: "Quản lý toàn bộ hệ thống, lớp học, học sinh và xét duyệt đơn",
    badgeVariant: "default",
  },
  teacher: {
    label: "Giáo viên",
    description: "Phụ trách lớp học, điểm danh buổi học và quản lý học sinh",
    badgeVariant: "secondary",
  },
  student: {
    label: "Học sinh",
    description: "Theo dõi lớp đang học, lịch học và lịch sử điểm danh cá nhân",
    badgeVariant: "outline",
  },
}

export interface NavItem {
  id: string
  title: string
  href: string
  iconName: string
  description?: string
  /**
   * Danh sách vai trò được phép truy cập mục menu này.
   * Nếu không khai báo, tất cả các vai trò đều thấy.
   */
  roles?: AppRole[]
  /**
   * Yêu cầu cờ can_review_applications (dành riêng cho giáo viên được admin ủy quyền).
   */
  requiresReviewPermission?: boolean
  badge?: string
}

/**
 * Danh sách menu điều hướng theo các phân hệ trong MVP v0.6 và Sprint 1.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    title: "Tổng quan",
    href: "/",
    iconName: "LayoutDashboard",
    description: "Bảng điều khiển và thống kê chung",
  },
  {
    id: "classes",
    title: "Lớp học",
    href: "/classes",
    iconName: "GraduationCap",
    roles: ["admin", "teacher", "student"],
    description: "Danh sách và quản lý các lớp học",
  },
  {
    id: "sessions",
    title: "Buổi học & Điểm danh",
    href: "/sessions",
    iconName: "CalendarCheck",
    roles: ["admin", "teacher"],
    description: "Quản lý buổi học, điểm danh mã QR và thủ công",
  },
  {
    id: "attendance-history",
    title: "Điểm danh của tôi",
    href: "/my-attendance",
    iconName: "QrCode",
    roles: ["student"],
    description: "Lịch sử có mặt và mã điểm danh cá nhân",
  },
  {
    id: "students",
    title: "Hồ sơ học sinh",
    href: "/students",
    iconName: "Users",
    roles: ["admin", "teacher"],
    description: "Hồ sơ học sinh và thông tin liên hệ phụ huynh",
  },
  {
    id: "applications",
    title: "Đơn đăng ký",
    href: "/applications",
    iconName: "FileText",
    roles: ["admin", "teacher"],
    requiresReviewPermission: true,
    description: "Xét duyệt và xử lý đơn đăng ký nhập học (FR-011, FR-012)",
    badge: "Mới",
  },
  {
    id: "users",
    title: "Tài khoản & Phân quyền",
    href: "/users",
    iconName: "ShieldCheck",
    roles: ["admin"],
    description: "Quản lý tài khoản, gán vai trò và quyền duyệt đơn",
  },
  {
    id: "audit-logs",
    title: "Nhật ký hệ thống",
    href: "/audit-logs",
    iconName: "History",
    roles: ["admin"],
    description: "Theo dõi lịch sử thay đổi quan trọng trong hệ thống",
  },
]
