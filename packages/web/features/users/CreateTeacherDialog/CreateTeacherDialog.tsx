"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { UserPlus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import TextField from "@/components/form/TextField/TextField"
import {
  getUsersListQueryKey,
  useUsersCreate,
} from "@/lib/api/generated/users/users"
import {
  CreateUserRequest as createUserRequestSchema,
  type CreateUserRequest,
} from "@/types/generated/mathInsightAPI.schemas.zod"

/**
 * Dialog tạo tài khoản giáo viên mới dành cho Quản trị viên.
 * Mặc định tài khoản được gán vai trò `teacher`, `isActive = true`, `canReviewApplications = false`.
 */
export function CreateTeacherDialog() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<CreateUserRequest>({
    resolver: zodResolver(createUserRequestSchema),
    defaultValues: {
      displayName: "",
      email: "",
      phone: "",
      canReviewApplications: false,
      roles: ["teacher"],
    },
  })

  const createMutation = useUsersCreate({
    mutation: {
      onSuccess: async () => {
        form.reset()
        setOpen(false)
        await queryClient.invalidateQueries({
          queryKey: getUsersListQueryKey(),
        })
      },
    },
  })

  const onSubmit = (values: CreateUserRequest) => {
    createMutation.mutate({
      data: {
        ...values,
        roles: ["teacher"],
      },
    })
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      form.reset()
      createMutation.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Thêm giáo viên</span>
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Tạo tài khoản giáo viên</DialogTitle>
            <DialogDescription>
              Thêm giáo viên mới vào hệ thống Math Insight. Mặc định tài khoản sẽ
              có trạng thái hoạt động với mật khẩu khởi tạo ngẫu nhiên.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-1">
            <div className="space-y-1.5">
              <Label htmlFor="displayName">Họ và tên *</Label>
              <TextField
                id="displayName"
                control={form.control}
                name="displayName"
                placeholder="Ví dụ: Thầy Trần Quang Nam"
                aria-label="Họ và tên giáo viên"
                disabled={createMutation.isPending}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email đăng nhập *</Label>
              <TextField
                id="email"
                type="email"
                control={form.control}
                name="email"
                placeholder="Ví dụ: thay.nam@mathinsight.edu.vn"
                aria-label="Email đăng nhập"
                disabled={createMutation.isPending}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Số điện thoại</Label>
              <TextField
                id="phone"
                control={form.control}
                name="phone"
                placeholder="Ví dụ: 0912345678"
                aria-label="Số điện thoại"
                disabled={createMutation.isPending}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 bg-muted/30">
              <div className="space-y-0.5 pr-2">
                <Label
                  htmlFor="canReviewApplications"
                  className="text-sm font-medium"
                >
                  Quyền duyệt đơn đăng ký
                </Label>
                <p className="text-xs text-muted-foreground">
                  Cho phép giáo viên này tham gia xét duyệt đơn ứng tuyển học
                  sinh.
                </p>
              </div>
              <Controller
                control={form.control}
                name="canReviewApplications"
                render={({ field }) => (
                  <Switch
                    id="canReviewApplications"
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    disabled={createMutation.isPending}
                  />
                )}
              />
            </div>
          </div>

          {createMutation.isError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {createMutation.error.message ||
                "Đã có lỗi xảy ra khi tạo tài khoản giáo viên."}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={createMutation.isPending}
              onClick={() => handleOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Tạo tài khoản
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
