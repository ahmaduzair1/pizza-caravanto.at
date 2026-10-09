import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { heroSlides } from '../../data/hero'
import { siteConfig } from '../../data/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { OpenClosedBadge } from '../hours/OpenClosedBadge'

const SLIDE_MS = 6500

export function HeroSlider() {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [progressKey, setProgressKey] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
      setProgressKey((key) => key + 1)
    }, SLIDE_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion, index])

  const goTo = (next: number) => {
    setIndex(next)
    setProgressKey((key) => key + 1)
  }

  const slide = heroSlides[index]

  return (
    <section
      id="home"
      className="on-dark relative min-h-[100svh] overflow-hidden bg-forest"
      style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-ivory)' }}
      aria-roledescription="carousel"
      aria-label={t('sections.hero')}
    >
      <div className="absolute inset-0 bg-forest">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.85 }}
          >
            {/*
              object-cover fills the hero edge-to-edge (no letterbox “zoomed out”).
              Scale stays at 1 — no ken-burns — so it doesn’t look artificially zoomed in.
              Swap these CDN URLs for the owner’s originals later for sharper quality.
            */}
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover object-center"
              draggable={false}
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(23,48,31,0.72) 0%, rgba(23,48,31,0.35) 55%, rgba(23,48,31,0.15) 100%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(23,48,31,0.22) 0%, transparent 40%, rgba(0,0,0,0.42) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container-page relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-24 sm:justify-center sm:pb-16 sm:pt-28 lg:pb-20">
        <div className="mb-4 sm:mb-5">
          <OpenClosedBadge />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-copy'}
            className="max-w-xl lg:max-w-2xl"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mb-3 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <span className="h-px w-8 shrink-0 bg-brass sm:w-10" aria-hidden />
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ivory/85 sm:text-sm sm:tracking-[0.22em]">
                {t('common.brand')}
              </p>
            </motion.div>

            <motion.h1
              className="font-display font-medium leading-[1.15] text-ivory [font-size:clamp(1.85rem,4.2vw,3.25rem)]"
              style={{
                maxWidth: '16ch',
                color: 'var(--color-ivory)',
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {t(slide.titleKey)}
            </motion.h1>

            <motion.p
              className="mt-3 max-w-md text-sm leading-relaxed text-ivory/90 sm:mt-4 sm:max-w-lg sm:text-base"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              {t(slide.subtitleKey)}
            </motion.p>

            {slide.noteKey ? (
              <motion.p
                className="mt-2 text-xs font-medium text-ivory/85 sm:mt-2.5 sm:text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                {t(slide.noteKey)}
              </motion.p>
            ) : null}

            <motion.div
              className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href={siteConfig.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t('hero.ctaOrder')}
              </a>
              <Link to="/#kontakt" className="btn-secondary-on-dark">
                {t('hero.ctaReserve')}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div
          className="mt-8 flex items-center gap-2.5 sm:mt-10 sm:gap-3"
          role="tablist"
          aria-label="Hero slides"
        >
          {heroSlides.map((item, i) => {
            const active = i === index
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`${t('sections.hero')} ${i + 1}`}
                onClick={() => goTo(i)}
                className={`relative h-2 w-10 overflow-hidden rounded-full sm:h-2.5 sm:w-12 ${
                  active ? 'bg-brass/35' : 'bg-ivory/40'
                }`}
              >
                {active ? (
                  <motion.span
                    key={progressKey}
                    className="absolute inset-y-0 left-0 rounded-full bg-brass"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: reducedMotion ? 0 : SLIDE_MS / 1000,
                      ease: 'linear',
                    }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
