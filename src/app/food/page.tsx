import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { FOOD_SPOTS_QUERY } from '@/sanity/lib/queries'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { FoodFilter } from './food-filter'

export const metadata: Metadata = {
  title: 'Food & Dining',
  description: 'Taste Mati City\'s culinary scene — fresh seafood, local delicacies, street food, and more in Davao Oriental.',
}

export default async function FoodPage() {
  const { data } = await sanityFetch({ query: FOOD_SPOTS_QUERY })

  return (
    <div className="pt-32 section-gap bg-surface min-h-dvh">
      <Container size="xl">
        <SectionHeading
          label="Food & Dining"
          title="Taste the Wild East"
          description="From dockside kinilaw to mountain-grown coffee — Mati's food scene is as diverse as its landscape."
        />
        <Suspense fallback={<div className="mt-16 text-center font-sans text-on-surface-variant">Loading food spots…</div>}>
          <FoodFilter foodSpots={data ?? []} />
        </Suspense>
      </Container>
    </div>
  )
}
