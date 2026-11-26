"use client"

import { useState, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import {
  Search,
  UserCheck,
  Shield,
  GraduationCap,
  Users,
  CheckCircle2,
  XCircle,
  FileCheck2,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { EmptyState } from "@/components/ui/empty-state"
import {
  getUsersListQueryKey,
  useUsersListSuspense,
  useUsersUpdate,
} from "@/lib/api/generated/users/users"
import type { UserProfile, AppRole } from "@/lib/api/generated/model"
import { UserRoleModal } from "../UserRoleModal/UserRoleModal"

const ROLE_BADGE_MAP: Record<
  AppRole,
  {
    label: string
    variant: "default" | "secondary" | "outline"
    className?: string
  }
> = {
  admin: {
    label: "Quản trị viên",
    variant: "default",
    className: "bg-purple-600 hover:bg-purple-700 text-white",
  },
  teacher: {
    label: "Giáo viên",
    variant: "secondary",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  },
  student: {
    label: "Học sinh",
    variant: "outline",
    className: "text-muted-foreground",
  },
}

export function UserList() {
  const queryClient = useQueryClient()
  const { data: usersResponse } = useUsersListSuspense()
  const users = usersResponse.data

  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [roleModalUser, setRoleModalUser] = useState<UserProfile | null>(null)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const updateMutation = useUsersUpdate({
    mutation: {
      onSuccess: async () => {
        setActionError(null)
        await queryClient.invalidateQueries({
          queryKey: getUsersListQueryKey(),
        })
      },
      onError: (err) => {
        setActionError(err.message || "Không thể cập nhật người dùng.")
      },
    },
  })

  const handleToggleCanReview = (user: UserProfile, checked: boolean) => {
    setActionError(null)
    updateMutation.mutate({
      userId: user.userId,
      data: {
        canReviewApplications: checked,
      },
    })
  }

  const handleToggleActive = (user: UserProfile, checked: boolean) => {
    setActionError(null)
    updateMutation.mutate({
      userId: user.userId,
      data: {
        isActive: checked,
      },
    })
  }

  const handleOpenRoleModal = (user: UserProfile) => {
    setRoleModalUser(user)
    setIsRoleModalOpen(true)
  }

  // Lọc danh sách người dùng theo tìm kiếm, vai trò và trạng thái
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        search === "" ||
        user.displayName.toLowerCase().includes(search.toLowerCase()) ||
        (user.email &&
          user.email.toLowerCase().includes(search.toLowerCase())) ||
        (user.phone && user.phone.includes(search))

      const matchRole =
        roleFilter === "all" || user.roles.includes(roleFilter as AppRole)

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive)

      return matchSearch && matchRole && matchStatus
    })
  }, [users, search, roleFilter, statusFilter])

  // Thống kê nhanh
  const stats = useMemo(() => {
    const total = users.length
    const teachers = users.filter((u) => u.roles.includes("teacher")).length
    const active = users.filter((u) => u.isActive).length
    const canReview = users.filter((u) => u.canReviewApplications).length
    return { total, teachers, active, canReview }
  }, [users])

  return (
    <div className="space-y-4">
      {/* Thẻ chỉ số tổng quan */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Tổng tài khoản
            </p>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Giáo viên</p>
            <p className="text-xl font-bold">{stats.teachers}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Đang hoạt động
            </p>
            <p className="text-xl font-bold">{stats.active}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Duyệt đơn tuyển sinh
            </p>
            <p className="text-xl font-bold">{stats.canReview}</p>
          </div>
        </div>
      </div>

      {actionError && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {actionError}
        </div>
      )}

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, email hoặc số điện thoại..."
            aria-label="Tìm kiếm người dùng"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Lọc:</span>
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            aria-label="Lọc theo vai trò"
            className="h-9 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="teacher">Giáo viên</option>
            <option value="student">Học sinh</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Lọc theo trạng thái"
            className="h-9 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã khóa / Tạm dừng</option>
          </select>
        </div>
      </div>

      {/* Bảng danh sách người dùng */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Không tìm thấy người dùng phù hợp"
          description={
            search || roleFilter !== "all" || statusFilter !== "all"
              ? "Hãy thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc."
              : "Chưa có tài khoản nào trong hệ thống."
          }
          action={
            (search || roleFilter !== "all" || statusFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("")
                  setRoleFilter("all")
                  setStatusFilter("all")
                }}
              >
                Đặt lại bộ lọc
              </Button>
            )
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Người dùng
                </th>
                <th scope="col" className="px-4 py-3">
                  Vai trò
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Quyền duyệt đơn
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Trạng thái
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr
                  key={user.userId}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                        {user.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email ?? "Chưa có email"}
                        </p>
                        {user.phone && (
                          <p className="text-[11px] text-muted-foreground/80 truncate">
                            {user.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((r) => {
                        const meta = ROLE_BADGE_MAP[r] ?? {
                          label: r,
                          variant: "outline",
                        }
                        return (
                          <Badge
                            key={r}
                            variant={meta.variant}
                            className={meta.className}
                          >
                            {meta.label}
                          </Badge>
                        )
                      })}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <Switch
                        checked={user.canReviewApplications}
                        disabled={updateMutation.isPending}
                        onCheckedChange={(checked) =>
                          handleToggleCanReview(user, checked)
                        }
                        aria-label={`Bật tắt quyền duyệt đơn cho ${user.displayName}`}
                      />
                      <span className="text-[11px] text-muted-foreground">
                        {user.canReviewApplications ? "Được duyệt" : "Không"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <Switch
                        checked={user.isActive}
                        disabled={updateMutation.isPending}
                        onCheckedChange={(checked) =>
                          handleToggleActive(user, checked)
                        }
                        aria-label={`Bật tắt trạng thái hoạt động cho ${user.displayName}`}
                      />
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          user.isActive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            Hoạt động
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" />
                            Đã khóa
                          </>
                        )}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRoleModal(user)}
                      className="gap-1.5"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      <span>Phân quyền</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Phân quyền */}
      <UserRoleModal
        user={roleModalUser}
        open={isRoleModalOpen}
        onOpenChange={setIsRoleModalOpen}
      />
    </div>
  )
}
