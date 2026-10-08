import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { images } from '../../config/images'
import { siteConfig } from '../../data/site'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const LEGAL_LINKS = [
  { to: '/impressum', labelKey: 'footer.impressum' },
  { to: '/agb', labelKey: 'footer.agb' },
  { to: '/datenschutz', labelKey: 'footer.privacy' },
  { to: '/cookie-richtlinie', labelKey: 'footer.cookies' },
] as const

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="on-dark border-t border-brass/20 bg-forest">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-4">
          <img
            src={images.logo}
            alt={t('common.brand')}
            className="h-12 w-auto brightness-0 invert"
            width={160}
            height={48}
          />
          <p className="max-w-xs text-sm text-ivory/80">{t('footer.tagline')}</p>
          <p className="text-sm text-ivory/80">
            {t('footer.phone')}{' '}
            <a
              href={`tel:${siteConfig.phones.primary}`}
              className="font-medium text-ivory underline-offset-2 hover:underline"
            >
              {siteConfig.phones.internationalDisplay}
            </a>
          </p>
          <p className="text-sm text-ivory/80">{t('footer.address')}</p>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg">
            {t('footer.legal')}
          </h2>
          <ul className="space-y-2 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-ivory/85 underline-offset-2 transition hover:text-brass hover:underline"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="text-ivory/85 underline-offset-2 transition hover:text-brass hover:underline"
                onClick={() =>
                  window.dispatchEvent(new Event('caravento:open-cookies'))
                }
              >
                {t('cookies.manage')}
              </button>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg">
            {t('footer.appDownload')}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.apps.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-2xl bg-ivory/10 px-4 py-2 text-sm font-semibold text-ivory ring-1 ring-ivory/20 transition hover:bg-ivory/15 hover:shadow-glow hover:ring-brass/40"
            >
              {t('footer.appStore')}
            </a>
            <a
              href={siteConfig.apps.android}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-2xl bg-ivory/10 px-4 py-2 text-sm font-semibold text-ivory ring-1 ring-ivory/20 transition hover:bg-ivory/15 hover:shadow-glow hover:ring-brass/40"
            >
              {t('footer.googlePlay')}
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-ivory/10 px-4 py-2 text-sm font-semibold text-ivory ring-1 ring-ivory/20 transition hover:bg-ivory/15 hover:shadow-glow hover:ring-brass/40"
              aria-label={t('footer.instagram')}
            >
              <InstagramIcon />
              {t('footer.instagram')}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <p className="container-page py-4 text-center text-xs text-ivory/70">
          {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
