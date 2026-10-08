type LenisLike = {
  stop: () => void
  start: () => void
}

let instance: LenisLike | null = null

export function registerLenis(lenis: LenisLike | null): void {
  instance = lenis
}

export function stopLenis(): void {
  instance?.stop()
}

export function startLenis(): void {
  instance?.start()
}
