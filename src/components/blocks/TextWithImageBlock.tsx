'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { urlFor } from '@/sanity/lib/image'
import { BlockContainer, type BlockDesign } from './BlockContainer'
import { cn } from '@/lib/utils'
import { CtaButton } from '@/components/ui/cta-button'
import { PortableText } from '@/components/portable-text'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const ease = [0.22, 1, 0.36, 1] as const

interface TextWithImageBlockProps {
  data: {
    _key: string
    _type: 'textWithImageBlock'
    design?: BlockDesign
    layoutVariant?: 'standard-split' | 'split-container'
    tagline?: string
    heading?: string
    preamble?: string
    content?: any // RichText portable text
    date?: string
    cta?: {
      text?: string
      link?: string
      buttonVariant?: 'filled' | 'outline' | 'ghost'
      buttonColor?: any
      icon?: string
    }
    images?: any[]
    imagePosition?: 'left' | 'right'
  }
}

export function TextWithImageBlock({ data }: TextWithImageBlockProps) {
  const { 
    design, 
    layoutVariant = 'split-container', 
    tagline, 
    heading, 
    preamble, 
    content,
    date, 
    cta, 
    images, 
    imagePosition = 'right' 
  } = data

  const isLeft = imagePosition === 'left'

  const { ref, isInView } = useScrollReveal()

  // Attempt to nicely format date if it matches "MON YYYY" pattern
  const dateParts = date ? date.split(' ') : []
  const hasFormattedDate = dateParts.length === 2

  return (
    <BlockContainer design={design} className="relative overflow-hidden">

      {/* Decorative accent for split-container specifically */}
      {layoutVariant === 'split-container' && (
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(188,48,0,0.2)_5px,rgba(188,48,0,0.2)_10px)] opacity-10 pointer-events-none"></div>
      )}

      {/* Main Container */}
      <div
        ref={ref}
        className={cn(
          "relative z-10 flex flex-col items-center gap-12",
          "md:flex-row"
        )}
      >

        {/* Text Content */}
        <motion.div
          className={cn(
            "w-full md:w-1/2 space-y-6",
            isLeft ? "order-2 md:order-2" : "order-2 md:order-1"
          )}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6, ease }}
        >
          {tagline && (
            <span className="text-tertiary font-bold uppercase tracking-[0.2em] mb-4 block">
              {tagline}
            </span>
          )}
          
          {heading && (
            <h2 className="text-4xl md:text-5xl font-headline font-black mb-6 text-on-background">
              {heading}
            </h2>
          )}
          
          {preamble && (
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              {preamble}
            </p>
          )}

          {content && (
            <div className="mb-8">
              <PortableText value={content} />
            </div>
          )}

          {/* Special Date Block */}
          {date && (
            <div className="flex items-center gap-6 mb-10">
              {hasFormattedDate ? (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-black text-tertiary">{dateParts[0]}</div>
                    <div className="text-sm font-bold opacity-60">Month</div>
                  </div>
                  <div className="h-10 w-px bg-outline-variant/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-tertiary">{dateParts[1]}</div>
                    <div className="text-sm font-bold opacity-60">Year</div>
                  </div>
                </>
              ) : (
                <div className="text-xl font-black text-tertiary uppercase tracking-widest">{date}</div>
              )}
            </div>
          )}

          {cta?.text && cta?.link && (
            <CtaButton
              text={cta.text}
              href={cta.link}
              variant={cta.buttonVariant ?? 'filled'}
              color={cta.buttonColor}
              icon={cta.icon}
              defaultColor="tertiary"
              className="hover:scale-105 shadow-tertiary/20"
            />
          )}
        </motion.div>

        {/* Image Grid */}
        {images && images.length > 0 && (
          <motion.div
            className={cn(
              "w-full md:w-1/2 grid gap-4",
              isLeft ? "order-1 md:order-1" : "order-1 md:order-2",
              images.length === 2 ? "grid-cols-2" : (images.length === 3 ? "grid-cols-3" : "grid-cols-1")
            )}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className={cn(
                  "relative w-full aspect-[3/4]",
                  images.length > 1 && i % 2 === 0 ? "translate-y-8" : ""
                )}
              >
                <Image
                  src={urlFor(img).url()}
                  alt={heading ? `${heading} image ${i + 1}` : `Content image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover rounded-3xl shadow-xl"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>

    </BlockContainer>
  )
}
