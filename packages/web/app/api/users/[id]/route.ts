import { withAuth } from "@/server/utils/auth-guard"
import { userService, UserServiceError } from "@/server/services/user.service"
import { parseRequestBody } from "@/server/utils/route-utils"
import { UpdateUserRequest } from "@/types/generated/mathInsightAPI.schemas.zod"

export const GET = withAuth<{ id: string }>(
  async (request, { user, params }) => {
    const { id: userId } = await params
    try {
      const userProfile = await userService.getUserById(user, userId)
      return Response.json({ data: userProfile }, { status: 200 })
    } catch (err) {
      if (err instanceof UserServiceError) {
        return Response.json(
          { error: err.code, message: err.message },
          { status: err.status }
        )
      }
      return Response.json(
        { error: "INTERNAL_SERVER_ERROR", message: "Đã xảy ra lỗi máy chủ." },
        { status: 500 }
      )
    }
  }
)

export const PATCH = withAuth<{ id: string }>(
  async (request, { user, params }) => {
    const { id: userId } = await params
    const parsed = await parseRequestBody(request, UpdateUserRequest)
    if (!parsed.ok) {
      return parsed.response
    }

    try {
      const updated = await userService.updateUser(user, userId, parsed.data)
      return Response.json({ data: updated }, { status: 200 })
    } catch (err) {
      if (err instanceof UserServiceError) {
        return Response.json(
          { error: err.code, message: err.message },
          { status: err.status }
        )
      }
      return Response.json(
        { error: "INTERNAL_SERVER_ERROR", message: "Đã xảy ra lỗi máy chủ." },
        { status: 500 }
      )
    }
  }
)
