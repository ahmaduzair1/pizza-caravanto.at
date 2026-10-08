import { useTranslation } from 'react-i18next'

import { siteConfig } from '../../data/site'
import { useConsent } from '../../hooks/useConsent'

export function MapEmbed() {
  const { t } = useTranslation()
  const { consent, allowMap } = useConsent()
  const allowed = Boolean(consent?.map)
  const { lat, lng } = siteConfig.map
  const delta = 0.01
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`

  if (!allowed) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-ink/5 p-6 text-center">
        <p className="max-w-sm text-sm text-ink/75">{t('contact.mapConsent')}</p>
        <button type="button" className="btn-primary" onClick={allowMap}>
          {t('contact.loadMap')}
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-card">
      <iframe
        title={t('contact.mapTitle')}
        src={src}
        className="h-[260px] w-full border-0 sm:h-[320px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-ivory px-4 py-2 text-center text-xs font-semibold text-ink/70 underline-offset-2 hover:underline"
      >
        {t('contact.openInOsm')}
      </a>
    </div>
  )
}
