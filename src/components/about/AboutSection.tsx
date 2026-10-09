import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchAboutGallery } from '../../api/gallery'
import { useReveal } from '../../hooks/useReveal'
import type { GalleryImage } from '../../types'
import { localize } from '../../utils/localize'

export function AboutSection() {
  const { t, i18n } = useTranslation()
  const [images, setImages] = useState<GalleryImage[]>([])
  const sectionRef = useReveal<HTMLElement>({ stagger: 0.1 })

  useEffect(() => {
    let active = true
    void fetchAboutGallery().then((res) => {
      if (active) setImages(res.data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <section
      id="ueber-uns"
      ref={sectionRef}
      className="section-shell scroll-mt-24 bg-ivory"
      aria-labelledby="ueber-uns-heading"
    >
      <div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.22em] text-forest"
          >
            {t('about.eyebrow')}
          </p>
          <h2
            id="ueber-uns-heading"
            data-reveal
            className="font-display text-2xl leading-snug text-ink sm:text-3xl lg:text-[2.15rem]"
          >
            {t('about.title')}
          </h2>
          <p data-reveal className="text-sm leading-relaxed text-ink/80 sm:text-base">
            {t('about.p1')}
          </p>
          <p data-reveal className="text-sm leading-relaxed text-ink/80 sm:text-base">
            {t('about.p2')}
          </p>
          <p data-reveal className="text-sm leading-relaxed text-ink/80 sm:text-base">
            {t('about.p3')}
          </p>
        </div>

        <div
          data-reveal
          className="grid grid-cols-2 gap-2.5 sm:gap-3"
          aria-label={t('about.collageLabel')}
        >
          {images.map((image, i) => (
            <div
              key={image.id}
              data-reveal
              className={`group relative overflow-hidden rounded-xl shadow-card sm:rounded-2xl ${
                i % 2 === 1 ? 'mt-4 sm:mt-6' : ''
              }`}
            >
              <img
                src={image.src}
                alt={localize(image.alt, i18n.language)}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] h-full max-h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:max-h-[280px] lg:max-h-[300px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
