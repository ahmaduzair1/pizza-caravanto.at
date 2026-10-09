import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useConsent } from '../../hooks/useConsent'

interface CookieBannerProps {
  ready?: boolean
}

export function CookieBanner({ ready: pageReady = true }: CookieBannerProps) {
  const { t } = useTranslation()
  const { ready, hasDecided, consent, save, acceptAll, rejectOptional } =
    useConsent()
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!ready || !pageReady) return
    setOpen(!hasDecided)
    if (consent) {
      setAnalytics(consent.analytics)
      setMarketing(consent.marketing)
    }
  }, [consent, hasDecided, pageReady, ready])

  useEffect(() => {
    const reopen = () => {
      setShowDetails(true)
      setOpen(true)
    }
    window.addEventListener('caravento:open-cookies', reopen)
    return () => window.removeEventListener('caravento:open-cookies', reopen)
  }, [])

  if (!ready) return null

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed bottom-[4.75rem] left-3 right-3 z-[68] md:bottom-5 md:left-5 md:right-auto md:w-[min(22rem,calc(100vw-2.5rem))]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-live="polite"
        >
          <div className="rounded-xl border border-ink/10 bg-ivory p-3.5 shadow-soft sm:p-4">
            <h2
              id="cookie-banner-title"
              className="font-display text-base leading-snug text-ink sm:text-lg"
            >
              {t('cookies.title')}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/70 sm:text-[13px]">
              {t('cookies.body')}{' '}
              <Link
                to="/cookie-richtlinie"
                className="font-semibold text-forest underline-offset-2 hover:underline"
              >
                {t('footer.cookies')}
              </Link>
            </p>

            {showDetails ? (
              <div className="mt-3 space-y-2.5 rounded-xl border border-ink/10 bg-linen p-3">
                <label className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                  <input type="checkbox" checked disabled className="mt-0.5" />
                  <span>
                    <span className="font-semibold text-ink">
                      {t('cookies.necessary')}
                    </span>
                    <span className="mt-0.5 block text-ink/60">
                      {t('cookies.necessaryHelp')}
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="font-semibold text-ink">
                      {t('cookies.analytics')}
                    </span>
                    <span className="mt-0.5 block text-ink/60">
                      {t('cookies.analyticsHelp')}
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    <span className="font-semibold text-ink">
                      {t('cookies.marketing')}
                    </span>
                    <span className="mt-0.5 block text-ink/60">
                      {t('cookies.marketingHelp')}
                    </span>
                  </span>
                </label>
              </div>
            ) : null}

            <div className="mt-3 flex flex-wrap gap-1.5">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-ivory transition hover:bg-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                onClick={() => {
                  acceptAll()
                  setOpen(false)
                }}
              >
                {t('cookies.acceptAll')}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-ink/15 bg-ivory px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-forest/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                onClick={() => {
                  rejectOptional()
                  setOpen(false)
                }}
              >
                {t('cookies.rejectOptional')}
              </button>
              {showDetails ? (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-ink/15 bg-ivory px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-forest/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  onClick={() => {
                    save({
                      analytics,
                      marketing,
                      map: Boolean(analytics || marketing),
                    })
                    setOpen(false)
                  }}
                >
                  {t('cookies.save')}
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-ink/15 bg-ivory px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-forest/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  onClick={() => setShowDetails(true)}
                >
                  {t('cookies.customize')}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
