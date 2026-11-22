"use client"

import { FileText } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorView } from "@/components/ui/error-view"
import { useCurrentRole } from "@/components/providers/RoleProvider"

export default function ApplicationsPage() {
  const { currentRole, canReviewApplications } = useCurrentRole()

  // Kiểm tra quyền theo FR-012: Giáo viên chỉ được vào khi Admin bật can_review_applications
  const hasAccess =
    currentRole === "admin" ||
    (currentRole === "teacher" && canReviewApplications)

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <ErrorView
          title="Chưa được cấp quyền duyệt đơn (FR-012)"
          message="Bạn cần được Quản trị viên kích hoạt quyền 'can_review_applications' trong hồ sơ tài khoản để truy cập phân hệ này."
          homeHref="/"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Xét duyệt Đơn đăng ký tuyển sinh
            </h1>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              FR-011 • FR-012
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Tiếp nhận đơn từ form công khai, duyệt hoặc yêu cầu bổ sung thông
            tin từ phụ huynh.
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-border pb-2 text-sm font-medium">
        <button className="border-b-2 border-primary pb-2 font-semibold text-primary">
          Chờ duyệt (0)
        </button>
        <button className="pb-2 text-muted-foreground hover:text-foreground">
          Cần bổ sung (0)
        </button>
        <button className="pb-2 text-muted-foreground hover:text-foreground">
          Đã duyệt (0)
        </button>
        <button className="pb-2 text-muted-foreground hover:text-foreground">
          Đã từ chối (0)
        </button>
      </div>

      <EmptyState
        icon={FileText}
        title="Không có đơn đăng ký nào đang chờ duyệt"
        description="Tất cả các đơn đăng ký từ form công khai đã được xử lý xong hoặc chưa có đơn mới."
      />
    </div>
  )
}
