import type { AppRole } from "@/types/navigation"

export const SESSION_COOKIE_NAME = "math_insight_session"

export interface SessionPayload {
  userId: string
  email: string
  displayName: string
  roles: AppRole[]
  canReviewApplications: boolean
  isActive: boolean
  studentId: string | null
  expiresAt: string
}

/**
 * Mã hóa payload phiên thành chuỗi Base64 an toàn để lưu trong cookie.
 */
export function encodeSessionPayload(payload: SessionPayload): string {
  try {
    const json = JSON.stringify(payload)
    if (typeof Buffer !== "undefined") {
      return Buffer.from(json, "utf-8").toString("base64")
    }
    return btoa(encodeURIComponent(json))
  } catch {
    return ""
  }
}

/**
 * Giải mã chuỗi Base64 từ cookie và xác thực hạn sử dụng.
 */
export function decodeSessionPayload(
  cookieValue: string | null | undefined
): SessionPayload | null {
  if (!cookieValue) return null

  try {
    let json = ""
    if (typeof Buffer !== "undefined") {
      json = Buffer.from(cookieValue, "base64").toString("utf-8")
    } else {
      json = decodeURIComponent(atob(cookieValue))
    }

    const parsed = JSON.parse(json) as SessionPayload
    if (!parsed.userId || !parsed.roles || !Array.isArray(parsed.roles)) {
      return null
    }

    // Kiểm tra hết hạn phiên
    if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() < Date.now()) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}
