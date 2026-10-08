import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface UseRevealOptions {
  y?: number
  delay?: number
  stagger?: number
  once?: boolean
}

export function useReveal<T extends HTMLElement>(options: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const reducedMotion = usePrefersReducedMotion()
  const { y = 28, delay = 0, stagger = 0.08, once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    const nodes = targets.length > 0 ? Array.from(targets) : [el]

    if (reducedMotion) {
      gsap.set(nodes, { opacity: 1, y: 0, clearProps: 'transform' })
      return
    }

    gsap.set(nodes, { opacity: 0, y })

    const tween = gsap.to(nodes, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, once, reducedMotion, stagger, y])

  return ref
}
