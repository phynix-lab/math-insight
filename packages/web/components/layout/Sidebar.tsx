"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  QrCode,
  Users,
  FileText,
  ShieldCheck,
  History,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react"
import { useCurrentRole } from "@/components/providers/RoleProvider"
import { NAV_ITEMS, ROLE_CONFIGS, type NavItem } from "@/types/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  QrCode,
  Users,
  FileText,
  ShieldCheck,
  History,
}

interface SidebarProps {
  onCloseMobile?: () => void
  className?: string
}

export function Sidebar({ onCloseMobile, className }: SidebarProps) {
  const pathname = usePathname()
  const { currentRole, canReviewApplications } = useCurrentRole()

  const currentRoleConfig = ROLE_CONFIGS[currentRole]

  // Lọc danh sách menu theo vai trò hiện tại và quyền can_review_applications (FR-012)
  const visibleItems = NAV_ITEMS.filter((item: NavItem) => {
    if (item.roles && !item.roles.includes(currentRole)) {
      return false
    }
    if (
      item.requiresReviewPermission &&
      currentRole === "teacher" &&
      !canReviewApplications
    ) {
      return false
    }
    return true
  })

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className
      )}
      aria-label="Điều hướng chính"
    >
      {/* Header Sidebar: Logo & Thông tin dự án */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground shadow-xs">
            MI
          </div>
          <div className="flex flex-col">
            <span className="text-base leading-tight font-bold">
              Math Insight
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              MVP v0.6 • Sprint 1
            </span>
          </div>
        </Link>

        {onCloseMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseMobile}
            className="h-8 w-8 p-0 md:hidden"
            aria-label="Đóng menu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Thông tin vai trò hiện tại */}
      <div className="border-b border-sidebar-border bg-sidebar-accent/40 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            Vai trò hiện tại
          </span>
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {currentRoleConfig.label}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
          {currentRoleConfig.description}
        </p>
      </div>

      {/* Danh sách các mục menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {visibleItems.map((item) => {
          const Icon = ICON_MAP[item.iconName] ?? Sparkles
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-2xs"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="truncate">{item.title}</span>
              </div>

              {item.badge && (
                <span className="ml-2 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Hệ thống Toán Insight</span>
          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            S1: MI-002
          </span>
        </div>
      </div>
    </aside>
  )
}
