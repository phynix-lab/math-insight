import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MockProvider } from "@/components/providers/MockProvider"
import { QueryProvider } from "@/components/providers/QueryProvider"
import { RoleProvider } from "@/components/providers/RoleProvider"
import { setupZodVietnameseLocale } from "@/lib/zod-i18n"
import { cn } from "@/lib/utils"

setupZodVietnameseLocale()

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const enableMock =
    process.env.ENABLE_MOCK === "true" ||
    (process.env.NODE_ENV === "development" && process.env.ENABLE_MOCK !== "false")

  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <MockProvider enabled={enableMock}>
            <QueryProvider>
              <RoleProvider>{children}</RoleProvider>
            </QueryProvider>
          </MockProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
