import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MockProvider } from "@/components/providers/MockProvider"
import { QueryProvider } from "@/components/providers/QueryProvider"
import { cn } from "@/lib/utils"

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const enableMock = process.env.ENABLE_MOCK === "true"

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <MockProvider enabled={enableMock}>
            <QueryProvider>{children}</QueryProvider>
          </MockProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
