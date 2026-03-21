import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_BY_SLUG_QUERY, DICTIONARY_QUERY } from '@/sanity/lib/queries'
import { PageBuilder } from '@/components/PageBuilder'

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params
  const slugArray = resolvedParams.slug || ['index']
  const slugStr = slugArray.join('/')
  
  const { data: page } = await sanityFetch({ query: PAGE_BY_SLUG_QUERY, params: { slug: slugStr } })
  
  if (!page) {
    return {}
  }
  
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    openGraph: {
      images: page.seo?.image?.asset?.url ? [page.seo.image.asset.url] : [],
    },
    robots: {
      index: !page.seo?.noIndex,
      follow: !page.seo?.noIndex,
    }
  }
}

export default async function ComposablePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params
  const slugArray = resolvedParams.slug || ['index']
  const slugStr = slugArray.join('/')
  
  // Fetch the page and dictionary entries in parallel
  const [pageRes, dictRes] = await Promise.all([
    sanityFetch({ query: PAGE_BY_SLUG_QUERY, params: { slug: slugStr } }),
    sanityFetch({ query: DICTIONARY_QUERY })
  ])
  
  const page = pageRes.data
  const dictEntries = dictRes.data
  
  if (!page) {
    notFound()
  }
  
  // Transform dictionary array to key-value object
  const dictionary = (dictEntries ?? []).reduce((acc: any, entry: any) => {
    if (entry.key && entry.value) {
      acc[entry.key] = entry.value
    }
    return acc
  }, {})

  return (
    <div className="min-h-dvh flex flex-col bg-surface">
      <PageBuilder blocks={page.content ?? []} dictionary={dictionary} />
    </div>
  )
}
