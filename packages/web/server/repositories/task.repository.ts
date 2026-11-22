import "server-only"

import { randomUUID } from "node:crypto"
import type { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task"

// Demo storage only. Replace this repository implementation with a database
// adapter when task data needs to persist across server restarts.
const tasks: Task[] = []

export const taskRepository = {
  async findAll(): Promise<Task[]> {
    return [...tasks]
  },

  async findById(id: string): Promise<Task | undefined> {
    return tasks.find((task) => task.id === id)
  },

  async create(input: CreateTaskInput): Promise<Task> {
    const task: Task = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    }
    tasks.push(task)
    return task
  },

  async update(id: string, input: UpdateTaskInput): Promise<Task | undefined> {
    const task = tasks.find((item) => item.id === id)
    if (!task) return undefined
    Object.assign(task, input)
    return task
  },

  async delete(id: string): Promise<boolean> {
    const index = tasks.findIndex((task) => task.id === id)
    if (index === -1) return false
    tasks.splice(index, 1)
    return true
  },
}
