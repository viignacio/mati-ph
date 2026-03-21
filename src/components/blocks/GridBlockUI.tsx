import React from 'react'

type GridBlockProps = {
  data: any
  dictionary?: any
}

export function GridBlockUI({ data, dictionary }: GridBlockProps) {
  const readMoreBtn = dictionary?.readMoreBtn || 'Read More'
  
  // In a real implementation we would fetch or accept the actual list of destinations/activities here.
  // For the builder, we just map out a grid layout.
  return (
    <section className="py-24 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl mb-4">{data.heading}</h2>
          {data.description && (
            <p className="font-jakarta text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder grid items since items belong to the specific query of the content type */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                {/* Image Placeholder */}
                <span className="absolute inset-0 flex items-center justify-center text-gray-400">Image {i}</span>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-xs font-bold rounded-full uppercase tracking-wider">
                    {data.contentType}
                  </span>
                </div>
                <h3 className="font-bold text-2xl mb-2 group-hover:text-primary transition-colors">
                  Sample Item {i}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  A wonderful place to visit in Mati City.
                </p>
                <span className="inline-flex items-center text-primary font-semibold group-hover:underline">
                  {readMoreBtn} →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
