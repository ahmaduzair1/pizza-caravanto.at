/**
 * Central image URLs — swap hosts or paths here without touching components.
 * Demo placeholders point at the live site CDN.
 */
const IMG_BASE = 'https://pizza-caravento.at/img'

export const images = {
  logo: `${IMG_BASE}/logo-light.png`,
  logoDark: `${IMG_BASE}/logo-dark.png`,
  hero: {
    /** Restaurant venue — interior, façade, terrace */
    slide1: `${IMG_BASE}/entdecken/1.jpg`,
    slide2: `${IMG_BASE}/entdecken/2.jpg`,
    slide3: `${IMG_BASE}/restaurant/1.jpg`,
    ambience: `${IMG_BASE}/entdecken/2.jpg`,
    /** Orbit / Agrumea-style stage */
    orbit: {
      pizza: `${IMG_BASE}/about-2.jpg`,
      pasta: `${IMG_BASE}/about-4.jpg`,
      ribs: `${IMG_BASE}/entdecken/8.jpg`,
      salad: `${IMG_BASE}/entdecken/5.jpg`,
      shrimp: `${IMG_BASE}/entdecken/6.jpg`,
      moments: `${IMG_BASE}/restaurant/4.jpg`,
    },
  },
  about: {
    about1: `${IMG_BASE}/about-1.jpg`,
    about2: `${IMG_BASE}/about-2.jpg`,
    about3: `${IMG_BASE}/about-3.jpg`,
    about4: `${IMG_BASE}/about-4.jpg`,
  },
  entdecken: [
    `${IMG_BASE}/entdecken/1.jpg`,
    `${IMG_BASE}/entdecken/2.jpg`,
    `${IMG_BASE}/entdecken/3.jpg`,
    `${IMG_BASE}/entdecken/5.jpg`,
    `${IMG_BASE}/entdecken/6.jpg`,
    `${IMG_BASE}/entdecken/8.jpg`,
    `${IMG_BASE}/entdecken/7.jpg`,
  ] as const,
  services: {
    cuisine: `${IMG_BASE}/restaurant/1.jpg`,
    lunch: `${IMG_BASE}/restaurant/3.jpg`,
    coffee: `${IMG_BASE}/restaurant/2.jpg`,
    takeaway: `${IMG_BASE}/restaurant/4.jpg`,
  },
  menu: {
    placeholder: `${IMG_BASE}/restaurant/1.jpg`,
  },
  badges: {
    appStore: `${IMG_BASE}/app-store-badge.svg`,
    googlePlay: `${IMG_BASE}/google-play-badge.png`,
  },
} as const

export type ImageKey = keyof typeof images
