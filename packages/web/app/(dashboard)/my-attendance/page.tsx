"use client"

import { QrCode, CheckCircle2 } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorView } from "@/components/ui/error-view"
import { useCurrentRole } from "@/components/providers/RoleProvider"

export default function MyAttendancePage() {
  const { currentRole } = useCurrentRole()

  if (currentRole !== "student") {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <ErrorView
          title="Trang dành cho học sinh"
          message="Phân hệ này hiển thị lịch sử và mã QR điểm danh của học sinh cá nhân. Vui lòng chuyển sang vai trò Học sinh để trải nghiệm."
          homeHref="/"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Điểm danh của tôi
        </h1>
        <p className="text-sm text-muted-foreground">
          Theo dõi lịch sử tham dự các buổi học và xuất trình mã điểm danh cá
          nhân.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <span className="text-xs font-medium text-muted-foreground">
            Đã tham gia
          </span>
          <p className="mt-2 text-2xl font-bold text-foreground">0 buổi</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <span className="text-xs font-medium text-muted-foreground">
            Tỷ lệ chuyên cần
          </span>
          <p className="mt-2 text-2xl font-bold text-foreground">100%</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <span className="text-xs font-medium text-muted-foreground">
            Trạng thái tài khoản
          </span>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Đã liên kết hồ sơ
          </p>
        </div>
      </div>

      <EmptyState
        icon={QrCode}
        title="Chưa có dữ liệu điểm danh"
        description="Bạn chưa có bản ghi điểm danh nào trong học kỳ hiện tại. Khi buổi học bắt đầu, hãy quét mã QR từ giáo viên để điểm danh."
      />
    </div>
  )
}
