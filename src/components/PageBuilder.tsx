import { HeroBlock } from './blocks/HeroBlock'
import { TextWithImageBlock } from './blocks/TextWithImageBlock'
import { CarouselBlockUI } from './blocks/CarouselBlockUI'
import { GridBlock } from './blocks/GridBlock'
import { CallToActionBlockUI } from './blocks/CallToActionBlockUI'
import { FeaturesBlock } from './blocks/FeaturesBlock'
import { TestimonialsBlockUI } from './blocks/TestimonialsBlockUI'
import { LogisticsBlockUI } from './blocks/LogisticsBlockUI'
import { ScrollReveal } from './sections/scroll-reveal'
// Old UI imports dropped

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
            return <HeroBlock key={key} data={block} />
          case 'textWithImageBlock':
            return <TextWithImageBlock key={key} data={block} />
          case 'carouselBlock':
            return <ScrollReveal key={key}><CarouselBlockUI data={block} dictionary={dictionary} /></ScrollReveal>
          case 'gridBlock':
            return <GridBlock key={key} data={block} />
          case 'callToActionBlock':
            return <ScrollReveal key={key}><CallToActionBlockUI data={block} dictionary={dictionary} /></ScrollReveal>
          case 'featuresBlock':
            return <FeaturesBlock key={key} data={block} />
          case 'testimonialsBlock':
            return <ScrollReveal key={key}><TestimonialsBlockUI data={block} dictionary={dictionary} /></ScrollReveal>
          case 'logisticsBlock':
            return <ScrollReveal key={key}><LogisticsBlockUI data={block} /></ScrollReveal>
          default:
            console.warn(`Unknown block type: ${block._type}`)
            return null
        }
      })}
    </main>
  )
}
