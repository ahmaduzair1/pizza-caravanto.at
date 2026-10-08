export interface ConsentPreferences {
  necessary: true
  analytics: boolean
  marketing: boolean
  /** Explicit consent to load OpenStreetMap embed */
  map: boolean
  updatedAt: string
}

const STORAGE_KEY = 'caravento-cookie-consent'

export const defaultConsent: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  map: false,
  updatedAt: '',
}

export function readConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      map: Boolean(parsed.map),
      updatedAt: parsed.updatedAt ?? '',
    }
  } catch {
    return null
  }
}

export function writeConsent(
  prefs: Omit<ConsentPreferences, 'necessary' | 'updatedAt'> & {
    necessary?: true
  },
): ConsentPreferences {
  const next: ConsentPreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    map: prefs.map,
    updatedAt: new Date().toISOString(),
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('caravento:consent', { detail: next }))
  return next
}

export function acceptAllConsent(): ConsentPreferences {
  return writeConsent({
    analytics: true,
    marketing: true,
    map: true,
  })
}

export function rejectOptionalConsent(): ConsentPreferences {
  return writeConsent({
    analytics: false,
    marketing: false,
    map: false,
  })
}
