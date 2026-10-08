import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { HERO_VARIANT } from '../../config/heroVariant'
import { images } from '../../config/images'
import { siteConfig } from '../../data/site'
import { subscribeScroll } from '../../lib/scrollBus'
import { LanguageSwitcher } from './LanguageSwitcher'

const NAV_LINKS = [
  { id: 'home', hash: '#home', labelKey: 'nav.home' },
  { id: 'ueber-uns', hash: '#ueber-uns', labelKey: 'nav.about' },
  { id: 'entdecken', hash: '#entdecken', labelKey: 'nav.discover' },
  { id: 'services', hash: '#services', labelKey: 'nav.services' },
  { id: 'speisen', hash: '#speisen', labelKey: 'nav.menu' },
  { id: 'kontakt', hash: '#kontakt', labelKey: 'nav.contact' },
] as const

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const isHome = location.pathname === '/'
  /** Orbit hero is light — solid forest nav even at top */
  const lightHero = isHome && HERO_VARIANT === 'orbit'
  const [scrolled, setScrolled] = useState(!isHome || lightHero)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('home')

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    if (lightHero) {
      setScrolled(true)
      return
    }
    return subscribeScroll((_progress, scroll) => {
      setScrolled(scroll > 24)
    })
  }, [isHome, lightHero])

  useEffect(() => {
    if (!isHome) return

    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome, location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const solid = scrolled || mobileOpen

  const linkClass = (id: string) => {
    const active = isHome && activeId === id
    return `border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-brass text-ivory'
        : 'border-transparent text-ivory/90 hover:text-ivory'
    }`
  }

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-brass/40 bg-forest/[0.92] py-2 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-4'
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          aria-label={t('common.brand')}
        >
          <img
            src={images.logo}
            alt={t('common.brand')}
            className={`w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-all duration-300 ${
              solid ? 'h-10' : 'h-12'
            }`}
            width={160}
            height={48}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.hash}
              to={`/${link.hash}`}
              className={linkClass(link.id)}
              aria-current={activeId === link.id && isHome ? 'true' : undefined}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher variant="overHero" />
          <a
            href={siteConfig.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t('nav.orderCta')}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-2xl border border-ivory/40 bg-ivory/10 p-2.5 text-ivory lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="on-dark fixed inset-x-0 bottom-0 z-40 flex flex-col border-t border-brass/30 bg-forest lg:hidden"
          style={{ top: solid ? '3.75rem' : '4.5rem' }}
        >
          <nav
            className="container-page flex flex-1 flex-col gap-2 py-8"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.hash}
                to={`/${link.hash}`}
                className={`border-b px-4 py-3 text-lg font-medium ${
                  activeId === link.id
                    ? 'border-brass text-ivory'
                    : 'border-transparent text-ivory/90 hover:text-ivory'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-brass/25 pt-6">
              <LanguageSwitcher variant="overHero" />
              <a
                href={siteConfig.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                {t('nav.orderCta')}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
