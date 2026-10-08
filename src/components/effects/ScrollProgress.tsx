import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { subscribeScroll } from '../../lib/scrollBus'

export function ScrollProgress() {
  const reducedMotion = usePrefersReducedMotion()
  const progress = useMotionValue(0)
  const scaleX = useSpring(progress, {
    stiffness: reducedMotion ? 400 : 120,
    damping: reducedMotion ? 40 : 24,
    restDelta: 0.001,
  })

  useEffect(() => subscribeScroll((value) => progress.set(value)), [progress])

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-terracotta"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
