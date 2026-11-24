import "server-only"

import type { CurrentUser } from "@/lib/api/generated/model/currentUser"
import type { AuthSession } from "@/lib/api/generated/model/authSession"
import {
  SESSION_COOKIE_NAME,
  type SessionPayload,
  encodeSessionPayload,
  decodeSessionPayload,
} from "@/lib/auth-session"
import {
  authRepository,
  type StoredUser,
} from "@/server/repositories/auth.repository"
import { verifyPassword } from "@/server/utils/password"

export {
  SESSION_COOKIE_NAME,
  type SessionPayload,
  encodeSessionPayload,
  decodeSessionPayload,
}

export interface AuthSuccessResult {
  ok: true
  session: AuthSession
  cookieValue: string
}

export interface AuthErrorResult {
  ok: false
  code: "INVALID_CREDENTIALS" | "ACCOUNT_INACTIVE"
  message: string
  status: 401 | 403
}

export type AuthenticateResult = AuthSuccessResult | AuthErrorResult

function mapToCurrentUser(user: StoredUser): CurrentUser {
  return {
    userId: user.id,
    email: user.email,
    displayName: user.displayName,
    phone: user.phone,
    isActive: user.isActive,
    canReviewApplications: user.canReviewApplications,
    roles: user.roles,
    studentId: user.studentId,
  }
}

export const authService = {
  /**
   * Xác thực người dùng bằng email và mật khẩu (FR-001, AC-1, AC-2, AC-3).
   *
   * @param email Email đăng nhập
   * @param password Mật khẩu
   * @returns Kết quả phiên làm việc hoặc lỗi chuẩn bảo mật
   */
  async authenticate(
    email: string,
    password: string
  ): Promise<AuthenticateResult> {
    const user = await authRepository.findByEmail(email)

    // AC 2: Sai mật khẩu hoặc tài khoản không tồn tại đều trả về lỗi chung
    // "Email hoặc mật khẩu không đúng", không tiết lộ email có tồn tại hay không.
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return {
        ok: false,
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng",
        status: 401,
      }
    }

    // AC 3: Given profile có is_active = false, when đăng nhập, then bị chặn
    // với thông báo tài khoản đã ngừng hoạt động.
    if (!user.isActive) {
      return {
        ok: false,
        code: "ACCOUNT_INACTIVE",
        message:
          "Tài khoản của bạn đã ngừng hoạt động. Vui lòng liên hệ quản trị viên.",
        status: 403,
      }
    }

    const currentUser = mapToCurrentUser(user)
    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString() // 7 ngày

    const sessionPayload: SessionPayload = {
      userId: currentUser.userId,
      email: currentUser.email ?? "",
      displayName: currentUser.displayName,
      roles: currentUser.roles,
      canReviewApplications: currentUser.canReviewApplications,
      isActive: currentUser.isActive,
      studentId: currentUser.studentId,
      expiresAt,
    }

    const session: AuthSession = {
      user: currentUser,
      expiresAt,
    }

    return {
      ok: true,
      session,
      cookieValue: encodeSessionPayload(sessionPayload),
    }
  },

  /**
   * Lấy thông tin phiên từ session payload được giải mã.
   */
  async getSessionFromPayload(
    payload: SessionPayload
  ): Promise<CurrentUser | null> {
    const user = await authRepository.findById(payload.userId)
    if (!user || !user.isActive) return null
    return mapToCurrentUser(user)
  },
}
