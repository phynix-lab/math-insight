import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decodeSessionPayload, SESSION_COOKIE_NAME } from "@/lib/auth-session"

/**
 * Các đường dẫn công khai không yêu cầu đăng nhập.
 */
const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/logout",
  "/applications/public",
  "/api/applications/public",
]

/**
 * Các đường dẫn chỉ dành riêng cho Admin (AC-4, NFR-02).
 * Giáo viên hoặc Học sinh truy cập/gọi trực tiếp sẽ nhận 403 Forbidden hoặc bị chuyển hướng.
 */
const ADMIN_ONLY_PREFIXES = [
  "/users",
  "/audit-logs",
  "/api/users",
  "/api/audit-logs",
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Kiểm tra session cookie
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const session = decodeSessionPayload(sessionCookie)
  const isAuthenticated = session !== null

  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  // 2. AC-6: Chưa đăng nhập mà truy cập route nội bộ -> chuyển hướng về /login
  if (!isAuthenticated) {
    if (isPublicPath) {
      return NextResponse.next()
    }

    // Nếu là request API -> trả về 401 Unauthorized
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Vui lòng đăng nhập để tiếp tục." },
        { status: 401 }
      )
    }

    // Nếu là trang UI -> chuyển hướng sang /login
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 3. Đã đăng nhập mà truy cập lại /login -> chuyển hướng vào trang chủ /
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // 4. AC-4: Kiểm tra vai trò phía Server (NFR-02)
  // Nếu người dùng không có role admin mà gọi route của admin:
  const isAdminOnly = ADMIN_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (isAdminOnly && !session.roles.includes("admin")) {
    // Với API call trực tiếp -> trả về 403 Forbidden đúng chuẩn AC-4
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          error: "FORBIDDEN",
          message: "Bạn không có quyền truy cập tài nguyên này.",
        },
        { status: 403 }
      )
    }

    // Với giao diện UI -> chuyển hướng về trang chủ
    return NextResponse.redirect(new URL("/", request.url))
  }

  // 5. AC-5: Thiết lập Cache-Control để chống back-forward cache khi đã đăng xuất
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
    /*
     * Áp dụng proxy cho mọi route ngoại trừ static files, images, favicon.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
