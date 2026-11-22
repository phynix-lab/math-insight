"use client"

import { AlertTriangle, RotateCcw, Home } from "lucide-react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ErrorViewProps {
  title?: string
  message?: string
  error?: unknown
  onRetry?: () => void
  homeHref?: string
  className?: string
  compact?: boolean
}

/**
 * Component hiển thị giao diện báo lỗi thân thiện,
 * hỗ trợ nút thử lại (retry) và nút quay về trang chủ.
 */
export function ErrorView({
  title = "Đã xảy ra lỗi không mong muốn",
  message,
  error,
  onRetry,
  homeHref = "/",
  className,
  compact = false,
}: ErrorViewProps) {
  // Trích xuất thông điệp chi tiết nếu đối tượng là Error instance
  const detailedMessage =
    message ??
    (error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Hệ thống gặp sự cố trong quá trình xử lý yêu cầu. Vui lòng thử lại sau.")

  const digest =
    error && typeof error === "object" && "digest" in error
      ? String((error as { digest?: unknown }).digest)
      : undefined

  if (compact) {
    return (
      <div
        role="alert"
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{detailedMessage}</span>
        </div>
        {onRetry && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="h-7 shrink-0 text-xs"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Thử lại
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center shadow-xs",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground break-words">
        {detailedMessage}
      </p>

      {digest && (
        <p className="mt-1 text-xs text-muted-foreground/70 font-mono">
          Mã lỗi: {digest}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button type="button" onClick={onRetry}>
            <RotateCcw className="mr-1.5 h-4 w-4" />
            Thử lại
          </Button>
        )}
        {homeHref && (
          <Link href={homeHref} className={buttonVariants({ variant: "outline" })}>
            <Home className="mr-1.5 h-4 w-4" />
            Về trang chủ
          </Link>
        )}
      </div>
    </div>
  )
}
