import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { loadEnvFile } from "node:process"
import { defineConfig } from "prisma/config"

const ENV_FILES = {
  development: [
    ".env.development.local",
    ".env.development",
    ".env.local",
    ".env",
  ],
  staging: [".env.staging.local", ".env.staging"],
  production: [".env.production.local", ".env.production"],
} as const

type AppEnv = keyof typeof ENV_FILES

const ENV_ALIASES: Record<string, AppEnv> = {
  dev: "development",
  development: "development",
  staging: "staging",
  prod: "production",
  production: "production",
}

function resolveAppEnv(): AppEnv {
  const raw = (process.env.APP_ENV ?? "development").trim().toLowerCase()
  const resolved = ENV_ALIASES[raw]
  if (!resolved) {
    throw new Error(
      `Invalid APP_ENV="${raw}". Expected one of: development, dev, staging, production, prod.`
    )
  }
  return resolved
}

// Load env files for the target environment without overriding already-set process.env vars.
// Staging and production intentionally skip .env and .env.local to prevent hitting dev DB.
const appEnv = resolveAppEnv()
for (const file of ENV_FILES[appEnv]) {
  const filePath = resolve(import.meta.dirname, file)
  if (existsSync(filePath)) {
    loadEnvFile(filePath)
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : undefined,
})
