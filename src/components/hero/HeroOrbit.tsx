import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { orbitFoods } from '../../data/heroOrbit'
import { siteConfig } from '../../data/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { startLenis, stopLenis } from '../../lib/lenisController'
import { OpenClosedBadge } from '../hours/OpenClosedBadge'

const ITEM_COUNT = orbitFoods.length
const THETA = 360 / ITEM_COUNT

export function HeroOrbit() {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()
  const stageRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const angleRef = useRef(0)
  const velocityRef = useRef(0)
  const draggingRef = useRef(false)
  const dragDistanceRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTRef = useRef(0)
  const rafRef = useRef(0)
  const wheelTimerRef = useRef(0)
  const radiusRef = useRef(480)
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)

  const activeFood = orbitFoods[active]

  const applyTransforms = (angle: number) => {
    const ring = ringRef.current
    if (!ring) return
    const radius = radiusRef.current
    const items = ring.querySelectorAll<HTMLElement>('[data-orbit-item]')

    items.forEach((item, i) => {
      const itemAngle = i * THETA + angle
      item.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px) rotateY(${-itemAngle}deg)`

      const normalized = ((itemAngle % 360) + 360) % 360
      const centered = normalized > 180 ? normalized - 360 : normalized
      const abs = Math.abs(centered)
      const depth = Math.max(0, 1 - abs / 120)
      const isFront = abs < THETA / 2

      item.style.opacity = String(0.22 + depth * 0.78)
      item.style.filter = isFront
        ? 'blur(0px) saturate(1.05)'
        : `blur(${(1 - depth) * 3.5}px) saturate(${0.7 + depth * 0.3})`
      item.style.zIndex = String(Math.round(depth * 100))
      item.style.setProperty('--lift', isFront ? '1.08' : String(0.78 + depth * 0.18))
      item.dataset.active = isFront ? 'true' : 'false'
    })
  }

  const setAngle = (next: number, syncActive = true) => {
    angleRef.current = next
    applyTransforms(next)
    if (!syncActive) return
    const index =
      ((Math.round(-next / THETA) % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT
    setActive(index)
  }

  const snapToNearest = () => {
    const target = Math.round(angleRef.current / THETA) * THETA
    gsap.to(angleRef, {
      current: target,
      duration: reducedMotion ? 0.2 : 0.7,
      ease: 'power3.out',
      onUpdate: () => setAngle(angleRef.current),
      onComplete: () => setAngle(target),
    })
  }

  const goToIndex = (index: number) => {
    if (dragDistanceRef.current > 8) return
    const currentIndex =
      ((Math.round(-angleRef.current / THETA) % ITEM_COUNT) + ITEM_COUNT) %
      ITEM_COUNT
    let delta = index - currentIndex
    if (delta > ITEM_COUNT / 2) delta -= ITEM_COUNT
    if (delta < -ITEM_COUNT / 2) delta += ITEM_COUNT
    const target = angleRef.current - delta * THETA
    gsap.to(angleRef, {
      current: target,
      duration: reducedMotion ? 0.2 : 0.8,
      ease: 'power3.out',
      onUpdate: () => setAngle(angleRef.current),
      onComplete: () => setAngle(target),
    })
  }

  useEffect(() => {
    const measure = () => {
      const width = stageRef.current?.clientWidth ?? window.innerWidth
      radiusRef.current = Math.max(280, Math.min(560, width * 0.38))
      applyTransforms(angleRef.current)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setAngle(0)
      setReady(true)
      return
    }

    angleRef.current = -280
    applyTransforms(-280)
    const tween = gsap.to(angleRef, {
      current: 0,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => setAngle(angleRef.current, false),
      onComplete: () => {
        setAngle(0)
        setReady(true)
      },
    })

    return () => {
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || reducedMotion) return

    const onPointerDown = (event: PointerEvent) => {
      draggingRef.current = true
      dragDistanceRef.current = 0
      velocityRef.current = 0
      lastXRef.current = event.clientX
      lastTRef.current = performance.now()
      stage.setPointerCapture(event.pointerId)
      stopLenis()
      gsap.killTweensOf(angleRef)
      cancelAnimationFrame(rafRef.current)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return
      const now = performance.now()
      const dx = event.clientX - lastXRef.current
      const dt = Math.max(8, now - lastTRef.current)
      dragDistanceRef.current += Math.abs(dx)
      const deltaAngle = dx * 0.16
      velocityRef.current = (deltaAngle / dt) * 16
      setAngle(angleRef.current + deltaAngle)
      lastXRef.current = event.clientX
      lastTRef.current = now
    }

    const coast = () => {
      velocityRef.current *= 0.93
      if (Math.abs(velocityRef.current) < 0.07) {
        snapToNearest()
        startLenis()
        return
      }
      setAngle(angleRef.current + velocityRef.current)
      rafRef.current = requestAnimationFrame(coast)
    }

    const onPointerUp = () => {
      if (!draggingRef.current) return
      draggingRef.current = false
      rafRef.current = requestAnimationFrame(coast)
    }

    const onWheel = (event: WheelEvent) => {
      if (!ready) return
      event.preventDefault()
      gsap.killTweensOf(angleRef)
      const delta =
        (Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY) * 0.07
      setAngle(angleRef.current - delta)
      window.clearTimeout(wheelTimerRef.current)
      wheelTimerRef.current = window.setTimeout(() => snapToNearest(), 140)
    }

    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerup', onPointerUp)
    stage.addEventListener('pointercancel', onPointerUp)
    stage.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerup', onPointerUp)
      stage.removeEventListener('pointercancel', onPointerUp)
      stage.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafRef.current)
      window.clearTimeout(wheelTimerRef.current)
      startLenis()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reducedMotion])

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-ivory text-ink"
      aria-label={t('sections.hero')}
    >
      {/* Soft backdrop — one shape only, low contrast */}
      <div
        className="pointer-events-none absolute left-1/2 top-[28%] h-[42%] w-[70%] max-w-3xl -translate-x-1/2 -rotate-12 bg-[#2B1D14]/[0.88]"
        aria-hidden
        style={{ borderRadius: '999px' }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col px-4 pb-8 pt-28 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between gap-3">
          <OpenClosedBadge />
          <p className="hidden text-xs font-medium uppercase tracking-[0.22em] text-ink/40 sm:block">
            {t('hero.orbit.hintShort')}
          </p>
        </div>

        {/* Brand — behind stage, restrained so dishes lead */}
        <p
          className="pointer-events-none absolute left-1/2 top-[26%] z-0 w-full -translate-x-1/2 text-center font-display text-[12vw] font-medium leading-none tracking-tight text-terracotta/40 sm:top-[22%] sm:text-[7.5rem] lg:text-[8.5rem]"
          aria-hidden
        >
          Caravento
        </p>

        <h1 className="sr-only">{t('meta.homeTitle')}</h1>

        {/* Primary interactive stage */}
        <div
          ref={stageRef}
          className="relative z-10 mx-auto mt-4 flex h-[min(58vh,560px)] w-full max-w-5xl flex-1 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
          style={{ perspective: '1400px', perspectiveOrigin: '50% 48%' }}
          role="region"
          aria-roledescription="carousel"
          aria-label={t('hero.orbit.tagline')}
        >
          <div
            ref={ringRef}
            className="relative h-full w-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {orbitFoods.map((food, i) => (
              <button
                key={food.id}
                type="button"
                data-orbit-item
                className="absolute left-1/2 top-1/2 w-[48vw] max-w-[260px] -translate-x-1/2 -translate-y-1/2 sm:w-[20vw] sm:max-w-[280px]"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => {
                  if (!ready) return
                  goToIndex(i)
                }}
                aria-label={t(food.labelKey)}
                aria-current={active === i ? 'true' : undefined}
              >
                <span
                  className="block overflow-hidden rounded-[1.75rem] bg-ivory shadow-[0_28px_80px_rgba(30,21,16,0.28)] ring-1 ring-forest/10 transition-transform duration-300 will-change-transform"
                  style={{ transform: 'scale(var(--lift, 1))' }}
                >
                  <img
                    src={food.src}
                    alt={t(food.labelKey)}
                    width={560}
                    height={700}
                    className="aspect-[4/5] h-full w-full object-cover"
                    draggable={false}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Clean footer chrome — no overlap with dishes */}
        <div className="relative z-20 mx-auto mt-2 flex w-full max-w-xl flex-col items-center gap-5 text-center">
          <div className="space-y-1">
            <p className="font-display text-3xl text-ink sm:text-4xl">
              {t(activeFood.labelKey)}
            </p>
            <p className="text-sm text-ink/55 sm:hidden">
              {t('hero.orbit.hintShort')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-w-[9.5rem]"
            >
              {t('hero.ctaOrder')}
            </a>
            <Link to="/#kontakt" className="btn-secondary min-w-[9.5rem]">
              {t('hero.ctaReserve')}
            </Link>
          </div>

          <div className="flex gap-2" aria-hidden>
            {orbitFoods.map((food, i) => (
              <button
                key={food.id}
                type="button"
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-6 bg-terracotta' : 'w-1.5 bg-ink/20'
                }`}
                onClick={() => goToIndex(i)}
                aria-label={t(food.labelKey)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
