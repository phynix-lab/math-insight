import { SESSION_COOKIE_NAME } from "@/server/services/auth.service"

export async function POST() {
  const response = new Response(null, { status: 204 })

  // Hủy cookie phiên làm việc khi đăng xuất (AC-5)
  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
  )

  return response
}
