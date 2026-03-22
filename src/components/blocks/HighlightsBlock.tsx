"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { BlockContainer, BlockDesign, type ColorRef } from './BlockContainer'
import { colorVar, onColorVar } from '@/lib/color'
import { CtaButton } from '@/components/ui/cta-button'

interface HighlightsBlockProps {
  data: {
    _key: string
    _type: 'highlightsBlock'
    design?: BlockDesign
    layoutAlignment?: 'left' | 'right'
    icon?: string
    heading?: string
    description?: string
    cta?: {
      text?: string
      link?: string
      buttonVariant?: 'filled' | 'outline' | 'ghost'
      buttonColor?: ColorRef
      icon?: string
    }
    highlights?: Array<{
      _key: string
      icon?: string
      iconColor?: ColorRef
      title?: string
      description?: string
    }>
    itemImages?: Array<{
      _key: string
      image?: any
      alt?: string
      aspectRatio?: 'auto' | 'square' | 'video' | 'portrait'
      colSpan?: number
      rowSpan?: number
    }>
  }
}

export function HighlightsBlock({ data }: HighlightsBlockProps) {
  const {
    design,
    layoutAlignment = 'left',
    icon,
    heading,
    description,
    cta,
    highlights,
    itemImages
  } = data

  const isReversed = layoutAlignment === 'right'
  const accent = colorVar(design?.accentColorRef)

  const containerDesign: BlockDesign = {
    ...design,
    containerStyle: 'rounded-container', // Highlights Block is always in a rounded container per design
  }

  const renderImageGrid = () => {
    if (!itemImages || itemImages.length === 0) return null

    const imageCount = itemImages.length

    // Helper to check for custom modularity
    const hasCustomConfig = itemImages.some(img =>
      (img.colSpan && img.colSpan > 1) ||
      (img.rowSpan && img.rowSpan > 1) ||
      (img.aspectRatio && img.aspectRatio !== 'auto')
    )

    // Helper to resolve aspect ratio
    const getAspectClass = (ratio?: string) => {
      switch (ratio) {
        case 'square': return 'aspect-square'
        case 'video': return 'aspect-video'
        case 'portrait': return 'aspect-[3/4]'
        default: return ''
      }
    }

    // Helper to resolve spans
    const getSpanClass = (col?: number, row?: number) => {
      return cn(
        col === 2 ? 'col-span-2' : 'col-span-1',
        row === 2 ? 'row-span-2' : 'row-span-1'
      )
    }

    // Modular Grid: If user has set custom config
    if (hasCustomConfig) {
      return (
        <div className="grid grid-cols-2 gap-4 auto-rows-max">
          {itemImages.map((img, idx) => {
            if (!img.image) return null
            return (
              <div
                key={img._key || idx}
                className={cn(
                  "rounded-2xl overflow-hidden shadow-xl",
                  getSpanClass(img.colSpan, img.rowSpan),
                  getAspectClass(img.aspectRatio)
                )}
              >
                <img
                  src={urlFor(img.image).url()}
                  alt={img.alt || 'Highlight image'}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          })}
        </div>
      )
    }

    // Default Staggered/Hardcoded Layouts (Legacy Support / High-Fidelity Defaults)
    if (imageCount === 1) {
      const img = itemImages[0]
      if (!img.image) return null
      return (
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
          <img
            src={urlFor(img.image).url()}
            alt={img.alt || 'Highlight image'}
            className="w-full h-full object-cover"
          />
        </div>
      )
    }

    if (imageCount === 2) {
      return (
        <div className="grid grid-cols-2 gap-4 h-[400px]">
          {itemImages.map((img, idx) => {
            if (!img.image) return null
            return (
              <div key={img._key || idx} className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={urlFor(img.image).url()}
                  alt={img.alt || 'Highlight image'}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          })}
        </div>
      )
    }

    // Default 3 images (Asymmetric Staggered)
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {itemImages.slice(0, 2).map((img, idx) => {
            if (!img.image) return null
            return (
              <div
                key={img._key || idx}
                className={cn(
                  "rounded-2xl overflow-hidden shadow-xl",
                  idx === 0 ? "h-48" : "h-64"
                )}
              >
                <img
                  src={urlFor(img.image).url()}
                  alt={img.alt || 'Highlight image'}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          })}
        </div>
        <div className={cn("flex flex-col gap-4", imageCount === 3 ? "pt-8" : "pt-0")}>
          {itemImages.slice(2, 4).map((img, idx) => {
            if (!img.image) return null
            return (
              <div
                key={img._key || idx}
                className={cn(
                  "rounded-2xl overflow-hidden shadow-xl",
                  imageCount === 3 ? "h-full" : (idx === 0 ? "h-64" : "h-48")
                )}
              >
                <img
                  src={urlFor(img.image).url()}
                  alt={img.alt || 'Highlight image'}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <BlockContainer design={containerDesign} className="relative !p-0">
      {/* Accent Stripe */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: accent ?? 'var(--color-primary)' }}
      />

      <div className="p-12 md:p-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            className={cn(isReversed ? "order-2" : "order-2 lg:order-1")}
            initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              {icon && (
                <span
                  className="h-10 w-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: accent ?? 'var(--color-primary)', color: onColorVar(design?.accentColorRef) }}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {icon}
                  </span>
                </span>
              )}
              <h2 className="font-headline text-3xl md:text-4xl text-on-surface font-black">
                {heading}
              </h2>
            </div>

            {description && (
              <p className="text-on-surface-variant mb-8 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            )}

            {highlights && highlights.length > 0 && (
              <div className="space-y-6">
                {highlights.map((item, idx) => (
                  <div key={item._key || idx} className="flex gap-6 items-start">
                    {item.icon && (
                      <span
                        className="material-symbols-outlined shrink-0"
                        style={{ color: colorVar(item.iconColor) ?? accent ?? 'var(--color-primary)' }}
                      >
                        {item.icon}
                      </span>
                    )}
                    <div>
                      <h4 className="font-bold text-on-surface">
                        {item.title}
                      </h4>
                      <p className="text-sm text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cta?.text && cta?.link && (
              <div className="mt-8">
                <CtaButton
                  text={cta.text}
                  href={cta.link}
                  variant={cta.buttonVariant ?? 'filled'}
                  color={cta.buttonColor}
                  icon={cta.icon}
                  defaultColor="primary"
                />
              </div>
            )}
          </motion.div>

          {/* Image Grid Side */}
          <motion.div
            className={cn(isReversed ? "order-1" : "order-1 lg:order-2")}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {renderImageGrid()}
          </motion.div>
        </div>
      </div>
    </BlockContainer>
  )
}
