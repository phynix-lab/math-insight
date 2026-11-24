import { resolve } from "node:path"
import pg from "pg"
import { loadAppEnv, requireEnv } from "./env.ts"
import { hashPassword } from "./password.ts"

export interface SqlClient {
  query: (
    text: string,
    values?: unknown[]
  ) => Promise<{ rows: Record<string, unknown>[] }>
}

const DEFAULT_ADMIN_EMAIL = "admin@mathinsight.edu.vn"
const DEFAULT_ADMIN_NAME = "Nguyễn Quốc Huy"
const DEFAULT_ADMIN_PHONE = "0901234567"
const MIN_PASSWORD_LENGTH = 8

export interface SeedAdminResult {
  userId: string
  email: string
}

// Upsert the admin user and profile using credentials from environment variables.
// Password is never hardcoded and must satisfy the login minimum length.
export async function seedAdmin(db: SqlClient): Promise<SeedAdminResult> {
  const email = (
    process.env.ADMIN_EMAIL?.trim() || DEFAULT_ADMIN_EMAIL
  ).toLowerCase()
  const password = requireEnv("ADMIN_PASSWORD")
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters`
    )
  }

  const displayName =
    process.env.ADMIN_DISPLAY_NAME?.trim() || DEFAULT_ADMIN_NAME
  const phone = process.env.ADMIN_PHONE?.trim() || DEFAULT_ADMIN_PHONE
  const passwordHash = hashPassword(password)

  const userResult = await db.query(
    `
    INSERT INTO "users" ("email", "password_hash")
    VALUES ($1, $2)
    ON CONFLICT ("email") DO UPDATE SET
      "password_hash" = EXCLUDED."password_hash",
      "updated_at" = now()
    RETURNING "id"
    `,
    [email, passwordHash]
  )

  const userId = String(userResult.rows[0]?.id ?? "")
  if (!userId) {
    throw new Error("Failed to upsert admin user")
  }

  await db.query(
    `
    INSERT INTO "profiles" (
      "user_id",
      "display_name",
      "phone",
      "is_active",
      "can_review_applications"
    )
    VALUES ($1, $2, $3, true, true)
    ON CONFLICT ("user_id") DO UPDATE SET
      "display_name" = EXCLUDED."display_name",
      "phone" = EXCLUDED."phone",
      "is_active" = true,
      "can_review_applications" = true,
      "updated_at" = now()
    `,
    [userId, displayName, phone]
  )

  await db.query(
    `
    INSERT INTO "user_roles" ("user_id", "role")
    VALUES ($1, 'admin'::"app_role")
    ON CONFLICT ("user_id", "role") DO NOTHING
    `,
    [userId]
  )

  return { userId, email }
}

async function main() {
  const appEnv = loadAppEnv()
  const connectionString = requireEnv("DATABASE_URL")
  const pool = new pg.Pool({ connectionString })

  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const admin = await seedAdmin(client)
    await client.query("COMMIT")
    console.log(
      `[seed:${appEnv}] Admin ready: ${admin.email} (${admin.userId})`
    )
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

const isEntryPoint =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === import.meta.filename

if (isEntryPoint) {
  main().catch((error) => {
    console.error(
      "[seed] Failed:",
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  })
}
