'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { urlFor } from '@/sanity/lib/image'

interface Activity {
  _id: string
  name: string
  slug: string
  difficulty?: string | null
  duration?: string | null
  priceRange?: { level?: string | null; description?: string | null } | null
  mainImage: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
    hotspot?: unknown
    crop?: unknown
  }
  destination?: { name: string; slug: string } | null
}

interface FeaturedActivitiesProps {
  activities: Activity[]
}

function getDifficultyVariant(difficulty?: string | null): BadgeVariant {
  if (difficulty === 'easy') return 'surface'
  if (difficulty === 'moderate') return 'secondary'
  if (difficulty === 'challenging') return 'tertiary'
  return 'surface'
}

export function FeaturedActivities({ activities }: FeaturedActivitiesProps) {
  const items = activities ?? []

  return (
    <section className="section-gap bg-surface overflow-hidden">
      <Container size="xl">
        <SectionHeading
          label="Things to Do"
          title="Unforgettable Activities"
          description="Whether you seek adrenaline or tranquility, Mati has adventures for every soul."
        />
      </Container>

      {items.length === 0 ? (
        <Container size="xl">
          <div className="mt-16 text-center">
            <p className="font-sans text-on-surface-variant">Activities coming soon.</p>
          </div>
        </Container>
      ) : (
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 px-5 sm:px-8 lg:px-12 snap-x snap-mandatory scrollbar-none">
          {items.map((activity) => {
            const imgSrc = urlFor(activity.mainImage).width(480).height(360).auto('format').url()

            return (
              <div key={activity._id} className="min-w-72 sm:min-w-80 snap-start flex-shrink-0">
                <Card.Root href={`/activities/${activity.slug}`} elevated className="h-full">
                  <Card.Image aspectRatio="landscape">
                    <Image
                      src={imgSrc}
                      alt={activity.mainImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="320px"
                      placeholder={activity.mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={activity.mainImage.asset.metadata?.lqip}
                    />
                  </Card.Image>
                  <Card.Body>
                    <div className="flex items-center gap-2 flex-wrap">
                      {activity.difficulty && (
                        <Badge variant={getDifficultyVariant(activity.difficulty)}>
                          {activity.difficulty}
                        </Badge>
                      )}
                      {activity.duration && (
                        <span className="font-sans text-xs text-on-surface-variant">{activity.duration}</span>
                      )}
                    </div>
                    <Card.Title>{activity.name}</Card.Title>
                    {activity.destination && (
                      <Card.Description>{activity.destination.name}</Card.Description>
                    )}
                  </Card.Body>
                </Card.Root>
              </div>
            )
          })}
        </div>
      )}

      <Container size="xl">
        <div className="mt-8 flex justify-center">
          <Link
            href="/activities"
            className="font-sans text-sm font-medium text-tertiary underline underline-offset-4 decoration-2 decoration-tertiary hover:text-tertiary/80 transition-colors"
          >
            View All Activities
          </Link>
        </div>
      </Container>
    </section>
  )
}
