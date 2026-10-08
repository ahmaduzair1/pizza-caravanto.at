import { images } from '../config/images'

export interface HeroSlideData {
  id: string
  image: string
  accent: string
  titleKey: string
  subtitleKey: string
  noteKey?: string
  /** Stronger grade / ken-burns / letterbox treatment */
  cinematic?: boolean
}

export const heroSlides: HeroSlideData[] = [
  {
    id: 'inside',
    image: images.hero.slide1,
    accent: '#A83A2A',
    titleKey: 'hero.slide1Title',
    subtitleKey: 'hero.slide1Subtitle',
  },
  {
    id: 'facade',
    image: images.hero.slide2,
    accent: '#B98B3E',
    titleKey: 'hero.slide2Title',
    subtitleKey: 'hero.slide2Subtitle',
    noteKey: 'hero.slide2Note',
  },
  {
    id: 'terrace',
    image: images.hero.slide3,
    accent: '#17301F',
    titleKey: 'hero.slide3Title',
    subtitleKey: 'hero.slide3Subtitle',
    noteKey: 'hero.slide3Note',
    cinematic: true,
  },
]
