import { services } from '../data/services'
import type { ApiResponse, ServiceCard } from '../types'
import { delay, wrapResponse } from './delay'

/** GET /api/services */
export async function fetchServices(): Promise<ApiResponse<ServiceCard[]>> {
  await delay()
  return wrapResponse(services)
}
