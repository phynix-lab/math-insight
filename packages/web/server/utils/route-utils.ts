import "server-only"

import { z } from "zod"

type BodyResult<T> = { ok: true; data: T } | { ok: false; response: Response }

/**
 * Đọc JSON từ request và kiểm tra dữ liệu bằng schema Zod.
 *
 * @param request Request chứa JSON body cần xử lý.
 * @param schema Schema Zod dùng để xác thực và chuyển đổi dữ liệu.
 * @returns Dữ liệu đã được xác thực hoặc Response lỗi 400.
 */
export async function parseRequestBody<TSchema extends z.ZodType>(
  request: Request,
  schema: TSchema
): Promise<BodyResult<z.output<TSchema>>> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return {
      ok: false,
      response: Response.json({ error: "Invalid JSON body" }, { status: 400 }),
    }
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return {
      ok: false,
      response: Response.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      ),
    }
  }

  return { ok: true, data: result.data }
}

/**
 * Tạo Response lỗi 404 cho tài nguyên không tồn tại.
 *
 * @param resource Tên tài nguyên, mặc định là "Resource".
 * @returns Response JSON có status 404.
 */
export function notFoundResponse(resource = "Resource") {
  return Response.json({ error: `${resource} not found` }, { status: 404 })
}

/**
 * Tạo Response lỗi 401 khi chưa xác thực hoặc thông tin đăng nhập không hợp lệ.
 */
export function unauthorizedResponse(message = "Unauthorized") {
  return Response.json({ error: "UNAUTHORIZED", message }, { status: 401 })
}

/**
 * Tạo Response lỗi 403 khi người dùng không đủ quyền hạn (AC-4, NFR-02).
 */
export function forbiddenResponse(
  message = "Bạn không có quyền truy cập tài nguyên này."
) {
  return Response.json({ error: "FORBIDDEN", message }, { status: 403 })
}
