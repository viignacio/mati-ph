import React from 'react'
import { PortableText } from '@portabletext/react'

type TextWithImageBlockProps = {
  data: any
  dictionary?: any
}

export function TextWithImageBlockUI({ data, dictionary }: TextWithImageBlockProps) {
  const isImageRight = data.imagePosition === 'right'

  return (
    <section className="py-24 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className={`flex-1 ${!isImageRight ? 'md:order-2' : 'md:order-1'}`}>
          {data.heading && <h2 className="font-playfair text-4xl mb-6">{data.heading}</h2>}
          <div className="prose prose-lg font-jakarta text-gray-700">
            {data.content && <PortableText value={data.content} />}
          </div>
        </div>
        <div className={`flex-1 ${!isImageRight ? 'md:order-1' : 'md:order-2'} w-full`}>
          {/* Placeholder for SanityImage */}
          <div className="aspect-[4/3] bg-gray-200 rounded-2xl w-full flex items-center justify-center overflow-hidden">
            {data.image ? (
               <span className="text-gray-500">[Sanity Image Component Here]</span>
            ) : (
               <span className="text-gray-400">No Image Selected</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
