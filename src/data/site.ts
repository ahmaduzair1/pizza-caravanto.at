import { env } from '../config/env'
import type { SiteConfig } from '../types'

export const siteConfig: SiteConfig = {
  name: 'Caravento Pizza & Restaurant',
  tagline: {
    de: 'Österreichisch-italienische Spezialitäten in Hagenberg',
    en: 'Austrian-Italian specialties in Hagenberg',
  },
  address: {
    street: 'Kirchenplatz 6',
    postalCode: 'AT-4232',
    city: 'Hagenberg',
    country: 'Austria',
    countryCode: 'AT',
  },
  phones: {
    primary: env.contactPhone,
    primaryDisplay: env.contactPhoneDisplay,
    secondaryDisplay: env.contactPhoneSecondary,
    internationalDisplay: '0043 664 198 19 65',
  },
  email: env.contactEmail,
  social: {
    instagram: 'https://www.instagram.com/pizza.caravento/',
  },
  apps: {
    ios: env.orderUrlIos,
    android: env.orderUrlAndroid,
  },
  orderUrl: env.orderUrl,
  map: {
    // Kirchenplatz 6, Hagenberg — approximate; refine with client GPS if needed
    lat: 48.3686,
    lng: 14.5164,
  },
}
