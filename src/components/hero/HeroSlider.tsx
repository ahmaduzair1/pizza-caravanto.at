import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
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
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : 80])
  const imageScale = useTransform(scrollY, [0, 500], [1, reducedMotion ? 1 : 1.06])

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
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.85 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, scale: imageScale }}
            >
              <motion.img
                src={slide.image}
                alt=""
                className={`h-full w-full object-cover ${
                  slide.cinematic ? 'object-[center_42%]' : ''
                }`}
                initial={
                  slide.cinematic && !reducedMotion ? { scale: 1.08 } : undefined
                }
                animate={
                  slide.cinematic && !reducedMotion
                    ? { scale: 1.18 }
                    : undefined
                }
                transition={
                  slide.cinematic && !reducedMotion
                    ? { duration: SLIDE_MS / 1000, ease: 'linear' }
                    : undefined
                }
                draggable={false}
              />
            </motion.div>

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(23,48,31,0.82) 0%, rgba(23,48,31,0.45) 55%, rgba(23,48,31,0.2) 100%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container-page relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:justify-center sm:pb-24">
        <div className="mb-6">
          <OpenClosedBadge />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-copy'}
            className="max-w-2xl"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <span className="h-px w-10 shrink-0 bg-brass" aria-hidden />
              <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-ivory/85">
                {t('common.brand')}
              </p>
            </motion.div>

            <motion.h1
              className="font-display font-medium leading-[1.12] text-ivory [font-size:clamp(2.5rem,5vw,4.5rem)]"
              style={{
                maxWidth: '14ch',
                color: 'var(--color-ivory)',
                textShadow: '0 2px 24px rgba(0,0,0,0.45)',
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
            >
              {t(slide.titleKey)}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-xl text-base text-ivory/90 sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t(slide.subtitleKey)}
            </motion.p>

            {slide.noteKey ? (
              <motion.p
                className="mt-3 text-sm font-medium text-ivory/90"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                {t(slide.noteKey)}
              </motion.p>
            ) : null}

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
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
          className="mt-10 flex items-center gap-3"
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
                className={`relative h-2.5 w-14 overflow-hidden rounded-full ${
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
