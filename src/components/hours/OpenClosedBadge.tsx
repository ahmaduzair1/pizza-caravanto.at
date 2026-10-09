import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchHours } from '../../api/hours'
import { hoursSchedule } from '../../data/hours'
import { useOpeningStatus } from '../../hooks/useOpeningStatus'
import type { HoursSchedule } from '../../types'

interface OpenClosedBadgeProps {
  className?: string
  /** Use on dark hero surfaces vs light cards */
  tone?: 'dark' | 'light'
}

export function OpenClosedBadge({
  className = '',
  tone = 'dark',
}: OpenClosedBadgeProps) {
  const { t } = useTranslation()
  const [schedule, setSchedule] = useState<HoursSchedule>(hoursSchedule)
  const status = useOpeningStatus(schedule)

  useEffect(() => {
    let active = true
    void fetchHours().then((res) => {
      if (active) setSchedule(res.data)
    })
    return () => {
      active = false
    }
  }, [])

  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
          tone === 'light'
            ? 'border border-border bg-muted text-muted-foreground'
            : 'bg-forest/70 text-ivory'
        } ${className}`}
      >
        <span
          className={`h-2 w-2 animate-pulse rounded-full ${
            tone === 'light' ? 'bg-primary/50' : 'bg-ivory/50'
          }`}
        />
        {t('common.loading')}
      </span>
    )
  }

  const openStyles =
    tone === 'light'
      ? 'border-primary-soft border bg-primary text-primary-foreground'
      : 'bg-primary text-primary-foreground'
  const closedStyles =
    tone === 'light'
      ? 'border border-border bg-muted text-muted-foreground'
      : 'bg-ink/80 text-ivory'

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
        status.isOpen ? openStyles : closedStyles
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status.isOpen
            ? tone === 'light'
              ? 'bg-primary-foreground'
              : 'bg-secondary'
            : 'bg-current opacity-50'
        }`}
        aria-hidden
      />
      {status.isOpen ? t('contact.openNow') : t('contact.closedNow')}
    </span>
  )
}
