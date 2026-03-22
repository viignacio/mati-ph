import React from 'react'
import { CtaButton } from '@/components/ui/cta-button'

type CarouselBlockProps = {
  data: any
  dictionary?: any
}

export function CarouselBlockUI({ data, dictionary }: CarouselBlockProps) {
  const readMoreLabel = dictionary?.readMoreBtn || 'View Details'

  return (
    <section className="py-20 bg-surface text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl mb-4">{data.heading}</h2>
        {data.description && (
          <p className="font-jakarta text-gray-600 mb-10 max-w-2xl mx-auto">
            {data.description}
          </p>
        )}
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
          {data.items?.map((item: any, i: number) => (
            <div key={item._id || i} className="min-w-[300px] bg-white shadow-lg rounded-3xl overflow-hidden snap-center flex-shrink-0 text-left">
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{item.name || item.title || 'Untitled'}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {item.tagline || 'Explore what this place has to offer.'}
                </p>
                <button className="text-primary font-semibold hover:underline">
                  {readMoreLabel}
                </button>
              </div>
            </div>
          ))}
          {(!data.items || data.items.length === 0) && (
            <p className="text-gray-400 italic">No items selected.</p>
          )}
        </div>

        {data.cta?.text && data.cta?.link && (
          <div className="mt-10 flex justify-center">
            <CtaButton
              text={data.cta.text}
              href={data.cta.link}
              variant={data.cta.buttonVariant ?? 'filled'}
              color={data.cta.buttonColor}
              icon={data.cta.icon}
              defaultColor="primary"
            />
          </div>
        )}
      </div>
    </section>
  )
}
