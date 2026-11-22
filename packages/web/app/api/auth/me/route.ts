import { cookies } from "next/headers"
import {
  authService,
  decodeSessionPayload,
  SESSION_COOKIE_NAME,
} from "@/server/services/auth.service"
import { unauthorizedResponse } from "@/server/utils/route-utils"

export async function GET() {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!cookieValue) {
    return unauthorizedResponse("Chưa đăng nhập.")
  }

  const payload = decodeSessionPayload(cookieValue)
  if (!payload) {
    return unauthorizedResponse("Phiên làm việc không hợp lệ hoặc đã hết hạn.")
  }

  const currentUser = await authService.getSessionFromPayload(payload)
  if (!currentUser) {
    return unauthorizedResponse(
      "Người dùng không tồn tại hoặc đã ngừng hoạt động."
    )
  }

  return Response.json({ data: currentUser }, { status: 200 })
}
