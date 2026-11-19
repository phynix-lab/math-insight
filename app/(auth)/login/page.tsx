"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, GraduationCap, User, ArrowRight, AlertCircle, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import { DEMO_ACCOUNTS } from "@/types/auth"
import type { AppRole } from "@/types/navigation"

export default function LoginPage() {
  const router = useRouter()
  const { login, quickLogin } = useCurrentRole()
  const [email, setEmail] = useState("admin@mathinsight.edu.vn")
  const [password, setPassword] = useState("admin123")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage(null)

    startTransition(async () => {
      const result = await login(email, password)
      if (result.success) {
        router.push("/")
      } else {
        setErrorMessage(result.error ?? "Đăng nhập không thành công.")
      }
    })
  }

  function handleQuickLogin(role: AppRole) {
    quickLogin(role)
    router.push("/")
  }

  return (
    <div className="space-y-6">
      {/* Khung đăng nhập chính */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Đăng nhập hệ thống
          </h2>
          <p className="text-xs text-muted-foreground">
            Chọn tài khoản mẫu bên dưới hoặc nhập thông tin đăng nhập.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Email đăng nhập</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@mathinsight.edu.vn"
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Mật khẩu</label>
              <span className="text-[11px] text-muted-foreground">Demo: mật khẩu bên dưới</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Đang xử lý..." : "Đăng nhập"}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* 3 Tài khoản mẫu theo 3 vai trò */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 px-1 text-xs font-medium text-muted-foreground">
          <Key className="h-3.5 w-3.5" />
          <span>3 Tài khoản mẫu để kiểm thử nhanh (1-Click Login):</span>
        </div>

        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((acc) => {
            const Icon =
              acc.role === "admin"
                ? ShieldCheck
                : acc.role === "teacher"
                ? GraduationCap
                : User

            return (
              <div
                key={acc.role}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-xs transition-colors hover:border-primary/40 shadow-2xs"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground truncate">
                        {acc.displayName}
                      </span>
                      <span className="rounded-sm bg-muted px-1.5 py-0.2 text-[10px] font-medium text-muted-foreground">
                        {acc.roleLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono truncate">
                      {acc.email} • pass: <strong>{acc.password}</strong>
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail(acc.email)
                    setPassword(acc.password)
                    handleQuickLogin(acc.role)
                  }}
                  className="shrink-0 text-xs h-7"
                >
                  Vào ngay
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
