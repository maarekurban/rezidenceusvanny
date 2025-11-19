import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Generuje URL pro Sanity obrázek s možností specifikovat rozměry a kvalitu
 * 
 * @example
 * ```tsx
 * <img src={urlFor(apartment.floorPlan).width(800).url()} />
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Generuje optimalizovanou URL pro hero obrázky
 */
export function getHeroImageUrl(source: SanityImageSource) {
  return builder
    .image(source)
    .width(1920)
    .height(800)
    .quality(90)
    .format('webp')
    .url()
}

/**
 * Generuje optimalizovanou URL pro náhledy
 */
export function getThumbnailUrl(source: SanityImageSource, width = 400) {
  return builder
    .image(source)
    .width(width)
    .quality(80)
    .format('webp')
    .url()
}

/**
 * Generuje URL pro půdorysy ve vysoké kvalitě
 */
export function getFloorPlanUrl(source: SanityImageSource) {
  return builder
    .image(source)
    .width(1200)
    .quality(95)
    .url()
}

