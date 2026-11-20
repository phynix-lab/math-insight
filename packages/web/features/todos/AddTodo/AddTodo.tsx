"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import TextField from "@/components/form/TextField/TextField"
import { Button } from "@/components/ui/button"
import {
  getTodosListQueryKey,
  useTodosCreate,
} from "@/lib/api/generated/todos/todos"
import {
  CreateTodoRequest,
  CreateTodoRequest as createTodoRequest,
} from "@/types/generated/mathInsightAPI.schemas.zod"

export function AddTodo() {
  const queryClient = useQueryClient()
  const form = useForm<CreateTodoRequest>({
    resolver: zodResolver(createTodoRequest),
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

  function onSubmit(values: CreateTodoRequest) {
    createMutation.mutate({ data: values })
  }

  return (
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
  )
}
