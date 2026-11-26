import { withAuth } from "@/server/utils/auth-guard"
import { userService, UserServiceError } from "@/server/services/user.service"
import { parseRequestBody } from "@/server/utils/route-utils"
import { UpdateUserRolesRequest } from "@/types/generated/mathInsightAPI.schemas.zod"

export const PUT = withAuth<{ id: string }>(
  async (request, { user, params }) => {
    const { id: userId } = await params
    const parsed = await parseRequestBody(request, UpdateUserRolesRequest)
    if (!parsed.ok) {
      return parsed.response
    }

    try {
      const updated = await userService.updateUserRoles(
        user,
        userId,
        parsed.data.roles
      )
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
  },
  { roles: ["admin"] }
)
