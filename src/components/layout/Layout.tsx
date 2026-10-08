import { useCallback, useState } from 'react'

import { AnnouncementPopup } from '../announcements/AnnouncementPopup'
import { CookieBanner } from '../cookies/CookieBanner'
import { BackToTop } from '../effects/BackToTop'
import { PageIntro } from '../effects/PageIntro'
import { RouteTransition } from '../effects/RouteTransition'
import { ScrollProgress } from '../effects/ScrollProgress'
import { SmoothScroll } from '../effects/SmoothScroll'
import { SkipLink } from '../ui/SkipLink'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { Navbar } from './Navbar'

export function Layout() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <SmoothScroll />
      <ScrollProgress />
      <PageIntro onComplete={handleIntroComplete} />
      <AnnouncementPopup ready={introDone} />
      <CookieBanner ready={introDone} />
      <Navbar />
      <main id="main-content" className="flex-1 pb-20 md:pb-0" tabIndex={-1}>
        <RouteTransition />
      </main>
      <Footer />
      <MobileActionBar />
      <BackToTop />
    </div>
  )
}
