"use client"

import { Plus, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { useCurrentRole } from "@/components/providers/RoleProvider"

export default function ClassesPage() {
  const { currentRole } = useCurrentRole()
  const canManage = currentRole === "admin" || currentRole === "teacher"

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Quản lý Lớp học
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentRole === "student"
              ? "Danh sách các lớp học bạn đang theo học tại Math Insight."
              : "Theo dõi và quản lý các lớp học, giáo viên phụ trách và sĩ số."}
          </p>
        </div>
        {canManage && (
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Tạo lớp học mới
          </Button>
        )}
      </div>

      <EmptyState
        icon={GraduationCap}
        title="Chưa có dữ liệu lớp học"
        description={
          canManage
            ? "Hiện tại chưa có lớp học nào được khởi tạo trong hệ thống. Hãy bắt đầu bằng việc tạo lớp đầu tiên."
            : "Bạn chưa được ghi danh vào lớp học nào. Vui lòng liên hệ trung tâm để được xếp lớp."
        }
        action={
          canManage ? (
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Thêm lớp học đầu tiên
            </Button>
          ) : undefined
        }
      />
    </div>
  )
}
