import { sanityFetch } from '@/sanity/lib/live'
import { HOME_QUERY } from '@/sanity/lib/queries'
import { Hero } from '@/components/sections/hero'
import { IntroSection } from '@/components/sections/intro-section'
import { FeaturedDestinations } from '@/components/sections/featured-destinations'
import { FeaturedActivities } from '@/components/sections/featured-activities'
import { CultureSection } from '@/components/sections/culture-section'
import { FestivalsSection } from '@/components/sections/festivals-section'
import { FoodSection } from '@/components/sections/food-section'
import { CtaSection } from '@/components/sections/cta-section'
import { JsonLd } from '@/components/json-ld'

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOME_QUERY })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Mati City',
    description: 'Tourism capital of Davao Oriental, Philippines',
    url: 'https://mati.ph',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.9499,
      longitude: 126.2217,
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero slides={data?.heroSlides ?? []} />
      <IntroSection />
      <FeaturedDestinations destinations={data?.featuredDestinations ?? []} />
      <FeaturedActivities activities={data?.featuredActivities ?? []} />
      <CultureSection />
      <FestivalsSection festivals={data?.upcomingFestivals ?? []} />
      <FoodSection />
      <CtaSection />
    </>
  )
}
