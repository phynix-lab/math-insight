import type { ReactNode } from "react"
import Link from "next/link"

/**
 * Layout chuyên biệt cho phân hệ xác thực (Auth):
 * Căn giữa màn hình, không chứa Sidebar/AppShell nội bộ.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-sm mb-3"
          >
            MI
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Math Insight
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hệ thống quản lý trung tâm toán học
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}
