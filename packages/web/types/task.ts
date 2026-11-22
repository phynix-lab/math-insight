import { z } from "zod"

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Tiêu đề không được để trống")
    .max(120, "Tiêu đề không được vượt quá 120 ký tự"),
  description: z
    .string()
    .trim()
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .optional()
    .default(""),
  completed: z.boolean().optional().default(false),
})

export const updateTaskSchema = createTaskSchema.partial()
export const taskSchema = createTaskSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
})

export type CreateTaskInput = z.output<typeof createTaskSchema>
export type CreateTaskFormValues = z.input<typeof createTaskSchema>
export type UpdateTaskInput = z.output<typeof updateTaskSchema>
export type Task = z.infer<typeof taskSchema>
