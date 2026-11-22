"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { AppRole } from "@/types/navigation"
import { DEMO_ACCOUNTS, type AuthUser } from "@/types/auth"
import {
  decodeSessionPayload,
  encodeSessionPayload,
  SESSION_COOKIE_NAME,
  type SessionPayload,
} from "@/lib/auth-session"

interface RoleContextValue {
  currentUser: AuthUser | null
  currentRole: AppRole
  isAuthenticated: boolean
  setRole: (role: AppRole) => void
  canReviewApplications: boolean
  setCanReviewApplications: (enabled: boolean) => void
  userDisplayName: string
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  quickLogin: (role: AppRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

const STORAGE_KEY_USER = "math_insight_auth_user"
const STORAGE_KEY_CAN_REVIEW = "math_insight_can_review"

function getInitialUser(): AuthUser | null {
  if (typeof window === "undefined") {
    // Default server rendering
    return {
      id: "550e8400-e29b-41d4-a716-446655440001",
      email: "admin@mathinsight.edu.vn",
      displayName: "Nguyễn Quốc Huy",
      role: "admin",
      canReviewApplications: true,
      isActive: true,
    }
  }

  try {
    // 1. Đọc từ cookie session trước
    const cookies = document.cookie.split("; ")
    const sessionCookie = cookies
      .find((row) => row.startsWith(`${SESSION_COOKIE_NAME}=`))
      ?.split("=")[1]

    if (sessionCookie) {
      const payload = decodeSessionPayload(sessionCookie)
      if (payload) {
        return {
          id: payload.userId,
          email: payload.email,
          displayName: payload.displayName,
          role: payload.roles[0] ?? "admin",
          canReviewApplications: payload.canReviewApplications,
          isActive: payload.isActive,
        }
      }
    }

    // 2. Dự phòng đọc từ localStorage
    const savedUser = localStorage.getItem(STORAGE_KEY_USER)
    if (savedUser) {
      const parsed = JSON.parse(savedUser) as AuthUser
      // Đồng bộ lại cookie session
      const payload: SessionPayload = {
        userId: parsed.id,
        email: parsed.email,
        displayName: parsed.displayName,
        roles: [parsed.role],
        canReviewApplications: parsed.canReviewApplications ?? true,
        isActive: parsed.isActive ?? true,
        studentId: null,
        expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      }
      document.cookie = `${SESSION_COOKIE_NAME}=${encodeSessionPayload(payload)}; Path=/; Max-Age=${7 * 24 * 3600}; SameSite=Lax`
      return parsed
    }
  } catch {
    // Bỏ qua lỗi truy cập storage
  }

  return null
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(
    getInitialUser
  )

  const [canReviewApplications, setCanReviewApplications] = useState<boolean>(
    () => {
      if (typeof window === "undefined") return true
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CAN_REVIEW)
        if (saved !== null) {
          return saved === "true"
        }
      } catch {
        // Bỏ qua
      }
      return true
    }
  )

  const currentRole: AppRole = currentUser?.role ?? "admin"
  const isAuthenticated = currentUser !== null

  function saveUser(user: AuthUser | null) {
    setCurrentUser(user)
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY_USER)
      }
    } catch {
      // Bỏ qua
    }
  }

  function handleSetRole(role: AppRole) {
    const acc =
      DEMO_ACCOUNTS.find((a) => a.role === role && a.isActive !== false) ??
      DEMO_ACCOUNTS[0]
    const authUser: AuthUser = {
      id: `usr-${role}-001`,
      email: acc.email,
      displayName: acc.displayName,
      role: acc.role,
      canReviewApplications: acc.canReviewApplications,
      isActive: true,
    }

    const payload: SessionPayload = {
      userId: authUser.id,
      email: authUser.email,
      displayName: authUser.displayName,
      roles: [authUser.role],
      canReviewApplications: authUser.canReviewApplications ?? true,
      isActive: true,
      studentId: null,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    }

    if (typeof document !== "undefined") {
      document.cookie = `${SESSION_COOKIE_NAME}=${encodeSessionPayload(payload)}; Path=/; Max-Age=${7 * 24 * 3600}; SameSite=Lax`
    }

    saveUser(authUser)
  }

  function handleSetCanReview(enabled: boolean) {
    setCanReviewApplications(enabled)
    try {
      localStorage.setItem(STORAGE_KEY_CAN_REVIEW, String(enabled))
    } catch {
      // Bỏ qua
    }
  }

  /**
   * Gọi API đăng nhập và xử lý chuẩn các mã lỗi theo AC-1, AC-2, AC-3.
   */
  async function login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as {
          error?: string
          message?: string
        }

        // AC-3: Tài khoản is_active = false
        if (response.status === 403 || errorData.error === "ACCOUNT_INACTIVE") {
          return {
            success: false,
            error:
              errorData.message ||
              "Tài khoản của bạn đã ngừng hoạt động. Vui lòng liên hệ quản trị viên.",
          }
        }

        // AC-2: Sai mật khẩu hoặc tài khoản không tồn tại -> lỗi chung
        return {
          success: false,
          error: "Email hoặc mật khẩu không đúng",
        }
      }

      const json = (await response.json()) as {
        data: {
          user: {
            userId: string
            email: string | null
            displayName: string
            isActive: boolean
            canReviewApplications: boolean
            roles: AppRole[]
          }
        }
      }

      const user = json.data.user
      const authUser: AuthUser = {
        id: user.userId,
        email: user.email ?? email,
        displayName: user.displayName,
        role: user.roles[0] ?? "admin",
        canReviewApplications: user.canReviewApplications,
        isActive: user.isActive,
      }

      saveUser(authUser)
      setCanReviewApplications(user.canReviewApplications)
      return { success: true }
    } catch {
      // Trường hợp mạng lỗi
      return {
        success: false,
        error: "Không thể kết nối đến máy chủ xác thực. Vui lòng thử lại.",
      }
    }
  }

  async function quickLogin(
    role: AppRole
  ): Promise<{ success: boolean; error?: string }> {
    const acc =
      DEMO_ACCOUNTS.find((a) => a.role === role && a.isActive !== false) ??
      DEMO_ACCOUNTS[0]
    return await login(acc.email, acc.password)
  }

  function logout() {
    // 1. Gửi request hủy session phía server (AC-5)
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {})

    // 2. Xóa cookie session tại client
    if (typeof document !== "undefined") {
      document.cookie = `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
    }

    // 3. Xóa state người dùng
    saveUser(null)

    // 4. Chuyển hướng an toàn về trang /login (dùng replace để xóa lịch sử navigation theo AC-5)
    if (typeof window !== "undefined") {
      window.location.replace("/login")
    }
  }

  const userDisplayName = currentUser
    ? `${currentUser.displayName} (${currentUser.role === "admin" ? "Admin" : currentUser.role === "teacher" ? "Giáo viên" : "Học sinh"})`
    : "Khách"

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated,
        setRole: handleSetRole,
        canReviewApplications,
        setCanReviewApplications: handleSetCanReview,
        userDisplayName,
        login,
        quickLogin,
        logout,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export function useCurrentRole(): RoleContextValue {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useCurrentRole must be used within a RoleProvider")
  }
  return context
}
