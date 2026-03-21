import React from 'react'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { BlockContainer, type BlockDesign } from './BlockContainer'
import { cn } from '@/lib/utils'

interface GridBlockProps {
  data: {
    _key: string
    _type: 'gridBlock'
    design?: BlockDesign
    layoutVariant?: 'standard-grid' | 'asymmetric-masonry' | 'bento-grid'
    cardStyle?: 'elevated' | 'flat'
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
  const { design, layoutVariant = 'standard-grid', cardStyle = 'elevated', heading, description, manualItems, cta } = data

  const isMasonry = layoutVariant === 'asymmetric-masonry'

  return (
    <BlockContainer design={design}>
      {/* Header Area */}
      {(heading || description || cta) && (
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            {heading && (
              <>
                <div className="h-1 w-20 bg-tertiary mb-6"></div>
                <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tight mb-6 text-on-background">
                  {heading}
                </h2>
              </>
            )}
            {description && (
              <p className="text-lg text-on-surface-variant font-medium">
                {description}
              </p>
            )}
          </div>
          
          {cta?.text && cta?.link && (
            <Link 
              href={cta.link} 
              className="text-tertiary font-bold text-lg border-b-2 border-tertiary/30 pb-1 hover:border-tertiary transition-all inline-flex items-center gap-2"
            >
              {cta.text} 
              {/* Optional: could use a span with material-symbols-outlined for arrow_forward here instead of standard text */}
              <span className="material-symbols-outlined ml-1">arrow_forward</span>
            </Link>
          )}
        </div>
      )}

      {/* Grid Area */}
      <div className={cn(
        "grid gap-6",
        isMasonry ? "grid-cols-1 md:grid-cols-12" : "grid-cols-1 md:grid-cols-3"
      )}>
        {manualItems?.map((item, index) => {
          // Resolve Item Data
          const doc = item.reference
          if (!doc) return null
          
          const settings = item.itemSettings || {}
          const colSpan = settings.colSpan || 1
          const aspectRatio = settings.aspectRatio || 'square'
          
          const title = doc.name || doc.title
          const badgeText = doc.tagline 
          
          let excerpt = ''
          if (typeof doc.description === 'string') {
            excerpt = doc.description
          } else if (Array.isArray(doc.description)) {
            // Simplify portable text to plain string for the card excerpt
            excerpt = doc.description
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
            'landscape': 'aspect-[16/10] md:aspect-auto md:h-[400px] lg:h-[550px]',
            'wide': 'aspect-[16/7]',
          }[aspectRatio]
          
          const isElevated = cardStyle === 'elevated'

          return (
            <div 
              key={item._key || index} 
              className={cn(
                "group relative overflow-hidden rounded-3xl block",
                spanClass,
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
                <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(188,48,0,0.25)_5px,rgba(188,48,0,0.25)_10px)] z-20"></div>
              )}

              {/* Foreground Content */}
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 text-white flex flex-col items-start z-30 pointer-events-none">
                
                {badgeText && (
                  <span className="text-primary-container text-xs font-bold uppercase tracking-widest mb-2 block">
                    {badgeText}
                  </span>
                )}
                
                <h3 className={cn("font-headline font-bold mb-2", colSpan === 2 ? "text-3xl md:text-4xl" : "text-2xl")}>
                  {title}
                </h3>
                
                {excerpt && (
                  <p className="text-white/80 text-sm md:text-base max-w-md line-clamp-2 md:line-clamp-3 mb-6 transition-opacity duration-300">
                    {excerpt}
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
          )
        })}
      </div>
    </BlockContainer>
  )
}
