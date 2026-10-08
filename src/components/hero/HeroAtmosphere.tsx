import { motion } from 'framer-motion'

import { images } from '../../config/images'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface HeroAtmosphereProps {
  accent: string
}

export function HeroAtmosphere({ accent }: HeroAtmosphereProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-forest" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(168,58,42,0.35),transparent_55%),radial-gradient(ellipse_at_80%_10%,rgba(185,139,62,0.22),transparent_45%),radial-gradient(ellipse_at_70%_80%,rgba(23,48,31,0.35),transparent_50%)]" />

      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: accent }}
        animate={
          reducedMotion
            ? { opacity: 0.25 }
            : { opacity: [0.2, 0.4, 0.2], x: [0, 40, 0], y: [0, 30, 0] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-brass/30 blur-3xl"
        animate={
          reducedMotion
            ? { opacity: 0.2 }
            : { opacity: [0.15, 0.35, 0.15], x: [0, -30, 0], y: [0, -40, 0] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.img
        src={images.hero.ambience}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-luminosity"
        animate={
          reducedMotion
            ? undefined
            : { scale: [1.05, 1.12, 1.05], x: ['0%', '-2%', '0%'] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
        }}
      />
    </div>
  )
}
