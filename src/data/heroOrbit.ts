import { images } from '../config/images'

export interface OrbitFoodItem {
  id: string
  src: string
  labelKey: string
}

/** Dishes shown on the orbit stage — swap for real Caravento product shots anytime. */
export const orbitFoods: OrbitFoodItem[] = [
  { id: 'pizza', src: images.hero.orbit.pizza, labelKey: 'hero.orbit.pizza' },
  { id: 'pasta', src: images.hero.orbit.pasta, labelKey: 'hero.orbit.pasta' },
  { id: 'ribs', src: images.hero.orbit.ribs, labelKey: 'hero.orbit.ribs' },
  { id: 'salad', src: images.hero.orbit.salad, labelKey: 'hero.orbit.salad' },
  { id: 'shrimp', src: images.hero.orbit.shrimp, labelKey: 'hero.orbit.shrimp' },
  {
    id: 'moments',
    src: images.hero.orbit.moments,
    labelKey: 'hero.orbit.moments',
  },
]
