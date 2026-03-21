import React from 'react'

export function FeaturesBlockUI({ data, dictionary }: any) {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-on-surface mb-4">{data.heading}</h2>
        {data.description && <p className="text-lg text-on-surface-variant mb-12 max-w-2xl">{data.description}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features?.map((feature: any, index: number) => (
            <div key={feature._key || index} className="p-6 bg-surface-container-low rounded-xl">
              <h3 className="text-2xl font-bold font-serif text-on-surface mb-2">{feature.title}</h3>
              {feature.description && <p className="text-on-surface-variant">{feature.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
