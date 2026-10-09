import { motion } from 'framer-motion'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function PizzaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 6C18 18 10 32 8 52c8-4 16-6 24-6s16 2 24 6C54 32 46 18 32 6Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M32 10C21 20 14 32 12 48c6.5-3 13-4.5 20-4.5S45.5 45 52 48C50 32 43 20 32 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="30" r="2.5" fill="currentColor" />
      <circle cx="36" cy="26" r="2" fill="currentColor" />
      <circle cx="30" cy="38" r="2.2" fill="currentColor" />
      <circle cx="40" cy="36" r="1.8" fill="currentColor" />
    </svg>
  )
}

function PastaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M12 22c8 0 10-6 20-6s12 6 20 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 32c9 0 11-6 22-6s13 6 22 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 42c8 0 10-6 20-6s12 6 20 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M18 50c6 0 8-4 14-4s8 4 14 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M14 22h30v18a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V22Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M44 28h4a6 6 0 0 1 0 12h-4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M22 14c2 2 2 4 0 6M30 12c2 2 2 5 0 7M38 14c2 2 2 4 0 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path d="M18 54h26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M48 12C28 14 14 28 12 50c22-2 36-16 36-38Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M48 12C28 14 14 28 12 50c22-2 36-16 36-38Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 44c8-8 16-14 28-20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M20 10h24l-4 22a8 8 0 0 1-16 0L20 10Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M20 10h24l-4 22a8 8 0 0 1-16 0L20 10Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M32 40v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 54h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 24h20" stroke="currentColor" strokeWidth="2" opacity="0.55" />
    </svg>
  )
}

const MOTIFS = [
  {
    id: 'pizza',
    Icon: PizzaIcon,
    className: 'left-[-0.5rem] top-2 text-forest sm:left-[-1.5rem] sm:top-4',
    size: 'h-14 w-14 sm:h-16 sm:w-16',
    delay: 0,
  },
  {
    id: 'pasta',
    Icon: PastaIcon,
    className: 'right-[-0.25rem] top-8 text-brass sm:right-[-1.25rem] sm:top-6',
    size: 'h-12 w-12 sm:h-14 sm:w-14',
    delay: 0.4,
  },
  {
    id: 'coffee',
    Icon: CoffeeIcon,
    className: 'bottom-6 left-[-0.75rem] text-terracotta sm:bottom-8 sm:left-[-1.75rem]',
    size: 'h-11 w-11 sm:h-12 sm:w-12',
    delay: 0.8,
  },
  {
    id: 'leaf',
    Icon: LeafIcon,
    className: 'bottom-2 right-2 text-forest sm:bottom-4 sm:right-[-0.5rem]',
    size: 'h-12 w-12 sm:h-14 sm:w-14',
    delay: 1.1,
  },
  {
    id: 'wine',
    Icon: WineIcon,
    className: 'right-[18%] top-[-0.75rem] text-brass sm:top-[-1.25rem]',
    size: 'h-10 w-10 sm:h-12 sm:w-12',
    delay: 0.2,
  },
] as const

export function FoodMotifs() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {MOTIFS.map(({ id, Icon, className, size, delay }) => (
        <motion.div
          key={id}
          className={`absolute opacity-[0.55] sm:opacity-70 ${className}`}
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -6, 0],
                  rotate: [0, id === 'pasta' || id === 'leaf' ? -4 : 3, 0],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 5.5 + delay,
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
