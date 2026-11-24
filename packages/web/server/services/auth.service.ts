import "server-only"

import type { CurrentUser } from "@/lib/api/generated/model/currentUser"
import type { AuthSession } from "@/lib/api/generated/model/authSession"
import {
  SESSION_MAX_AGE_SECONDS,
  type SessionPayload,
  signSessionPayload,
} from "@/lib/auth-session"
import {
  authRepository,
  type StoredUser,
} from "@/server/repositories/auth.repository"
import { verifyPassword } from "@/server/utils/password"

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
  async authenticate(
    email: string,
    password: string
  ): Promise<AuthenticateResult> {
    const user = await authRepository.findByEmail(email)

    // AC 2: Generic error prevents email enumeration.
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return {
        ok: false,
        code: "INVALID_CREDENTIALS",
        message: "Email hoặc mật khẩu không đúng",
        status: 401,
      }
    }

    // AC 3: Block inactive profiles.
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
      Date.now() + SESSION_MAX_AGE_SECONDS * 1000
    ).toISOString()

    const sessionPayload: SessionPayload = {
      userId: currentUser.userId,
      roles: currentUser.roles,
      canReviewApplications: currentUser.canReviewApplications,
      expiresAt,
    }

    const cookieValue = await signSessionPayload(sessionPayload)

    return {
      ok: true,
      session: {
        user: currentUser,
        expiresAt,
      },
      cookieValue,
    }
  },

  async getSessionFromPayload(
    payload: SessionPayload
  ): Promise<CurrentUser | null> {
    const user = await authRepository.findById(payload.userId)
    if (!user || !user.isActive) {
      return null
    }
    return mapToCurrentUser(user)
  },
}
