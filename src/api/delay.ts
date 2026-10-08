/** Simulated network latency for mock API calls (ms). */
export const MOCK_DELAY_MS = 160

export function delay(ms: number = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function wrapResponse<T>(data: T) {
  return {
    data,
    meta: {
      generatedAt: new Date().toISOString(),
    },
  }
}
