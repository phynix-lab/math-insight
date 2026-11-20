"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextField from "@/components/form/TextField/TextField"
import { Button } from "@/components/ui/button"
import { createTask, getTasks, removeTask, updateTask } from "@/lib/api/tasks"
import {
  createTaskSchema,
  type CreateTaskFormValues,
  type CreateTaskInput,
} from "@/types/task"

const tasksQueryKey = ["tasks"]

export default function Page() {
  const queryClient = useQueryClient()
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

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-8 px-5 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Task manager</p>
        <h1 className="text-3xl font-semibold tracking-tight">Danh sách công việc</h1>
        <p className="text-sm text-muted-foreground">
          Tạo, cập nhật trạng thái và xóa công việc qua API Tasks.
        </p>
      </header>

      <form
        className="flex flex-col gap-3 rounded-xl border bg-card p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="font-medium">Thêm công việc</h2>
        <TextField
          control={form.control}
          name="title"
          placeholder="Tên công việc"
          aria-label="Tên công việc"
        />
        <TextField
          control={form.control}
          name="description"
          placeholder="Mô tả (không bắt buộc)"
          aria-label="Mô tả công việc"
        />
        <div>
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Đang tạo..." : "Thêm công việc"}
          </Button>
        </div>
        {createMutation.isError && (
          <p role="alert" className="text-sm text-destructive">
            {createMutation.error.message}
          </p>
        )}
      </form>

      <section className="space-y-3" aria-labelledby="tasks-heading">
        <div className="flex items-center justify-between">
          <h2 id="tasks-heading" className="font-medium">
            Công việc
          </h2>
          {tasksQuery.data && (
            <span className="text-sm text-muted-foreground">
              {tasksQuery.data.length} mục
            </span>
          )}
        </div>

        {tasksQuery.isPending && (
          <p className="text-sm text-muted-foreground">Đang tải công việc...</p>
        )}
        {tasksQuery.isError && (
          <p role="alert" className="text-sm text-destructive">
            Không tải được công việc: {tasksQuery.error.message}
          </p>
        )}
        {tasksQuery.data?.length === 0 && (
          <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Chưa có công việc nào. Hãy tạo mục đầu tiên.
          </p>
        )}

        <ul className="flex flex-col gap-2">
          {tasksQuery.data?.map((task) => (
            <li
              key={task.id}
              className="flex items-start justify-between gap-4 rounded-xl border bg-card p-4"
            >
              <div className="min-w-0 space-y-1">
                <h3 className={task.completed ? "font-medium line-through text-muted-foreground" : "font-medium"}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="break-words text-sm text-muted-foreground">
                    {task.description}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={updateMutation.isPending}
                  onClick={() =>
                    updateMutation.mutate({ id: task.id, completed: !task.completed })
                  }
                >
                  {task.completed ? "Hoàn tác" : "Hoàn thành"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(task.id)}
                >
                  Xóa
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {(updateMutation.isError || deleteMutation.isError) && (
          <p role="alert" className="text-sm text-destructive">
            {updateMutation.error?.message ?? deleteMutation.error?.message}
          </p>
        )}
      </section>
    </main>
  )
}
