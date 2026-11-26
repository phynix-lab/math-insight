import { withAuth } from "@/server/utils/auth-guard"
import { userService, UserServiceError } from "@/server/services/user.service"
import { parseRequestBody } from "@/server/utils/route-utils"
import { CreateUserRequest } from "@/types/generated/mathInsightAPI.schemas.zod"
import type { UsersListParams } from "@/lib/api/generated/model/usersListParams"
import type { AppRole } from "@/types/navigation"

export const GET = withAuth(
  async (request, { user }) => {
    try {
      const { searchParams } = new URL(request.url)
      const pageStr = searchParams.get("page")
      const limitStr = searchParams.get("limit")
      const roleStr = searchParams.get("role")
      const isActiveStr = searchParams.get("isActive")
      const search = searchParams.get("search") ?? undefined

      const query: UsersListParams = {
        page: pageStr ? Number(pageStr) : 1,
        limit: limitStr ? Number(limitStr) : 20,
        role: (roleStr as AppRole) ?? undefined,
        isActive:
          isActiveStr === "true"
            ? true
            : isActiveStr === "false"
              ? false
              : undefined,
        search,
      }

      const result = await userService.listUsers(user, query)
      return Response.json(
        {
          data: result.data,
          meta: {
            page: query.page,
            limit: query.limit,
            total: result.total,
          },
        },
        { status: 200 }
      )
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

export const POST = withAuth(
  async (request, { user }) => {
    const parsed = await parseRequestBody(request, CreateUserRequest)
    if (!parsed.ok) {
      return parsed.response
    }

    try {
      const created = await userService.createTeacher(user, parsed.data)
      return Response.json({ data: created }, { status: 201 })
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
