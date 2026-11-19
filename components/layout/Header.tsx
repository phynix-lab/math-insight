"use client"

import { Menu, User, Shield, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import { ROLE_CONFIGS, type AppRole } from "@/types/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onOpenMobile?: () => void
}

export function Header({ onOpenMobile }: HeaderProps) {
  const router = useRouter()
  const {
    currentRole,
    setRole,
    canReviewApplications,
    setCanReviewApplications,
    userDisplayName,
    logout,
  } = useCurrentRole()

  const roles: AppRole[] = ["admin", "teacher", "student"]

  function handleLogout() {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      {/* Bên trái: Nút mở mobile menu và tiêu đề phân hệ */}
      <div className="flex items-center gap-3">
        {onOpenMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenMobile}
            className="h-9 w-9 p-0 md:hidden"
            aria-label="Mở danh mục điều hướng"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="hidden sm:flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Trung tâm Math Insight
          </span>
          <span className="text-xs text-muted-foreground">
            Phân hệ: {ROLE_CONFIGS[currentRole].label}
          </span>
        </div>
      </div>

      {/* Bên phải: Role Switcher, Quyền duyệt đơn (nếu là teacher), Theme Toggle, User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Bộ chuyển vai trò (Role Switcher) phục vụ test và kiểm tra layout */}
        <div className="flex items-center rounded-lg border border-border bg-muted/50 p-1 text-xs">
          <span className="hidden lg:inline px-2 font-medium text-muted-foreground">
            Vai trò:
          </span>
          <div className="flex gap-0.5">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium transition-colors",
                  currentRole === r
                    ? "bg-background text-foreground shadow-2xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={currentRole === r}
              >
                {ROLE_CONFIGS[r].label}
              </button>
            ))}
          </div>
        </div>

        {/* Nút bật/tắt quyền duyệt đơn FR-012 dành riêng khi đóng vai Teacher */}
        {currentRole === "teacher" && (
          <button
            type="button"
            onClick={() => setCanReviewApplications(!canReviewApplications)}
            title="Bật/tắt quyền duyệt đơn (FR-012) cho giáo viên để kiểm tra hiển thị menu"
            className={cn(
              "hidden md:flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
              canReviewApplications
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
            )}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Quyền duyệt đơn: {canReviewApplications ? "Bật" : "Tắt"}</span>
          </button>
        )}

        {/* Nút chuyển chế độ sáng / tối */}
        <ThemeToggle />

        {/* Thông tin tài khoản người dùng & Đăng xuất */}
        <div className="flex items-center gap-2 pl-1 border-l border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden xl:inline text-xs font-medium text-foreground max-w-[120px] truncate">
            {userDisplayName}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            title="Đăng xuất khỏi hệ thống"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
