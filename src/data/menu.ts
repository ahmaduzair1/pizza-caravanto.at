import type { MenuItem } from '../types'

/**
 * Only the three mittag dishes are real client content.
 * All other items are placeholders (isPlaceholder: true) — remove before demo if needed.
 */
export const menuItems: MenuItem[] = [
  {
    id: 'mittag-koefte-teller',
    category: 'mittag',
    tag: { de: 'Klassiker', en: 'Classic' },
    name: {
      de: 'Saftiger Köfte-Teller & knusprige Hühnerstreifen',
      en: 'Juicy köfte plate & crispy chicken strips',
    },
    description: {
      de: 'Serviert mit duftendem Basmatireis und einem knackig-frischen Salat – ein Genuss für jeden Tag',
      en: 'Served with fragrant basmati rice and a crisp fresh salad — a treat for every day',
    },
    allergens: [],
    vegetarian: false,
    isPlaceholder: false,
  },
  {
    id: 'mittag-koefte-spezial',
    category: 'mittag',
    tag: { de: 'Köfte Spezial', en: 'Köfte Special' },
    name: {
      de: 'Afghanischer Genuss',
      en: 'Afghan delight',
    },
    description: {
      de: 'Handgeformte Köfte in einer reichhaltigen, hausgemachten Tomatensauce – begleitet von duftendem Basmatireis und einem frischen Salat. Ein Geschmackserlebnis!',
      en: 'Hand-formed köfte in a rich homemade tomato sauce — with fragrant basmati rice and a fresh salad. A taste experience!',
    },
    allergens: [],
    vegetarian: false,
    isPlaceholder: false,
  },
  {
    id: 'mittag-chicken',
    category: 'mittag',
    tag: { de: 'Chicken', en: 'Chicken' },
    name: {
      de: 'Gebratene Hühnerstreifen',
      en: 'Pan-fried chicken strips',
    },
    description: {
      de: 'Saftige Hähnchenstreifen mit Basmatireis, Karotten, Rosinen und frischem Salat – leicht, aromatisch und sättigend',
      en: 'Juicy chicken strips with basmati rice, carrots, raisins and fresh salad — light, aromatic and filling',
    },
    allergens: [],
    vegetarian: false,
    isPlaceholder: false,
  },
  // --- PLACEHOLDERS (delete before client demo if not replaced) ---
  {
    id: 'pizza-placeholder-1',
    category: 'pizza',
    name: {
      de: '[Platzhalter] Margherita',
      en: '[Placeholder] Margherita',
    },
    description: {
      de: 'TODO: Gerichtsname, Beschreibung und Preis vom Kunden',
      en: 'TODO: dish name, description and price from client',
    },
    allergens: ['A', 'G'],
    vegetarian: true,
    isPlaceholder: true,
  },
  {
    id: 'pasta-placeholder-1',
    category: 'pasta',
    name: {
      de: '[Platzhalter] Pasta al Pomodoro',
      en: '[Placeholder] Pasta al Pomodoro',
    },
    description: {
      de: 'TODO: Gerichtsname, Beschreibung und Preis vom Kunden',
      en: 'TODO: dish name, description and price from client',
    },
    allergens: ['A'],
    vegetarian: true,
    isPlaceholder: true,
  },
  {
    id: 'salate-placeholder-1',
    category: 'salate',
    name: {
      de: '[Platzhalter] Gemischter Salat',
      en: '[Placeholder] Mixed salad',
    },
    description: {
      de: 'TODO: Gerichtsname, Beschreibung und Preis vom Kunden',
      en: 'TODO: dish name, description and price from client',
    },
    allergens: [],
    vegetarian: true,
    isPlaceholder: true,
  },
  {
    id: 'burger-placeholder-1',
    category: 'burger',
    name: {
      de: '[Platzhalter] Classic Burger',
      en: '[Placeholder] Classic Burger',
    },
    description: {
      de: 'TODO: Gerichtsname, Beschreibung und Preis vom Kunden',
      en: 'TODO: dish name, description and price from client',
    },
    allergens: ['A', 'C', 'G'],
    vegetarian: false,
    isPlaceholder: true,
  },
  {
    id: 'fleisch-placeholder-1',
    category: 'fleisch',
    name: {
      de: '[Platzhalter] Fleischgericht',
      en: '[Placeholder] Meat dish',
    },
    description: {
      de: 'TODO: Gerichtsname, Beschreibung und Preis vom Kunden',
      en: 'TODO: dish name, description and price from client',
    },
    allergens: [],
    vegetarian: false,
    isPlaceholder: true,
  },
  {
    id: 'eis-placeholder-1',
    category: 'eis',
    name: {
      de: '[Platzhalter] Hausgemachtes Eis',
      en: '[Placeholder] Homemade ice cream',
    },
    description: {
      de: 'TODO: Sorten, Beschreibung und Preise vom Kunden',
      en: 'TODO: flavors, description and prices from client',
    },
    allergens: ['G'],
    vegetarian: true,
    isPlaceholder: true,
  },
  {
    id: 'getraenke-placeholder-1',
    category: 'getraenke',
    name: {
      de: '[Platzhalter] Getränk',
      en: '[Placeholder] Drink',
    },
    description: {
      de: 'TODO: Getränkekarte vom Kunden',
      en: 'TODO: drinks menu from client',
    },
    allergens: [],
    vegetarian: true,
    isPlaceholder: true,
  },
]

export const menuCategories = [
  'mittag',
  'pizza',
  'pasta',
  'salate',
  'burger',
  'fleisch',
  'eis',
  'getraenke',
] as const
