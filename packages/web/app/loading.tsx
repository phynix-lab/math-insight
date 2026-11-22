import { Skeleton } from "@/components/ui/skeleton"

/**
 * Instant loading fallback theo chuẩn Next.js App Router (React Suspense).
 * Hiển thị skeleton placeholder đồng bộ khi chuyển trang.
 */
export default function Loading() {
  return (
    <div className="space-y-6" role="status" aria-label="Đang tải dữ liệu...">
      {/* Skeleton tiêu đề trang */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Skeleton thẻ tóm tắt / thống kê */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-36" />
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-40" />
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>

      {/* Skeleton danh sách nội dung chính */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
        <div className="space-y-3 pt-2">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
