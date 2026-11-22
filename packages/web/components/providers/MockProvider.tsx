"use client"

import { useEffect, useState } from "react"

let startWorkerPromise: Promise<unknown> | null = null

async function startMockWorker() {
  if (typeof window === "undefined") return
  if (!startWorkerPromise) {
    startWorkerPromise = import("@/mocks/browser").then(({ worker }) =>
      worker.start({ onUnhandledFrame: "bypass" })
    )
  }
  await startWorkerPromise
}

/**
 * Starts the browser MSW service worker before rendering children when mocking is enabled.
 */
export function MockProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: React.ReactNode
}) {
  const [isReady, setIsReady] = useState(!enabled)

  useEffect(() => {
    if (!enabled) return

    let active = true
    startMockWorker().then(() => {
      if (active) setIsReady(true)
    })

    return () => {
      active = false
    }
  }, [enabled])

  if (!isReady) return null
  return <>{children}</>
}
