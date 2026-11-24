import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

const SCRYPT_PREFIX = "scrypt"
const SALT_BYTES = 16
const KEY_BYTES = 64

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_BYTES).toString("hex")
  const derived = scryptSync(password, salt, KEY_BYTES).toString("hex")
  return `${SCRYPT_PREFIX}$${salt}$${derived}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split("$")
  if (parts.length !== 3 || parts[0] !== SCRYPT_PREFIX) {
    return false
  }

  const [, salt, hashHex] = parts
  if (!salt || !hashHex) {
    return false
  }

  const storedBuffer = Buffer.from(hashHex, "hex")
  const derivedBuffer = scryptSync(password, salt, storedBuffer.length)
  if (storedBuffer.length !== derivedBuffer.length) {
    return false
  }

  return timingSafeEqual(storedBuffer, derivedBuffer)
}
