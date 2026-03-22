'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { BlockContainer, type BlockDesign } from './BlockContainer'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
}

interface GridBlockProps {
  data: {
    _key: string
    _type: 'gridBlock'
    design?: BlockDesign
    layoutVariant?: 'standard-grid' | 'asymmetric-masonry' | 'masonry-captions' | 'bento-grid'
    cardStyle?: 'elevated' | 'flat'
    staggered?: boolean
    tagline?: string
    heading?: string
    description?: string
    manualItems?: Array<{
      _key: string
      reference: any
      itemSettings?: {
        colSpan?: number
        aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide'
        ctaType?: 'arrow' | 'button' | 'none'
        ctaText?: string
        ctaLink?: string
      }
    }>
    cta?: {
      text?: string
      link?: string
    }
  }
}

export function GridBlock({ data }: GridBlockProps) {
  const { design, layoutVariant = 'standard-grid', cardStyle = 'elevated', tagline, heading, description, manualItems, cta } = data

  const isMasonry = layoutVariant === 'asymmetric-masonry'

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <BlockContainer design={design}>
      {/* Header Area */}
      {(tagline || heading || description || cta) && (
        <motion.div
          className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="max-w-2xl">
            {tagline ? (
              <span className="text-tertiary font-bold tracking-widest text-sm mb-4 block uppercase">
                {tagline}
              </span>
            ) : (
              heading && <div className="h-1 w-20 bg-tertiary mb-6"></div>
            )}
            
            {heading && (
              <h2 className={cn(
                "font-headline font-black tracking-tight",
                layoutVariant === 'asymmetric-masonry' && description ? "mb-6" : "",
                layoutVariant === 'asymmetric-masonry' 
                  ? "text-5xl md:text-6xl text-on-surface leading-tight" 
                  : "text-4xl md:text-6xl"
              )}>
                {heading}
              </h2>
            )}
            
            {/* If asymmetric masonry, description is under heading */}
            {layoutVariant === 'asymmetric-masonry' && description && (
              <p className="text-lg text-on-surface-variant font-medium">
                {description}
              </p>
            )}
          </div>

          {/* If NOT asymmetric masonry, description is flex-end right side */}
          {layoutVariant !== 'asymmetric-masonry' && description && (
            <p className="text-on-surface-variant max-w-sm mb-2 font-medium">
              {description}
            </p>
          )}

          {cta?.text && cta?.link && (
            <Link
              href={cta.link}
              className="text-tertiary font-bold text-lg border-b-2 border-tertiary/30 pb-1 hover:border-tertiary transition-all inline-flex items-center gap-2 mb-2 md:mb-0"
            >
              {cta.text}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          )}
        </motion.div>
      )}

      {/* Grid Area */}
      <div
        ref={ref}
        className={cn(
          "grid gap-12",
          isMasonry ? "grid-cols-1 md:grid-cols-12" : "grid-cols-1 md:grid-cols-3"
        )}
      >
        {manualItems?.map((item, index) => {
          // Resolve Item Data
          const doc = item.reference
          if (!doc) return null

          const settings = item.itemSettings || {}
          const colSpan = settings.colSpan || 1
          const aspectRatio = settings.aspectRatio || 'square'

          const title = doc.name || doc.title
          const badgeText = doc.tagline
          
          const shortDesc = doc.shortDescription || ''
          
          let fullDescText = ''
          if (typeof doc.description === 'string') {
            fullDescText = doc.description
          } else if (Array.isArray(doc.description)) {
            // Simplify portable text to plain string for the caption
            fullDescText = doc.description
              .map((block: any) => block._type === 'block' && block.children
                ? block.children.map((child: any) => child.text).join('')
                : '')
              .join(' ')
          }

          const imgUrl = doc.mainImage ? urlFor(doc.mainImage).url() : ''

          // Compute default hyperlink from doc type if link not explicitly overridden
          let docHref = '#'
          if (doc._type && doc.slug) {
            const prefixMap: Record<string, string> = {
              'destination': '/destinations',
              'activity': '/activities',
              'festival': '/festivals',
              'foodSpot': '/food-spots',
              'travelGuide': '/travel-guide'
            }
            const prefix = prefixMap[doc._type] || ''
            docHref = `${prefix}/${doc.slug}`
          }
          const finalHref = settings.ctaLink || docHref

          // CSS Mappings
          const spanClass = isMasonry
            ? (colSpan === 2 ? 'md:col-span-8' : 'md:col-span-4')
            : 'md:col-span-1'

          const aspectClass = {
            'square': 'aspect-square md:aspect-auto',
            'portrait': 'aspect-[4/5] md:aspect-auto md:h-[400px] lg:h-[550px]',
            'landscape': 'aspect-[4/5] md:aspect-[16/10] md:aspect-auto md:h-[400px] lg:h-[550px]',
            'wide': 'aspect-square md:aspect-[16/7]',
          }[aspectRatio]

          const isElevated = cardStyle === 'elevated'
          
          const isStaggered = data.staggered && (index % 3 === 1)

          return (
            <motion.div
              key={item._key || index}
              className={cn("block transition-all duration-500", spanClass, isStaggered && "md:mt-12")}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div
                className={cn(
                  "group relative overflow-hidden rounded-3xl block w-full",
                  aspectClass,
                  isElevated ? "shadow-sm bg-surface-container-lowest" : ""
                )}
              >
                {/* Image Layer */}
                {imgUrl && (
                  <>
                    <img
                      src={imgUrl}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </>
                )}

                {/* Decorative Mandaya Accent for Wide Cards */}
                {aspectRatio === 'wide' && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(188,48,0,0.10)_5px,rgba(188,48,0,0.10)_10px)] z-20"></div>
                )}

                {/* Foreground Content inside Image Overlay */}
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 text-white flex flex-col items-start z-30 pointer-events-none">

                  {badgeText && (
                    <span className="text-primary-fixed font-bold text-xs uppercase tracking-widest mb-2 block">
                      {badgeText}
                    </span>
                  )}

                  <h3 className={cn("font-headline font-bold mb-2", colSpan === 2 ? "text-3xl md:text-4xl" : "text-2xl")}>
                    {title}
                  </h3>

                  {/* ONLY show shortDescription inside the overlay if not masonry-captions */}
                  {layoutVariant !== 'masonry-captions' && shortDesc && (
                    <p className="text-white/80 text-sm md:text-base max-w-md line-clamp-2 md:line-clamp-3 mb-6 transition-opacity duration-300">
                      {shortDesc}
                    </p>
                  )}

                  {/* Variant Call To Action */}
                  {settings.ctaType === 'button' && settings.ctaText && (
                    <Link href={finalHref} className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full font-bold text-sm text-white transition-all hover:bg-white hover:text-primary mt-auto pointer-events-auto inline-block">
                      {settings.ctaText}
                    </Link>
                  )}

                  {(!settings.ctaType || settings.ctaType === 'arrow') && (
                    <Link href={finalHref} className="material-symbols-outlined mt-auto transition-transform duration-300 transform hover:-translate-y-1 hover:translate-x-1 text-white pointer-events-auto inline-block">
                      arrow_outward
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Optional Caption outside Image Layer */}
              {layoutVariant === 'masonry-captions' && fullDescText && (
                <div className="mt-4 px-2">
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                    {fullDescText}
                  </p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </BlockContainer>
  )
}
