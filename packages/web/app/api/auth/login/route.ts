import { parseRequestBody } from "@/server/utils/route-utils"
import {
  authService,
  SESSION_COOKIE_NAME,
} from "@/server/services/auth.service"
import { LoginRequest } from "@/types/generated/mathInsightAPI.schemas.zod"

export async function POST(request: Request) {
  const parsed = await parseRequestBody(request, LoginRequest)
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

  // Đặt cookie phiên làm việc cho trình duyệt và Next.js Proxy/Middleware
  const maxAge = 7 * 24 * 60 * 60 // 7 ngày
  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${result.cookieValue}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
  )

  return response
}
