import React from 'react'
import { CtaButton } from '@/components/ui/cta-button'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { BlockContainer, type BlockDesign, type ColorRef } from './BlockContainer'
import { colorVar } from '@/lib/color'

interface TestimonialData {
  _key: string
  quote: string
  author: string
  role?: string
  authorAvatar?: any
  avatarColor?: ColorRef
  quoteIcon?: string
}

interface TestimonialsBlockProps {
  data: {
    _key: string
    _type: 'testimonialsBlock'
    design?: BlockDesign
    heading?: string
    headingItalic?: boolean
    testimonials?: TestimonialData[]
    cta?: {
      text: string
      link: string
      buttonVariant?: 'filled' | 'outlined' | 'text'
      buttonColor?: ColorRef
    }
  }
  dictionary?: any
}

export function TestimonialsBlockUI({ data, dictionary }: TestimonialsBlockProps) {
  const { design, heading, headingItalic, testimonials } = data

  const accent = colorVar(design?.accentColorRef)

  return (
    <BlockContainer design={design}>
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className={cn(
            "text-3xl md:text-4xl font-headline text-on-surface mb-16 text-center font-black",
            headingItalic && "italic font-serif font-normal"
          )}>
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((item, index) => (
            <div
              key={item._key || index}
              className="relative p-8 bg-surface-container-high rounded-3xl flex flex-col h-full"
            >
              {/* Quote Icon — floats above the card top edge */}
              <span
                className="material-symbols-outlined absolute -top-4 left-8"
                style={{ fontSize: '2rem', color: accent ?? 'var(--color-primary-container)' }}
              >
                {item.quoteIcon || 'format_quote'}
              </span>

              {/* Quote Text */}
              <p className="italic text-on-surface mb-6 flex-grow">
                "{item.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {item.authorAvatar ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={urlFor(item.authorAvatar).width(48).height(48).url()}
                      alt={item.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-full shrink-0"
                    style={{ backgroundColor: colorVar(item.avatarColor) ?? 'var(--color-secondary-fixed)' }}
                  />
                )}
                <div>
                  <p className="font-bold text-sm">{item.author}</p>
                  {item.role && (
                    <p className="text-xs text-on-surface-variant">{item.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.cta?.text && data.cta?.link && (
          <div className="mt-12 flex justify-center">
            <CtaButton
              text={data.cta.text}
              href={data.cta.link}
              variant={(data.cta.buttonVariant as any) === 'outline' ? 'outline' : (data.cta.buttonVariant as any) === 'ghost' ? 'ghost' : 'filled'}
              color={data.cta.buttonColor}
              icon={(data.cta as any).icon}
              defaultColor="primary"
            />
          </div>
        )}
      </div>
    </BlockContainer>
  )
}
