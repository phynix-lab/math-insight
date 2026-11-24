import "server-only"

import { getPrisma } from "@/server/db/prisma"
import type { Prisma } from "@/server/db/generated/client"
import type { AppRole } from "@/types/navigation"

export interface StoredUser {
  id: string
  email: string
  passwordHash: string
  displayName: string
  phone: string | null
  isActive: boolean
  canReviewApplications: boolean
  roles: AppRole[]
  studentId: string | null
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const USER_AUTH_INCLUDE = {
  profile: {
    include: {
      roles: {
        select: { role: true },
      },
      studentAccount: {
        select: { id: true },
      },
    },
  },
} as const

type UserWithAuth = Prisma.UserGetPayload<{
  include: typeof USER_AUTH_INCLUDE
}>

function mapUserToStoredUser(user: UserWithAuth): StoredUser | null {
  if (!user.profile) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    displayName: user.profile.displayName,
    phone: user.profile.phone,
    isActive: user.profile.isActive,
    canReviewApplications: user.profile.canReviewApplications,
    roles: user.profile.roles.map((item) => item.role),
    studentId: user.profile.studentAccount?.id ?? null,
  }
}

export const authRepository = {
  async findByEmail(email: string): Promise<StoredUser | null> {
    const normalized = email.trim().toLowerCase()
    const user = await getPrisma().user.findUnique({
      where: { email: normalized },
      include: USER_AUTH_INCLUDE,
    })

    return user ? mapUserToStoredUser(user) : null
  },

  async findById(id: string): Promise<StoredUser | null> {
    if (!UUID_REGEX.test(id)) {
      return null
    }

    const user = await getPrisma().user.findUnique({
      where: { id },
      include: USER_AUTH_INCLUDE,
    })

    return user ? mapUserToStoredUser(user) : null
  },
}
