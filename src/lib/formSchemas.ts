import { z } from 'zod'

import { hoursSchedule } from '../data/hours'
import type { DayOfWeek } from '../types'

const DAY_KEYS: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function getDayFromDateString(date: string): DayOfWeek {
  const d = new Date(`${date}T12:00:00`)
  return DAY_KEYS[d.getDay()]
}

export function createContactSchema(messages: {
  required: string
  email: string
  minMessage: string
}) {
  return z.object({
    name: z.string().trim().min(2, messages.required),
    email: z.string().trim().email(messages.email),
    phone: z.string().trim().optional(),
    message: z.string().trim().min(10, messages.minMessage),
  })
}

export function createReservationSchema(messages: {
  required: string
  email: string
  phone: string
  guests: string
  closedDay: string
  outsideHours: string
  pastDate: string
}) {
  return z
    .object({
      name: z.string().trim().min(2, messages.required),
      email: z.string().trim().email(messages.email),
      phone: z.string().trim().min(6, messages.phone),
      date: z.string().min(1, messages.required),
      time: z.string().min(1, messages.required),
      guests: z.coerce
        .number()
        .int()
        .min(1, messages.guests)
        .max(20, messages.guests),
      notes: z.string().trim().optional(),
    })
    .superRefine((value, ctx) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selected = new Date(`${value.date}T00:00:00`)
      if (Number.isNaN(selected.getTime()) || selected < today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages.pastDate,
          path: ['date'],
        })
        return
      }

      const day = getDayFromDateString(value.date)
      const dayHours = hoursSchedule.openingHours.find(
        (entry) => entry.day === day,
      )
      if (!dayHours || dayHours.closed || dayHours.slots.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages.closedDay,
          path: ['date'],
        })
        return
      }

      const minutes = parseTimeToMinutes(value.time)
      const inSlot = dayHours.slots.some((slot) => {
        const open = parseTimeToMinutes(slot.open)
        const close = parseTimeToMinutes(slot.close)
        return minutes >= open && minutes < close
      })

      if (!inSlot) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: messages.outsideHours,
          path: ['time'],
        })
      }
    })
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>
export type ReservationFormValues = z.infer<
  ReturnType<typeof createReservationSchema>
>
