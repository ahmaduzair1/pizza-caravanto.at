export type Locale = 'de' | 'en'

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface LocalizedString {
  de: string
  en: string
}

export interface ApiResponse<T> {
  data: T
  meta?: {
    generatedAt: string
  }
}

export interface Announcement {
  id: string
  title: LocalizedString
  body: LocalizedString
  quote?: LocalizedString
  emoji?: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: LocalizedString
  caption?: LocalizedString
}

export interface OpeningSlot {
  open: string
  close: string
}

export interface DayHours {
  day: DayOfWeek
  closed: boolean
  slots: OpeningSlot[]
}

export interface HoursSchedule {
  timezone: string
  openingHours: DayHours[]
  warmKitchen: DayHours[]
}

export type MenuCategory =
  | 'mittag'
  | 'pizza'
  | 'pasta'
  | 'salate'
  | 'burger'
  | 'fleisch'
  | 'eis'
  | 'getraenke'

export interface MenuItem {
  id: string
  category: MenuCategory
  tag?: LocalizedString
  name: LocalizedString
  description: LocalizedString
  allergens: string[]
  vegetarian: boolean
  /** Real client dish vs demo placeholder to be removed before pitch */
  isPlaceholder: boolean
  image?: string
}

export interface ServiceCard {
  id: string
  title: LocalizedString
  description: LocalizedString
  footnote?: LocalizedString
  image: string
}

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ReservationPayload {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  notes?: string
}

export interface SiteConfig {
  name: string
  tagline: LocalizedString
  address: {
    street: string
    postalCode: string
    city: string
    country: string
    countryCode: string
  }
  phones: {
    primary: string
    primaryDisplay: string
    secondaryDisplay: string
    internationalDisplay: string
  }
  email: string
  social: {
    instagram: string
  }
  apps: {
    ios: string
    android: string
  }
  orderUrl: string
  map: {
    lat: number
    lng: number
  }
}
