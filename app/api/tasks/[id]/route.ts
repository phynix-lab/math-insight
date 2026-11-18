import { createTaskSchema, updateTaskSchema } from "@/types/task"
import { taskService } from "@/server/services/task.service"
import { notFoundResponse, parseRequestBody } from "@/server/utils/route-utils"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params
  const task = await taskService.getById(id)
  if (!task) return notFoundResponse("Task")
  return Response.json({ data: task })
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params
  const result = await parseRequestBody(request, updateTaskSchema)
  if (!result.ok) return result.response

  const task = await taskService.update(id, result.data)
  if (!task) return notFoundResponse("Task")
  return Response.json({ data: task })
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params
  const result = await parseRequestBody(request, createTaskSchema)
  if (!result.ok) return result.response

  const task = await taskService.update(id, result.data)
  if (!task) return notFoundResponse("Task")
  return Response.json({ data: task })
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params
  if (!(await taskService.delete(id))) return notFoundResponse("Task")
  return new Response(null, { status: 204 })
}
