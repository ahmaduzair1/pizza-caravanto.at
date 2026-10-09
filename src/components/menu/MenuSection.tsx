import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchMenu } from '../../api/menu'
import { useReveal } from '../../hooks/useReveal'
import type { MenuCategory, MenuItem } from '../../types'
import { MenuCard } from './MenuCard'

export function MenuSection() {
  const { t } = useTranslation()
  const [items, setItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [active, setActive] = useState<MenuCategory>('mittag')
  const sectionRef = useReveal<HTMLElement>()

  useEffect(() => {
    let mounted = true
    void fetchMenu().then((res) => {
      if (!mounted) return
      setItems(res.data.items)
      setCategories([...res.data.categories])
      setActive(res.data.categories[0] ?? 'mittag')
    })
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(
    () => items.filter((item) => item.category === active),
    [active, items],
  )

  return (
    <section
      id="speisen"
      ref={sectionRef}
      className="on-dark section-shell scroll-mt-24 bg-forest"
      aria-labelledby="speisen-heading"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.22em] text-brass"
          >
            {t('menu.eyebrow')}
          </p>
          <h2
            id="speisen-heading"
            data-reveal
            className="mt-3 font-display text-2xl leading-snug sm:text-3xl"
          >
            {t('menu.title')}
          </h2>
          <p
            data-reveal
            className="mt-3 text-sm leading-relaxed text-ivory/85 sm:mt-4 sm:text-base"
          >
            {t('menu.intro')}
          </p>
          <div
            data-reveal
            className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-brass/70 to-transparent"
            aria-hidden
          />
        </div>

        <LayoutGroup>
          <div
            data-reveal
            className="section-gap flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label={t('sections.menu')}
          >
            {categories.map((category) => {
              const selected = category === active
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(category)}
                  className={`relative rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? 'text-ivory'
                      : 'bg-ivory/10 text-ivory/85 hover:bg-ivory/15 hover:text-ivory'
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId="menu-tab-pill"
                      className="absolute inset-0 rounded-2xl bg-terracotta shadow-soft"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10">
                    {t(`menu.categories.${category}`)}
                  </span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        <div className="section-gap min-h-[12rem]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-ivory/70">
              {t('menu.emptyCategory')}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
