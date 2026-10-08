import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { registerLenis } from '../../lib/lenisController'
import { emitScroll } from '../../lib/scrollBus'

import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      const onScroll = () => {
        const limit =
          document.documentElement.scrollHeight - window.innerHeight
        emitScroll(window.scrollY, limit)
        ScrollTrigger.update()
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })
    registerLenis(lenis)

    const onLenisScroll = () => {
      emitScroll(lenis.scroll, lenis.limit)
      ScrollTrigger.update()
    }
    lenis.on('scroll', onLenisScroll)
    onLenisScroll()

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(frame)
      lenis.off('scroll', onLenisScroll)
      registerLenis(null)
      lenis.destroy()
    }
  }, [reducedMotion])

  return null
}
