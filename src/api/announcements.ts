import { announcements } from '../data/announcements'
import type { Announcement, ApiResponse } from '../types'
import { delay, wrapResponse } from './delay'

/** GET /api/announcements */
export async function fetchAnnouncements(): Promise<ApiResponse<Announcement[]>> {
  await delay()
  return wrapResponse(announcements)
}
