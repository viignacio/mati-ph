'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { urlFor } from '@/sanity/lib/image'

const CATEGORIES = ['All', 'getting-there', 'getting-around', 'itineraries', 'budget-tips']

const CATEGORY_LABELS: Record<string, string> = {
  'All': 'All',
  'getting-there': 'Getting There',
  'getting-around': 'Getting Around',
  'itineraries': 'Itineraries',
  'budget-tips': 'Budget Tips',
}

interface Guide {
  _id: string
  title: string
  slug: string
  category?: string | null
  excerpt?: string | null
  mainImage?: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
  } | null
}

interface TravelGuideFilterProps {
  guides: Guide[]
}

export function TravelGuideFilter({ guides }: TravelGuideFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'All'

  const filtered = activeCategory === 'All'
    ? guides
    : guides.filter((g) => g.category === activeCategory)

  const setCategory = (val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (val === 'All') {
      params.delete('category')
    } else {
      params.set('category', val)
    }
    router.push(`/travel-guide?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mt-12">
      {/* Tab pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'font-sans text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 cursor-pointer',
              activeCategory === cat
                ? 'bg-primary text-on-primary shadow-ambient-md'
                : 'bg-surface-highest text-on-surface-variant hover:bg-surface-dim'
            )}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-sans text-on-surface-variant">No guides found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guide) => {
            const imgSrc = guide.mainImage
              ? urlFor(guide.mainImage).width(600).height(450).auto('format').url()
              : null

            return (
              <Card.Root key={guide._id} href={`/travel-guide/${guide.slug}`} elevated>
                {imgSrc && (
                  <Card.Image aspectRatio="landscape">
                    <Image
                      src={imgSrc}
                      alt={guide.mainImage!.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={guide.mainImage!.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={guide.mainImage!.asset.metadata?.lqip}
                    />
                  </Card.Image>
                )}
                <Card.Body>
                  {guide.category && (
                    <Badge variant="surface">{CATEGORY_LABELS[guide.category] ?? guide.category}</Badge>
                  )}
                  <Card.Title>{guide.title}</Card.Title>
                  {guide.excerpt && (
                    <Card.Description>{guide.excerpt}</Card.Description>
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
