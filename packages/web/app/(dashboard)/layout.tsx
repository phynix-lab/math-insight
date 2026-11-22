import type { ReactNode } from "react"
import { AppShell } from "@/components/layout/AppShell"

/**
 * Layout cho toàn bộ phân hệ Dashboard nội bộ.
 * Nhờ Route Group (dashboard), AppShell (Sidebar + Header) được giữ nguyên (persist)
 * khi chuyển qua lại giữa các trang con mà không bị re-render.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>
}
