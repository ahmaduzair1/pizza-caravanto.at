import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import { HeroOrbit } from '../components/hero/HeroOrbit'
import { HeroSlider } from '../components/hero/HeroSlider'
import { Seo } from '../components/seo/Seo'
import { SectionSkeleton } from '../components/ui/SectionSkeleton'
import { HERO_VARIANT } from '../config/heroVariant'

const AboutSection = lazy(() =>
  import('../components/about/AboutSection').then((m) => ({
    default: m.AboutSection,
  })),
)
const DiscoverSection = lazy(() =>
  import('../components/discover/DiscoverSection').then((m) => ({
    default: m.DiscoverSection,
  })),
)
const ServicesSection = lazy(() =>
  import('../components/services/ServicesSection').then((m) => ({
    default: m.ServicesSection,
  })),
)
const MenuSection = lazy(() =>
  import('../components/menu/MenuSection').then((m) => ({
    default: m.MenuSection,
  })),
)
const ContactSection = lazy(() =>
  import('../components/contact/ContactSection').then((m) => ({
    default: m.ContactSection,
  })),
)

export function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={t('meta.homeTitle')}
        description={t('meta.homeDescription')}
        path="/"
      />

      {HERO_VARIANT === 'orbit' ? <HeroOrbit /> : <HeroSlider />}

      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <DiscoverSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <MenuSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </>
  )
}
