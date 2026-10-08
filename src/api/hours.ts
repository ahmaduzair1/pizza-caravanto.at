import { hoursSchedule } from '../data/hours'
import type { ApiResponse, HoursSchedule } from '../types'
import { delay, wrapResponse } from './delay'

/** GET /api/hours */
export async function fetchHours(): Promise<ApiResponse<HoursSchedule>> {
  await delay()
  return wrapResponse(hoursSchedule)
}
