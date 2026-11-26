import "server-only"

import { randomUUID } from "node:crypto"
import { getPrisma } from "@/server/db/prisma"
import { Prisma } from "@/server/db/generated/client"
import type { AuditLog } from "@/lib/api/generated/model/auditLog"
import type { AuditLogsListParams } from "@/lib/api/generated/model/auditLogsListParams"
import { memoryStore, type StoredAuditLog } from "@/server/repositories/memory-store"

export interface CreateAuditLogParams {
  actorUserId?: string | null
  actorDisplayName?: string | null
  action: string
  entityType: string
  entityId?: string | null
  beforeData?: Record<string, unknown> | null
  afterData?: Record<string, unknown> | null
  reason?: string | null
}

function mapAuditLogToModel(log: Prisma.AuditLogGetPayload<{
  include: { actor: { select: { displayName: true } } }
}>): AuditLog {
  return {
    id: log.id,
    actorUserId: log.actorUserId,
    actorDisplayName: log.actor?.displayName ?? null,
    action: log.action,
    entityType: log.entityType,
    entityId: log.entityId,
    beforeData: (log.beforeData as Record<string, unknown>) ?? null,
    afterData: (log.afterData as Record<string, unknown>) ?? null,
    reason: log.reason,
    createdAt: log.createdAt.toISOString(),
  }
}

function mapMemAuditLogToModel(log: StoredAuditLog): AuditLog {
  return {
    id: log.id,
    actorUserId: log.actorUserId,
    actorDisplayName: log.actorDisplayName,
    action: log.action,
    entityType: log.entityType,
    entityId: log.entityId,
    beforeData: log.beforeData,
    afterData: log.afterData,
    reason: log.reason,
    createdAt: log.createdAt,
  }
}

export const auditLogRepository = {
  async createLog(params: CreateAuditLogParams): Promise<AuditLog> {
    const now = new Date()

    if (process.env.DATABASE_URL) {
      try {
        const created = await getPrisma().auditLog.create({
          data: {
            actorUserId: params.actorUserId ?? null,
            action: params.action,
            entityType: params.entityType,
            entityId: params.entityId ?? null,
            beforeData: (params.beforeData as Prisma.InputJsonValue) ?? Prisma.JsonNull,
            afterData: (params.afterData as Prisma.InputJsonValue) ?? Prisma.JsonNull,
            reason: params.reason ?? null,
            createdAt: now,
          },
          include: {
            actor: {
              select: { displayName: true },
            },
          },
        })
        return mapAuditLogToModel(created)
      } catch (err) {
        console.warn("[Prisma] createLog failed, using memory fallback", err)
      }
    }

    const memLog: StoredAuditLog = {
      id: randomUUID(),
      actorUserId: params.actorUserId ?? null,
      actorDisplayName: params.actorDisplayName ?? null,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId ?? null,
      beforeData: params.beforeData ?? null,
      afterData: params.afterData ?? null,
      reason: params.reason ?? null,
      createdAt: now.toISOString(),
    }

    memoryStore.auditLogs.unshift(memLog)
    return mapMemAuditLogToModel(memLog)
  },

  async listLogs(
    query?: AuditLogsListParams
  ): Promise<{ data: AuditLog[]; total: number }> {
    const page = Math.max(1, query?.page ?? 1)
    const limit = Math.max(1, Math.min(100, query?.limit ?? 20))
    const skip = (page - 1) * limit

    if (process.env.DATABASE_URL) {
      try {
        const where: Prisma.AuditLogWhereInput = {}
        if (query?.actorUserId) {
          where.actorUserId = query.actorUserId
        }
        if (query?.action) {
          where.action = query.action
        }
        if (query?.entityType) {
          where.entityType = query.entityType
        }
        if (query?.entityId) {
          where.entityId = query.entityId
        }

        const [total, logs] = await Promise.all([
          getPrisma().auditLog.count({ where }),
          getPrisma().auditLog.findMany({
            where,
            include: {
              actor: { select: { displayName: true } },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
          }),
        ])

        return {
          data: logs.map(mapAuditLogToModel),
          total,
        }
      } catch (err) {
        console.warn("[Prisma] listLogs failed, using memory fallback", err)
      }
    }

    let filtered = [...memoryStore.auditLogs]
    if (query?.action) {
      filtered = filtered.filter((l) => l.action === query.action)
    }
    if (query?.entityType) {
      filtered = filtered.filter((l) => l.entityType === query.entityType)
    }
    if (query?.actorUserId) {
      filtered = filtered.filter((l) => l.actorUserId === query.actorUserId)
    }
    if (query?.entityId) {
      filtered = filtered.filter((l) => l.entityId === query.entityId)
    }

    const total = filtered.length
    const paged = filtered.slice(skip, skip + limit)

    return {
      data: paged.map(mapMemAuditLogToModel),
      total,
    }
  },
}
