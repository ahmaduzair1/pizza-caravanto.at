import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { startLenis, stopLenis } from '../../lib/lenisController'
import type { GalleryImage } from '../../types'
import { localize } from '../../utils/localize'

interface LightboxProps {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const { t, i18n } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const open = index !== null && images.length > 0
  const current = index !== null ? images[index] : null

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && index !== null) {
        onChange((index + 1) % images.length)
      }
      if (event.key === 'ArrowLeft' && index !== null) {
        onChange((index - 1 + images.length) % images.length)
      }
    }

    document.body.style.overflow = 'hidden'
    stopLenis()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      startLenis()
      window.removeEventListener('keydown', onKey)
    }
  }, [images.length, index, onChange, onClose, open])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (index === null) return
    if (info.offset.x < -80) onChange((index + 1) % images.length)
    if (info.offset.x > 80) onChange((index - 1 + images.length) % images.length)
  }

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="on-dark fixed inset-0 z-[75] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={t('gallery.lightbox')}
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded-2xl bg-ivory/10 p-2 text-ivory transition hover:bg-ivory/20"
            onClick={onClose}
            aria-label={t('gallery.close')}
          >
            <X size={22} />
          </button>

          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-2xl bg-ivory/10 p-3 text-ivory transition hover:bg-ivory/20 sm:inline-flex"
            onClick={(event) => {
              event.stopPropagation()
              if (index !== null) onChange((index - 1 + images.length) % images.length)
            }}
            aria-label={t('gallery.prev')}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-2xl bg-ivory/10 p-3 text-ivory transition hover:bg-ivory/20 sm:inline-flex"
            onClick={(event) => {
              event.stopPropagation()
              if (index !== null) onChange((index + 1) % images.length)
            }}
            aria-label={t('gallery.next')}
          >
            <ChevronRight size={24} />
          </button>

          <motion.figure
            className="relative flex max-h-[85vh] w-full max-w-5xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.src}
                alt={localize(current.alt, i18n.language)}
                className="max-h-[72vh] w-auto max-w-full rounded-2xl object-contain shadow-soft"
                initial={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                draggable={false}
              />
            </AnimatePresence>
            {current.caption ? (
              <figcaption className="mt-4 max-w-2xl text-center text-sm text-ivory/85">
                {localize(current.caption, i18n.language)}
              </figcaption>
            ) : null}
            <p className="mt-2 text-xs text-ivory/55">
              {index !== null ? index + 1 : 0} / {images.length}
            </p>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
