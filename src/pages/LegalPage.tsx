import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { Seo } from '../components/seo/Seo'

type LegalPageKey = 'impressum' | 'agb' | 'privacy' | 'cookies'

const PAGE_COPY: Record<LegalPageKey, { titleKey: string }> = {
  impressum: { titleKey: 'legal.impressum' },
  agb: { titleKey: 'legal.agb' },
  privacy: { titleKey: 'legal.privacy' },
  cookies: { titleKey: 'legal.cookies' },
}

interface LegalPageProps {
  page: LegalPageKey
}

export function LegalPage({ page }: LegalPageProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const title = t(PAGE_COPY[page].titleKey)

  return (
    <>
      <Seo
        title={t('meta.legalTitle', { page: title })}
        description={t('meta.homeDescription')}
        path={location.pathname}
      />

      <section className="section-shell pt-28">
        <div className="container-page max-w-3xl">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">
            {title}
          </h1>
          <div className="mt-8 space-y-4 rounded-2xl border border-ink/10 bg-linen p-6 shadow-card sm:p-8">
            <p className="text-lg text-ink/80">{t('legal.placeholder')}</p>
            {page === 'cookies' ? (
              <div className="border-t border-ink/10 pt-4">
                <p className="mb-3 text-sm text-ink/70">
                  {t('legal.cookieSettingsNote')}
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() =>
                    window.dispatchEvent(new Event('caravento:open-cookies'))
                  }
                >
                  {t('cookies.manage')}
                </button>
              </div>
            ) : null}
          </div>
          <Link to="/" className="btn-secondary mt-8 inline-flex">
            {t('legal.backHome')}
          </Link>
        </div>
      </section>
    </>
  )
}
