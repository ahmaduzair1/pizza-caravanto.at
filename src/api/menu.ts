import { menuCategories, menuItems } from '../data/menu'
import type { ApiResponse, MenuCategory, MenuItem } from '../types'
import { delay, wrapResponse } from './delay'

export interface MenuPayload {
  categories: readonly MenuCategory[]
  items: MenuItem[]
}

/** GET /api/menu */
export async function fetchMenu(): Promise<ApiResponse<MenuPayload>> {
  await delay()
  return wrapResponse({
    categories: menuCategories,
    items: menuItems,
  })
}

/** GET /api/menu?category= */
export async function fetchMenuByCategory(
  category: MenuCategory,
): Promise<ApiResponse<MenuItem[]>> {
  await delay()
  return wrapResponse(menuItems.filter((item) => item.category === category))
}
