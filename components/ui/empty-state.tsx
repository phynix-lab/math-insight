import { type ReactNode, type ComponentType } from "react"
import { Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps {
  /**
   * Icon đại diện cho trạng thái trống, mặc định là icon Inbox.
   */
  icon?: ComponentType<{ className?: string }>
  title: string
  description?: string
  /**
   * Nút bấm hành động (ví dụ: Tạo mới, Thêm học sinh, Thử lại).
   */
  action?: ReactNode
  className?: string
  bordered?: boolean
}

/**
 * Component hiển thị khi danh sách hoặc nội dung chưa có dữ liệu.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
  bordered = true,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        bordered && "rounded-xl border border-dashed border-border bg-card/50",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
