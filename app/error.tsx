"use client"

import { useEffect } from "react"
import { ErrorView } from "@/components/ui/error-view"

interface ErrorProps {
  error: unknown
  retry?: () => void
  reset?: () => void
}

/**
 * Error boundary theo chuẩn Next.js App Router,
 * tự động bắt và xử lý các lỗi runtime ở các phân đoạn trang.
 */
export default function ErrorPage({ error, retry, reset }: ErrorProps) {
  useEffect(() => {
    // Ghi nhận lỗi ra console hoặc hệ thống giám sát
    console.error("Lỗi runtime bắt được tại route segment:", error)
  }, [error])

  const handleRetry = retry ?? reset

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <ErrorView
        title="Không thể tải nội dung trang"
        error={error}
        onRetry={handleRetry}
        homeHref="/"
      />
    </div>
  )
}
