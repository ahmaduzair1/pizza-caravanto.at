import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { images } from '../../config/images'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const INTRO_SEEN_KEY = 'caravento-intro-seen-session'

interface PageIntroProps {
  onComplete?: () => void
}

function shouldSkipIntro(reducedMotion: boolean): boolean {
  if (typeof window === 'undefined') return true
  if (reducedMotion) return true
  return sessionStorage.getItem(INTRO_SEEN_KEY) === '1'
}

export function PageIntro({ onComplete }: PageIntroProps) {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(() => !shouldSkipIntro(false))

  useEffect(() => {
    if (shouldSkipIntro(reducedMotion)) {
      setVisible(false)
      onComplete?.()
      return
    }

    setVisible(true)
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1')
      setVisible(false)
      document.body.style.overflow = ''
      onComplete?.()
    }, 2200)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete, reducedMotion])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="on-dark fixed inset-0 z-[80] flex items-center justify-center bg-forest"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!visible}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={images.logo}
              alt={t('common.brand')}
              className="h-20 w-auto brightness-0 invert sm:h-24"
              width={220}
              height={80}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            />
            <motion.div
              className="h-0.5 w-16 origin-left bg-brass"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
