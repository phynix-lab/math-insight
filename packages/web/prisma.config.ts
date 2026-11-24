import { defineConfig } from "prisma/config"
import { loadAppEnv } from "./prisma/env.ts"

loadAppEnv()

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.ts",
  },
  datasource: process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : undefined,
})
