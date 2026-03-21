import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { DESTINATION_BY_SLUG_QUERY, DESTINATION_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PortableText } from '@/components/portable-text'
import { JsonLd } from '@/components/json-ld'

export async function generateStaticParams() {
  const data = await client.fetch(DESTINATION_SLUGS_QUERY)
  return (data ?? []).map((item: { slug: string }) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: DESTINATION_BY_SLUG_QUERY, params: { slug } })
  if (!data) return {}

  const title = data.seo?.title ?? data.name
  const description = data.seo?.description ?? data.tagline ?? undefined

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

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: DESTINATION_BY_SLUG_QUERY, params: { slug } })

  if (!data) notFound()

  const heroSrc = data.mainImage
    ? urlFor(data.mainImage).width(1600).height(900).auto('format').url()
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: data.name,
    description: data.tagline ?? undefined,
    url: `https://mati.ph/destinations/${data.slug}`,
    ...(data.location?.lat && data.location?.lng
      ? { geo: { '@type': 'GeoCoordinates', latitude: data.location.lat, longitude: data.location.lng } }
      : {}),
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-surface-high">
        {data.mainImage ? (
          <Image
            src={heroSrc!}
            alt={data.mainImage.alt || data.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder={data.mainImage.asset?.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.mainImage.asset?.metadata?.lqip}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/10 to-surface-high" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl">
          {data.category && (
            <Badge variant="primary" className="mb-4">{data.category}</Badge>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            {data.name}
          </h1>
          {data.tagline && (
            <p className="mt-3 font-sans text-xl text-white/80">{data.tagline}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="section-gap bg-surface">
        <Container size="md">
          {/* Description */}
          {data.description && (
            <div className="mb-12">
              <PortableText value={data.description} />
            </div>
          )}

          {/* Location & How to Get There */}
          {(data.location?.address || data.howToGetThere || data.bestTimeToVisit) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {data.location?.address && (
                <div className="bg-surface-low rounded-3xl p-6 shadow-ambient">
                  <h3 className="font-serif text-xl font-semibold text-on-surface mb-3">Location</h3>
                  <p className="font-sans text-sm text-on-surface-variant">{data.location.address}</p>
                  {data.location.googleMapsUrl && (
                    <a
                      href={data.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block font-sans text-sm text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      View on Google Maps →
                    </a>
                  )}
                </div>
              )}
              {data.bestTimeToVisit && (
                <div className="bg-surface-low rounded-3xl p-6 shadow-ambient">
                  <h3 className="font-serif text-xl font-semibold text-on-surface mb-3">Best Time to Visit</h3>
                  <p className="font-sans text-sm text-on-surface-variant">{data.bestTimeToVisit}</p>
                </div>
              )}
              {data.howToGetThere && (
                <div className="bg-surface-low rounded-3xl p-6 shadow-ambient md:col-span-2">
                  <h3 className="font-serif text-xl font-semibold text-on-surface mb-3">How to Get There</h3>
                  <p className="font-sans text-sm text-on-surface-variant whitespace-pre-line">{data.howToGetThere}</p>
                </div>
              )}
            </div>
          )}

          {/* Gallery */}
          {data.gallery && data.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="font-serif text-3xl font-semibold text-on-surface mb-6">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.gallery.map((img: {
                  _key: string
                  alt?: string
                  caption?: string
                  asset: { _id: string; url: string; metadata: { lqip: string } }
                }) => (
                  <div key={img._key} className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(img).width(600).height(600).auto('format').url()}
                      alt={img.alt ?? img.caption ?? 'Gallery image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={img.asset.metadata?.lqip}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>

        {/* Related Activities */}
        {data.relatedActivities && data.relatedActivities.length > 0 && (
          <Container size="xl">
            <h2 className="font-serif text-3xl font-semibold text-on-surface mb-8 text-center">Activities Nearby</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.relatedActivities.map((activity: {
                _id: string
                name: string
                slug: string
                difficulty?: string | null
                duration?: string | null
                mainImage: { asset: { _id: string; url: string; metadata: { lqip: string } }; alt: string }
              }) => (
                <Card.Root key={activity._id} href={`/activities/${activity.slug}`} elevated>
                  <Card.Image aspectRatio="landscape">
                    <Image
                      src={urlFor(activity.mainImage).width(600).height(450).auto('format').url()}
                      alt={activity.mainImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={activity.mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={activity.mainImage.asset.metadata?.lqip}
                    />
                  </Card.Image>
                  <Card.Body>
                    {activity.difficulty && <Badge variant="surface">{activity.difficulty}</Badge>}
                    <Card.Title>{activity.name}</Card.Title>
                    {activity.duration && (
                      <Card.Description>{activity.duration}</Card.Description>
                    )}
                  </Card.Body>
                </Card.Root>
              ))}
            </div>
          </Container>
        )}
      </div>
    </>
  )
}
