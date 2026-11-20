"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import TextField from "@/components/form/TextField/TextField"
import { SuspenseWrapper } from "@/components/SuspenseWrapper"
import { Button } from "@/components/ui/button"
import {
  getTodosListQueryKey,
  useTodosCreate,
  useTodosDelete,
  useTodosListSuspense,
  useTodosUpdate,
} from "@/lib/api/generated/todos/todos"
import {
  CreateTodoRequest,
  type CreateTodoRequest as CreateTodoFormValues,
  type CreateTodoRequestOutput,
} from "@/types/generated/mathInsightAPI.schemas.zod"

function TodoList() {
  const queryClient = useQueryClient()
  const { data: todosResponse } = useTodosListSuspense()
  const todos = todosResponse.data

  const invalidateTodos = () =>
    queryClient.invalidateQueries({ queryKey: getTodosListQueryKey() })

  const updateMutation = useTodosUpdate({
    mutation: { onSuccess: invalidateTodos },
  })
  const deleteMutation = useTodosDelete({
    mutation: { onSuccess: invalidateTodos },
  })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="todos-heading" className="font-medium">
          Công việc
        </h2>
        <span className="text-sm text-muted-foreground">
          {todos.length} / {todosResponse.meta.total} mục
        </span>
      </div>

      {todos.length === 0 ? (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Chưa có công việc nào. Hãy tạo mục đầu tiên.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-start justify-between gap-4 rounded-xl border bg-card p-4"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={
                      todo.completed
                        ? "font-medium text-muted-foreground line-through"
                        : "font-medium"
                    }
                  >
                    {todo.title}
                  </h3>
                  <span className="rounded-md border px-1.5 py-0.5 text-xs text-muted-foreground">
                    {todo.priority}
                  </span>
                </div>
                {todo.description && (
                  <p className="break-words text-sm text-muted-foreground">
                    {todo.description}
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
                    updateMutation.mutate({
                      id: todo.id,
                      data: { completed: !todo.completed },
                    })
                  }
                >
                  {todo.completed ? "Hoàn tác" : "Hoàn thành"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate({ id: todo.id })}
                >
                  Xóa
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {(updateMutation.isError || deleteMutation.isError) && (
        <p role="alert" className="text-sm text-destructive">
          {updateMutation.error?.message ?? deleteMutation.error?.message}
        </p>
      )}
    </div>
  )
}

export default function Page() {
  const queryClient = useQueryClient()
  const form = useForm<CreateTodoFormValues, unknown, CreateTodoRequestOutput>({
    resolver: zodResolver(CreateTodoRequest),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      completed: false,
    },
  })

  const createMutation = useTodosCreate({
    mutation: {
      onSuccess: async () => {
        form.reset()
        await queryClient.invalidateQueries({
          queryKey: getTodosListQueryKey(),
        })
      },
    },
  })

  function onSubmit(values: CreateTodoRequestOutput) {
    createMutation.mutate({ data: values })
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-8 px-5 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Todo manager
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Danh sách công việc
        </h1>
        <p className="text-sm text-muted-foreground">
          Tạo, cập nhật trạng thái và xóa công việc qua API Todos được generate.
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

      <section aria-labelledby="todos-heading">
        <SuspenseWrapper
          fallback={
            <p className="text-sm text-muted-foreground">
              Đang tải công việc...
            </p>
          }
        >
          <TodoList />
        </SuspenseWrapper>
      </section>
    </main>
  )
}
