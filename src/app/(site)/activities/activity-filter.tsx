'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { urlFor } from '@/sanity/lib/image'

const DIFFICULTIES = ['All', 'easy', 'moderate', 'challenging']

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
  }
  destination?: { name: string; slug: string } | null
  highlights?: string[] | null
}

interface ActivityFilterProps {
  activities: Activity[]
}

function getDifficultyVariant(difficulty?: string | null): BadgeVariant {
  if (difficulty === 'easy') return 'surface'
  if (difficulty === 'moderate') return 'secondary'
  if (difficulty === 'challenging') return 'tertiary'
  return 'surface'
}

export function ActivityFilter({ activities }: ActivityFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('difficulty') ?? 'All'

  const filtered = active === 'All'
    ? activities
    : activities.filter((a) => a.difficulty === active)

  const setFilter = (val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (val === 'All') {
      params.delete('difficulty')
    } else {
      params.set('difficulty', val)
    }
    router.push(`/activities?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mt-12">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {DIFFICULTIES.map((diff) => (
          <button
            key={diff}
            onClick={() => setFilter(diff)}
            className={cn(
              'font-sans text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 capitalize cursor-pointer',
              active === diff
                ? 'bg-primary text-on-primary shadow-ambient-md'
                : 'bg-surface-highest text-on-surface-variant hover:bg-surface-dim'
            )}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-on-surface-variant">No activities found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => {
            const imgSrc = urlFor(activity.mainImage).width(600).height(450).auto('format').url()
            return (
              <Card.Root key={activity._id} href={`/activities/${activity.slug}`} elevated>
                <Card.Image aspectRatio="landscape">
                  <Image
                    src={imgSrc}
                    alt={activity.mainImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                  {activity.priceRange?.description && (
                    <p className="font-sans text-xs text-on-surface-variant">{activity.priceRange.description}</p>
                  )}
                </Card.Body>
              </Card.Root>
            )
          })}
        </div>
      )}
    </div>
  )
}
