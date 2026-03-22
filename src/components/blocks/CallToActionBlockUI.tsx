import React from 'react'
import { CtaButton } from '@/components/ui/cta-button'

type CallToActionBlockProps = {
  data: any
  dictionary?: any
}

export function CallToActionBlockUI({ data, dictionary }: CallToActionBlockProps) {
  return (
    <section className="relative py-32 px-6 flex items-center justify-center text-center overflow-hidden">
      {/* Background with a primary gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-tertiary z-0"></div>

      {/* If data.backgroundImage exists, render it with opacity */}
      {data.backgroundImage && (
        <div className="absolute inset-0 mix-blend-overlay opacity-50 z-0 bg-surface-inverse">
          {/* Placeholder for actual SanityImage element */}
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {data.subheading && (
          <span className="font-caveat text-3xl text-secondary mb-4 drop-shadow-md">
            {data.subheading}
          </span>
        )}
        <h2 className="font-playfair text-5xl md:text-6xl text-white font-bold mb-8 drop-shadow-lg leading-tight">
          {data.heading}
        </h2>

        {data.buttonText && data.buttonLink && (
          <CtaButton
            text={data.buttonText}
            href={data.buttonLink}
            color={data.buttonColor}
            defaultColor="surface-container-lowest"
            size="lg"
            className="hover:scale-105 hover:-translate-y-0 duration-300 shadow-xl"
          />
        )}
      </div>
    </section>
  )
}
