import { siteConfig } from '../data/site'
import type { ApiResponse, SiteConfig } from '../types'
import { delay, wrapResponse } from './delay'

/** GET /api/site */
export async function fetchSiteConfig(): Promise<ApiResponse<SiteConfig>> {
  await delay()
  return wrapResponse(siteConfig)
}
