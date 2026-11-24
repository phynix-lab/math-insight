import { z } from "zod"

let initialized = false

/**
 * Thiết lập từ điển thông báo lỗi tiếng Việt đồng bộ cho Zod trên toàn hệ thống.
 */
export function setupZodVietnameseLocale() {
  if (initialized) return
  initialized = true

  z.setErrorMap((issue) => {
    if (issue.code === "invalid_format") {
      const format = (issue as { format?: string }).format
      if (format === "email") {
        return "Email không đúng định dạng"
      }
      if (format === "uuid") {
        return "Mã định danh UUID không hợp lệ"
      }
      if (format === "datetime" || format === "date-time") {
        return "Định dạng ngày giờ không hợp lệ"
      }
      return "Định dạng không hợp lệ"
    }

    if (issue.code === "too_small") {
      if (issue.origin === "string") {
        if (issue.minimum === 1) {
          return "Thông tin này không được để trống"
        }
        return `Vui lòng nhập tối thiểu ${issue.minimum} ký tự`
      }
      if (issue.origin === "number") {
        return `Giá trị phải lớn hơn hoặc bằng ${issue.minimum}`
      }
      if (issue.origin === "array") {
        return `Cần tối thiểu ${issue.minimum} phần tử`
      }
    }

    if (issue.code === "too_big") {
      if (issue.origin === "string") {
        return `Không được vượt quá ${issue.maximum} ký tự`
      }
      if (issue.origin === "number") {
        return `Giá trị phải nhỏ hơn hoặc bằng ${issue.maximum}`
      }
      if (issue.origin === "array") {
        return `Không được vượt quá ${issue.maximum} phần tử`
      }
    }

    if (issue.code === "invalid_type") {
      const received = (issue as { received?: string }).received
      if (received === "undefined" || received === "null") {
        return "Thông tin này không được để trống"
      }
    }

    return undefined
  })
}
