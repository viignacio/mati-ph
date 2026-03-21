import React from 'react'
import { HeroBlockUI } from './blocks/HeroBlockUI'
import { TextWithImageBlockUI } from './blocks/TextWithImageBlockUI'
import { CarouselBlockUI } from './blocks/CarouselBlockUI'
import { GridBlockUI } from './blocks/GridBlockUI'
import { CallToActionBlockUI } from './blocks/CallToActionBlockUI'
import { FeaturesBlockUI } from './blocks/FeaturesBlockUI'
import { TestimonialsBlockUI } from './blocks/TestimonialsBlockUI'

type PageBuilderProps = {
  blocks: any[]
  dictionary?: any
}

export function PageBuilder({ blocks, dictionary }: PageBuilderProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <main className="w-full flex-1 flex flex-col">
      {blocks.map((block, index) => {
        const key = block._key || String(index)
        
        switch (block._type) {
          case 'heroBlock':
            return <HeroBlockUI key={key} data={block} dictionary={dictionary} />
          case 'textWithImageBlock':
            return <TextWithImageBlockUI key={key} data={block} dictionary={dictionary} />
          case 'carouselBlock':
            return <CarouselBlockUI key={key} data={block} dictionary={dictionary} />
          case 'gridBlock':
            return <GridBlockUI key={key} data={block} dictionary={dictionary} />
          case 'callToActionBlock':
            return <CallToActionBlockUI key={key} data={block} dictionary={dictionary} />
          case 'featuresBlock':
            return <FeaturesBlockUI key={key} data={block} dictionary={dictionary} />
          case 'testimonialsBlock':
            return <TestimonialsBlockUI key={key} data={block} dictionary={dictionary} />
          default:
            console.warn(`Unknown block type: ${block._type}`)
            return null
        }
      })}
    </main>
  )
}
