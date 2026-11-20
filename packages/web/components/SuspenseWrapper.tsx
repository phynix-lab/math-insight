"use client"

import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { Suspense, useSyncExternalStore, type ReactNode } from "react"
import {
  ErrorBoundary,
  getErrorMessage,
  type FallbackProps,
} from "react-error-boundary"
import { Button } from "@/components/ui/button"

const emptySubscribe = () => () => {}

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

type SuspenseWrapperProps = {
  children: ReactNode
  fallback?: ReactNode
  errorFallback?: (props: FallbackProps) => ReactNode
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = getErrorMessage(error) ?? "Đã xảy ra lỗi không xác định."

  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-xl border border-destructive/30 bg-card p-4"
    >
      <p className="text-sm text-destructive">{message}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={resetErrorBoundary}
      >
        Thử lại
      </Button>
    </div>
  )
}

/**
 * Wraps suspense queries with TanStack QueryErrorResetBoundary, react-error-boundary,
 * and React Suspense so loading and retryable error states work out of the box.
 * Renders the fallback during SSR to prevent relative client API fetches during prerendering.
 */
export function SuspenseWrapper({
  children,
  fallback = <p className="text-sm text-muted-foreground">Đang tải...</p>,
  errorFallback,
}: SuspenseWrapperProps) {
  const isClient = useIsClient()

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={(props) =>
            errorFallback ? (
              errorFallback(props)
            ) : (
              <DefaultErrorFallback {...props} />
            )
          }
        >
          <Suspense fallback={fallback}>
            {isClient ? children : fallback}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
