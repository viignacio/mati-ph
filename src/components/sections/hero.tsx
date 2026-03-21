'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface HeroSlide {
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

interface HeroProps {
  slides: HeroSlide[]
}

export function Hero({ slides }: HeroProps) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating || index === current) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 600)
  }, [animating, current])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Fallback when no slides
  if (!slides || slides.length === 0) {
    return (
      <section className="relative min-h-dvh flex items-end overflow-hidden">
        <div className="absolute inset-0 cta-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-on-surface/10 to-transparent" />
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pb-20 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-white tracking-tight leading-tight mb-6">
            Where Philippines<br />Gets Wilder
          </h1>
          <p className="text-xl text-white/80 font-sans mb-8 max-w-xl">
            Discover pristine beaches, world-class surfing, and the warmth of Mandaya culture in Davao Oriental.
          </p>
          <Link href="/destinations">
            <Button variant="primary" size="lg">Explore Mati</Button>
          </Link>
        </div>
      </section>
    )
  }

  const slide = slides[current]

  return (
    <section className="relative min-h-dvh flex items-end overflow-hidden">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={s._id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === current ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={s.image.asset.url}
            alt={s.image.alt}
            fill
            priority={i === 0}
            className="object-cover"
            placeholder={s.image.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={s.image.asset.metadata?.lqip}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full px-5 sm:px-8 lg:px-12 pb-24 max-w-5xl mx-auto">
        <div
          key={current}
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-white tracking-tight leading-tight mb-6">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-xl text-white/80 font-sans mb-8 max-w-xl">
              {slide.subtitle}
            </p>
          )}
          {slide.ctaText && slide.ctaLink && (
            <Link href={slide.ctaLink}>
              <Button variant="primary" size="lg">{slide.ctaText}</Button>
            </Link>
          )}
        </div>

        {/* Slide indicators */}
        {slides.length > 1 && (
          <div className="flex items-center gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'rounded-full transition-all duration-300 cursor-pointer',
                  i === current
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
