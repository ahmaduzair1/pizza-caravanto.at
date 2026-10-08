import { aboutImages, entdeckenImages } from '../data/gallery'
import type { ApiResponse, GalleryImage } from '../types'
import { delay, wrapResponse } from './delay'

/** GET /api/gallery/about */
export async function fetchAboutGallery(): Promise<ApiResponse<GalleryImage[]>> {
  await delay()
  return wrapResponse(aboutImages)
}

/** GET /api/gallery/entdecken */
export async function fetchEntdeckenGallery(): Promise<
  ApiResponse<GalleryImage[]>
> {
  await delay()
  return wrapResponse(entdeckenImages)
}
