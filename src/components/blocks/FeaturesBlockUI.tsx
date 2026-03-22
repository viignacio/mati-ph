import React from 'react'
import Image from 'next/image'

type FeatureItem = {
  _key?: string
  title: string
  description?: string
  icon?: string
}

type FeaturesBlockData = {
  layoutVariant?: 'icon-list' | 'feature-list-with-image'
  tagline?: string
  heading?: string
  description?: string
  mainImage?: {
    asset: { url: string }
    alt?: string
  }
  imageTag?: string
  imagePosition?: 'left' | 'right'
  features?: FeatureItem[]
  cta?: {
    text?: string
    link?: string
    buttonStyle?: string
  }
}

function FeaturesIconList({ data }: { data: FeaturesBlockData }) {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        {data.tagline && <span className="text-tertiary font-bold uppercase tracking-[0.2em] mb-4 block">{data.tagline}</span>}
        <h2 className="text-4xl font-serif text-on-surface mb-4">{data.heading}</h2>
        {data.description && <p className="text-lg text-on-surface-variant mb-12 max-w-2xl">{data.description}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features?.map((feature: any, index: number) => (
            <div key={feature._key || index} className="p-6 bg-surface-container-low rounded-xl">
              {feature.icon && <span className="material-symbols-outlined text-3xl mb-4 text-primary block">{feature.icon}</span>}
              <h3 className="text-2xl font-bold font-serif text-on-surface mb-2">{feature.title}</h3>
              {feature.description && <p className="text-on-surface-variant">{feature.description}</p>}
            </div>
          ))}
          {data.cta?.text && (
            <div className="col-span-full pt-6">
              <a 
                href={data.cta.link || '#'}
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow hover:-translate-y-1 transition-all inline-block"
              >
                {data.cta.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function FeaturesWithImage({ data }: { data: FeaturesBlockData }) {
  const isRight = data.imagePosition === 'right'
  const imgUrl = data.mainImage?.asset?.url

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Image Column */}
        <div className={`relative ${isRight ? 'lg:order-last' : ''}`}>
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl z-10 bg-surface-container">
            {imgUrl && (
              <Image 
                src={imgUrl} 
                alt={data.heading || 'Feature image'} 
                fill 
                className="object-cover" 
              />
            )}
            {data.imageTag && (
              <div className="absolute top-8 left-8 bg-secondary text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg z-20">
                {data.imageTag}
              </div>
            )}
          </div>
          {/* Decorative Pattern Accent */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full -z-10 bg-[radial-gradient(circle,_#bc3000_1px,_transparent_1px)] bg-[size:10px_10px] opacity-30"></div>
        </div>

        {/* Content Column */}
        <div>
          {data.tagline && (
            <h3 className="text-tertiary font-bold uppercase tracking-[0.2em] mb-4">{data.tagline}</h3>
          )}
          {data.heading && (
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 leading-tight">{data.heading}</h2>
          )}
          {data.description && (
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">{data.description}</p>
          )}

          <div className="space-y-10">
            {data.features?.map((feature: any, index: number) => (
              <div key={feature._key || index} className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-3xl">{feature.icon || 'star'}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  {feature.description && (
                    <p className="text-on-surface-variant leading-relaxed">{feature.description}</p>
                  )}
                </div>
              </div>
            ))}

            {data.cta?.text && (
              <div className="pt-6">
                <a 
                  href={data.cta.link || '#'}
                  className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all inline-block"
                >
                  {data.cta.text}
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export function FeaturesBlockUI({ data, dictionary }: { data: FeaturesBlockData, dictionary?: any }) {
  if (data.layoutVariant === 'feature-list-with-image') {
    return <FeaturesWithImage data={data} />
  }
  return <FeaturesIconList data={data} />
}
