import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { ACTIVITY_BY_SLUG_QUERY, ACTIVITY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Container } from '@/components/ui/container'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { PortableText } from '@/components/portable-text'
import { JsonLd } from '@/components/json-ld'
import { siteUrl } from '@/lib/utils'

export async function generateStaticParams() {
  const data = await client.fetch(ACTIVITY_SLUGS_QUERY)
  return (data ?? []).map((item: { slug: string }) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: ACTIVITY_BY_SLUG_QUERY, params: { slug } })
  if (!data) return {}

  const title = data.seo?.title ?? data.name
  const description = data.seo?.description ?? undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.mainImage
        ? [urlFor(data.mainImage).width(1200).height(630).url()]
        : [],
    },
  }
}

function getDifficultyVariant(difficulty?: string | null): BadgeVariant {
  if (difficulty === 'easy') return 'surface'
  if (difficulty === 'moderate') return 'secondary'
  if (difficulty === 'challenging') return 'tertiary'
  return 'surface'
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: ACTIVITY_BY_SLUG_QUERY, params: { slug } })

  if (!data) notFound()

  const heroSrc = urlFor(data.mainImage).width(1600).height(900).auto('format').url()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristAttraction',
        name: data.name,
        url: `${siteUrl}/activities/${data.slug}`,
        image: urlFor(data.mainImage).width(1200).height(630).url(),
        ...(data.destination
          ? {
              containedInPlace: {
                '@type': 'TouristAttraction',
                name: data.destination.name,
                url: `${siteUrl}/destinations/${data.destination.slug}`,
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Activities', item: `${siteUrl}/activities` },
          { '@type': 'ListItem', position: 3, name: data.name, item: `${siteUrl}/activities/${data.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image
          src={heroSrc}
          alt={data.mainImage.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          placeholder={data.mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={data.mainImage.asset.metadata?.lqip}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {data.difficulty && (
              <Badge variant={getDifficultyVariant(data.difficulty)}>{data.difficulty}</Badge>
            )}
            {data.duration && (
              <span className="font-sans text-sm text-white/80">{data.duration}</span>
            )}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            {data.name}
          </h1>
          {data.destination && (
            <Link
              href={`/destinations/${data.destination.slug}`}
              className="mt-2 inline-block font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              at {data.destination.name} →
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="section-gap bg-surface">
        <Container size="md">
          {/* Meta info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {data.difficulty && (
              <div className="bg-surface-low rounded-3xl p-6 shadow-ambient text-center">
                <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mb-2">Difficulty</p>
                <p className="font-serif text-2xl font-semibold text-on-surface capitalize">{data.difficulty}</p>
              </div>
            )}
            {data.duration && (
              <div className="bg-surface-low rounded-3xl p-6 shadow-ambient text-center">
                <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mb-2">Duration</p>
                <p className="font-serif text-2xl font-semibold text-on-surface">{data.duration}</p>
              </div>
            )}
            {data.priceRange?.level && (
              <div className="bg-surface-low rounded-3xl p-6 shadow-ambient text-center">
                <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mb-2">Price Range</p>
                <p className="font-serif text-2xl font-semibold text-on-surface">{data.priceRange.level}</p>
                {data.priceRange.description && (
                  <p className="font-sans text-xs text-on-surface-variant mt-1">{data.priceRange.description}</p>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          {data.description && (
            <div className="mb-12">
              <PortableText value={data.description} />
            </div>
          )}

          {/* Highlights */}
          {data.highlights && data.highlights.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-3xl font-semibold text-on-surface mb-6">Highlights</h2>
              <ul className="space-y-3">
                {data.highlights.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="font-sans text-base text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.destination && (
            <div className="mt-8">
              <Link
                href={`/destinations/${data.destination.slug}`}
                className="font-sans text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                ← Back to {data.destination.name}
              </Link>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}
