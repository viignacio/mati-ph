import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { ScrollReveal } from './scroll-reveal'
import { urlFor } from '@/sanity/lib/image'

const MONTH_NAMES: Record<number, string> = {
  1: 'January', 2: 'February', 3: 'March', 4: 'April',
  5: 'May', 6: 'June', 7: 'July', 8: 'August',
  9: 'September', 10: 'October', 11: 'November', 12: 'December',
}

interface Festival {
  _id: string
  name: string
  slug: string
  month?: number | null
  mainImage?: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
    hotspot?: unknown
    crop?: unknown
  } | null
}

interface FestivalsSectionProps {
  festivals: Festival[]
}

export function FestivalsSection({ festivals }: FestivalsSectionProps) {
  const items = festivals ?? []

  return (
    <section className="section-gap bg-surface-container">
      <Container size="xl">
        <ScrollReveal>
          <SectionHeading
            label="Festivals"
            title="Celebrate with Mati"
            description="Immerse yourself in vibrant celebrations that honor the land, sea, and the Mandaya spirit."
          />
        </ScrollReveal>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-sans text-on-surface-variant">Festival schedule coming soon.</p>
          </div>
        ) : (
          <div className="mt-16 space-y-16">
            {items.map((festival, i) => {
              const isEven = i % 2 === 0
              const imgSrc = festival.mainImage
                ? urlFor(festival.mainImage).width(800).height(560).auto('format').url()
                : null
              const monthName = festival.month ? MONTH_NAMES[festival.month] : null

              return (
                <ScrollReveal key={festival._id} delay={i * 0.12}>
                  <div
                    className={`flex flex-col md:flex-row gap-10 md:gap-16 items-center ${
                      !isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image */}
                    {imgSrc && (
                      <div className="w-full md:w-1/2 flex-shrink-0">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-ambient">
                          <Image
                            src={imgSrc}
                            alt={festival.mainImage?.alt ?? festival.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            placeholder={festival.mainImage?.asset.metadata?.lqip ? 'blur' : 'empty'}
                            blurDataURL={festival.mainImage?.asset.metadata?.lqip}
                          />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-4">
                      {monthName && (
                        <span className="font-serif text-7xl font-semibold text-primary-container leading-none select-none">
                          {monthName.slice(0, 3).toUpperCase()}
                        </span>
                      )}
                      <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-on-surface leading-snug">
                        {festival.name}
                      </h3>
                      {monthName && (
                        <p className="font-sans text-sm text-on-surface-variant uppercase tracking-widest">
                          {monthName}
                        </p>
                      )}
                      <Link
                        href={`/festivals/${festival.slug}`}
                        className="mt-2 inline-flex font-sans text-sm font-medium text-tertiary underline underline-offset-4 decoration-2 decoration-tertiary hover:text-tertiary/80 transition-colors"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
