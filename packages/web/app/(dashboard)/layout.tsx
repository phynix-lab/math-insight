import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { AppShell } from "@/components/layout/AppShell"
import { RoleProvider } from "@/components/providers/RoleProvider"
import { getCurrentUser } from "@/server/utils/auth-guard"

/**
 * Layout cho toàn bộ phân hệ Dashboard nội bộ.
 * Xác thực lại phiên đăng nhập từ DB trên server và truyền user thật xuống AppShell.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  return (
    <RoleProvider user={user}>
      <AppShell>{children}</AppShell>
    </RoleProvider>
  )
}
