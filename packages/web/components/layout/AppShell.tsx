"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

interface AppShellProps {
  children: ReactNode
}

/**
 * Khung layout ứng dụng chính (App Shell) hỗ trợ responsive đa thiết bị:
 * - Desktop: Sidebar cố định bên trái, Header cố định phía trên, vùng nội dung cuộn độc lập.
 * - Mobile: Sidebar chuyển thành Drawer có backdrop, kích hoạt qua nút Menu trên Header.
 */
export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Đóng drawer khi nhấn phím Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileOpen])

  // Khóa cuộn trang khi drawer mobile đang mở
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <div className="flex min-h-svh w-full bg-background text-foreground">
      {/* Sidebar cố định trên Desktop */}
      <div className="z-40 hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Drawer Sidebar trên Mobile */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Danh mục điều hướng trên thiết bị di động"
          className="fixed inset-0 z-50 flex md:hidden"
        >
          {/* Backdrop tối màu mờ dần */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Vùng nội dung Drawer */}
          <div className="relative flex w-full max-w-xs flex-1 animate-in flex-col bg-sidebar shadow-2xl transition-transform duration-200 slide-in-from-left">
            <Sidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Khu vực nội dung chính */}
      <div className="flex min-w-0 flex-1 flex-col md:pl-64">
        <Header onOpenMobile={() => setMobileOpen(true)} />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
