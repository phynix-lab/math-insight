import { http, passthrough } from "msw"
import * as generatedMocks from "@/lib/api/generated/index.msw"
import type { RequestHandler } from "msw"

const generatedHandlers: RequestHandler[] = Object.values(
  generatedMocks
).flatMap((getMockHandlers) => getMockHandlers())

export const handlers: RequestHandler[] = [
  // Cho phép các endpoint đã triển khai Route Handler thật đi thẳng vào server
  http.all("/api/auth/*", () => passthrough()),
  http.all("/api/users*", () => passthrough()),
  http.all("/api/audit-logs*", () => passthrough()),
  ...generatedHandlers,
]
