import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useIsTouchDevice } from '../../hooks/useIsTouchDevice'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function CustomCursor() {
  const isTouch = useIsTouchDevice()
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 })

  useEffect(() => {
    if (isTouch || reducedMotion) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    const onLeave = () => setVisible(false)

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, select, label',
      )
      setHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [isTouch, reducedMotion, x, y])

  if (isTouch || reducedMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden
    >
      <motion.div
        className="rounded-full border border-ivory bg-ivory/20"
        animate={{
          width: hovering ? 44 : 16,
          height: hovering ? 44 : 16,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </motion.div>
  )
}
