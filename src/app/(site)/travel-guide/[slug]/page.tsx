import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { TRAVEL_GUIDE_BY_SLUG_QUERY, TRAVEL_GUIDE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { PortableText } from '@/components/portable-text'

const CATEGORY_LABELS: Record<string, string> = {
  'getting-there': 'Getting There',
  'getting-around': 'Getting Around',
  'itineraries': 'Itineraries',
  'budget-tips': 'Budget Tips',
}

export async function generateStaticParams() {
  const data = await client.fetch(TRAVEL_GUIDE_SLUGS_QUERY)
  return (data ?? []).map((item: { slug: string }) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: TRAVEL_GUIDE_BY_SLUG_QUERY, params: { slug } })
  if (!data) return {}

  const title = data.seo?.title ?? data.title
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

export default async function TravelGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: TRAVEL_GUIDE_BY_SLUG_QUERY, params: { slug } })

  if (!data) notFound()

  const heroSrc = data.mainImage
    ? urlFor(data.mainImage).width(1600).height(700).auto('format').url()
    : null

  return (
    <>
      {/* Hero */}
      <div className={`relative overflow-hidden ${heroSrc ? 'h-[45vh] min-h-[300px]' : 'pt-32 pb-16 bg-surface-dim'}`}>
        {heroSrc ? (
          <>
            <Image
              src={heroSrc}
              alt={data.mainImage!.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              placeholder={data.mainImage!.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={data.mainImage!.asset.metadata?.lqip}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              {data.category && (
                <Badge variant="surface" className="mb-4">
                  {CATEGORY_LABELS[data.category] ?? data.category}
                </Badge>
              )}
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight max-w-3xl">
                {data.title}
              </h1>
            </div>
          </>
        ) : (
          <Container size="md">
            {data.category && (
              <Badge variant="surface" className="mb-4">
                {CATEGORY_LABELS[data.category] ?? data.category}
              </Badge>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-on-surface tracking-tight leading-tight">
              {data.title}
            </h1>
          </Container>
        )}
      </div>

      {/* Content */}
      <div className="section-gap bg-surface">
        <Container size="md">
          {data.content && (
            <PortableText value={data.content} />
          )}
          <div className="mt-12">
            <Link
              href="/travel-guide"
              className="font-sans text-sm text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              ← Back to Travel Guides
            </Link>
          </div>
        </Container>
      </div>
    </>
  )
}
