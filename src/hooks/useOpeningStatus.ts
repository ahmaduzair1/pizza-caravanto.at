import { useEffect, useState } from 'react'

import type { DayOfWeek, DayHours, HoursSchedule } from '../types'

const DAY_KEYS: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export interface OpeningStatus {
  isOpen: boolean
  today: DayOfWeek
  todayHours: DayHours | undefined
}

function getViennaParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
  const parts = formatter.formatToParts(date)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0')
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0')

  const weekdayMap: Record<string, DayOfWeek> = {
    Sun: 'sunday',
    Mon: 'monday',
    Tue: 'tuesday',
    Wed: 'wednesday',
    Thu: 'thursday',
    Fri: 'friday',
    Sat: 'saturday',
  }

  return {
    day: weekdayMap[weekday] ?? DAY_KEYS[date.getDay()],
    minutes: hour * 60 + minute,
  }
}

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function computeOpeningStatus(
  schedule: HoursSchedule,
  now: Date = new Date(),
): OpeningStatus {
  const { day, minutes } = getViennaParts(now, schedule.timezone)
  const todayHours = schedule.openingHours.find((entry) => entry.day === day)

  if (!todayHours || todayHours.closed || todayHours.slots.length === 0) {
    return { isOpen: false, today: day, todayHours }
  }

  const isOpen = todayHours.slots.some((slot) => {
    const open = parseTimeToMinutes(slot.open)
    const close = parseTimeToMinutes(slot.close)
    return minutes >= open && minutes < close
  })

  return { isOpen, today: day, todayHours }
}

export function useOpeningStatus(schedule: HoursSchedule | null): OpeningStatus | null {
  const [status, setStatus] = useState<OpeningStatus | null>(null)

  useEffect(() => {
    if (!schedule) {
      setStatus(null)
      return
    }

    const tick = () => setStatus(computeOpeningStatus(schedule))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [schedule])

  return status
}
