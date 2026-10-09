import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchHours } from '../../api/hours'
import { useOpeningStatus } from '../../hooks/useOpeningStatus'
import type { DayHours, DayOfWeek, HoursSchedule } from '../../types'
import { OpenClosedBadge } from '../hours/OpenClosedBadge'

const DAY_ORDER: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

function formatDayRow(day: DayHours, closedLabel: string): string {
  if (day.closed || day.slots.length === 0) return closedLabel
  return day.slots.map((slot) => `${slot.open}–${slot.close}`).join(', ')
}

interface HoursListProps {
  title: string
  days: DayHours[]
  today?: DayOfWeek
  closedLabel: string
  dayLabel: (day: DayOfWeek) => string
}

function HoursList({
  title,
  days,
  today,
  closedLabel,
  dayLabel,
}: HoursListProps) {
  const ordered = DAY_ORDER.map(
    (day) => days.find((entry) => entry.day === day) ?? {
      day,
      closed: true,
      slots: [],
    },
  )

  return (
    <div>
      <h3 className="font-display text-base text-foreground sm:text-lg">
        {title}
      </h3>
      <ul className="mt-2.5 space-y-1 text-sm">
        {ordered.map((entry) => {
          const isToday = entry.day === today
          return (
            <li
              key={entry.day}
              className={`flex items-center justify-between gap-3 rounded-[calc(var(--radius)-4px)] px-3 py-2 transition-colors ${
                isToday
                  ? 'bg-primary-soft ring-primary-soft font-semibold text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              <span>
                {dayLabel(entry.day)}
                {isToday ? ' ·' : ''}
              </span>
              <span className={isToday ? 'text-primary' : undefined}>
                {formatDayRow(entry, closedLabel)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function HoursCard() {
  const { t } = useTranslation()
  const [schedule, setSchedule] = useState<HoursSchedule | null>(null)
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

  const dayLabel = (day: DayOfWeek) => t(`days.${day}`)

  return (
    <div className="form-card p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg text-foreground sm:text-xl">
          {t('contact.hours')}
        </h3>
        <OpenClosedBadge tone="light" />
      </div>
      {schedule ? (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <HoursList
            title={t('contact.hours')}
            days={schedule.openingHours}
            today={status?.today}
            closedLabel={t('contact.closed')}
            dayLabel={dayLabel}
          />
          <HoursList
            title={t('contact.warmKitchen')}
            days={schedule.warmKitchen}
            today={status?.today}
            closedLabel={t('contact.closed')}
            dayLabel={dayLabel}
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
      )}
    </div>
  )
}
