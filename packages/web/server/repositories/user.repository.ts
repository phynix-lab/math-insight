import "server-only"

import { randomUUID } from "node:crypto"
import { getPrisma } from "@/server/db/prisma"
import type { Prisma } from "@/server/db/generated/client"
import type { AppRole } from "@/types/navigation"
import type { UsersListParams } from "@/lib/api/generated/model/usersListParams"
import type { UserProfile } from "@/lib/api/generated/model/userProfile"
import type { CreateUserRequest } from "@/lib/api/generated/model/createUserRequest"
import type { UpdateUserRequest } from "@/lib/api/generated/model/updateUserRequest"
import { memoryStore, type StoredUserAccount } from "@/server/repositories/memory-store"
import { hashPassword } from "@/server/utils/password"

const USER_PROFILE_INCLUDE = {
  roles: {
    select: { role: true },
  },
  user: {
    select: { email: true },
  },
} as const

type ProfileWithRolesAndUser = Prisma.ProfileGetPayload<{
  include: typeof USER_PROFILE_INCLUDE
}>

function mapProfileToUserProfile(p: ProfileWithRolesAndUser): UserProfile {
  return {
    userId: p.userId,
    displayName: p.displayName,
    phone: p.phone,
    email: p.user?.email ?? null,
    isActive: p.isActive,
    canReviewApplications: p.canReviewApplications,
    roles: p.roles.map((r) => r.role),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }
}

function mapMemUserToUserProfile(u: StoredUserAccount): UserProfile {
  return {
    userId: u.id,
    displayName: u.displayName,
    phone: u.phone,
    email: u.email,
    isActive: u.isActive,
    canReviewApplications: u.canReviewApplications,
    roles: u.roles,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

export const userRepository = {
  async listUsers(
    query?: UsersListParams
  ): Promise<{ data: UserProfile[]; total: number }> {
    const page = Math.max(1, query?.page ?? 1)
    const limit = Math.max(1, Math.min(100, query?.limit ?? 20))
    const skip = (page - 1) * limit

    if (process.env.DATABASE_URL) {
      try {
        const where: Prisma.ProfileWhereInput = {}

        if (query?.role) {
          where.roles = { some: { role: query.role } }
        }
        if (typeof query?.isActive === "boolean") {
          where.isActive = query.isActive
        }
        if (query?.search) {
          const s = query.search.trim()
          where.OR = [
            { displayName: { contains: s, mode: "insensitive" } },
            { user: { email: { contains: s, mode: "insensitive" } } },
            { phone: { contains: s } },
          ]
        }

        const [total, profiles] = await Promise.all([
          getPrisma().profile.count({ where }),
          getPrisma().profile.findMany({
            where,
            include: USER_PROFILE_INCLUDE,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
          }),
        ])

        return {
          data: profiles.map(mapProfileToUserProfile),
          total,
        }
      } catch (err) {
        console.warn("[Prisma] listUsers failed, using memory fallback", err)
      }
    }

    // Memory fallback
    let filtered = [...memoryStore.users]

    if (query?.role) {
      filtered = filtered.filter((u) => u.roles.includes(query.role as AppRole))
    }
    if (typeof query?.isActive === "boolean") {
      filtered = filtered.filter((u) => u.isActive === query.isActive)
    }
    if (query?.search) {
      const s = query.search.toLowerCase().trim()
      filtered = filtered.filter(
        (u) =>
          u.displayName.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          (u.phone && u.phone.includes(s))
      )
    }

    const total = filtered.length
    const paged = filtered.slice(skip, skip + limit)

    return {
      data: paged.map(mapMemUserToUserProfile),
      total,
    }
  },

  async findById(userId: string): Promise<UserProfile | null> {
    if (process.env.DATABASE_URL) {
      try {
        const profile = await getPrisma().profile.findUnique({
          where: { userId },
          include: USER_PROFILE_INCLUDE,
        })
        return profile ? mapProfileToUserProfile(profile) : null
      } catch (err) {
        console.warn("[Prisma] findById failed, using memory fallback", err)
      }
    }

    const mem = memoryStore.users.find((u) => u.id === userId)
    return mem ? mapMemUserToUserProfile(mem) : null
  },

  async findByEmail(email: string): Promise<UserProfile | null> {
    const normalized = email.trim().toLowerCase()

    if (process.env.DATABASE_URL) {
      try {
        const user = await getPrisma().user.findUnique({
          where: { email: normalized },
          include: {
            profile: {
              include: {
                roles: { select: { role: true } },
              },
            },
          },
        })
        if (!user || !user.profile) return null
        return {
          userId: user.id,
          displayName: user.profile.displayName,
          phone: user.profile.phone,
          email: user.email,
          isActive: user.profile.isActive,
          canReviewApplications: user.profile.canReviewApplications,
          roles: user.profile.roles.map((r) => r.role),
          createdAt: user.profile.createdAt.toISOString(),
          updatedAt: user.profile.updatedAt.toISOString(),
        }
      } catch (err) {
        console.warn("[Prisma] findByEmail failed, using memory fallback", err)
      }
    }

    const mem = memoryStore.users.find(
      (u) => u.email.toLowerCase() === normalized
    )
    return mem ? mapMemUserToUserProfile(mem) : null
  },

  async createTeacher(data: CreateUserRequest): Promise<UserProfile> {
    const roles: AppRole[] = data.roles && data.roles.length > 0 ? data.roles : ["teacher"]
    const canReview = data.canReviewApplications ?? false
    const email = data.email.trim().toLowerCase()
    const displayName = data.displayName.trim()
    const phone = data.phone?.trim() || null
    const defaultPassword = "password123"
    const passwordHash = hashPassword(defaultPassword)

    if (process.env.DATABASE_URL) {
      try {
        const createdProfile = await getPrisma().$transaction(async (tx) => {
          const user = await tx.user.create({
            data: {
              email,
              passwordHash,
            },
          })

          const profile = await tx.profile.create({
            data: {
              userId: user.id,
              displayName,
              phone,
              isActive: true,
              canReviewApplications: canReview,
              roles: {
                createMany: {
                  data: roles.map((role) => ({ role })),
                },
              },
            },
            include: USER_PROFILE_INCLUDE,
          })

          return profile
        })

        return mapProfileToUserProfile(createdProfile)
      } catch (err) {
        console.warn("[Prisma] createTeacher failed, using memory fallback", err)
      }
    }

    // Memory fallback
    const now = new Date().toISOString()
    const newId = randomUUID()
    const newAccount: StoredUserAccount = {
      id: newId,
      email,
      passwordHash,
      displayName,
      phone,
      isActive: true,
      canReviewApplications: canReview,
      roles,
      studentId: null,
      createdAt: now,
      updatedAt: now,
    }

    memoryStore.users.unshift(newAccount)
    return mapMemUserToUserProfile(newAccount)
  },

  async updateProfile(
    userId: string,
    data: UpdateUserRequest
  ): Promise<UserProfile | null> {
    const now = new Date()

    if (process.env.DATABASE_URL) {
      try {
        const updateData: Prisma.ProfileUpdateInput = {
          updatedAt: now,
        }
        if (data.displayName !== undefined) {
          updateData.displayName = data.displayName.trim()
        }
        if (data.phone !== undefined) {
          updateData.phone = data.phone?.trim() || null
        }
        if (data.isActive !== undefined) {
          updateData.isActive = data.isActive
        }
        if (data.canReviewApplications !== undefined) {
          updateData.canReviewApplications = data.canReviewApplications
        }

        const updated = await getPrisma().profile.update({
          where: { userId },
          data: updateData,
          include: USER_PROFILE_INCLUDE,
        })
        return mapProfileToUserProfile(updated)
      } catch (err) {
        console.warn("[Prisma] updateProfile failed, using memory fallback", err)
      }
    }

    const user = memoryStore.users.find((u) => u.id === userId)
    if (!user) return null

    if (data.displayName !== undefined) {
      user.displayName = data.displayName.trim()
    }
    if (data.phone !== undefined) {
      user.phone = data.phone?.trim() || null
    }
    if (data.isActive !== undefined) {
      user.isActive = data.isActive
    }
    if (data.canReviewApplications !== undefined) {
      user.canReviewApplications = data.canReviewApplications
    }
    user.updatedAt = now.toISOString()

    return mapMemUserToUserProfile(user)
  },

  async updateRoles(
    userId: string,
    roles: AppRole[]
  ): Promise<UserProfile | null> {
    const now = new Date()

    if (process.env.DATABASE_URL) {
      try {
        const updated = await getPrisma().$transaction(async (tx) => {
          await tx.userRole.deleteMany({
            where: { userId },
          })
          await tx.userRole.createMany({
            data: roles.map((role) => ({ userId, role })),
          })
          return tx.profile.update({
            where: { userId },
            data: { updatedAt: now },
            include: USER_PROFILE_INCLUDE,
          })
        })
        return mapProfileToUserProfile(updated)
      } catch (err) {
        console.warn("[Prisma] updateRoles failed, using memory fallback", err)
      }
    }

    const user = memoryStore.users.find((u) => u.id === userId)
    if (!user) return null

    user.roles = [...roles]
    user.updatedAt = now.toISOString()
    return mapMemUserToUserProfile(user)
  },

  async countActiveClassesByTeacher(teacherUserId: string): Promise<number> {
    if (process.env.DATABASE_URL) {
      try {
        return await getPrisma().class.count({
          where: {
            teacherUserId,
            status: { not: "inactive" },
          },
        })
      } catch (err) {
        console.warn("[Prisma] countActiveClassesByTeacher failed, using memory fallback", err)
      }
    }

    return memoryStore.classes.filter(
      (c) => c.teacherUserId === teacherUserId && c.status !== "inactive"
    ).length
  },
}
