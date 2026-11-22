"use client"

import { useEffect } from "react"
import { ErrorView } from "@/components/ui/error-view"

interface GlobalErrorProps {
  error: unknown
  retry?: () => void
  reset?: () => void
}

/**
 * Global Error boundary bắt lỗi nghiêm trọng tại Root Layout của Next.js.
 * Theo quy ước Next.js, file này bắt buộc phải bao bọc cả thẻ <html> và <body>.
 */
export default function GlobalError({ error, retry, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Lỗi nghiêm trọng tại Root Layout (global-error):", error)
  }, [error])

  const handleRetry = retry ?? reset

  return (
    <html lang="vi">
      <body className="flex min-h-screen items-center justify-center bg-background p-6 font-sans text-foreground antialiased">
        <ErrorView
          title="Lỗi hệ thống nghiêm trọng"
          message="Ứng dụng gặp sự cố khi khởi tạo giao diện gốc. Vui lòng tải lại hoặc thử lại."
          error={error}
          onRetry={handleRetry}
          homeHref="/"
        />
      </body>
    </html>
  )
}
