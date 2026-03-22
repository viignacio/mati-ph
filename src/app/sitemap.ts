import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import {
  PAGE_SLUGS_QUERY,
  DESTINATION_SLUGS_QUERY,
  ACTIVITY_SLUGS_QUERY,
  TRAVEL_GUIDE_SLUGS_QUERY,
} from '@/sanity/lib/queries'
import { siteUrl } from '@/lib/utils'

type SlugEntry = { slug: string }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, destinations, activities, travelGuides] = await Promise.all([
    client.fetch<SlugEntry[]>(PAGE_SLUGS_QUERY),
    client.fetch<SlugEntry[]>(DESTINATION_SLUGS_QUERY),
    client.fetch<SlugEntry[]>(ACTIVITY_SLUGS_QUERY),
    client.fetch<SlugEntry[]>(TRAVEL_GUIDE_SLUGS_QUERY),
  ])

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, priority: 1, changeFrequency: 'weekly' },
    { url: `${siteUrl}/destinations`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${siteUrl}/activities`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${siteUrl}/travel-guide`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
  ]

  const pageRoutes: MetadataRoute.Sitemap = (pages ?? [])
    .filter((p) => p.slug !== 'index')
    .map((p) => ({
      url: `${siteUrl}/${p.slug}`,
      lastModified: now,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }))

  const destinationRoutes: MetadataRoute.Sitemap = (destinations ?? []).map((d) => ({
    url: `${siteUrl}/destinations/${d.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const activityRoutes: MetadataRoute.Sitemap = (activities ?? []).map((a) => ({
    url: `${siteUrl}/activities/${a.slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const travelGuideRoutes: MetadataRoute.Sitemap = (travelGuides ?? []).map((g) => ({
    url: `${siteUrl}/travel-guide/${g.slug}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }))

  return [
    ...staticRoutes,
    ...pageRoutes,
    ...destinationRoutes,
    ...activityRoutes,
    ...travelGuideRoutes,
  ]
}
