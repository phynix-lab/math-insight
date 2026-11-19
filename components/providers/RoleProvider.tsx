"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import type { AppRole } from "@/types/navigation"

interface RoleContextValue {
  currentRole: AppRole
  setRole: (role: AppRole) => void
  /**
   * Cờ FR-012: Admin có thể bật quyền can_review_applications cho giáo viên.
   * Khi bật, giáo viên sẽ thấy và được phép vào mục Đơn đăng ký.
   */
  canReviewApplications: boolean
  setCanReviewApplications: (enabled: boolean) => void
  userDisplayName: string
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

const STORAGE_KEY_ROLE = "math_insight_current_role"
const STORAGE_KEY_CAN_REVIEW = "math_insight_can_review"

export function RoleProvider({ children }: { children: ReactNode }) {
  // Khởi tạo lazy state đọc từ localStorage, tránh setState trong useEffect
  const [currentRole, setCurrentRole] = useState<AppRole>(() => {
    if (typeof window === "undefined") return "admin"
    try {
      const savedRole = localStorage.getItem(STORAGE_KEY_ROLE) as AppRole | null
      if (
        savedRole &&
        (savedRole === "admin" || savedRole === "teacher" || savedRole === "student")
      ) {
        return savedRole
      }
    } catch {
      // Bỏ qua lỗi truy cập storage trong môi trường sandbox/restricted
    }
    return "admin"
  })

  const [canReviewApplications, setCanReviewApplications] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    try {
      const savedCanReview = localStorage.getItem(STORAGE_KEY_CAN_REVIEW)
      if (savedCanReview !== null) {
        return savedCanReview === "true"
      }
    } catch {
      // Bỏ qua
    }
    return true
  })

  function handleSetRole(role: AppRole) {
    setCurrentRole(role)
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, role)
    } catch {
      // Bỏ qua
    }
  }

  function handleSetCanReview(enabled: boolean) {
    setCanReviewApplications(enabled)
    try {
      localStorage.setItem(STORAGE_KEY_CAN_REVIEW, String(enabled))
    } catch {
      // Bỏ qua
    }
  }

  // Tên hiển thị người dùng mẫu cho môi trường MVP/Dev
  const userDisplayName =
    currentRole === "admin"
      ? "Huy Nguyễn (Admin)"
      : currentRole === "teacher"
      ? "Thầy Huy (Giáo viên)"
      : "Huy Nguyễn (Học sinh)"

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole: handleSetRole,
        canReviewApplications,
        setCanReviewApplications: handleSetCanReview,
        userDisplayName,
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
