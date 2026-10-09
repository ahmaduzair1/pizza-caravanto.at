import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchAboutGallery } from '../../api/gallery'
import { FoodMotifs } from '../discover/FoodMotifs'
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
      className="section-shell relative scroll-mt-24 overflow-hidden bg-background"
      aria-labelledby="ueber-uns-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] opacity-70"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 78% 30%, color-mix(in oklch, var(--secondary) 40%, transparent), transparent 72%)',
        }}
      />

      <div className="container-page relative grid items-start gap-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-6 xl:col-span-7">
          <p
            data-reveal
            className="text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            {t('about.eyebrow')}
          </p>
          <h2
            id="ueber-uns-heading"
            data-reveal
            className="font-display text-2xl leading-snug text-foreground sm:text-3xl lg:text-[2.05rem]"
          >
            {t('about.title')}
          </h2>
          <p data-reveal className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('about.p1')}
          </p>
          <p data-reveal className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('about.p2')}
          </p>
          <p data-reveal className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('about.p3')}
          </p>
        </div>

        <div
          data-reveal
          className="relative mx-auto w-full max-w-sm px-3 lg:col-span-6 lg:mx-0 lg:max-w-none lg:px-4 xl:col-span-5"
          aria-label={t('about.collageLabel')}
        >
          <FoodMotifs variant="collage" />

          <div className="form-card relative z-[1] grid grid-cols-2 gap-2 p-2.5 sm:gap-2.5 sm:p-3">
            {images.map((image, i) => (
              <div
                key={image.id}
                data-reveal
                className={`group relative overflow-hidden rounded-[calc(var(--radius)-4px)] ${
                  i % 2 === 1 ? 'translate-y-3 sm:translate-y-4' : ''
                }`}
              >
                <img
                  src={image.src}
                  alt={localize(image.alt, i18n.language)}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] h-auto max-h-[140px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:max-h-[160px] lg:max-h-[170px] xl:max-h-[180px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
