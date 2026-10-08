import { Phone, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { siteConfig } from '../../data/site'

export function MobileActionBar() {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/95 px-2 py-2 shadow-soft backdrop-blur-md md:hidden">
      <nav
        className="grid grid-cols-3 gap-1"
        aria-label="Mobile actions"
      >
        <a
          href={`tel:${siteConfig.phones.primary}`}
          className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
        >
          <Phone size={20} className="text-terracotta" aria-hidden />
          {t('mobileBar.call')}
        </a>
        <Link
          to="/#kontakt"
          className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
        >
          <UtensilsCrossed size={20} className="text-brass" aria-hidden />
          {t('mobileBar.reserve')}
        </Link>
        <a
          href={siteConfig.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
        >
          <ShoppingBag size={20} className="text-brass" aria-hidden />
          {t('mobileBar.order')}
        </a>
      </nav>
    </div>
  )
}
