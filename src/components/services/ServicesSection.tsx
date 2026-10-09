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
      className="section-shell scroll-mt-24 bg-background"
      aria-labelledby="services-heading"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            {t('services.eyebrow')}
          </p>
          <h2
            id="services-heading"
            data-reveal
            className="section-heading mt-3 text-foreground"
          >
            {t('sections.services')}
          </h2>
          <p data-reveal className="section-lead mx-auto max-w-2xl text-muted-foreground">
            {t('services.intro')}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {items.map((item) => (
            <TiltCard key={item.id} className="h-full">
              <article
                data-reveal
                className="form-card flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[2/1] max-h-[160px] overflow-hidden sm:max-h-[180px]">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
                  <h3 className="font-display text-lg leading-snug text-foreground sm:text-xl">
                    {localize(item.title, i18n.language)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {localize(item.description, i18n.language)}
                  </p>
                  {item.footnote ? (
                    <p className="mt-auto pt-2 text-sm font-semibold text-primary">
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
