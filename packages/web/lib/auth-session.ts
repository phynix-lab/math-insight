import type { AppRole } from "@/types/navigation"

export const SESSION_COOKIE_NAME = "math_insight_session"
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60

export interface SessionPayload {
  userId: string
  roles: AppRole[]
  canReviewApplications: boolean
  expiresAt: string
}

const VALID_ROLES = new Set<AppRole>(["admin", "teacher", "student"])
const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET?.trim()
  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      return "math-insight-dev-auth-secret-32-chars-long"
    }
    throw new Error("Missing AUTH_SECRET environment variable")
  }
  return secret
}

function toBase64Url(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64url")
  }

  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function fromBase64Url(encoded: string): Uint8Array<ArrayBuffer> | null {
  try {
    if (typeof Buffer !== "undefined") {
      const buf = Buffer.from(encoded, "base64url")
      const out = new Uint8Array(new ArrayBuffer(buf.length))
      out.set(buf)
      return out
    }

    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4)
    const binary = atob(padded)
    const out = new Uint8Array(new ArrayBuffer(binary.length))
    for (let i = 0; i < binary.length; i += 1) {
      out[i] = binary.charCodeAt(i)
    }
    return out
  } catch {
    return null
  }
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
}

function isValidPayload(value: unknown): value is SessionPayload {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as Record<string, unknown>
  if (typeof candidate.userId !== "string" || !candidate.userId) {
    return false
  }
  if (typeof candidate.expiresAt !== "string" || !candidate.expiresAt) {
    return false
  }
  if (typeof candidate.canReviewApplications !== "boolean") {
    return false
  }
  if (!Array.isArray(candidate.roles) || candidate.roles.length === 0) {
    return false
  }

  return candidate.roles.every(
    (role) => typeof role === "string" && VALID_ROLES.has(role as AppRole)
  )
}

// Sign session payload using HMAC-SHA256 via Web Crypto (works in Proxy and Node runtimes).
export async function signSessionPayload(
  payload: SessionPayload
): Promise<string> {
  const key = await importHmacKey(getAuthSecret())
  const encodedPayload = toBase64Url(
    textEncoder.encode(JSON.stringify(payload))
  )
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(encodedPayload)
  )
  const encodedSignature = toBase64Url(new Uint8Array(signature))
  return `${encodedPayload}.${encodedSignature}`
}

// Verify HMAC-SHA256 signature and expiration before trusting any cookie claims.
export async function verifySessionToken(
  token: string | null | undefined
): Promise<SessionPayload | null> {
  if (!token) {
    return null
  }

  const parts = token.split(".")
  if (parts.length !== 2) {
    return null
  }

  const [encodedPayload, encodedSignature] = parts
  if (!encodedPayload || !encodedSignature) {
    return null
  }

  const signatureBytes = fromBase64Url(encodedSignature)
  if (!signatureBytes) {
    return null
  }

  try {
    const key = await importHmacKey(getAuthSecret())
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      textEncoder.encode(encodedPayload)
    )
    if (!isValid) {
      return null
    }

    const payloadBytes = fromBase64Url(encodedPayload)
    if (!payloadBytes) {
      return null
    }

    const parsed: unknown = JSON.parse(textDecoder.decode(payloadBytes))
    if (!isValidPayload(parsed)) {
      return null
    }

    const expiresAtMs = Date.parse(parsed.expiresAt)
    if (Number.isNaN(expiresAtMs) || expiresAtMs <= Date.now()) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function buildSessionCookieHeader(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax${secure}`
}

export function buildClearSessionCookieHeader(): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""
  return `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax${secure}`
}
