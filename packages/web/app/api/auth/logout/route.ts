import { buildClearSessionCookieHeader } from "@/lib/auth-session"

export async function POST() {
  const response = new Response(null, { status: 204 })
  response.headers.set("Set-Cookie", buildClearSessionCookieHeader())
  return response
}
