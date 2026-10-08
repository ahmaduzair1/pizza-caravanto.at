import type { DayHours, HoursSchedule } from '../types'

const tueSun: DayHours[] = [
  { day: 'monday', closed: true, slots: [] },
  { day: 'tuesday', closed: false, slots: [{ open: '11:00', close: '22:00' }] },
  { day: 'wednesday', closed: false, slots: [{ open: '11:00', close: '22:00' }] },
  { day: 'thursday', closed: false, slots: [{ open: '11:00', close: '22:00' }] },
  { day: 'friday', closed: false, slots: [{ open: '11:00', close: '22:00' }] },
  { day: 'saturday', closed: false, slots: [{ open: '11:00', close: '22:00' }] },
  { day: 'sunday', closed: false, slots: [{ open: '11:00', close: '22:00' }] },
]

export const hoursSchedule: HoursSchedule = {
  timezone: 'Europe/Vienna',
  openingHours: tueSun,
  warmKitchen: tueSun,
}
