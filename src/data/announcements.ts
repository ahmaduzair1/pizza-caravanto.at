import type { Announcement } from '../types'

export const announcements: Announcement[] = [
  {
    id: 'delivery',
    emoji: '✨',
    title: {
      de: 'NEU – 🚚 Lieferung ab sofort! Freitag bis Montag – genießen Sie zu Hause.',
      en: 'NEW – 🚚 Delivery now available! Friday to Monday – enjoy at home.',
    },
    body: {
      de: 'Ab sofort liefern wir jeden Freitag bis Montag unsere köstlichen Gerichte direkt zu Ihnen nach Hause. Bestellen Sie jetzt bequem online und genießen Sie österreichisch-italienische Spezialitäten – ganz ohne Stress! Lieferzeiten: 11:00 – 21:00 Uhr',
      en: 'From now on we deliver our delicious dishes straight to your home every Friday through Monday. Order online and enjoy Austrian-Italian specialties — stress-free! Delivery hours: 11:00 – 21:00',
    },
  },
  {
    id: 'ice-cream',
    emoji: '🍦',
    title: {
      de: 'NEU IM MENÜ – Italienische Kühle: Hausgemachtes Eis – cremig, fruchtig, unwiderstehlich!',
      en: 'NEW ON THE MENU – Italian chill: Homemade ice cream – creamy, fruity, irresistible!',
    },
    body: {
      de: 'Genießen Sie unsere neue Eiskreation mit Blick auf die malerische Hagenberger Schlosskulisse – ein Hauch von Italien mitten in Oberösterreich. Perfekt für eine süße Auszeit!',
      en: 'Enjoy our new ice cream creation with a view of Hagenberg’s picturesque castle setting — a touch of Italy in the heart of Upper Austria. Perfect for a sweet break!',
    },
    quote: {
      de: '„Wenn die Sonne über Hagenberg scheint, schmeckt unser Eis gleich doppelt so gut.“',
      en: '“When the sun shines over Hagenberg, our ice cream tastes twice as good.”',
    },
  },
]
