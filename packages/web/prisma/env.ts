import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { loadEnvFile } from "node:process"

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

export type AppEnv = keyof typeof ENV_FILES

const ENV_ALIASES: Record<string, AppEnv> = {
  dev: "development",
  development: "development",
  staging: "staging",
  prod: "production",
  production: "production",
}

const WEB_ROOT = resolve(import.meta.dirname, "..")

export function resolveAppEnv(): AppEnv {
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
export function loadAppEnv(): AppEnv {
  const appEnv = resolveAppEnv()
  for (const file of ENV_FILES[appEnv]) {
    const filePath = resolve(WEB_ROOT, file)
    if (existsSync(filePath)) {
      loadEnvFile(filePath)
    }
  }
  return appEnv
}

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}
