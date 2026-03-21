import React from 'react'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { BlockContainer, type BlockDesign } from './BlockContainer'
import { cn } from '@/lib/utils'

interface Feature {
  _key: string
  title: string
  description?: string
  icon?: string
}

interface FeaturesBlockProps {
  data: {
    _key: string
    _type: 'featuresBlock'
    design?: BlockDesign
    layoutVariant?: 'icon-list' | 'feature-list-with-image'
    tagline?: string
    heading?: string
    description?: string
    mainImage?: any
    imagePosition?: 'left' | 'right'
    features?: Feature[]
    cta?: {
      text?: string
      link?: string
    }
  }
}

export function FeaturesBlock({ data }: FeaturesBlockProps) {
  const { 
    design = { backgroundColor: 'surface-container-low' }, // Default mapped from surface-dim locally
    layoutVariant = 'icon-list', 
    tagline, 
    heading, 
    mainImage, 
    imagePosition = 'left', 
    features, 
    cta 
  } = data

  const isWithImage = layoutVariant === 'feature-list-with-image' && mainImage?.asset
  const imgUrl = isWithImage ? urlFor(mainImage).url() : ''
  const isLeft = imagePosition === 'left'

  return (
    <BlockContainer design={design} className="relative overflow-hidden">
      {/* Decorative Wave Motif (Translating the stitch graphic abstractly) */}
      <div className="absolute -right-20 top-0 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0L120 80H80L100 0ZM100 200L80 120H120L100 200ZM200 100L120 80V120L200 100ZM0 100L80 120V80L0 100Z" fill="currentColor" className="text-tertiary" />
        </svg>
      </div>

      <div className={cn(
        "grid gap-16 items-center",
        isWithImage ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
      )}>
        
        {/* Optional Image Column */}
        {isWithImage && (
          <div className={cn("relative", isLeft ? "order-2 lg:order-1" : "order-2 lg:order-2")}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl z-10 bg-surface-container-low">
              <img src={imgUrl} alt={heading || 'Feature image'} className="w-full h-full object-cover" />
            </div>
            {/* Structural Accent Square */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary-container rounded-3xl -z-10 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(188,48,0,0.5)_5px,rgba(188,48,0,0.5)_10px)]"></div>
          </div>
        )}

        {/* Text & Features Column */}
        <div className={cn("relative", isLeft ? "order-1 lg:order-2" : "order-1 lg:order-1")}>
          {tagline && (
            <h3 className="text-secondary font-bold uppercase tracking-[0.2em] mb-4">
              {tagline}
            </h3>
          )}
          
          {heading && (
            <h2 className="text-4xl md:text-6xl font-headline font-black mb-8 leading-tight">
              {heading}
            </h2>
          )}

          <div className="space-y-8">
            {features?.map((feature, i) => (
              <div key={feature._key || i} className="flex gap-6">
                
                {/* Icon Circle (Fallback mapping logic for colors across features) */}
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                  i % 2 === 0 ? "bg-secondary-container text-secondary" : "bg-primary-container text-primary"
                )}>
                  <span className="material-symbols-outlined">{feature.icon || 'star'}</span>
                </div>
                
                {/* Feature Content */}
                <div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  {feature.description && (
                    <p className="text-on-surface-variant leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Block CTA */}
            {cta?.text && cta?.link && (
              <div className="pt-6">
                <Link 
                  href={cta.link} 
                  className="inline-block bg-secondary text-on-secondary px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-secondary/20 hover:-translate-y-1 transition-all"
                >
                  {cta.text}
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </BlockContainer>
  )
}
