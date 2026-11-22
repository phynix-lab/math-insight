"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dùng useSyncExternalStore để kiểm tra client mounting theo chuẩn React 19,
// tránh hydration mismatch mà không cần gọi setState trong effect.
const emptySubscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        aria-label="Chuyển chế độ giao diện"
        className="h-9 w-9 px-0"
      >
        <span className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={
        isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-9 px-0"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground transition-transform" />
      )}
    </Button>
  )
}
