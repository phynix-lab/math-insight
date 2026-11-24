"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, AlertCircle } from "lucide-react"

import TextField from "@/components/form/TextField/TextField"
import { Button } from "@/components/ui/button"
import { ApiError } from "@/lib/api/custom-fetch"
import { useAuthLogin } from "@/lib/api/generated/auth/auth"
import {
  loginSchema,
  type LoginFormValues,
  type LoginFormOutput,
} from "@/types/auth"

export function LoginForm() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loginMutation = useAuthLogin({
    mutation: {
      onSuccess: () => {
        router.push("/")
      },
      onError: (err) => {
        if (err instanceof ApiError && err.status === 403) {
          setErrorMessage(
            err.message ||
              "Tài khoản của bạn đã ngừng hoạt động. Vui lòng liên hệ quản trị viên."
          )
          return
        }
        setErrorMessage("Email hoặc mật khẩu không đúng")
      },
    },
  })

  const form = useForm<LoginFormValues, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(values: LoginFormOutput) {
    setErrorMessage(null)
    loginMutation.mutate({
      data: {
        email: values.email.trim(),
        password: values.password,
      },
    })
  }

  const isPending = loginMutation.isPending

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Đăng nhập hệ thống
        </h2>
        <p className="text-xs text-muted-foreground">
          Nhập email và mật khẩu được cấp để truy cập hệ thống.
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5 pt-1">
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
  )
}
