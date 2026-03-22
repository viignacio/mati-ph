import React from 'react'
import Image from 'next/image'
import { PortableText } from 'next-sanity'

type GridBlockProps = {
  data: any
  dictionary?: any
}

function AsymmetricMasonryGrid({ data }: GridBlockProps) {
  const items = data.manualItems || []
  const isArchipelago = data.layoutVariant === 'asymmetric-masonry'
  const isIslands = data.layoutVariant === 'masonry-captions'

  return (
    <section className="bg-surface-container-low py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl md:text-6xl text-on-surface leading-tight">{data.heading}</h2>
          </div>
          {data.description && (
            <p className="text-on-surface-variant max-w-sm mb-2 font-medium">{data.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item: any, i: number) => {
            const ref = item.reference
            if (!ref) return null
            
            // Stagger middle column if staggered is true
            const isStaggered = data.staggered && (i % 3 === 1) 
            const imgUrl = ref.mainImage?.asset?.url

            return (
              <div key={ref._id || i} className={`group ${isStaggered ? 'md:mt-12' : ''}`}>
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                  {imgUrl && (
                    <Image 
                      src={imgUrl} 
                      alt={ref.name || 'Grid item'} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    {ref.tagline && (
                      <span className="text-primary-fixed font-bold text-xs uppercase tracking-widest mb-2 block">
                        {ref.tagline}
                      </span>
                    )}
                    <h3 className="text-white text-3xl font-serif">{ref.name}</h3>
                    
                    {/* Archipelago of Wonders: shortDescription inside image */}
                    {isArchipelago && ref.shortDescription && (
                      <p className="text-white/80 text-sm mt-2">{ref.shortDescription}</p>
                    )}
                  </div>
                </div>
                
                {/* Pujada Bay Islands: richText description outside image */}
                {isIslands && ref.description && (
                  <div className="text-on-surface-variant leading-relaxed">
                    {typeof ref.description === 'string' ? (
                      <p>{ref.description}</p>
                    ) : (
                      <PortableText value={ref.description} />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StandardGrid({ data, dictionary }: GridBlockProps) {
  const readMoreBtn = dictionary?.readMoreBtn || 'Read More'
  
  return (
    <section className="py-24 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">{data.heading}</h2>
          {data.description && (
            <p className="font-body text-on-surface-variant max-w-2xl mx-auto">{data.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.manualItems ? data.manualItems.map((item: any, i: number) => {
            const ref = item.reference
            if (!ref) return null
            const imgUrl = ref.mainImage?.asset?.url

            return (
              <article key={ref._id || i} className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                  {imgUrl ? (
                    <Image src={imgUrl} alt={ref.name} fill className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400">Image</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-xs font-bold rounded-full uppercase tracking-wider">
                      {ref.category || 'Destination'}
                    </span>
                  </div>
                  <h3 className="font-bold font-serif text-2xl mb-2 group-hover:text-primary transition-colors">
                    {ref.name}
                  </h3>
                  <div className="text-gray-600 line-clamp-2 mb-4">
                    {typeof ref.description === 'string' ? (
                      <p>{ref.description}</p>
                    ) : (
                      ref.description ? <PortableText value={ref.description} /> : <p>Explore more about this destination.</p>
                    )}
                  </div>
                  <span className="inline-flex items-center text-primary font-semibold group-hover:underline">
                    {readMoreBtn} →
                  </span>
                </div>
              </article>
            )
          }) : (
            <div className="col-span-full text-center text-gray-500">No items selected</div>
          )}
        </div>
      </div>
    </section>
  )
}

export function GridBlockUI(props: GridBlockProps) {
  if (['asymmetric-masonry', 'masonry-captions'].includes(props.data.layoutVariant)) {
    return <AsymmetricMasonryGrid {...props} />
  }

  return <StandardGrid {...props} />
}
