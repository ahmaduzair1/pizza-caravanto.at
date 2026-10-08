import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchServices } from '../../api/services'
import { useReveal } from '../../hooks/useReveal'
import type { ServiceCard } from '../../types'
import { localize } from '../../utils/localize'
import { TiltCard } from '../ui/TiltCard'

export function ServicesSection() {
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState<ServiceCard[]>([])
  const sectionRef = useReveal<HTMLElement>({ stagger: 0.12 })

  useEffect(() => {
    let active = true
    void fetchServices().then((res) => {
      if (active) setItems(res.data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-shell scroll-mt-24 bg-ivory"
      aria-labelledby="services-heading"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.22em] text-forest"
          >
            {t('services.eyebrow')}
          </p>
          <h2
            id="services-heading"
            data-reveal
            className="mt-3 font-display text-3xl text-ink sm:text-4xl"
          >
            {t('sections.services')}
          </h2>
          <p
            data-reveal
            className="mt-4 text-base leading-relaxed text-ink/80"
          >
            {t('services.intro')}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <TiltCard key={item.id} className="h-full">
              <article
                data-reveal
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-ivory shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <h3 className="font-display text-xl leading-snug text-ink">
                    {localize(item.title, i18n.language)}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink/75">
                    {localize(item.description, i18n.language)}
                  </p>
                  {item.footnote ? (
                    <p className="mt-auto pt-2 text-sm font-semibold text-terracotta">
                      {localize(item.footnote, i18n.language)}
                    </p>
                  ) : null}
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
