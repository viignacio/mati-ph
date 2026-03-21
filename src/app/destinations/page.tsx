import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { DESTINATIONS_QUERY } from '@/sanity/lib/queries'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { DestinationFilter } from './destination-filter'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore pristine beaches, hidden islands, waterfalls, and heritage sites in Mati City, Davao Oriental.',
}

export default async function DestinationsPage() {
  const { data } = await sanityFetch({ query: DESTINATIONS_QUERY })

  return (
    <div className="pt-32 section-gap bg-surface min-h-dvh">
      <Container size="xl">
        <SectionHeading
          label="Explore"
          title="Destinations"
          description="Mati's landscapes range from powder-white beaches to mist-capped mountains. Find your perfect escape."
        />
        <Suspense fallback={<div className="mt-16 text-center font-sans text-on-surface-variant">Loading destinations…</div>}>
          <DestinationFilter destinations={data ?? []} />
        </Suspense>
      </Container>
    </div>
  )
}
