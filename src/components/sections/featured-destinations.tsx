import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollReveal } from './scroll-reveal'
import { urlFor } from '@/sanity/lib/image'

interface Destination {
  _id: string
  name: string
  slug: string
  tagline?: string | null
  category?: string | null
  mainImage: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
    hotspot?: unknown
    crop?: unknown
  }
}

interface FeaturedDestinationsProps {
  destinations: Destination[] | null
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const items = destinations ?? []

  return (
    <section className="section-gap bg-surface-dim">
      <Container size="xl">
        <ScrollReveal>
          <SectionHeading
            label="Explore"
            title="Top Destinations"
            description="From hidden coves to majestic surf breaks — discover Mati's most breathtaking places."
          />
        </ScrollReveal>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-sans text-on-surface-variant">Destinations coming soon.</p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((dest, i) => {
              const isFirst = i === 0
              const imgSrc = urlFor(dest.mainImage)
                .width(isFirst ? 1200 : 600)
                .height(isFirst ? 800 : 450)
                .auto('format')
                .url()

              return (
                <ScrollReveal
                  key={dest._id}
                  delay={i * 0.1}
                  className={isFirst ? 'md:col-span-2' : ''}
                >
                  <Card.Root href={`/destinations/${dest.slug}`} elevated className="h-full">
                    <Card.Image aspectRatio={isFirst ? 'landscape' : 'portrait'}>
                      <Image
                        src={imgSrc}
                        alt={dest.mainImage.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={isFirst ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                        placeholder={dest.mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                        blurDataURL={dest.mainImage.asset.metadata?.lqip}
                      />
                    </Card.Image>
                    <Card.Body>
                      {dest.category && (
                        <Badge variant="primary">{dest.category}</Badge>
                      )}
                      <Card.Title>{dest.name}</Card.Title>
                      {dest.tagline && (
                        <Card.Description>{dest.tagline}</Card.Description>
                      )}
                    </Card.Body>
                  </Card.Root>
                </ScrollReveal>
              )
            })}
          </div>
        )}

        <ScrollReveal delay={0.3} className="mt-12 flex justify-center">
          <Link href="/destinations">
            <Button variant="tertiary">View All Destinations</Button>
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  )
}
