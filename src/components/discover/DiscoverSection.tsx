import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchEntdeckenGallery } from '../../api/gallery'
import { useReveal } from '../../hooks/useReveal'
import type { GalleryImage } from '../../types'
import { Lightbox } from '../gallery/Lightbox'
import { FoodMotifs } from './FoodMotifs'
import { HorizontalGallery } from './HorizontalGallery'

export function DiscoverSection() {
  const { t } = useTranslation()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const introRef = useReveal<HTMLDivElement>({ stagger: 0.1 })

  useEffect(() => {
    let active = true
    void fetchEntdeckenGallery().then((res) => {
      if (active) setImages(res.data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <section
      id="entdecken"
      className="section-shell relative scroll-mt-24 overflow-hidden bg-linen"
      aria-labelledby="entdecken-heading"
    >
      {/* Soft atmospheric wash behind the intro */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-80"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in oklch, var(--secondary) 55%, transparent), transparent 70%)',
        }}
      />

      <div className="relative container-page">
        <div
          ref={introRef}
          className="relative mx-auto max-w-3xl px-2 sm:px-6"
        >
          <FoodMotifs />

          <div className="form-card relative z-[1] px-5 py-7 sm:px-8 sm:py-9">
            <p
              data-reveal
              className="text-xs font-semibold uppercase tracking-[0.22em] text-forest"
            >
              {t('sections.discover')}
            </p>
            <h2
              id="entdecken-heading"
              data-reveal
              className="section-heading mt-3"
            >
              {t('discover.title')}
            </h2>
            <p data-reveal className="section-lead">
              {t('discover.body')}
            </p>
          </div>
        </div>
      </div>

      <div className="section-gap relative">
        <HorizontalGallery images={images} onOpen={setLightboxIndex} />
      </div>

      <p className="section-gap container-page relative mx-auto max-w-3xl text-center font-display text-sm italic text-ink/75 sm:text-base">
        {t('discover.caption')}
      </p>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </section>
  )
}
