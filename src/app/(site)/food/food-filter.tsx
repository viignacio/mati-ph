'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { urlFor } from '@/sanity/lib/image'

const PRICE_LEVELS = ['₱', '₱₱', '₱₱₱']

interface FoodSpot {
  _id: string
  name: string
  slug: string
  cuisineType?: string | null
  priceRange?: { level?: string | null; description?: string | null } | null
  openingHours?: string | null
  mainImage?: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
  } | null
  location?: { address?: string | null } | null
}

interface FoodFilterProps {
  foodSpots: FoodSpot[]
}

function getPriceLabel(level?: string | null): string {
  if (!level) return ''
  const n = parseInt(level)
  if (n === 1) return '₱'
  if (n === 2) return '₱₱'
  if (n === 3) return '₱₱₱'
  return level
}

export function FoodFilter({ foodSpots }: FoodFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCuisine = searchParams.get('cuisine') ?? 'All'

  const cuisines = ['All', ...Array.from(new Set(foodSpots.map((f) => f.cuisineType).filter(Boolean) as string[]))]

  const filtered = activeCuisine === 'All'
    ? foodSpots
    : foodSpots.filter((f) => f.cuisineType === activeCuisine)

  const setFilter = (val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (val === 'All') {
      params.delete('cuisine')
    } else {
      params.set('cuisine', val)
    }
    router.push(`/food?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mt-12">
      {/* Cuisine filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setFilter(cuisine)}
            className={cn(
              'font-sans text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 capitalize cursor-pointer',
              activeCuisine === cuisine
                ? 'bg-primary text-on-primary shadow-ambient-md'
                : 'bg-surface-highest text-on-surface-variant hover:bg-surface-dim'
            )}
          >
            {cuisine}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-on-surface-variant">No food spots found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((spot) => {
            const imgSrc = spot.mainImage
              ? urlFor(spot.mainImage).width(600).height(450).auto('format').url()
              : null
            const priceLabel = getPriceLabel(spot.priceRange?.level)

            return (
              <Card.Root key={spot._id} elevated>
                {imgSrc && (
                  <Card.Image aspectRatio="landscape">
                    <Image
                      src={imgSrc}
                      alt={spot.mainImage!.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={spot.mainImage!.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={spot.mainImage!.asset.metadata?.lqip}
                    />
                  </Card.Image>
                )}
                <Card.Body>
                  <div className="flex items-center gap-2 flex-wrap">
                    {spot.cuisineType && <Badge variant="secondary">{spot.cuisineType}</Badge>}
                    {priceLabel && (
                      <span className="font-sans text-xs font-semibold text-on-surface-variant">{priceLabel}</span>
                    )}
                  </div>
                  <Card.Title>{spot.name}</Card.Title>
                  {spot.location?.address && (
                    <Card.Description>{spot.location.address}</Card.Description>
                  )}
                  {spot.openingHours && (
                    <p className="font-sans text-xs text-on-surface-variant">{spot.openingHours}</p>
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
