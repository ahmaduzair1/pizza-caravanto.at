import { Leaf } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { MenuItem } from '../../types'
import { localize } from '../../utils/localize'
import { TiltCard } from '../ui/TiltCard'
import { AllergenBadges } from './AllergenBadges'

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  const { t, i18n } = useTranslation()

  return (
    <TiltCard className="h-full">
      <article
        className={`relative flex h-full flex-col rounded-2xl border p-5 shadow-card sm:p-6 ${
          item.isPlaceholder
            ? 'border-dashed border-brass/40 bg-brass/10'
            : 'border-ivory/10 bg-forest/55 transition hover:border-brass/40 hover:shadow-glow'
        }`}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {item.tag ? (
            <span className="rounded-xl bg-forest px-2.5 py-1 text-xs font-semibold text-ivory">
              {localize(item.tag, i18n.language)}
            </span>
          ) : null}
          {item.vegetarian ? (
            <span className="inline-flex items-center gap-1 rounded-xl bg-forest/80 px-2.5 py-1 text-xs font-semibold text-ivory">
              <Leaf size={12} aria-hidden />
              {t('menu.vegetarian')}
            </span>
          ) : null}
          {item.isPlaceholder ? (
            <span className="rounded-xl border border-brass/50 bg-forest/40 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ivory">
              {t('menu.placeholderBadge')}
            </span>
          ) : null}
        </div>

        <h3 className="font-display text-xl leading-snug">
          {localize(item.name, i18n.language)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/80">
          {localize(item.description, i18n.language)}
        </p>

        <div className="mt-4 border-t border-ivory/10 pt-4">
          <AllergenBadges codes={item.allergens} tone="dark" />
        </div>
      </article>
    </TiltCard>
  )
}
