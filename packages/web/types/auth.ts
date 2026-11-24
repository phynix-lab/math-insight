import { z } from "zod"

/**
 * Schema xác thực form đăng nhập với thông báo lỗi tiếng Việt đồng bộ.
 * Mật khẩu yêu cầu tối thiểu 8 ký tự và tối đa 128 ký tự.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email đăng nhập")
    .email("Email không đúng định dạng"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có tối thiểu 8 ký tự")
    .max(128, "Mật khẩu không được vượt quá 128 ký tự"),
})

export type LoginFormValues = z.input<typeof loginSchema>
export type LoginFormOutput = z.output<typeof loginSchema>
