"use client"

import { Plus, CalendarCheck, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorView } from "@/components/ui/error-view"
import { useCurrentRole } from "@/components/providers/RoleProvider"

export default function SessionsPage() {
  const { currentRole } = useCurrentRole()

  if (currentRole === "student") {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <ErrorView
          title="Không có quyền truy cập"
          message="Trang quản lý buổi học và điểm danh lớp dành riêng cho Quản trị viên và Giáo viên."
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
            Buổi học & Điểm danh
          </h1>
          <p className="text-sm text-muted-foreground">
            Mở cửa sổ điểm danh QR ngắn hạn, điểm danh thủ công và tổng kết buổi
            học.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <QrCode className="mr-1.5 h-4 w-4" />
            Mở mã QR điểm danh
          </Button>
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Tạo buổi học
          </Button>
        </div>
      </div>

      <EmptyState
        icon={CalendarCheck}
        title="Chưa có buổi học nào hôm nay"
        description="Không tìm thấy buổi học nào trong lịch trình. Bạn có thể lên lịch buổi học mới cho lớp phụ trách."
        action={
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Lên lịch buổi học
          </Button>
        }
      />
    </div>
  )
}
