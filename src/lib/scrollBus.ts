type ScrollListener = (progress: number, scroll: number) => void

const listeners = new Set<ScrollListener>()

export function subscribeScroll(listener: ScrollListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function emitScroll(scroll: number, limit: number): void {
  const progress = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0
  listeners.forEach((listener) => listener(progress, scroll))
}
