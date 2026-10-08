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
          className="fixed inset-x-0 bottom-0 z-[68] p-3 pb-[4.5rem] md:p-5 md:pb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-live="polite"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-ivory p-4 shadow-soft sm:p-6">
            <h2
              id="cookie-banner-title"
              className="font-display text-xl text-ink"
            >
              {t('cookies.title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">
              {t('cookies.body')}{' '}
              <Link
                to="/cookie-richtlinie"
                className="font-semibold text-terracotta underline-offset-2 hover:underline"
              >
                {t('footer.cookies')}
              </Link>
            </p>

            {showDetails ? (
              <div className="mt-4 space-y-3 rounded-2xl border border-ink/10 bg-linen p-4">
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" checked disabled className="mt-1" />
                  <span>
                    <span className="font-semibold text-ink">
                      {t('cookies.necessary')}
                    </span>
                    <span className="mt-0.5 block text-ink/65">
                      {t('cookies.necessaryHelp')}
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-semibold text-ink">
                      {t('cookies.analytics')}
                    </span>
                    <span className="mt-0.5 block text-ink/65">
                      {t('cookies.analyticsHelp')}
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-semibold text-ink">
                      {t('cookies.marketing')}
                    </span>
                    <span className="mt-0.5 block text-ink/65">
                      {t('cookies.marketingHelp')}
                    </span>
                  </span>
                </label>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  acceptAll()
                  setOpen(false)
                }}
              >
                {t('cookies.acceptAll')}
              </button>
              <button
                type="button"
                className="btn-secondary"
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
                  className="btn-secondary"
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
                  className="btn-secondary"
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
