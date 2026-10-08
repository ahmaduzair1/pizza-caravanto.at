import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { GalleryImage } from '../../types'
import { localize } from '../../utils/localize'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalGalleryProps {
  images: GalleryImage[]
  onOpen: (index: number) => void
}

export function HorizontalGallery({ images, onOpen }: HorizontalGalleryProps) {
  const { t, i18n } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !trackRef.current || images.length === 0) {
      return
    }

    const section = sectionRef.current
    const track = trackRef.current

    const getScrollLength = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + 64)

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollLength(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollLength()}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('resize', refresh)
    const imgs = track.querySelectorAll('img')
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true })
    })
    refresh()

    return () => {
      window.removeEventListener('resize', refresh)
      ctx.revert()
    }
  }, [images.length, reducedMotion])

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-ivory/70 p-8 text-center text-sm text-ink/70">
        {t('common.loading')}
      </div>
    )
  }

  if (reducedMotion) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onOpen(index)}
            className="relative w-[78vw] max-w-md shrink-0 snap-center overflow-hidden rounded-2xl shadow-card sm:w-[420px]"
          >
            <img
              src={image.src}
              alt={localize(image.alt, i18n.language)}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-5 px-4 sm:gap-6 sm:px-8 will-change-transform"
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onOpen(index)}
            className="group relative h-[58vh] w-[78vw] max-w-[520px] shrink-0 overflow-hidden rounded-2xl shadow-soft sm:w-[42vw]"
            aria-label={`${t('gallery.open')} ${index + 1}`}
          >
            <img
              src={image.src}
              alt={localize(image.alt, i18n.language)}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
          </button>
        ))}
      </div>
    </div>
  )
}
