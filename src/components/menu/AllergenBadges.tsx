import { useTranslation } from 'react-i18next'

interface AllergenBadgesProps {
  codes: string[]
  tone?: 'light' | 'dark'
}

/** Visual allergen icon slots — codes are EU-style letters when provided. */
export function AllergenBadges({ codes, tone = 'light' }: AllergenBadgesProps) {
  const { t } = useTranslation()
  const dark = tone === 'dark'

  if (codes.length === 0) {
    return (
      <div
        className="flex items-center gap-1.5"
        aria-label={t('menu.allergens')}
      >
        <span
          className={`rounded-lg border border-dashed px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
            dark
              ? 'border-ivory/25 text-ivory/55'
              : 'border-ink/20 text-ink/45'
          }`}
        >
          {t('menu.allergenSlot')}
        </span>
      </div>
    )
  }

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={t('menu.allergens')}>
      {codes.map((code) => (
        <li
          key={code}
          className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-xs font-bold ${
            dark
              ? 'bg-ivory/15 text-ivory'
              : 'bg-ink/8 text-ink'
          }`}
          title={`${t('menu.allergens')}: ${code}`}
        >
          {code}
        </li>
      ))}
    </ul>
  )
}
