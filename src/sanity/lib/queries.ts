import { defineQuery } from 'next-sanity'

// ─── Shared Fragments ─────────────────────────────────────────────────────────

const imageFields = /* groq */ `
  asset->{_id, url, metadata{lqip, dimensions}},
  alt,
  hotspot,
  crop
`

const seoFields = /* groq */ `
  seo{
    title,
    description,
    image{${imageFields}},
    noIndex
  }
`

const destinationCardFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  tagline,
  category,
  mainImage{${imageFields}}
`

const activityCardFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  difficulty,
  duration,
  priceRange{level, description},
  mainImage{${imageFields}},
  destination->{name, "slug": slug.current}
`

// ─── Home Page ────────────────────────────────────────────────────────────────

export const HOME_QUERY = defineQuery(/* groq */ `{
  "heroSlides": *[_type == "heroSlide"] | order(order asc) {
    _id,
    title,
    subtitle,
    ctaText,
    ctaLink,
    order,
    image{${imageFields}}
  },
  "featuredDestinations": *[_type == "destination"] | order(_createdAt desc) [0...6] {
    ${destinationCardFields}
  },
  "featuredActivities": *[_type == "activity"] | order(_createdAt desc) [0...8] {
    ${activityCardFields}
  },
  "upcomingFestivals": *[_type == "festival"] | order(month asc) [0...3] {
    _id,
    name,
    "slug": slug.current,
    month,
    mainImage{${imageFields}}
  }
}`)

// ─── Destinations ─────────────────────────────────────────────────────────────

export const DESTINATIONS_QUERY = defineQuery(/* groq */ `
  *[_type == "destination"] | order(_createdAt desc) {
    ${destinationCardFields},
    location{address}
  }
`)

export const DESTINATION_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    category,
    mainImage{${imageFields}},
    gallery[]{
      _key,
      ${imageFields},
      caption
    },
    description,
    location{address, lat, lng, googleMapsUrl},
    howToGetThere,
    bestTimeToVisit,
    relatedActivities[]->{
      ${activityCardFields}
    },
    ${seoFields}
  }
`)

// ─── Activities ───────────────────────────────────────────────────────────────

export const ACTIVITIES_QUERY = defineQuery(/* groq */ `
  *[_type == "activity"] | order(_createdAt desc) {
    ${activityCardFields},
    highlights
  }
`)

export const ACTIVITY_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "activity" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    mainImage{${imageFields}},
    description,
    destination->{name, "slug": slug.current},
    difficulty,
    duration,
    priceRange{level, description},
    highlights,
    ${seoFields}
  }
`)

// ─── Festivals ────────────────────────────────────────────────────────────────

export const FESTIVALS_QUERY = defineQuery(/* groq */ `
  *[_type == "festival"] | order(month asc) {
    _id,
    name,
    "slug": slug.current,
    month,
    mainImage{${imageFields}},
    highlights
  }
`)

export const FESTIVAL_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "festival" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    month,
    mainImage{${imageFields}},
    gallery[]{
      _key,
      ${imageFields},
      caption
    },
    description,
    highlights,
    ${seoFields}
  }
`)

// ─── Food Spots ───────────────────────────────────────────────────────────────

export const FOOD_SPOTS_QUERY = defineQuery(/* groq */ `
  *[_type == "foodSpot"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    cuisineType,
    priceRange{level, description},
    openingHours,
    mainImage{${imageFields}},
    location{address}
  }
`)

// ─── Travel Guides ────────────────────────────────────────────────────────────

export const TRAVEL_GUIDES_QUERY = defineQuery(/* groq */ `
  *[_type == "travelGuide"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    mainImage{${imageFields}}
  }
`)

export const TRAVEL_GUIDE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "travelGuide" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    mainImage{${imageFields}},
    content,
    ${seoFields}
  }
`)

// ─── Site Settings (singleton) ────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    logo{${imageFields}},
    contactEmail,
    contactPhone,
    socialLinks[]{
      _key,
      platform,
      url
    }
  }
`)

// ─── Static Params ────────────────────────────────────────────────────────────

export const DESTINATION_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "destination" && defined(slug.current)]{ "slug": slug.current }
`)

export const ACTIVITY_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "activity" && defined(slug.current)]{ "slug": slug.current }
`)

export const TRAVEL_GUIDE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "travelGuide" && defined(slug.current)]{ "slug": slug.current }
`)
