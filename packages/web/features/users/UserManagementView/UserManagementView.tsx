"use client"

import { SuspenseWrapper } from "@/components/SuspenseWrapper"
import { ErrorView } from "@/components/ui/error-view"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import { CreateTeacherDialog } from "../CreateTeacherDialog/CreateTeacherDialog"
import { UserList } from "../UserList/UserList"

export function UserManagementView() {
  const { currentRole } = useCurrentRole()

  if (currentRole !== "admin") {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <ErrorView
          title="Yêu cầu quyền Quản trị viên"
          message="Chỉ Quản trị viên hệ thống mới có quyền truy cập trang quản lý người dùng, tạo giáo viên và gán phân quyền."
          homeHref="/"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Tiêu đề trang & Nút hành động */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tài khoản & Phân quyền
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý tài khoản giáo viên, nhân sự, phân quyền vai trò và cờ duyệt
            đơn tuyển sinh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CreateTeacherDialog />
        </div>
      </div>

      {/* Danh sách người dùng tải qua Suspense */}
      <SuspenseWrapper>
        <UserList />
      </SuspenseWrapper>
    </div>
  )
}
