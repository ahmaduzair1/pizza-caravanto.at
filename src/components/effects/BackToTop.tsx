import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { subscribeScroll } from '../../lib/scrollBus'

export function BackToTop() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(
    () =>
      subscribeScroll((_progress, scroll) => {
        setVisible(scroll > 480)
      }),
    [],
  )

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          className="fixed bottom-20 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-terracotta text-white shadow-soft md:bottom-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          aria-label={t('common.backToTop')}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={20} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
