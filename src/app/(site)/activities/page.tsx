import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { ACTIVITIES_QUERY } from '@/sanity/lib/queries'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { ActivityFilter } from './activity-filter'

export const metadata: Metadata = {
  title: 'Activities',
  description: 'Discover surfing, island hopping, trekking, diving, and more unforgettable activities in Mati City.',
}

export default async function ActivitiesPage() {
  const { data } = await sanityFetch({ query: ACTIVITIES_QUERY })

  return (
    <div className="pt-32 section-gap bg-surface min-h-dvh">
      <Container size="xl">
        <SectionHeading
          label="Things to Do"
          title="Activities"
          description="From heart-pounding surf breaks to tranquil island paddles — every adventure in Mati is unforgettable."
        />
        <Suspense fallback={<div className="mt-16 text-center font-sans text-on-surface-variant">Loading activities…</div>}>
          <ActivityFilter activities={data ?? []} />
        </Suspense>
      </Container>
    </div>
  )
}
