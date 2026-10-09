import { motion } from 'framer-motion'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="20" y="8" width="24" height="48" rx="5" fill="currentColor" opacity="0.12" />
      <rect x="20" y="8" width="24" height="48" rx="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28 14h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="48" r="2.5" fill="currentColor" />
    </svg>
  )
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="10" y="16" width="44" height="32" rx="4" fill="currentColor" opacity="0.12" />
      <rect x="10" y="16" width="44" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 20l20 14L52 20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="12" y="14" width="40" height="38" rx="4" fill="currentColor" opacity="0.12" />
      <rect x="12" y="14" width="40" height="38" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 26h40" stroke="currentColor" strokeWidth="2.5" />
      <path d="M22 10v8M42 10v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="36" r="2" fill="currentColor" />
      <circle cx="32" cy="36" r="2" fill="currentColor" />
      <circle cx="40" cy="36" r="2" fill="currentColor" />
    </svg>
  )
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M12 18a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H28l-10 10V42H20a8 8 0 0 1-8-8V18Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M12 18a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H28l-10 10V42H20a8 8 0 0 1-8-8V18Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M24 26h16M24 34h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M10 30L32 12l22 18" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path
        d="M16 28v22h32V28"
        fill="currentColor"
        opacity="0.12"
      />
      <path d="M16 28v22h32V28" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 50V36h8v14" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 50S12 36 12 24a10 10 0 0 1 20-2 10 10 0 0 1 20 2c0 12-20 26-20 26Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M32 50S12 36 12 24a10 10 0 0 1 20-2 10 10 0 0 1 20 2c0 12-20 26-20 26Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MOTIFS = [
  {
    id: 'phone',
    Icon: PhoneIcon,
    className: 'left-[3%] top-[14%] text-forest sm:left-[5%]',
    size: 'h-11 w-11 sm:h-12 sm:w-12',
    delay: 0,
  },
  {
    id: 'mail',
    Icon: EnvelopeIcon,
    className: 'right-[3%] top-[16%] text-brass sm:right-[5%]',
    size: 'h-11 w-11 sm:h-14 sm:w-14',
    delay: 0.35,
  },
  {
    id: 'calendar',
    Icon: CalendarIcon,
    className: 'left-[6%] bottom-[20%] text-terracotta sm:left-[8%]',
    size: 'h-10 w-10 sm:h-12 sm:w-12',
    delay: 0.7,
  },
  {
    id: 'chat',
    Icon: ChatIcon,
    className: 'right-[5%] bottom-[22%] text-forest sm:right-[7%]',
    size: 'h-11 w-11 sm:h-12 sm:w-12',
    delay: 0.2,
  },
  {
    id: 'house',
    Icon: HouseIcon,
    className: 'left-[46%] top-[6%] text-brass',
    size: 'h-9 w-9 sm:h-11 sm:w-11',
    delay: 0.5,
  },
  {
    id: 'heart',
    Icon: HeartIcon,
    className: 'right-[42%] bottom-[8%] text-terracotta',
    size: 'h-9 w-9 sm:h-11 sm:w-11',
    delay: 0.95,
  },
] as const

export function ContactMotifs() {
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
              : { y: [0, -5, 0], rotate: [0, id === 'heart' ? -4 : 3, 0] }
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
