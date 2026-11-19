"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Đăng nhập
        </h2>
        <p className="text-xs text-muted-foreground">
          Đăng nhập bằng tài khoản được cấp để truy cập hệ thống.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-foreground">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            disabled
            className="w-full rounded-lg border border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
            defaultValue="admin@mathinsight.edu.vn"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-foreground">Mật khẩu</label>
          <input
            type="password"
            disabled
            className="w-full rounded-lg border border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
            defaultValue="••••••••••••"
          />
        </div>

        <Link
          href="/"
          className={buttonVariants({ variant: "default", className: "w-full" })}
        >
          Vào hệ thống (Demo)
        </Link>
      </div>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Hệ thống phân quyền Supabase Auth đang được kết nối trong Sprint 1.
      </p>
    </div>
  )
}
