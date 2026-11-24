"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { CurrentUser } from "@/lib/api/generated/model/currentUser"
import { ROLE_CONFIGS, type AppRole } from "@/types/navigation"

interface RoleContextValue {
  currentUser: CurrentUser
  currentRole: AppRole
  roles: AppRole[]
  canReviewApplications: boolean
  userDisplayName: string
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

export function RoleProvider({
  children,
  user,
}: {
  children: ReactNode
  user: CurrentUser
}) {
  const currentRole: AppRole = user.roles[0] ?? "student"
  const userDisplayName = `${user.displayName} (${ROLE_CONFIGS[currentRole].label})`

  return (
    <RoleContext.Provider
      value={{
        currentUser: user,
        currentRole,
        roles: user.roles,
        canReviewApplications: user.canReviewApplications,
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
