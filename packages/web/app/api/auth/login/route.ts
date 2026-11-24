import { buildSessionCookieHeader } from "@/lib/auth-session"
import { authService } from "@/server/services/auth.service"
import { parseRequestBody } from "@/server/utils/route-utils"
import { loginSchema } from "@/types/auth"

export async function POST(request: Request) {
  const parsed = await parseRequestBody(request, loginSchema)
  if (!parsed.ok) {
    return parsed.response
  }

  const { email, password } = parsed.data
  const result = await authService.authenticate(email, password)

  if (!result.ok) {
    return Response.json(
      {
        error: result.code,
        message: result.message,
      },
      { status: result.status }
    )
  }

  const response = Response.json({ data: result.session }, { status: 200 })
  response.headers.set(
    "Set-Cookie",
    buildSessionCookieHeader(result.cookieValue)
  )

  return response
}
