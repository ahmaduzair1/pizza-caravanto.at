type LenisLike = {
  stop: () => void
  start: () => void
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void
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

/** Smooth-scroll to a section id (works with Lenis or native). */
export function scrollToSection(id: string, offset = -80): void {
  const target = id.startsWith('#') ? id : `#${id}`
  const el = document.querySelector(target)
  if (!el) return

  if (instance?.scrollTo) {
    instance.scrollTo(target, { offset, duration: 1.15 })
    return
  }

  const top =
    el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'smooth' })
}
