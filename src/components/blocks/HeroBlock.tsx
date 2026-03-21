import React from 'react'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { BlockContainer, type BlockDesign } from './BlockContainer'
import { cn } from '@/lib/utils'

interface CTA {
  text?: string
  link?: string
}

interface HeroBlockProps {
  data: {
    _key: string
    _type: 'heroBlock'
    heroType?: 'image' | 'video' | 'slides'
    design?: BlockDesign
    layoutVariant?: 'full-screen' | 'split-content'
    animateText?: boolean
    heading?: string
    highlightedWord?: string
    subheading?: string
    tagline?: string
    backgroundImage?: any
    backgroundVideo?: any
    cta?: CTA
    secondaryCta?: CTA
  }
}

export function HeroBlock({ data }: HeroBlockProps) {
  const { 
    design, 
    layoutVariant = 'full-screen', 
    heroType, 
    heading, 
    highlightedWord, 
    subheading, 
    tagline, 
    backgroundImage, 
    cta, 
    secondaryCta 
  } = data

  const bgImageUrl = backgroundImage?.asset ? urlFor(backgroundImage).url() : ''

  // Process heading to replace highlightedWord with a styled span
  const renderHeading = () => {
    if (!heading) return null
    if (!highlightedWord || !heading.includes(highlightedWord)) {
      return heading
    }

    const parts = heading.split(new RegExp(`(${highlightedWord})`, 'gi'))
    
    return (
      <>
        {parts.map((part, i) => {
          if (part.toLowerCase() === highlightedWord.toLowerCase()) {
            return (
              <span key={i} className="text-primary-container italic delay-150 duration-700">
                {part}
              </span>
            )
          }
          return part
        })}
      </>
    )
  }

  // We diverge from standard BlockContainer slightly if full-screen to allow edge-to-edge absolute images
  if (layoutVariant === 'full-screen') {
    return (
      <section className="relative h-[921px] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image / Video wrapper */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          {heroType === 'image' && bgImageUrl && (
            <img 
              src={bgImageUrl}
              alt={heading || 'Hero background'} 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 text-center px-6 max-w-5xl">
          {tagline && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">{tagline}</span>
            </div>
          )}

          {heading && (
            <h1 className="text-white font-headline text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-[-0.03em]">
              {renderHeading()}
            </h1>
          )}

          {subheading && (
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              {subheading}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta?.text && cta?.link && (
              <Link href={cta.link} className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                {cta.text}
              </Link>
            )}
            
            {secondaryCta?.text && secondaryCta?.link && (
              <Link href={secondaryCta.link} className="w-full sm:w-auto px-10 py-4 rounded-xl bg-white/60 backdrop-blur-md text-on-background font-bold text-lg hover:bg-surface-container-highest transition-all border border-outline-variant/20">
                {secondaryCta.text}
              </Link>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/60 text-[10px] uppercase font-bold tracking-[0.3em]">Discover More</span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[bounce_2s_infinite]"></div>
          </div>
        </div>
      </section>
    )
  }

  // Split-content variant mapping (e.g., standard page headers)
  return (
    <BlockContainer design={design} className="flex min-h-[50vh] items-center">
      <div className="max-w-3xl space-y-6">
        {tagline && (
          <span className="text-tertiary font-bold uppercase tracking-[0.2em]">{tagline}</span>
        )}
        <h1 className="text-5xl md:text-6xl font-headline font-black text-on-background tracking-tight">
          {renderHeading()}
        </h1>
        {subheading && (
          <p className="text-xl text-on-surface-variant font-medium leading-relaxed">
            {subheading}
          </p>
        )}
      </div>
    </BlockContainer>
  )
}
