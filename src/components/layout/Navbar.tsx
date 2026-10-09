import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { HERO_VARIANT } from '../../config/heroVariant'
import { images } from '../../config/images'
import { siteConfig } from '../../data/site'
import { scrollToSection } from '../../lib/lenisController'
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

const GLASS = {
  backgroundColor: 'rgba(23, 48, 31, 0.42)',
  backdropFilter: 'blur(28px) saturate(1.35)',
  WebkitBackdropFilter: 'blur(28px) saturate(1.35)',
} as const

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
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
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const goToSection = (id: string) => {
    setMobileOpen(false)
    document.body.style.overflow = ''

    const run = () => {
      if (location.pathname !== '/') {
        void navigate({ pathname: '/', hash: id })
        window.setTimeout(() => scrollToSection(id), 80)
      } else {
        void navigate({ pathname: '/', hash: id }, { replace: true })
        scrollToSection(id)
      }
    }

    // Let the menu unmount / unlock scroll before moving
    window.requestAnimationFrame(() => {
      window.setTimeout(run, 30)
    })
  }

  const solid = scrolled || mobileOpen

  const desktopLinkClass = (id: string) => {
    const active = isHome && activeId === id
    return `border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? 'border-brass text-ivory'
        : 'border-transparent text-ivory/90 hover:text-ivory'
    }`
  }

  return (
    <>
      <header
        className={`on-dark fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? 'border-b border-ivory/15 py-2 shadow-soft'
            : 'border-b border-transparent bg-transparent py-4'
        }`}
        style={solid ? GLASS : undefined}
      >
        <div className="container-page flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={t('common.brand')}
            onClick={() => {
              setMobileOpen(false)
              if (isHome) scrollToSection('home')
            }}
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
              <button
                key={link.hash}
                type="button"
                className={desktopLinkClass(link.id)}
                aria-current={activeId === link.id && isHome ? 'true' : undefined}
                onClick={() => goToSection(link.id)}
              >
                {t(link.labelKey)}
              </button>
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

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher variant="overHero" />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-ivory/40 bg-ivory/10 p-2.5 text-ivory"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="on-dark fixed inset-0 z-[49] flex flex-col lg:hidden"
          style={GLASS}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.openMenu')}
        >
          <div className="h-[3.75rem] shrink-0" aria-hidden />
          <nav
            className="container-page relative z-[51] flex flex-1 flex-col gap-1 overflow-y-auto pb-28 pt-4"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.hash}
                type="button"
                className={`rounded-xl px-4 py-3.5 text-left text-lg font-medium transition-colors ${
                  activeId === link.id
                    ? 'bg-ivory/15 text-ivory ring-1 ring-brass/50'
                    : 'text-ivory/90 hover:bg-ivory/10 hover:text-ivory'
                }`}
                onClick={() => goToSection(link.id)}
              >
                {t(link.labelKey)}
              </button>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-ivory/20 pt-6">
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
    </>
  )
}
