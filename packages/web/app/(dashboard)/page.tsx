"use client"

import { useState } from "react"
import Link from "next/link"
import { FileQuestion, Shield, Sparkles, ListTodo } from "lucide-react"

import { SuspenseWrapper } from "@/components/SuspenseWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { ErrorView } from "@/components/ui/error-view"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import { AddTodo } from "@/features/todos/AddTodo/AddTodo"
import { TodoList } from "@/features/todos/TodoList/TodoList"
import { ROLE_CONFIGS } from "@/types/navigation"

export default function DashboardHomePage() {
  const { currentRole, canReviewApplications } = useCurrentRole()

  // State phục vụ việc mô phỏng và kiểm thử các trạng thái UI của ticket MI-002
  const [showSimulatedLoading, setShowSimulatedLoading] = useState(false)
  const [simulatedError, setSimulatedError] = useState<string | null>(null)

  const roleInfo = ROLE_CONFIGS[currentRole]

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* Banner chào mừng & Thông tin vai trò */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Sprint 1 • Ticket MI-002
              </span>
              <span className="text-xs text-muted-foreground">
                Khung ứng dụng Next.js & Phân quyền Menu
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Xin chào, bạn đang ở vai trò {roleInfo.label}
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              {roleInfo.description}. Menu điều hướng bên trái đã được lọc tự
              động phù hợp với thẩm quyền của vai trò này.
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            {roleInfo.label}
          </span>
        </div>

        {/* Banner phụ: hiển thị quyền xét duyệt đơn FR-012 từ DB với giáo viên */}
        {currentRole === "teacher" && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs">
            <div className="flex items-center gap-2 font-medium text-primary">
              <Shield className="h-4 w-4 shrink-0" />
              <span>
                Quyền xét duyệt đơn tuyển sinh (FR-012):{" "}
                <strong>
                  {canReviewApplications ? "Được bật" : "Chưa được bật"}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Khối Showcase kiểm tra các trạng thái chuẩn theo yêu cầu của ticket MI-002 */}
      <section className="space-y-4" aria-labelledby="showcase-heading">
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="showcase-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Kiểm tra các trạng thái giao diện chuẩn (MI-002)
            </h2>
            <p className="text-xs text-muted-foreground">
              Bao gồm: Loading skeleton, Error fallback, 404 & 500 pages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Card 1: Mô phỏng Loading Skeleton */}
          <div className="flex flex-col justify-between space-y-3 rounded-xl border border-border bg-card p-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Trạng thái chờ
              </span>
              <h3 className="text-sm font-medium">Loading Skeleton</h3>
              <p className="text-xs text-muted-foreground">
                Xem trước giao diện khung xương đồng bộ khi đang nạp dữ liệu.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSimulatedLoading(!showSimulatedLoading)}
              className="w-full text-xs"
            >
              {showSimulatedLoading ? "Tắt Skeleton" : "Bật thử Skeleton"}
            </Button>
          </div>

          {/* Card 2: Thử nghiệm Error State */}
          <div className="flex flex-col justify-between space-y-3 rounded-xl border border-border bg-card p-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Trạng thái lỗi
              </span>
              <h3 className="text-sm font-medium">Error Fallback</h3>
              <p className="text-xs text-muted-foreground">
                Hiển thị thông báo lỗi thân thiện kèm nút Thử lại (Retry).
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSimulatedError(
                  simulatedError
                    ? null
                    : "Không thể kết nối đến máy chủ cơ sở dữ liệu. Mã lỗi: DB_CONN_ERR_500"
                )
              }
              className="w-full text-xs"
            >
              {simulatedError ? "Đóng thông báo lỗi" : "Mô phỏng lỗi"}
            </Button>
          </div>

          {/* Card 3: Kiểm tra trang 404 */}
          <div className="flex flex-col justify-between space-y-3 rounded-xl border border-border bg-card p-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Trang lỗi 404
              </span>
              <h3 className="text-sm font-medium">Not Found Page</h3>
              <p className="text-xs text-muted-foreground">
                Điều hướng tới đường dẫn không tồn tại để kiểm tra trang 404.
              </p>
            </div>
            <Link
              href="/trang-khong-ton-tai"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "w-full text-xs",
              })}
            >
              <FileQuestion className="mr-1.5 h-3.5 w-3.5" />
              Mở trang 404
            </Link>
          </div>
        </div>

        {/* Vùng hiển thị Skeleton khi bật chế độ xem trước */}
        {showSimulatedLoading && (
          <div className="animate-in space-y-4 rounded-xl border border-dashed border-primary/40 bg-card p-6 duration-300 fade-in">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-semibold text-primary">
                Xem trước: Skeleton Loading State
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSimulatedLoading(false)}
                className="h-6 text-xs"
              >
                Đóng
              </Button>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* Vùng hiển thị ErrorView khi bật mô phỏng lỗi */}
        {simulatedError && (
          <div className="animate-in duration-300 fade-in">
            <ErrorView
              title="Lỗi mô phỏng trong quá trình xử lý"
              message={simulatedError}
              onRetry={() => setSimulatedError(null)}
              homeHref="/"
            />
          </div>
        )}
      </section>

      {/* Khu vực Todo Manager (TypeSpec & MSW Mock API từ PR #2) */}
      <section className="space-y-4" aria-labelledby="todos-heading">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-primary" />
              <h2
                id="todos-heading"
                className="text-lg font-semibold tracking-tight"
              >
                Danh sách Todos (TypeSpec & MSW Mock)
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Tạo, cập nhật trạng thái và xóa công việc qua API Todos sinh tự
              động từ TypeSpec contract.
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-xs">
          <AddTodo />

          <SuspenseWrapper
            fallback={
              <div className="space-y-2 pt-2">
                <Skeleton className="h-16 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
            }
          >
            <TodoList />
          </SuspenseWrapper>
        </div>
      </section>
    </div>
  )
}
