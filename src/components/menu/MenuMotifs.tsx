import { motion } from 'framer-motion'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function PlateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="32" cy="34" r="18" fill="currentColor" opacity="0.12" />
      <circle cx="32" cy="34" r="18" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="34" r="10" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <path d="M18 18c4-3 10-4 14-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

function ChefHatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M18 36c-4-2-6-7-4-11 2-4 7-5 10-3 1-5 6-8 11-7s8 5 8 10c4-1 8 2 8 7 0 3-2 5-5 6H18Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M18 36c-4-2-6-7-4-11 2-4 7-5 10-3 1-5 6-8 11-7s8 5 8 10c4-1 8 2 8 7 0 3-2 5-5 6H18Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M20 36h24v12H20z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 10c2 10-10 14-10 26a10 10 0 0 0 20 0c0-8-4-12-2-18-4 4-6 8-6 12 0-10 0-16-2-20Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M32 10c2 10-10 14-10 26a10 10 0 0 0 20 0c0-8-4-12-2-18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 30c1 4-3 6-3 10a3 3 0 0 0 6 0c0-3-1-5 0-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 10l5.5 14.5H52l-12 9 4.5 14.5L32 39l-12.5 9 4.5-14.5-12-9h14.5L32 10Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M32 10l5.5 14.5H52l-12 9 4.5 14.5L32 39l-12.5 9 4.5-14.5-12-9h14.5L32 10Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuBoardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="14" y="14" width="36" height="40" rx="4" fill="currentColor" opacity="0.1" />
      <rect x="14" y="14" width="36" height="40" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M22 24h20M22 32h16M22 40h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 10h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M32 8v14M32 42v14M8 32h14M42 32h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 16l8 8M40 40l8 8M48 16l-8 8M24 40l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}

const MOTIFS = [
  {
    id: 'plate',
    Icon: PlateIcon,
    className: 'left-[3%] top-[16%] text-ivory/80 sm:left-[5%]',
    size: 'h-12 w-12 sm:h-14 sm:w-14',
    delay: 0,
  },
  {
    id: 'hat',
    Icon: ChefHatIcon,
    className: 'right-[4%] top-[18%] text-brass sm:right-[6%]',
    size: 'h-11 w-11 sm:h-14 sm:w-14',
    delay: 0.4,
  },
  {
    id: 'flame',
    Icon: FlameIcon,
    className: 'left-[7%] bottom-[22%] text-terracotta sm:left-[9%]',
    size: 'h-10 w-10 sm:h-12 sm:w-12',
    delay: 0.75,
  },
  {
    id: 'star',
    Icon: StarIcon,
    className: 'right-[6%] bottom-[24%] text-brass sm:right-[8%]',
    size: 'h-10 w-10 sm:h-12 sm:w-12',
    delay: 0.2,
  },
  {
    id: 'board',
    Icon: MenuBoardIcon,
    className: 'left-[44%] top-[7%] text-ivory/70',
    size: 'h-9 w-9 sm:h-11 sm:w-11',
    delay: 0.55,
  },
  {
    id: 'spark',
    Icon: SparkIcon,
    className: 'right-[40%] bottom-[9%] text-ivory/65',
    size: 'h-9 w-9 sm:h-10 sm:w-10',
    delay: 1,
  },
] as const

export function MenuMotifs() {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
      aria-hidden
    >
      {MOTIFS.map(({ id, Icon, className, size, delay }) => (
        <motion.div
          key={id}
          className={`absolute opacity-45 sm:opacity-60 ${className}`}
          animate={
            reduced
              ? undefined
              : { y: [0, -5, 0], rotate: [0, id === 'flame' ? -4 : 3, 0] }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 6.2 + delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }
          }
        >
          <Icon className={size} />
        </motion.div>
      ))}
    </div>
  )
}
