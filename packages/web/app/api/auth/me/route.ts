import { withAuth } from "@/server/utils/auth-guard"

export const GET = withAuth((_request, { user }) => {
  return Response.json({ data: user }, { status: 200 })
})
