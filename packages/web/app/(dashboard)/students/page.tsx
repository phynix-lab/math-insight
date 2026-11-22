"use client"

import { Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorView } from "@/components/ui/error-view"
import { useCurrentRole } from "@/components/providers/RoleProvider"

export default function StudentsPage() {
  const { currentRole } = useCurrentRole()

  if (currentRole === "student") {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <ErrorView
          title="Không có quyền truy cập"
          message="Chỉ Quản trị viên và Giáo viên mới có thẩm quyền xem danh sách và hồ sơ học sinh."
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
            Hồ sơ Học sinh
          </h1>
          <p className="text-sm text-muted-foreground">
            Quản lý mã học sinh, thông tin phụ huynh (người giám hộ) và trạng
            thái tài khoản.
          </p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Thêm học sinh
        </Button>
      </div>

      <EmptyState
        icon={Users}
        title="Chưa có hồ sơ học sinh nào"
        description="Danh sách học sinh đang trống. Bạn có thể thêm thủ công hoặc tiếp nhận học sinh từ các đơn đăng ký đã duyệt."
        action={
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Tạo hồ sơ học sinh mới
          </Button>
        }
      />
    </div>
  )
}
