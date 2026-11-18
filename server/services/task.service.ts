import "server-only"

import { taskRepository } from "@/server/repositories/task.repository"
import type { CreateTaskInput, UpdateTaskInput } from "@/types/task"

export const taskService = {
  getAll() {
    return taskRepository.findAll()
  },

  getById(id: string) {
    return taskRepository.findById(id)
  },

  create(input: CreateTaskInput) {
    return taskRepository.create(input)
  },

  update(id: string, input: UpdateTaskInput) {
    return taskRepository.update(id, input)
  },

  delete(id: string) {
    return taskRepository.delete(id)
  },
}
