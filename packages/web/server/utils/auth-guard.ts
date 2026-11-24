import "server-only"

import { cookies } from "next/headers"
import type { CurrentUser } from "@/lib/api/generated/model/currentUser"
import { canReviewApplicationsAccess, hasRequiredRole } from "@/lib/auth-policy"
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-session"
import { authService } from "@/server/services/auth.service"
import {
  forbiddenResponse,
  unauthorizedResponse,
} from "@/server/utils/route-utils"
import type { AppRole } from "@/types/navigation"

export interface WithAuthOptions {
  roles?: readonly AppRole[]
  requireReviewPermission?: boolean
}

export interface AuthRouteContext<
  TParams extends Record<string, string | string[]> = Record<string, never>,
> {
  user: CurrentUser
  params: Promise<TParams>
}

// Re-verify signed cookie against the database so role or active-status changes take effect immediately.
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const payload = await verifySessionToken(token)
  if (!payload) {
    return null
  }

  return authService.getSessionFromPayload(payload)
}

export function withAuth<
  TParams extends Record<string, string | string[]> = Record<string, never>,
>(
  handler: (
    request: Request,
    context: AuthRouteContext<TParams>
  ) => Promise<Response> | Response,
  options?: WithAuthOptions
): (
  request: Request,
  context: { params: Promise<TParams> }
) => Promise<Response> {
  return async (request, context) => {
    const user = await getCurrentUser()
    if (!user) {
      return unauthorizedResponse(
        "Phiên làm việc không hợp lệ hoặc đã hết hạn."
      )
    }

    if (options?.roles && !hasRequiredRole(user.roles, options.roles)) {
      return forbiddenResponse()
    }

    if (
      options?.requireReviewPermission &&
      !canReviewApplicationsAccess({
        roles: user.roles,
        canReviewApplications: user.canReviewApplications,
      })
    ) {
      return forbiddenResponse()
    }

    return handler(request, {
      user,
      params: context.params,
    })
  }
}
