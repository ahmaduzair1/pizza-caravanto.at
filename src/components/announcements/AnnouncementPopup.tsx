import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchAnnouncements } from '../../api/announcements'
import type { Announcement } from '../../types'
import { localize } from '../../utils/localize'

const STORAGE_KEY = 'caravento-announcements-dismissed'

interface AnnouncementPopupProps {
  ready?: boolean
}

export function AnnouncementPopup({ ready = true }: AnnouncementPopupProps) {
  const { i18n, t } = useTranslation()
  const [items, setItems] = useState<Announcement[]>([])
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!ready) return
    if (window.localStorage.getItem(STORAGE_KEY) === '1') return

    let active = true
    void fetchAnnouncements().then((res) => {
      if (!active) return
      setItems(res.data)
      setOpen(res.data.length > 0)
    })

    return () => {
      active = false
    }
  }, [ready])

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  const current = items[index]

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[65] flex items-end justify-center bg-ink/45 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="announcement-title"
        >
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-ivory shadow-soft"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 z-10 rounded-xl p-2 text-ink/70 transition hover:bg-ink/5 hover:text-ink"
              aria-label={t('announcements.close')}
            >
              <X size={20} />
            </button>

            <div className="on-dark border-b border-ivory/10 bg-forest px-6 py-4 pr-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
                {t('announcements.eyebrow')}
              </p>
              <h2 id="announcement-title" className="mt-1 font-display text-xl">
                {current.emoji ? `${current.emoji} ` : ''}
                {localize(current.title, i18n.language)}
              </h2>
            </div>

            <div className="space-y-4 px-6 py-5">
              <p className="text-sm leading-relaxed text-ink/85">
                {localize(current.body, i18n.language)}
              </p>
              {current.quote ? (
                <blockquote className="border-l-4 border-forest pl-4 font-display text-base italic text-ink/85">
                  {localize(current.quote, i18n.language)}
                </blockquote>
              ) : null}

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-ink/10 p-2 disabled:opacity-40"
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                    aria-label={t('announcements.prev')}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-ink/10 p-2 disabled:opacity-40"
                    onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
                    disabled={index >= items.length - 1}
                    aria-label={t('announcements.next')}
                  >
                    <ChevronRight size={18} />
                  </button>
                  <span className="text-xs text-ink/60">
                    {index + 1} / {items.length}
                  </span>
                </div>
                <button type="button" className="btn-primary" onClick={dismiss}>
                  {t('announcements.gotIt')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
