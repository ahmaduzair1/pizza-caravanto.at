import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { registerLenis, scrollToSection } from '../../lib/lenisController'
import { emitScroll } from '../../lib/scrollBus'

import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion()
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '')
    if (!hash) return
    const timer = window.setTimeout(() => scrollToSection(hash), 50)
    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname])

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
