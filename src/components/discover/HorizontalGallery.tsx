import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useIsMobile } from '../../hooks/useIsMobile'
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
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  /** Phones: swipe carousel. Desktop: vertical-scroll scrub. */
  const useSwipeGallery = isMobile || reducedMotion

  useEffect(() => {
    if (useSwipeGallery || !sectionRef.current || !trackRef.current || images.length === 0) {
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
          onUpdate: (self) => {
            const next = Math.min(
              images.length - 1,
              Math.round(self.progress * (images.length - 1)),
            )
            setActiveIndex(next)
          },
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
  }, [images.length, useSwipeGallery])

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

  if (useSwipeGallery) {
    return (
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={onScrollTrack}
          className="flex touch-pan-x gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 pt-1 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:px-6"
          style={{ WebkitOverflowScrolling: 'touch' }}
          aria-label={t('sections.discover')}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => onOpen(index)}
              className="group relative w-[82vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-2xl shadow-card"
              aria-label={`${t('gallery.open')} ${index + 1}`}
            >
              <img
                src={image.src}
                alt={localize(image.alt, i18n.language)}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="pointer-events-none aspect-[4/3] w-full select-none object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left text-xs font-medium text-ivory">
                {localize(image.alt, i18n.language)}
              </span>
            </button>
          ))}
        </div>

        <GalleryControls
          activeIndex={activeIndex}
          count={images.length}
          onPrev={() => scrollToIndex(activeIndex - 1)}
          onNext={() => scrollToIndex(activeIndex + 1)}
          prevLabel={t('gallery.prev')}
          nextLabel={t('gallery.next')}
        />
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
            className="group relative h-[52vh] w-[72vw] max-w-[480px] shrink-0 overflow-hidden rounded-2xl shadow-soft sm:w-[40vw]"
            aria-label={`${t('gallery.open')} ${index + 1}`}
          >
            <img
              src={image.src}
              alt={localize(image.alt, i18n.language)}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/35" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-sm font-medium text-ivory opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {localize(image.alt, i18n.language)}
            </span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <div className="pointer-events-auto">
          <GalleryControls
            activeIndex={activeIndex}
            count={images.length}
            onPrev={() => {
              const next = Math.max(0, activeIndex - 1)
              const progress = images.length > 1 ? next / (images.length - 1) : 0
              const st = ScrollTrigger.getAll().find(
                (trigger) => trigger.trigger === sectionRef.current,
              )
              if (st) {
                window.scrollTo({
                  top: st.start + (st.end - st.start) * progress,
                  behavior: reducedMotion ? 'auto' : 'smooth',
                })
              }
              setActiveIndex(next)
            }}
            onNext={() => {
              const next = Math.min(images.length - 1, activeIndex + 1)
              const progress = images.length > 1 ? next / (images.length - 1) : 0
              const st = ScrollTrigger.getAll().find(
                (trigger) => trigger.trigger === sectionRef.current,
              )
              if (st) {
                window.scrollTo({
                  top: st.start + (st.end - st.start) * progress,
                  behavior: reducedMotion ? 'auto' : 'smooth',
                })
              }
              setActiveIndex(next)
            }}
            prevLabel={t('gallery.prev')}
            nextLabel={t('gallery.next')}
          />
        </div>
      </div>
    </div>
  )
}

function GalleryControls({
  activeIndex,
  count,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: {
  activeIndex: number
  count: number
  onPrev: () => void
  onNext: () => void
  prevLabel: string
  nextLabel: string
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-3 px-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={activeIndex <= 0}
        aria-label={prevLabel}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink shadow-card transition hover:border-forest/40 hover:bg-linen disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={20} aria-hidden />
      </button>
      <span className="min-w-[3.5rem] text-center text-xs font-medium text-ink/65">
        {activeIndex + 1} / {count}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={activeIndex >= count - 1}
        aria-label={nextLabel}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink shadow-card transition hover:border-forest/40 hover:bg-linen disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={20} aria-hidden />
      </button>
    </div>
  )
}
