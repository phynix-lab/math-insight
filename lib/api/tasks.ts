import type { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task"
import { taskSchema } from "@/types/task"
import { z } from "zod"

const taskListSchema = z.array(taskSchema)

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? "Request failed")
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export async function getTasks(): Promise<Task[]> {
  const response = await request<{ data: unknown }>("/api/tasks")
  return taskListSchema.parse(response.data)
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const response = await request<{ data: unknown }>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  })
  return taskSchema.parse(response.data)
}

export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const response = await request<{ data: unknown }>(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  })
  return taskSchema.parse(response.data)
}

export async function removeTask(id: string): Promise<void> {
  await request<void>(`/api/tasks/${id}`, { method: "DELETE" })
}
