import { withAuth } from "@/server/utils/auth-guard"
import { auditLogRepository } from "@/server/repositories/audit-log.repository"

export const GET = withAuth(
  async (request) => {
    const { searchParams } = new URL(request.url)
    const pageStr = searchParams.get("page")
    const limitStr = searchParams.get("limit")
    const action = searchParams.get("action") ?? undefined
    const entityType = searchParams.get("entityType") ?? undefined
    const entityId = searchParams.get("entityId") ?? undefined

    const query = {
      page: pageStr ? Number(pageStr) : 1,
      limit: limitStr ? Number(limitStr) : 20,
      action,
      entityType,
      entityId,
    }

    const result = await auditLogRepository.listLogs(query)
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
  },
  { roles: ["admin"] }
)
