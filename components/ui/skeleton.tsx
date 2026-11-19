import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/**
 * Component Skeleton loader dùng chung cho trạng thái chờ dữ liệu.
 */
export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-muted/70", className)}
      {...props}
    />
  )
}
