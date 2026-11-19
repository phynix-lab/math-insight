"use client"

import { Plus, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorView } from "@/components/ui/error-view"
import { useCurrentRole } from "@/components/providers/RoleProvider"

export default function UsersPage() {
  const { currentRole } = useCurrentRole()

  if (currentRole !== "admin") {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <ErrorView
          title="Yêu cầu quyền Quản trị viên"
          message="Chỉ Quản trị viên hệ thống mới có quyền quản lý tài khoản người dùng và gán phân quyền."
          homeHref="/"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tài khoản & Phân quyền
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý tài khoản (`profiles`), vai trò (`user_roles`) và cờ duyệt đơn (`can_review_applications`).
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Mời người dùng
        </Button>
      </div>

      <EmptyState
        icon={ShieldCheck}
        title="Danh sách người dùng"
        description="Quản trị viên có thể gửi email lời mời tài khoản tới Giáo viên hoặc Học sinh tại đây."
        action={
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Gửi lời mời tham gia
          </Button>
        }
      />
    </div>
  )
}
