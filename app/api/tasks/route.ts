import { taskService } from "@/server/services/task.service"
import { createTaskSchema } from "@/types/task"
import { parseRequestBody } from "@/server/utils/route-utils"

export async function GET() {
  const tasks = await taskService.getAll()
  return Response.json({ data: tasks })
}

export async function POST(request: Request) {
  const result = await parseRequestBody(request, createTaskSchema)
  if (!result.ok) return result.response

  const task = await taskService.create(result.data)
  return Response.json({ data: task }, { status: 201 })
}
