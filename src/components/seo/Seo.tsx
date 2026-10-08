import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import { images } from '../../config/images'
import { hoursSchedule } from '../../data/hours'
import { siteConfig } from '../../data/site'
import type { DayOfWeek } from '../../types'

const DAY_TO_SCHEMA: Record<DayOfWeek, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

interface SeoProps {
  title?: string
  description?: string
  path?: string
}

export function Seo({ title, description, path = '/' }: SeoProps) {
  const { t, i18n } = useTranslation()
  const pageTitle = title ?? t('meta.homeTitle')
  const pageDescription = description ?? t('meta.homeDescription')
  const origin =
    typeof window !== 'undefined' ? window.location.origin : 'https://pizza-caravanto.at'
  const url = `${origin}${path}`
  const ogImage = images.hero.slide1
  const locale = i18n.language.startsWith('en') ? 'en_US' : 'de_AT'

  const openingHoursSpecification = hoursSchedule.openingHours
    .filter((day) => !day.closed && day.slots.length > 0)
    .flatMap((day) =>
      day.slots.map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_TO_SCHEMA[day.day],
        opens: slot.open,
        closes: slot.close,
      })),
    )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    image: [images.logo, images.hero.slide1],
    url,
    telephone: siteConfig.phones.primary,
    email: siteConfig.email,
    servesCuisine: ['Austrian', 'Italian'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      postalCode: '4232',
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.map.lat,
      longitude: siteConfig.map.lng,
    },
    openingHoursSpecification,
    sameAs: [siteConfig.social.instagram, siteConfig.apps.ios, siteConfig.apps.android],
  }

  return (
    <Helmet>
      <html lang={i18n.language.startsWith('en') ? 'en' : 'de'} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
