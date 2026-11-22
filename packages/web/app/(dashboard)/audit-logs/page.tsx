"use client"

import { History } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorView } from "@/components/ui/error-view"
import { useCurrentRole } from "@/components/providers/RoleProvider"

export default function AuditLogsPage() {
  const { currentRole } = useCurrentRole()

  if (currentRole !== "admin") {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <ErrorView
          title="Yêu cầu quyền Quản trị viên"
          message="Nhật ký thao tác hệ thống (audit_logs) chỉ mở cho Quản trị viên theo dõi."
          homeHref="/"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Nhật ký hệ thống (Audit Logs)
          </h1>
          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            Append-only
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Ghi nhận tự động các thao tác quan trọng: sửa điểm danh, đổi giáo
          viên, duyệt đơn, thay đổi quyền tài khoản.
        </p>
      </div>

      <EmptyState
        icon={History}
        title="Chưa có bản ghi nhật ký mới"
        description="Mọi thao tác thay đổi dữ liệu quan trọng sẽ được trigger database tự động ghi lại tại đây."
      />
    </div>
  )
}
