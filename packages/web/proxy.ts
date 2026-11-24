import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { canAccessPath, isPublicPath } from "@/lib/auth-policy"
import {
  buildClearSessionCookieHeader,
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth-session"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const session = await verifySessionToken(sessionCookie)
  const isAuthenticated = session !== null
  const publicPath = isPublicPath(pathname)

  if (!isAuthenticated) {
    if (publicPath) {
      const response = NextResponse.next()
      if (sessionCookie) {
        response.headers.set("Set-Cookie", buildClearSessionCookieHeader())
      }
      return response
    }

    if (pathname.startsWith("/api/")) {
      const response = NextResponse.json(
        { error: "UNAUTHORIZED", message: "Vui lòng đăng nhập để tiếp tục." },
        { status: 401 }
      )
      if (sessionCookie) {
        response.headers.set("Set-Cookie", buildClearSessionCookieHeader())
      }
      return response
    }

    const response = NextResponse.redirect(new URL("/login", request.url))
    if (sessionCookie) {
      response.headers.set("Set-Cookie", buildClearSessionCookieHeader())
    }
    return response
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!canAccessPath(pathname, session)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          error: "FORBIDDEN",
          message: "Bạn không có quyền truy cập tài nguyên này.",
        },
        { status: 403 }
      )
    }

    return NextResponse.redirect(new URL("/", request.url))
  }

  const response = NextResponse.next()
  if (!pathname.startsWith("/api/")) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    )
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|mockServiceWorker\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
