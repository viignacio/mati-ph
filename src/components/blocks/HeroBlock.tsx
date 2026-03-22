'use client'

import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { BlockContainer, type BlockDesign } from './BlockContainer'
import { cn } from '@/lib/utils'

interface CTA {
  text?: string
  link?: string
  buttonStyle?: 'primary' | 'secondary' | 'tertiary' | 'outline'
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
    highlightColor?: 'primary' | 'secondary' | 'tertiary' | 'neutral'
    contentAlignment?: 'left' | 'right'
    quotation?: string
    quotationPosition?: 'top' | 'center' | 'bottom'
    quotationAspectRatio?: 'landscape' | 'portrait' | 'square'
    imageAspectRatio?: 'square' | '4:3' | 'portrait'
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
    animateText,
    heading,
    highlightedWord,
    highlightColor = 'primary',
    contentAlignment = 'left',
    quotation,
    quotationPosition = 'bottom',
    quotationAspectRatio = 'landscape',
    imageAspectRatio = '4:3',
    subheading,
    tagline,
    backgroundImage,
    cta,
    secondaryCta
  } = data

  const bgImageUrl = backgroundImage?.asset ? urlFor(backgroundImage).url() : ''

  const anim = (delay: number) =>
    animateText
      ? {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {}

  // Process heading to replace highlightedWord with a styled span
  const renderHeading = () => {
    if (!heading) return null
    if (!highlightedWord || !heading.includes(highlightedWord)) {
      return heading
    }

    const parts = heading.split(new RegExp(`(${highlightedWord})`, 'gi'))
    
    // Determine color class based on highlightColor
    const getColorClass = () => {
      switch (highlightColor) {
        case 'secondary': return 'text-secondary font-bold italic'
        case 'tertiary': return 'text-tertiary font-bold italic'
        case 'neutral': return 'text-on-surface-variant font-bold italic'
        case 'primary':
        default: return 'text-primary-container italic'
      }
    }
    
    return (
      <>
        {parts.map((part, i) => {
          if (part.toLowerCase() === highlightedWord.toLowerCase()) {
            return (
              <span key={i} className={`${getColorClass()} delay-150 duration-700`}>
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
      <section className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
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
            <motion.div {...anim(0)} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">{tagline}</span>
            </motion.div>
          )}

          {heading && (
            <motion.h1 {...anim(0.1)} className="text-white font-headline text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-[-0.03em]">
              {renderHeading()}
            </motion.h1>
          )}

          {subheading && (
            <motion.p {...anim(0.25)} className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              {subheading}
            </motion.p>
          )}

          <motion.div {...anim(0.4)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta?.text && cta?.link && (
              <Link href={cta.link} className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                {cta.text}
              </Link>
            )}

            {secondaryCta?.text && secondaryCta?.link && (
              <Link href={secondaryCta.link} className="w-full sm:w-auto px-10 py-4 rounded-full bg-white/60 backdrop-blur-md text-on-background font-bold text-lg hover:bg-surface-container-highest transition-all border border-outline-variant/20">
                {secondaryCta.text}
              </Link>
            )}
          </motion.div>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        <div className={cn(
          "lg:col-span-5 space-y-8 z-10",
          contentAlignment === 'right' ? "lg:order-2" : "lg:order-1"
        )}>
          {tagline && (
            <motion.span {...anim(0)} className="text-tertiary font-bold uppercase tracking-[0.2em] block">
              {tagline}
            </motion.span>
          )}
          
          {heading && (
            <motion.h1 {...anim(0.1)} className="text-5xl md:text-7xl font-headline font-black text-on-background tracking-tight leading-tight">
              {renderHeading()}
            </motion.h1>
          )}

          {subheading && (
            <motion.p {...anim(0.25)} className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-md">
              {subheading}
            </motion.p>
          )}

          <motion.div {...anim(0.4)} className="flex flex-wrap items-center gap-6">
            {cta?.text && cta?.link && (
              <Link 
                href={cta.link} 
                className={cn(
                  "px-8 py-4 rounded-full font-bold transition-all shadow-lg",
                  cta.buttonStyle === 'secondary' ? "bg-secondary text-white shadow-secondary/20" :
                  cta.buttonStyle === 'tertiary' ? "bg-tertiary text-white shadow-tertiary/20" :
                  cta.buttonStyle === 'outline' ? "border-2 border-primary text-primary shadow-none" :
                  "bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-primary/20"
                )}
              >
                {cta.text}
              </Link>
            )}

            {secondaryCta?.text && secondaryCta?.link && (
              <Link 
                href={secondaryCta.link} 
                className={cn(
                  "font-bold flex items-center gap-2 group transition-colors",
                  secondaryCta.buttonStyle === 'primary' ? "text-primary" :
                  secondaryCta.buttonStyle === 'secondary' ? "text-secondary" :
                  "text-tertiary"
                )}
              >
                {secondaryCta.text}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  {secondaryCta.text.toLowerCase().includes('watch') || secondaryCta.text.toLowerCase().includes('story') ? 'play_circle' : 'arrow_forward'}
                </span>
              </Link>
            )}
          </motion.div>
        </div>

        <div className={cn(
          "lg:col-span-7 relative",
          contentAlignment === 'right' ? "lg:order-1" : "lg:order-2"
        )}>
          <div className={cn(
            "relative rounded-[3rem] overflow-hidden shadow-2xl",
            imageAspectRatio === 'square' ? "aspect-square h-auto" :
            imageAspectRatio === 'portrait' ? "aspect-[3/4] h-auto" :
            imageAspectRatio === '4:3' ? "aspect-[4/3] h-auto" :
            "h-[500px] md:h-[650px]" // fallback to original height behavior
          )}>
            {bgImageUrl ? (
              <img 
                src={bgImageUrl} 
                alt={heading || 'Hero image'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-surface-container-highest flex items-center justify-center text-outline">
                No Background Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          </div>

          {quotation && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: contentAlignment === 'right' ? 20 : -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={cn(
                "absolute z-20 flex flex-col bg-tertiary-container rounded-[2rem] md:rounded-[3rem] p-5 md:p-8 shadow-2xl border border-white/20 backdrop-blur-sm",
                
                // --- Container Position (Relative to Image) ---
                quotationPosition === 'top' ? "-top-6 md:-top-10" :
                quotationPosition === 'center' ? "top-1/2 -translate-y-1/2" :
                "-bottom-6 md:-bottom-10", 
                
                // Alignment side
                contentAlignment === 'right' ? "-right-4 md:-right-10" : "-left-4 md:-left-10",

                // --- Internal Text Alignment ---
                quotationPosition === 'top' ? "justify-start" :
                quotationPosition === 'center' ? "justify-center" :
                "justify-end",

                // --- Responsive Dimensions ---
                // Always Landscape on mobile to avoid blocking too much image height
                // Respect Aspect Ratio settings only on Desktop (md+)
                quotationAspectRatio === 'portrait' ? "w-64 md:w-64 h-[160px] md:h-[400px]" : 
                quotationAspectRatio === 'square' ? "w-64 md:w-80 h-[160px] md:h-80" : 
                "w-64 md:w-96 min-h-[120px] md:min-h-[200px]" // landscape
              )}
            >
              <p className={cn(
                "font-headline italic text-on-tertiary-container leading-snug",
                // Responsive text size: smaller on mobile landscape, larger on desktop
                quotationAspectRatio === 'portrait' ? "text-base md:text-xl" : "text-base md:text-2xl"
              )}>
                "{quotation}"
              </p>
              <div className="mt-4 md:mt-6 w-10 md:w-16 h-1 bg-tertiary rounded-full shrink-0"></div>
            </motion.div>
          )}
        </div>
      </div>
    </BlockContainer>
  )
}
