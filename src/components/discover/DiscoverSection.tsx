import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchEntdeckenGallery } from '../../api/gallery'
import { useReveal } from '../../hooks/useReveal'
import type { GalleryImage } from '../../types'
import { Lightbox } from '../gallery/Lightbox'
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
      className="scroll-mt-24 bg-linen"
      aria-labelledby="entdecken-heading"
    >
      <div className="section-shell-top">
        <div ref={introRef} className="container-page max-w-3xl">
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

      <div className="section-gap">
        <HorizontalGallery images={images} onOpen={setLightboxIndex} />
      </div>

      <div className="section-shell-bottom section-gap">
        <p className="container-page mx-auto max-w-3xl text-center font-display text-sm italic text-ink/75 sm:text-base">
          {t('discover.caption')}
        </p>
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </section>
  )
}
