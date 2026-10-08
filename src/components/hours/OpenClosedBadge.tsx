import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchHours } from '../../api/hours'
import { hoursSchedule } from '../../data/hours'
import { useOpeningStatus } from '../../hooks/useOpeningStatus'
import type { HoursSchedule } from '../../types'

interface OpenClosedBadgeProps {
  className?: string
}

export function OpenClosedBadge({ className = '' }: OpenClosedBadgeProps) {
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
        className={`inline-flex items-center gap-2 rounded-2xl bg-forest/70 px-3 py-1.5 text-xs font-semibold text-ivory backdrop-blur ${className}`}
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-ivory/50" />
        {t('common.loading')}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-semibold text-ivory backdrop-blur ${
        status.isOpen ? 'bg-forest/90' : 'bg-ink/75'
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status.isOpen ? 'bg-brass' : 'bg-ivory/50'
        }`}
        aria-hidden
      />
      {status.isOpen ? t('contact.openNow') : t('contact.closedNow')}
    </span>
  )
}
