"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Shield, ShieldAlert, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  getUsersListQueryKey,
  useUsersUpdateRoles,
} from "@/lib/api/generated/users/users"
import type { UserProfile, AppRole } from "@/lib/api/generated/model"

interface UserRoleModalProps {
  user: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AVAILABLE_ROLES: {
  role: AppRole
  label: string
  description: string
}[] = [
  {
    role: "admin",
    label: "Quản trị viên (Admin)",
    description: "Toàn quyền quản trị hệ thống, quản lý tài khoản và phân quyền.",
  },
  {
    role: "teacher",
    label: "Giáo viên (Teacher)",
    description: "Quản lý lớp học, phân công giảng dạy, điểm danh học sinh.",
  },
  {
    role: "student",
    label: "Học sinh (Student)",
    description: "Xem thời khóa biểu, lịch học và kết quả điểm danh.",
  },
]

function UserRoleForm({
  user,
  onClose,
}: {
  user: UserProfile
  onClose: () => void
}) {
  const queryClient = useQueryClient()
  const [selectedRoles, setSelectedRoles] = useState<AppRole[]>(
    user.roles ?? []
  )
  const [validationError, setValidationError] = useState<string | null>(null)

  const updateRolesMutation = useUsersUpdateRoles({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: getUsersListQueryKey(),
        })
        onClose()
      },
    },
  })

  const handleToggleRole = (role: AppRole, checked: boolean) => {
    setValidationError(null)
    if (checked) {
      setSelectedRoles((prev) => [...prev, role])
    } else {
      if (selectedRoles.length === 1 && selectedRoles.includes(role)) {
        setValidationError("Tài khoản phải sở hữu ít nhất một vai trò.")
        return
      }
      setSelectedRoles((prev) => prev.filter((r) => r !== role))
    }
  }

  const handleSave = () => {
    if (selectedRoles.length === 0) {
      setValidationError("Vui lòng chọn ít nhất một vai trò cho tài khoản.")
      return
    }

    updateRolesMutation.mutate({
      userId: user.userId,
      data: {
        roles: selectedRoles,
      },
    })
  }

  return (
    <>
      <div className="space-y-3 py-2">
        {AVAILABLE_ROLES.map(({ role, label, description }) => {
          const isChecked = selectedRoles.includes(role)
          return (
            <label
              key={role}
              htmlFor={`role-${role}`}
              className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <Checkbox
                id={`role-${role}`}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleToggleRole(role, Boolean(checked))
                }
                disabled={updateRolesMutation.isPending}
                className="mt-0.5"
              />
              <div className="space-y-0.5">
                <span className="text-sm font-medium leading-none text-foreground block">
                  {label}
                </span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </label>
          )
        })}
      </div>

      {validationError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive"
        >
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {updateRolesMutation.isError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
        >
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Không thể cập nhật vai trò</p>
            <p>
              {updateRolesMutation.error.message ||
                "Đã xảy ra lỗi khi cập nhật phân quyền."}
            </p>
          </div>
        </div>
      )}

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          disabled={updateRolesMutation.isPending}
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          type="button"
          disabled={updateRolesMutation.isPending}
          onClick={handleSave}
        >
          {updateRolesMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Lưu thay đổi
        </Button>
      </DialogFooter>
    </>
  )
}

export function UserRoleModal({
  user,
  open,
  onOpenChange,
}: UserRoleModalProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <DialogTitle>Phân quyền tài khoản</DialogTitle>
          </div>
          <DialogDescription>
            Cập nhật các vai trò hệ thống cho{" "}
            <span className="font-semibold text-foreground">
              {user.displayName}
            </span>{" "}
            ({user.email ?? "Chưa có email"}).
          </DialogDescription>
        </DialogHeader>

        {open && (
          <UserRoleForm
            key={`${user.userId}-${open}`}
            user={user}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
