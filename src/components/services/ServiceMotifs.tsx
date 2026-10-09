import { motion } from 'framer-motion'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M16 22h32l-2 30H18L16 22Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M16 22h32l-2 30H18L16 22Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 22v-4a8 8 0 0 1 16 0v4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BikeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="42" r="9" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="48" cy="42" r="9" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M16 42h12l8-16h10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 42l6-10M36 26h8l4 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="26" r="2.5" fill="currentColor" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.1" />
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M32 20v14l9 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  )
}

function UtensilsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M20 12v16c0 4 3 6 6 6v18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M16 12v10M20 12v10M24 12v10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M42 12c4 0 6 4 6 8v8h-6V12Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M42 12c4 0 6 4 6 8v8h-6V12ZM42 28v24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 10c-9 0-16 7-16 16 0 12 16 28 16 28s16-16 16-28c0-9-7-16-16-16Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M32 10c-9 0-16 7-16 16 0 12 16 28 16 28s16-16 16-28c0-9-7-16-16-16Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="26" r="5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M20 28a12 12 0 0 1 24 0v10l4 6H16l4-6V28Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M20 28a12 12 0 0 1 24 0v10l4 6H16l4-6V28Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M28 48a4 4 0 0 0 8 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M32 12v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

const MOTIFS = [
  {
    id: 'bag',
    Icon: BagIcon,
    className: 'left-[2%] top-[18%] text-forest sm:left-[4%] sm:top-[14%]',
    size: 'h-11 w-11 sm:h-14 sm:w-14',
    delay: 0,
  },
  {
    id: 'bike',
    Icon: BikeIcon,
    className: 'right-[3%] top-[22%] text-brass sm:right-[5%] sm:top-[16%]',
    size: 'h-12 w-12 sm:h-14 sm:w-14',
    delay: 0.45,
  },
  {
    id: 'clock',
    Icon: ClockIcon,
    className: 'left-[6%] bottom-[28%] text-terracotta sm:left-[8%] sm:bottom-[24%]',
    size: 'h-10 w-10 sm:h-12 sm:w-12',
    delay: 0.85,
  },
  {
    id: 'utensils',
    Icon: UtensilsIcon,
    className: 'right-[5%] bottom-[30%] text-forest sm:right-[7%] sm:bottom-[26%]',
    size: 'h-11 w-11 sm:h-12 sm:w-12',
    delay: 0.25,
  },
  {
    id: 'pin',
    Icon: PinIcon,
    className: 'left-[46%] top-[8%] text-brass sm:top-[6%]',
    size: 'h-9 w-9 sm:h-11 sm:w-11',
    delay: 0.65,
  },
  {
    id: 'bell',
    Icon: BellIcon,
    className: 'right-[42%] bottom-[10%] text-terracotta sm:bottom-[8%]',
    size: 'h-9 w-9 sm:h-11 sm:w-11',
    delay: 1.1,
  },
] as const

export function ServiceMotifs() {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
      aria-hidden
    >
      {MOTIFS.map(({ id, Icon, className, size, delay }) => (
        <motion.div
          key={id}
          className={`absolute opacity-40 sm:opacity-55 ${className}`}
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -5, 0],
                  rotate: [0, id === 'bike' || id === 'utensils' ? -3 : 3, 0],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: 6 + delay,
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
