import Link from "next/link"
import { FileQuestion, Home } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

/**
 * Trang 404 Not Found theo chuẩn file convention của Next.js App Router.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-6 shadow-xs">
        <FileQuestion className="h-8 w-8 text-primary" />
      </div>

      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        Lỗi 404
      </span>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Không tìm thấy trang yêu cầu
      </h1>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Đường dẫn bạn đang truy cập có thể đã bị thay đổi, chuyển đi nơi khác hoặc
        bạn chưa được cấp quyền truy cập vào phân hệ này.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          <Home className="mr-2 h-4 w-4" />
          Trở về trang chủ
        </Link>
      </div>
    </div>
  )
}
