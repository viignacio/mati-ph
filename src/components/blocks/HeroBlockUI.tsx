import React from 'react'
import Image from 'next/image'
import { Hero } from '@/components/sections/hero'

// ─── Types ────────────────────────────────────────────────────────────────────

type HeroSlide = {
  _id: string
  title: string
  subtitle?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  order: number
  image: {
    asset: { _id: string; url: string; metadata: { lqip: string; dimensions: { width: number; height: number } } }
    alt: string
    hotspot?: unknown
    crop?: unknown
  }
}

type HeroBlockData = {
  heroType?: 'image' | 'video' | 'slides'
  layoutVariant?: 'full-screen' | 'split-content'
  heading?: string
  subheading?: string
  tagline?: string
  backgroundImage?: {
    asset: { _id: string; url: string }
    hotspot?: { x: number; y: number }
  }
  backgroundVideo?: {
    asset: { _id: string; url: string }
  }
  slides?: HeroSlide[]
  cta?: {
    text?: string
    link?: string
  }
}

type HeroBlockProps = {
  data: HeroBlockData
  dictionary?: any
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

function HeroFullScreenImageBg({ data }: { data: HeroBlockData }) {
  const imgUrl = data.backgroundImage?.asset?.url

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {imgUrl && (
          <Image 
            src={imgUrl} 
            alt={data.heading || 'Hero background'} 
            fill 
            className="object-cover" 
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/90"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        {data.tagline && (
          <span className="text-secondary font-caveat text-2xl tracking-wide mb-4">{data.tagline}</span>
        )}
        {data.heading && (
          <h1 className="font-serif text-6xl md:text-8xl text-on-surface leading-tight tracking-tight mb-4 drop-shadow-sm">
            {data.heading}
          </h1>
        )}
        {data.subheading && (
          <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-medium">
            {data.subheading}
          </p>
        )}
        {data.cta?.text && (
          <div className="mt-8">
            <a
              href={data.cta.link || '#'}
              className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all inline-block"
            >
              {data.cta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function HeroImageBg({ data }: { data: HeroBlockData }) {
  const imgUrl = data.backgroundImage?.asset?.url
  return (
    <section
      className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-gray-900 text-white text-center"
      style={imgUrl ? { backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 p-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {data.tagline && (
          <span className="text-secondary font-caveat text-2xl tracking-wide">{data.tagline}</span>
        )}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
          {data.heading}
        </h1>
        {data.subheading && (
          <p className="text-lg md:text-2xl font-jakarta text-white/90 drop-shadow-md max-w-2xl">
            {data.subheading}
          </p>
        )}
        {data.cta?.text && (
          <a
            href={data.cta.link}
            className="mt-4 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-colors shadow-lg"
          >
            {data.cta.text}
          </a>
        )}
      </div>
    </section>
  )
}

function HeroVideoBg({ data }: { data: HeroBlockData }) {
  const videoUrl = data.backgroundVideo?.asset?.url
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-gray-900 text-white text-center overflow-hidden">
      {videoUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 p-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {data.tagline && (
          <span className="text-secondary font-caveat text-2xl tracking-wide">{data.tagline}</span>
        )}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
          {data.heading}
        </h1>
        {data.subheading && (
          <p className="text-lg md:text-2xl font-jakarta text-white/90 drop-shadow-md max-w-2xl">
            {data.subheading}
          </p>
        )}
        {data.cta?.text && (
          <a
            href={data.cta.link}
            className="mt-4 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-colors shadow-lg"
          >
            {data.cta.text}
          </a>
        )}
      </div>
    </section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HeroBlockUI({ data }: HeroBlockProps) {
  const heroType = data.heroType ?? 'image'

  if (heroType === 'video') {
    return <HeroVideoBg data={data} />
  }

  if (heroType === 'slides') {
    return <Hero slides={data.slides ?? []} />
  }

  // Default: 'image'
  if (data.layoutVariant === 'split-content') {
    return <HeroImageBg data={data} />
  }

  return <HeroFullScreenImageBg data={data} />
}
