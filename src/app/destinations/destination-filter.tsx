'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { urlFor } from '@/sanity/lib/image'

const CATEGORIES = [
  'All',
  'beach',
  'island',
  'mountain',
  'lake',
  'waterfall',
  'heritage',
  'viewpoint',
  'park',
]

interface Destination {
  _id: string
  name: string
  slug: string
  tagline?: string | null
  category?: string | null
  mainImage: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
  }
  location?: { address?: string | null } | null
}

interface DestinationFilterProps {
  destinations: Destination[]
}

export function DestinationFilter({ destinations }: DestinationFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'All'

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category === activeCategory)

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/destinations?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mt-12">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'font-sans text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 capitalize cursor-pointer',
              activeCategory === cat
                ? 'bg-primary text-on-primary shadow-ambient-md'
                : 'bg-surface-highest text-on-surface-variant hover:bg-surface-dim'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-on-surface-variant">No destinations found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => {
            const imgSrc = urlFor(dest.mainImage).width(600).height(450).auto('format').url()
            return (
              <Card.Root key={dest._id} href={`/destinations/${dest.slug}`} elevated>
                <Card.Image aspectRatio="landscape">
                  <Image
                    src={imgSrc}
                    alt={dest.mainImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder={dest.mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={dest.mainImage.asset.metadata?.lqip}
                  />
                </Card.Image>
                <Card.Body>
                  {dest.category && <Badge variant="primary">{dest.category}</Badge>}
                  <Card.Title>{dest.name}</Card.Title>
                  {dest.tagline && <Card.Description>{dest.tagline}</Card.Description>}
                  {dest.location?.address && (
                    <p className="font-sans text-xs text-on-surface-variant">{dest.location.address}</p>
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
