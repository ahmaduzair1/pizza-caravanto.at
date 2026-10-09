import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { GalleryImage } from '../../types'
import { localize } from '../../utils/localize'

interface HorizontalGalleryProps {
  images: GalleryImage[]
  onOpen: (index: number) => void
}

export function HorizontalGallery({ images, onOpen }: HorizontalGalleryProps) {
  const { t, i18n } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el) return
      const clamped = Math.max(0, Math.min(images.length - 1, index))
      const child = el.children[clamped] as HTMLElement | undefined
      if (child) {
        child.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      }
      setActiveIndex(clamped)
    },
    [images.length, reducedMotion],
  )

  const onScrollTrack = () => {
    const el = scrollRef.current
    if (!el || el.children.length === 0) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(el.children).forEach((child, i) => {
      const node = child as HTMLElement
      const mid = node.offsetLeft + node.offsetWidth / 2
      const dist = Math.abs(mid - center)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setActiveIndex(best)
  }

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-ivory/70 p-8 text-center text-sm text-ink/70">
        {t('common.loading')}
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={onScrollTrack}
        className="flex touch-pan-x gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 pt-1 snap-x snap-mandatory sm:gap-5 sm:px-6 lg:gap-6 lg:px-8 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
        aria-label={t('sections.discover')}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onOpen(index)}
            className="group relative w-[82vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-2xl shadow-card sm:w-[420px] lg:w-[480px] lg:max-w-none"
            aria-label={`${t('gallery.open')} ${index + 1}`}
          >
            <img
              src={image.src}
              alt={localize(image.alt, i18n.language)}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="pointer-events-none aspect-[4/3] w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left text-xs font-medium text-ivory sm:p-4 sm:text-sm">
              {localize(image.alt, i18n.language)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 px-4">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex <= 0}
          aria-label={t('gallery.prev')}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink shadow-card transition hover:border-forest/40 hover:bg-linen disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={20} aria-hidden />
        </button>
        <span className="min-w-[3.5rem] text-center text-xs font-medium text-ink/65">
          {activeIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex >= images.length - 1}
          aria-label={t('gallery.next')}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink shadow-card transition hover:border-forest/40 hover:bg-linen disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>
    </div>
  )
}
