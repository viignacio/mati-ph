import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { TRAVEL_GUIDES_QUERY } from '@/sanity/lib/queries'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TravelGuideFilter } from './travel-guide-filter'

export const metadata: Metadata = {
  title: 'Travel Guide',
  description: 'Plan your perfect trip to Mati City with guides on getting there, getting around, itineraries, and budget tips.',
}

export default async function TravelGuidePage() {
  const { data } = await sanityFetch({ query: TRAVEL_GUIDES_QUERY })

  return (
    <div className="pt-32 section-gap bg-surface min-h-dvh">
      <Container size="xl">
        <SectionHeading
          label="Plan Your Trip"
          title="Travel Guide"
          description="Everything you need to know to experience Mati City like a local."
        />
        <Suspense fallback={<div className="mt-16 text-center font-sans text-on-surface-variant">Loading guides…</div>}>
          <TravelGuideFilter guides={data ?? []} />
        </Suspense>
      </Container>
    </div>
  )
}
