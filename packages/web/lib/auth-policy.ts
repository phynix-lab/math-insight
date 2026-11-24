import type { AppRole } from "@/types/navigation"

export interface AccessSubject {
  roles: AppRole[]
  canReviewApplications: boolean
}

export interface RoutePolicy {
  prefixes: readonly string[]
  roles: readonly AppRole[]
  requiresReviewPermission?: boolean
}

export const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/api/auth/logout",
  "/applications/public",
  "/api/applications/public",
  "/mockServiceWorker.js",
] as const

export const ROUTE_POLICIES: readonly RoutePolicy[] = [
  {
    prefixes: ["/users", "/audit-logs", "/api/users", "/api/audit-logs"],
    roles: ["admin"],
  },
  {
    prefixes: ["/students", "/sessions", "/api/students", "/api/sessions"],
    roles: ["admin", "teacher"],
  },
  {
    prefixes: ["/applications", "/api/applications"],
    roles: ["admin", "teacher"],
    requiresReviewPermission: true,
  },
  {
    prefixes: ["/my-attendance"],
    roles: ["student"],
  },
]

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((prefix) => matchesPrefix(pathname, prefix))
}

export function hasRequiredRole(
  userRoles: readonly AppRole[],
  allowedRoles: readonly AppRole[]
): boolean {
  return allowedRoles.some((role) => userRoles.includes(role))
}

export function canReviewApplicationsAccess(subject: AccessSubject): boolean {
  return (
    subject.roles.includes("admin") ||
    (subject.roles.includes("teacher") && subject.canReviewApplications)
  )
}

export function canAccessPath(
  pathname: string,
  subject: AccessSubject
): boolean {
  if (isPublicPath(pathname)) {
    return true
  }

  for (const policy of ROUTE_POLICIES) {
    const matched = policy.prefixes.some((prefix) =>
      matchesPrefix(pathname, prefix)
    )
    if (!matched) {
      continue
    }

    if (!hasRequiredRole(subject.roles, policy.roles)) {
      return false
    }

    if (
      policy.requiresReviewPermission &&
      !canReviewApplicationsAccess(subject)
    ) {
      return false
    }
  }

  return true
}
