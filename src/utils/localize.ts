import type { Locale, LocalizedString } from '../types'

export function localize(
  value: LocalizedString,
  language: string,
): string {
  const locale: Locale = language.startsWith('en') ? 'en' : 'de'
  return value[locale]
}
