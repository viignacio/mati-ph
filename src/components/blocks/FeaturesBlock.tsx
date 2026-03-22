'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { urlFor } from '@/sanity/lib/image'
import { BlockContainer, type BlockDesign, type ColorRef } from './BlockContainer'
import { cn } from '@/lib/utils'
import { CtaButton } from '@/components/ui/cta-button'

const ease = [0.22, 1, 0.36, 1] as const

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

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
    imageTag?: string
    imagePosition?: 'left' | 'right'
    features?: Feature[]
    cta?: {
      text?: string
      link?: string
      buttonVariant?: 'filled' | 'outline'
      buttonColor?: ColorRef
    }
  }
}


export function FeaturesBlock({ data }: FeaturesBlockProps) {
  const {
    design,
    layoutVariant = 'icon-list',
    tagline,
    heading,
    mainImage,
    imageTag,
    imagePosition = 'left',
    features,
    cta
  } = data

  const isWithImage = layoutVariant === 'feature-list-with-image' && mainImage?.asset
  const imgUrl = isWithImage ? urlFor(mainImage).url() : ''
  const isLeft = imagePosition === 'left'

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <BlockContainer design={design} className="relative overflow-hidden" containerWidth="75%">
      {/* Decorative Wave Motif */}
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
          <motion.div
            className={cn("relative", isLeft ? "order-2 lg:order-1" : "order-2 lg:order-2")}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl z-10 bg-surface-container-low">
              <img src={imgUrl} alt={heading || 'Feature image'} className="w-full h-full object-cover" />
              {imageTag && (
                <div className="absolute top-6 left-6 bg-secondary text-on-secondary px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest z-10">
                  {imageTag}
                </div>
              )}
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary-container rounded-3xl -z-10 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(188,48,0,0.2)_5px,rgba(188,48,0,0.2)_10px)]"></div>
          </motion.div>
        )}

        {/* Text & Features Column */}
        <motion.div
          ref={ref}
          className={cn("relative", isLeft ? "order-1 lg:order-2" : "order-1 lg:order-1")}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tagline && (
            <motion.h3 variants={itemVariants} className="text-secondary font-bold uppercase tracking-[0.2em] mb-4">
              {tagline}
            </motion.h3>
          )}

          {heading && (
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-headline font-black mb-8 leading-tight">
              {heading}
            </motion.h2>
          )}

          <div className="space-y-8">
            {features?.map((feature, i) => (
              <motion.div key={feature._key || i} variants={itemVariants} className="flex gap-6">
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                  i % 2 === 0 ? "bg-secondary-container text-secondary" : "bg-primary-container text-primary"
                )}>
                  <span className="material-symbols-outlined">{feature.icon || 'warning'}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  {feature.description && (
                    <p className="text-on-surface-variant leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {cta?.text && cta?.link && (
              <motion.div variants={itemVariants} className="pt-6">
                <CtaButton
                  text={cta.text}
                  href={cta.link}
                  variant={cta.buttonVariant ?? 'filled'}
                  color={cta.buttonColor}
                  size="lg"
                  className="hover:-translate-y-1"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

      </div>
    </BlockContainer>
  )
}
