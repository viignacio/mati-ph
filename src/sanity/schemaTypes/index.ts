import { type SchemaTypeDefinition } from 'sanity'

// Objects
import { seo } from './objects/seo'
import { locationPoint } from './objects/locationPoint'
import { priceRange } from './objects/priceRange'
import { richText } from './objects/richText'
import { navigationItem } from './objects/navigationItem'
import { iconPicker } from './objects/iconPicker'

// Blocks
import { blockDesign } from './objects/blocks/blockDesign'
import { heroBlock } from './objects/blocks/heroBlock'
import { textWithImageBlock } from './objects/blocks/textWithImageBlock'
import { carouselBlock } from './objects/blocks/carouselBlock'
import { gridBlock } from './objects/blocks/gridBlock'
import { callToActionBlock } from './objects/blocks/callToActionBlock'
import { featuresBlock } from './objects/blocks/featuresBlock'
import { testimonialsBlock } from './objects/blocks/testimonialsBlock'
import { logisticsBlock } from './objects/blocks/logisticsBlock'
import { highlightsBlock } from './objects/blocks/highlightsBlock'
import { pageBuilder } from './objects/pageBuilder'

// Documents
import { color } from './documents/color'
import { destination } from './documents/destination'
import { activity } from './documents/activity'
import { festival } from './documents/festival'
import { foodSpot } from './documents/foodSpot'
import { travelGuide } from './documents/travelGuide'
import { heroSlide } from './documents/heroSlide'
import { siteSettings } from './documents/siteSettings'
import { header } from './documents/header'
import { footer } from './documents/footer'
import { page } from './documents/page'
import { dictionaryEntry } from './documents/dictionaryEntry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects (shared)
    seo,
    locationPoint,
    priceRange,
    richText,
    navigationItem,
    
    // Objects (custom types)
    iconPicker,

    // Blocks
    blockDesign,
    heroBlock,
    textWithImageBlock,
    carouselBlock,
    gridBlock,
    callToActionBlock,
    featuresBlock,
    testimonialsBlock,
    logisticsBlock,
    highlightsBlock,
    pageBuilder,

    // Documents
    color,
    destination,
    activity,
    festival,
    foodSpot,
    travelGuide,
    heroSlide,
    siteSettings,
    header,
    footer,
    page,
    dictionaryEntry,
  ],
}
