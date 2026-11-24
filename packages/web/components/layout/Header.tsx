"use client"

import { Menu, User, Shield, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import { useAuthLogout } from "@/lib/api/generated/auth/auth"
import { ROLE_CONFIGS } from "@/types/navigation"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onOpenMobile?: () => void
}

export function Header({ onOpenMobile }: HeaderProps) {
  const { currentRole, canReviewApplications, userDisplayName } =
    useCurrentRole()

  const logoutMutation = useAuthLogout({
    mutation: {
      onSettled: () => {
        window.location.replace("/login")
      },
    },
  })

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
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

        <div className="hidden flex-col sm:flex">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Trung tâm Math Insight
          </span>
          <span className="text-xs text-muted-foreground">
            Phân hệ: {ROLE_CONFIGS[currentRole].label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="hidden rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary sm:inline-flex">
          {ROLE_CONFIGS[currentRole].label}
        </span>

        {currentRole === "teacher" && (
          <span
            className={cn(
              "hidden items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium md:flex",
              canReviewApplications
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-muted/40 text-muted-foreground"
            )}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>
              Quyền duyệt đơn: {canReviewApplications ? "Được bật" : "Chưa bật"}
            </span>
          </span>
        )}

        <ThemeToggle />

        <div className="flex items-center gap-2 border-l border-border pl-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden max-w-[160px] truncate text-xs font-medium text-foreground xl:inline">
            {userDisplayName}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
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
