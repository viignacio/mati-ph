import React from 'react'

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
        <div className="absolute inset-0 mix-blend-overlay opacity-50 z-0 bg-gray-800">
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
          <a
            href={data.buttonLink}
            className="px-10 py-5 bg-white text-primary hover:bg-surface hover:scale-105 transition-all duration-300 font-bold text-lg rounded-full shadow-xl"
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
