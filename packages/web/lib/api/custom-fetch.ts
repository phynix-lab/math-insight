const HTTP_STATUS_UNAUTHORIZED = 401
const HTTP_STATUS_NO_CONTENT = 204
const AUTH_REFRESH_PATH = "/auth/refresh"

export class ApiError<TBody = unknown> extends Error {
  readonly status: number
  readonly body: TBody

  constructor(status: number, body: TBody, message?: string) {
    super(message ?? `Request failed with status ${status}`)
    this.name = "ApiError"
    this.status = status
    this.body = body
  }
}

export type ErrorType<TBody = unknown> = ApiError<TBody>

let refreshPromise: Promise<boolean> | null = null

/**
 * Deduplicates concurrent refresh attempts when multiple requests return 401.
 * TODO: Call the refresh token endpoint (e.g. POST /api/auth/refresh) and handle logout on failure.
 */
async function refreshAccessToken(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = Promise.resolve(false).finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

function extractErrorMessage(body: unknown, status: number): string {
  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string" &&
    body.error.length > 0
  ) {
    return body.error
  }
  return `Request failed with status ${status}`
}

async function parseResponseBody(res: Response): Promise<unknown> {
  if (res.status === HTTP_STATUS_NO_CONTENT) return undefined

  const text = await res.text()
  if (text.length === 0) return undefined

  const contentType = res.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) return text

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/**
 * Custom fetch mutator for Orval with a single-flight 401 refresh hook.
 * TODO: Attach auth headers or adjust credentials/retry behavior once auth is implemented.
 */
export async function customFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const init: RequestInit = {
    credentials: "include",
    ...options,
  }

  let res = await fetch(url, init)

  if (
    res.status === HTTP_STATUS_UNAUTHORIZED &&
    !url.includes(AUTH_REFRESH_PATH)
  ) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      res = await fetch(url, init)
    }
  }

  const body = await parseResponseBody(res)

  if (!res.ok) {
    throw new ApiError(res.status, body, extractErrorMessage(body, res.status))
  }

  return body as T
}
