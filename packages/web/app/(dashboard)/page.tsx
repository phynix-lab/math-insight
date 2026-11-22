"use client"

import { useState } from "react"
import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  FileQuestion,
  Shield,
  Sparkles,
  Inbox,
  ListTodo,
} from "lucide-react"

import TextField from "@/components/form/TextField/TextField"
import { SuspenseWrapper } from "@/components/SuspenseWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorView } from "@/components/ui/error-view"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import { AddTodo } from "@/features/todos/AddTodo/AddTodo"
import { TodoList } from "@/features/todos/TodoList/TodoList"
import { createTask, getTasks, removeTask, updateTask } from "@/lib/api/tasks"
import { ROLE_CONFIGS, type AppRole } from "@/types/navigation"
import {
  createTaskSchema,
  type CreateTaskFormValues,
  type CreateTaskInput,
} from "@/types/task"

const tasksQueryKey = ["tasks"]

export default function DashboardHomePage() {
  const { currentRole, setRole, canReviewApplications, setCanReviewApplications } =
    useCurrentRole()
  const queryClient = useQueryClient()

  // State phục vụ việc mô phỏng và kiểm thử các trạng thái UI của ticket MI-002
  const [showSimulatedLoading, setShowSimulatedLoading] = useState(false)
  const [simulatedError, setSimulatedError] = useState<string | null>(null)

  // React Hook Form & React Query cho Task Manager
  const form = useForm<CreateTaskFormValues, unknown, CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: "", description: "", completed: false },
  })

  const tasksQuery = useQuery({ queryKey: tasksQueryKey, queryFn: getTasks })
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      form.reset()
      await queryClient.invalidateQueries({ queryKey: tasksQueryKey })
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTask(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: tasksQueryKey }),
  })
  const deleteMutation = useMutation({
    mutationFn: removeTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: tasksQueryKey }),
  })

  function onSubmit(values: CreateTaskInput) {
    createMutation.mutate(values)
  }

  const roleInfo = ROLE_CONFIGS[currentRole]

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* Banner chào mừng & Thông tin vai trò */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-xs">
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
            <p className="text-sm text-muted-foreground max-w-2xl">
              {roleInfo.description}. Menu điều hướng bên trái đã được lọc tự động
              phù hợp với thẩm quyền của vai trò này.
            </p>
          </div>

          {/* Quick switcher trên banner */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {(["admin", "teacher", "student"] as AppRole[]).map((r) => (
              <Button
                key={r}
                type="button"
                variant={currentRole === r ? "default" : "outline"}
                size="sm"
                onClick={() => setRole(r)}
                className="text-xs"
              >
                {ROLE_CONFIGS[r].label}
              </Button>
            ))}
          </div>
        </div>

        {/* Banner phụ: cảnh báo cờ FR-012 với giáo viên */}
        {currentRole === "teacher" && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Shield className="h-4 w-4 shrink-0" />
              <span>
                Quyền xét duyệt đơn tuyển sinh (FR-012):{" "}
                <strong>{canReviewApplications ? "Được bật" : "Chưa được bật"}</strong>
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCanReviewApplications(!canReviewApplications)}
              className="h-7 text-xs bg-background"
            >
              {canReviewApplications ? "Tắt quyền duyệt đơn" : "Bật quyền duyệt đơn"}
            </Button>
          </div>
        )}
      </div>

      {/* Khối Showcase kiểm tra các trạng thái chuẩn theo yêu cầu của ticket MI-002 */}
      <section className="space-y-4" aria-labelledby="showcase-heading">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="showcase-heading" className="text-lg font-semibold tracking-tight">
              Kiểm tra các trạng thái giao diện chuẩn (MI-002)
            </h2>
            <p className="text-xs text-muted-foreground">
              Bao gồm: Loading skeleton, Empty state, Error fallback, 404 & 500 pages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Mô phỏng Loading Skeleton */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Trạng thái chờ
              </span>
              <h3 className="font-medium text-sm">Loading Skeleton</h3>
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

          {/* Card 2: Thử nghiệm Empty State */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Trạng thái rỗng
              </span>
              <h3 className="font-medium text-sm">Empty State</h3>
              <p className="text-xs text-muted-foreground">
                Component hiển thị chuẩn khi danh sách dữ liệu chưa có mục nào.
              </p>
            </div>
            <span className="text-xs text-primary font-medium">
              Áp dụng tại danh sách bên dưới ↓
            </span>
          </div>

          {/* Card 3: Thử nghiệm Error State */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Trạng thái lỗi
              </span>
              <h3 className="font-medium text-sm">Error Fallback</h3>
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
                    : "Không thể kết nối đến máy chủ Supabase Database. Mã lỗi: DB_CONN_ERR_500"
                )
              }
              className="w-full text-xs"
            >
              {simulatedError ? "Đóng thông báo lỗi" : "Mô phỏng lỗi"}
            </Button>
          </div>

          {/* Card 4: Kiểm tra trang 404 */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Trang lỗi 404
              </span>
              <h3 className="font-medium text-sm">Not Found Page</h3>
              <p className="text-xs text-muted-foreground">
                Điều hướng tới đường dẫn không tồn tại để kiểm tra trang 404.
              </p>
            </div>
            <Link
              href="/trang-khong-ton-tai"
              className={buttonVariants({ variant: "outline", size: "sm", className: "w-full text-xs" })}
            >
              <FileQuestion className="mr-1.5 h-3.5 w-3.5" />
              Mở trang 404
            </Link>
          </div>
        </div>

        {/* Vùng hiển thị Skeleton khi bật chế độ xem trước */}
        {showSimulatedLoading && (
          <div className="rounded-xl border border-dashed border-primary/40 bg-card p-6 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 border-b">
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* Vùng hiển thị ErrorView khi bật mô phỏng lỗi */}
        {simulatedError && (
          <div className="animate-in fade-in duration-300">
            <ErrorView
              title="Lỗi mô phỏng trong quá trình xử lý"
              message={simulatedError}
              onRetry={() => setSimulatedError(null)}
              homeHref="/"
            />
          </div>
        )}
      </section>

      {/* Khu vực Task Manager (kết hợp các UI component chuẩn) */}
      <section className="space-y-4" aria-labelledby="tasks-section-heading">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="tasks-section-heading" className="text-lg font-semibold tracking-tight">
              Quản lý công việc (Task Manager)
            </h2>
            <p className="text-xs text-muted-foreground">
              Tích hợp API Tasks với form validation, danh sách và Empty State chuẩn.
            </p>
          </div>
          {tasksQuery.data && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {tasksQuery.data.length} công việc
            </span>
          )}
        </div>

        {/* Form thêm mới công việc */}
        <form
          className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-xs"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h3 className="text-sm font-semibold text-foreground">Thêm công việc mới</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextField
              control={form.control}
              name="title"
              placeholder="Tên công việc (bắt buộc)"
              aria-label="Tên công việc"
            />
            <TextField
              control={form.control}
              name="description"
              placeholder="Mô tả chi tiết (không bắt buộc)"
              aria-label="Mô tả công việc"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            <Button type="submit" size="sm" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Đang thêm..." : "Thêm công việc"}
            </Button>
            {createMutation.isError && (
              <p role="alert" className="text-xs text-destructive">
                {createMutation.error.message}
              </p>
            )}
          </div>
        </form>

        {/* Danh sách công việc hoặc Empty State / Error View */}
        {tasksQuery.isPending && (
          <div className="space-y-2 pt-2">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        )}

        {tasksQuery.isError && (
          <ErrorView
            compact
            title="Không thể tải danh sách công việc"
            message={tasksQuery.error.message}
            onRetry={() => tasksQuery.refetch()}
          />
        )}

        {tasksQuery.data && tasksQuery.data.length === 0 && (
          <EmptyState
            icon={Inbox}
            title="Chưa có công việc nào trong danh sách"
            description="Hiện tại chưa có công việc nào được ghi nhận. Bạn có thể sử dụng form phía trên để tạo mục công việc đầu tiên."
          />
        )}

        {tasksQuery.data && tasksQuery.data.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {tasksQuery.data.map((task) => (
              <li
                key={task.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-muted-foreground/30 shadow-2xs"
              >
                <div className="min-w-0 space-y-1">
                  <h4
                    className={
                      task.completed
                        ? "text-sm font-medium line-through text-muted-foreground"
                        : "text-sm font-medium text-foreground"
                    }
                  >
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="break-words text-xs text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={updateMutation.isPending}
                    onClick={() =>
                      updateMutation.mutate({ id: task.id, completed: !task.completed })
                    }
                    className="h-8 text-xs"
                  >
                    {task.completed ? "Hoàn tác" : "Hoàn thành"}
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(task.id)}
                    className="h-8 text-xs"
                  >
                    Xóa
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {(updateMutation.isError || deleteMutation.isError) && (
          <p role="alert" className="text-xs text-destructive">
            {updateMutation.error?.message ?? deleteMutation.error?.message}
          </p>
        )}
      </section>

      {/* Khu vực Todo Manager (TypeSpec & MSW Mock API từ PR #2) */}
      <section className="space-y-4" aria-labelledby="todos-heading">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-primary" />
              <h2 id="todos-heading" className="text-lg font-semibold tracking-tight">
                Danh sách Todos (TypeSpec & MSW Mock)
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Tạo, cập nhật trạng thái và xóa công việc qua API Todos sinh tự động từ TypeSpec contract.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-6">
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
