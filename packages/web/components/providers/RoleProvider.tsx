"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { AppRole } from "@/types/navigation"
import { DEMO_ACCOUNTS, type AuthUser } from "@/types/auth"

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
  quickLogin: (role: AppRole) => void
  logout: () => void
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

const STORAGE_KEY_USER = "math_insight_auth_user"
const STORAGE_KEY_CAN_REVIEW = "math_insight_can_review"

export function RoleProvider({ children }: { children: ReactNode }) {
  // Mặc định đăng nhập với tài khoản Admin mẫu
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") {
      return {
        id: "usr-admin-001",
        email: "admin@mathinsight.edu.vn",
        displayName: "Nguyễn Quốc Huy",
        role: "admin",
        canReviewApplications: true,
      }
    }
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER)
      if (savedUser) {
        return JSON.parse(savedUser) as AuthUser
      }
    } catch {
      // Bỏ qua lỗi truy cập storage
    }
    // Mặc định ban đầu
    const defaultAcc = DEMO_ACCOUNTS[0]
    return {
      id: "usr-admin-001",
      email: defaultAcc.email,
      displayName: defaultAcc.displayName,
      role: defaultAcc.role,
      canReviewApplications: defaultAcc.canReviewApplications,
    }
  })

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
    const acc = DEMO_ACCOUNTS.find((a) => a.role === role) ?? DEMO_ACCOUNTS[0]
    saveUser({
      id: `usr-${role}-001`,
      email: acc.email,
      displayName: acc.displayName,
      role: acc.role,
      canReviewApplications: acc.canReviewApplications,
    })
  }

  function handleSetCanReview(enabled: boolean) {
    setCanReviewApplications(enabled)
    try {
      localStorage.setItem(STORAGE_KEY_CAN_REVIEW, String(enabled))
    } catch {
      // Bỏ qua
    }
  }

  async function login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    const matched = DEMO_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === email.trim().toLowerCase()
    )

    if (!matched) {
      return { success: false, error: "Tài khoản không tồn tại trên hệ thống." }
    }

    if (matched.password !== password) {
      return { success: false, error: "Mật khẩu không chính xác." }
    }

    const authUser: AuthUser = {
      id: `usr-${matched.role}-001`,
      email: matched.email,
      displayName: matched.displayName,
      role: matched.role,
      canReviewApplications: matched.canReviewApplications,
    }

    saveUser(authUser)
    setCanReviewApplications(matched.canReviewApplications)
    return { success: true }
  }

  function quickLogin(role: AppRole) {
    handleSetRole(role)
  }

  function logout() {
    saveUser(null)
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
