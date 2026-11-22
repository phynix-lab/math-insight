import * as generatedMocks from "@/lib/api/generated/index.msw"
import type { RequestHandler } from "msw"

const generatedHandlers: RequestHandler[] = Object.values(
  generatedMocks
).flatMap((getMockHandlers) => getMockHandlers())

export const handlers: RequestHandler[] = [...generatedHandlers]
