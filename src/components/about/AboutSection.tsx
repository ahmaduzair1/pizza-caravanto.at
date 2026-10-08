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
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="space-y-5">
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.22em] text-forest"
          >
            {t('about.eyebrow')}
          </p>
          <h2
            id="ueber-uns-heading"
            data-reveal
            className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-[2.75rem]"
          >
            {t('about.title')}
          </h2>
          <p data-reveal className="text-base leading-relaxed text-ink/80">
            {t('about.p1')}
          </p>
          <p data-reveal className="text-base leading-relaxed text-ink/80">
            {t('about.p2')}
          </p>
          <p data-reveal className="text-base leading-relaxed text-ink/80">
            {t('about.p3')}
          </p>
        </div>

        <div
          data-reveal
          className="grid grid-cols-2 gap-3 sm:gap-4"
          aria-label={t('about.collageLabel')}
        >
          {images.map((image, i) => (
            <div
              key={image.id}
              data-reveal
              className={`group relative overflow-hidden rounded-2xl shadow-card ${
                i % 2 === 1 ? 'mt-6 sm:mt-10' : ''
              }`}
            >
              <img
                src={image.src}
                alt={localize(image.alt, i18n.language)}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
