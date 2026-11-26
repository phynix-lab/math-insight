import { UserManagementView } from "@/features/users/UserManagementView/UserManagementView"

export const metadata = {
  title: "Tài khoản & Phân quyền | Math Insight",
  description:
    "Quản lý danh sách người dùng, vai trò và cờ duyệt đơn trong hệ thống Math Insight",
}

export default function UsersPage() {
  return <UserManagementView />
}
