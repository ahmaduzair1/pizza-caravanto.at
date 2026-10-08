import { images } from '../config/images'
import type { GalleryImage } from '../types'

export const aboutImages: GalleryImage[] = [
  {
    id: 'about-1',
    src: images.about.about1,
    alt: { de: 'Caravento Interieur', en: 'Caravento interior' },
  },
  {
    id: 'about-2',
    src: images.about.about2,
    alt: { de: 'Frische Speisen', en: 'Fresh dishes' },
  },
  {
    id: 'about-3',
    src: images.about.about3,
    alt: { de: 'Gemütliche Atmosphäre', en: 'Cozy atmosphere' },
  },
  {
    id: 'about-4',
    src: images.about.about4,
    alt: { de: 'Caravento Ambiente', en: 'Caravento ambiance' },
  },
]

export const entdeckenImages: GalleryImage[] = images.entdecken.map(
  (src, index) => ({
    id: `entdecken-${index + 1}`,
    src,
    alt: {
      de: `Entdecken Galerie Bild ${index + 1}`,
      en: `Discover gallery image ${index + 1}`,
    },
    caption: {
      de: 'Caravento Pizza & Restaurant – Mit Freude heißen wir Sie herzlich willkommen – genießen Sie gute Küche und entspannte Momente bei uns.',
      en: 'Caravento Pizza & Restaurant – We warmly welcome you – enjoy good food and relaxed moments with us.',
    },
  }),
)
