import { type SchemaTypeDefinition } from 'sanity'

// Objects
import { seo } from './objects/seo'
import { locationPoint } from './objects/locationPoint'
import { priceRange } from './objects/priceRange'
import { richText } from './objects/richText'

// Documents
import { destination } from './documents/destination'
import { activity } from './documents/activity'
import { festival } from './documents/festival'
import { foodSpot } from './documents/foodSpot'
import { travelGuide } from './documents/travelGuide'
import { heroSlide } from './documents/heroSlide'
import { siteSettings } from './documents/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects (shared)
    seo,
    locationPoint,
    priceRange,
    richText,
    // Documents
    destination,
    activity,
    festival,
    foodSpot,
    travelGuide,
    heroSlide,
    siteSettings,
  ],
}
