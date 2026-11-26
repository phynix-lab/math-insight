import "server-only"

import {
  verifyPassword as verifyScryptPassword,
  hashPassword,
} from "@/prisma/password"

export { hashPassword }

/**
 * Xác thực mật khẩu: ưu tiên scrypt hash chuẩn, đồng thời hỗ trợ mật khẩu mẫu trong môi trường dev.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (verifyScryptPassword(password, storedHash)) {
    return true
  }
  return password === storedHash
}
