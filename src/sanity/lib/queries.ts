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
  shortDescription,
  description,
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

// ─── Global Header ────────────────────────────────────────────────────────────

export const HEADER_QUERY = defineQuery(/* groq */ `
  *[_type == "header"] | order(_updatedAt desc)[0] {
    "logo": *[_type == "siteSettings"] | order(_updatedAt desc)[0].logo{${imageFields}},
    navigation[]{
      _key,
      text,
      url
    },
    searchEnabled,
    cta{
      text,
      url
    }
  }
`)

// ─── Global Footer ────────────────────────────────────────────────────────────

export const FOOTER_QUERY = defineQuery(/* groq */ `
  *[_type == "footer"] | order(_updatedAt desc)[0] {
    "logo": *[_type == "siteSettings"] | order(_updatedAt desc)[0].logo{${imageFields}},
    headline,
    subheading,
    socialLinks[]{
      _key,
      platform,
      url
    },
    explore{
      headline,
      links[]{
        _key,
        text,
        url
      }
    },
    connect{
      headline,
      phone,
      email,
      location
    },
    copyright{
      text,
      privacyPolicyUrl,
      termsOfUseUrl
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

// ─── Pages ────────────────────────────────────────────────────────────────────

export const PAGE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    seo{
      title,
      description,
      image{${imageFields}},
      noIndex
    },
    content[] {
      ...,
      // Dereference color refs for all blocks that use blockDesign
      defined(design) => {
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        }
      },
      _type == "heroBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        highlightColor->{ value, hex, title },
        backgroundImage{${imageFields}},
        backgroundVideo{ asset->{ url } },
        videoPoster{ asset->{ url, metadata{ lqip } } },
        cta {
          ...,
          buttonColor->{ value, hex, title }
        },
        secondaryCta {
          ...,
          buttonColor->{ value, hex, title }
        },
        heroType == "slides" => {
          "slides": *[_type == "heroSlide"] | order(order asc) {
            _id,
            title,
            subtitle,
            ctaText,
            ctaLink,
            order,
            image{${imageFields}}
          }
        }
      },
      _type == "carouselBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        cta {
          ...,
          buttonColor->{ value, hex, title }
        },
        items[]-> {
          _id,
          name,
          title,
          "slug": slug.current,
          tagline,
          category,
          month,
          mainImage{${imageFields}}
        }
      },
      _type == "gridBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        cta {
          ...,
          buttonColor->{ value, hex, title }
        },
        manualItems[]{
          ...,
          reference->{
            _id,
            _type,
            name,
            title,
            tagline,
            shortDescription,
            description,
            "slug": slug.current,
            mainImage{${imageFields}}
          }
        },
        imageGrid[]{
          ...,
          hoverColor->{ value, hex, title }
        }
      },
      _type == "highlightsBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        accentColor->{ value, hex, title },
        cta {
          ...,
          buttonColor->{ value, hex, title }
        },
        highlights[]{
          ...,
          iconColor->{ value, hex, title }
        }
      },
      _type == "logisticsBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        cta {
          ...,
          buttonColor->{ value, hex, title }
        },
        cards[]{
          ...,
          backgroundImage{${imageFields}}
        }
      },
      _type == "featuresBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        mainImage{${imageFields}},
        cta {
          ...,
          buttonColor->{ value, hex, title }
        }
      },
      _type == "textWithImageBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        cta {
          ...,
          buttonColor->{ value, hex, title }
        }
      },
      _type == "testimonialsBlock" => {
        ...,
        design {
          ...,
          backgroundColorRef->{ value, hex, title },
          accentColorRef->{ value, hex, title }
        },
        testimonials[] {
          ...,
          avatarColor->{ value, hex, title }
        },
        cta {
          ...,
          buttonColor->{ value, hex, title }
        }
      },
      _type == "callToActionBlock" => {
        ...,
        buttonColor->{ value, hex, title }
      }
    }
  }
`)

export const PAGE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && defined(slug.current)]{ "slug": slug.current }
`)

export const FESTIVAL_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "festival" && defined(slug.current)]{ "slug": slug.current }
`)

export const FOOD_SPOT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "foodSpot" && defined(slug.current)]{ "slug": slug.current }
`)

// ─── Dictionary ───────────────────────────────────────────────────────────────

export const DICTIONARY_QUERY = defineQuery(/* groq */ `
  *[_type == "dictionaryEntry"] {
    key,
    value
  }
`)
