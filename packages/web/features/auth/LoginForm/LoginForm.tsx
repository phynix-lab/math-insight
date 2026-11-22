"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ShieldCheck,
  GraduationCap,
  User,
  ArrowRight,
  AlertCircle,
  Key,
  UserX,
} from "lucide-react"

import TextField from "@/components/form/TextField/TextField"
import { Button } from "@/components/ui/button"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import {
  loginSchema,
  type LoginFormValues,
  type LoginFormOutput,
  DEMO_ACCOUNTS,
} from "@/types/auth"

export function LoginForm() {
  const router = useRouter()
  const { login } = useCurrentRole()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginFormValues, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@mathinsight.edu.vn",
      password: "admin123",
    },
  })

  async function onSubmit(values: LoginFormOutput) {
    setErrorMessage(null)

    startTransition(async () => {
      const result = await login(values.email, values.password)
      if (result.success) {
        // Đăng nhập thành công -> chuyển về trang chủ theo vai trò (AC-1)
        router.push("/")
      } else {
        // AC-2 (sai mật khẩu -> lỗi chung) & AC-3 (tài khoản ngừng hoạt động)
        setErrorMessage(result.error ?? "Email hoặc mật khẩu không đúng")
      }
    })
  }

  function handleQuickLogin(account: (typeof DEMO_ACCOUNTS)[number]) {
    form.setValue("email", account.email)
    form.setValue("password", account.password)
    setErrorMessage(null)

    startTransition(async () => {
      const result = await login(account.email, account.password)
      if (result.success) {
        router.push("/")
      } else {
        setErrorMessage(result.error ?? "Email hoặc mật khẩu không đúng")
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Khung đăng nhập chính */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Đăng nhập hệ thống
          </h2>
          <p className="text-xs text-muted-foreground">
            Sử dụng email và mật khẩu hoặc chọn tài khoản mẫu bên dưới để kiểm
            thử.
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

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3.5 pt-1"
        >
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">
              Email đăng nhập
            </label>
            <TextField
              control={form.control}
              name="email"
              type="email"
              placeholder="email@mathinsight.edu.vn"
              aria-label="Email đăng nhập"
              disabled={isPending}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">
                Mật khẩu (tối thiểu 8 ký tự)
              </label>
              <span className="text-[11px] text-muted-foreground">
                Tối thiểu 8 ký tự
              </span>
            </div>
            <TextField
              control={form.control}
              name="password"
              type="password"
              placeholder="••••••••"
              aria-label="Mật khẩu"
              disabled={isPending}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Đang xử lý..." : "Đăng nhập"}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Danh sách tài khoản mẫu theo 3 vai trò và tài khoản test AC-3 */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 px-1 text-xs font-medium text-muted-foreground">
          <Key className="h-3.5 w-3.5" />
          <span>Tài khoản mẫu để kiểm thử nhanh (1-Click Login):</span>
        </div>

        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((acc) => {
            const isInactive = acc.isActive === false
            const Icon = isInactive
              ? UserX
              : acc.role === "admin"
                ? ShieldCheck
                : acc.role === "teacher"
                  ? GraduationCap
                  : User

            return (
              <div
                key={acc.email}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 text-xs shadow-2xs transition-colors ${
                  isInactive
                    ? "border-destructive/30 bg-destructive/5 hover:border-destructive/50"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex min-w-0 items-start gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      isInactive
                        ? "bg-destructive/15 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate font-semibold text-foreground">
                        {acc.displayName}
                      </span>
                      <span
                        className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${
                          isInactive
                            ? "bg-destructive/15 text-destructive"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {acc.roleLabel}
                      </span>
                    </div>
                    <p className="truncate font-mono text-[11px] text-muted-foreground">
                      {acc.email} • pass: <strong>{acc.password}</strong>
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant={isInactive ? "destructive" : "outline"}
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleQuickLogin(acc)}
                  className="h-7 shrink-0 text-xs"
                >
                  {isInactive ? "Thử chặn AC-3" : "Vào ngay"}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
