import { Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { siteConfig } from '../../data/site'
import { useReveal } from '../../hooks/useReveal'
import { ContactForm } from './ContactForm'
import { HoursCard } from './HoursCard'
import { MapEmbed } from './MapEmbed'
import { ReservationForm } from './ReservationForm'

export function ContactSection() {
  const { t } = useTranslation()
  const sectionRef = useReveal<HTMLElement>({ stagger: 0.08 })
  const secondaryTel = '+43723687924'
  const addressLine = `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}`

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      className="section-shell scroll-mt-24 bg-linen"
      aria-labelledby="kontakt-heading"
    >
      <div className="container-page flex flex-col gap-8 sm:gap-10">
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.22em] text-forest"
          >
            {t('contact.eyebrow')}
          </p>
          <h2
            id="kontakt-heading"
            data-reveal
            className="section-heading mt-3"
          >
            {t('contact.title')}
          </h2>
          <p data-reveal className="section-lead mx-auto max-w-2xl">
            {t('contact.intro')}
          </p>
        </div>

        <div
          data-reveal
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <InfoCard
            icon={<Phone className="text-brass" size={22} aria-hidden />}
            title={t('contact.reservation')}
          >
            <a
              href={`tel:${siteConfig.phones.primary}`}
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              {siteConfig.phones.primaryDisplay}
            </a>
            <span className="text-ink/50"> / </span>
            <a
              href={`tel:${secondaryTel}`}
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              {siteConfig.phones.secondaryDisplay}
            </a>
          </InfoCard>

          <InfoCard
            icon={<Mail className="text-brass" size={22} aria-hidden />}
            title={t('contact.email')}
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              {siteConfig.email}
            </a>
          </InfoCard>

          <InfoCard
            icon={<MapPin className="text-brass" size={22} aria-hidden />}
            title={t('contact.address')}
            className="sm:col-span-2 lg:col-span-1"
          >
            <p className="font-semibold text-ink">{addressLine}</p>
          </InfoCard>
        </div>

        <div data-reveal className="grid gap-5 lg:grid-cols-2">
          <MapEmbed />
          <HoursCard />
        </div>

        <div data-reveal className="grid gap-5 lg:grid-cols-2">
          <ReservationForm />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  icon,
  title,
  children,
  className = '',
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-ink/10 bg-ivory p-5 shadow-card ${className}`}
    >
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="font-display text-lg text-ink">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
