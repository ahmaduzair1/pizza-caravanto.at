import { AnimatePresence, motion } from 'framer-motion'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { HeroSlideData } from '../../data/hero'

interface HeroMediaStageProps {
  slide: HeroSlideData
  index: number
}

export function HeroMediaStage({ slide, index }: HeroMediaStageProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
      <motion.div
        className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
        style={{ backgroundColor: slide.accent }}
        animate={
          reducedMotion
            ? { opacity: 0.35 }
            : { opacity: [0.35, 0.55, 0.35], scale: [0.96, 1.04, 0.96] }
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      {!reducedMotion ? (
        <>
          <motion.div
            className="absolute -left-4 top-10 h-24 w-24 rounded-full border border-ivory/20"
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          <motion.div
            className="absolute -right-2 bottom-16 h-16 w-16 rounded-2xl border border-brass/40"
            animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        </>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="relative h-full overflow-hidden rounded-[1.75rem] border border-ivory/15 shadow-soft"
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, rotate: -4, y: 28, scale: 0.94 }
          }
          animate={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, rotate: 3, y: -20, scale: 1.02 }
          }
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            initial={reducedMotion ? undefined : { scale: 1.12 }}
            animate={
              reducedMotion
                ? undefined
                : { scale: [1.12, 1.02, 1.08], x: ['0%', '-2%', '0%'] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            draggable={false}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

          <motion.div
            className="absolute inset-x-0 bottom-0 p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="inline-flex rounded-2xl bg-ink/55 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ivory backdrop-blur">
              Caravento
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {!reducedMotion ? (
        <motion.div
          className="pointer-events-none absolute -bottom-3 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-ink/50 blur-xl"
          animate={{ opacity: [0.35, 0.55, 0.35], scaleX: [0.9, 1.05, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      ) : null}
    </div>
  )
}
