import { withAuth } from "@/server/utils/auth-guard"
import { userService, UserServiceError } from "@/server/services/user.service"
import { parseRequestBody } from "@/server/utils/route-utils"
import { UpdateMyProfileRequest } from "@/types/generated/mathInsightAPI.schemas.zod"

export const PATCH = withAuth(async (request, { user }) => {
  const parsed = await parseRequestBody(request, UpdateMyProfileRequest)
  if (!parsed.ok) {
    return parsed.response
  }

  try {
    const updated = await userService.updateMyProfile(user, parsed.data)
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
})
