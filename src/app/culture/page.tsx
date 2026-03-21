import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { ScrollReveal } from '@/components/sections/scroll-reveal'

export const metadata: Metadata = {
  title: 'Culture & Heritage',
  description: 'Discover the rich Mandaya culture, indigenous traditions, the Subangan Museum, and vibrant festivals of Mati City.',
}

const CULTURE_SECTIONS = [
  {
    id: 'mandaya',
    label: 'Indigenous People',
    title: 'The Mandaya',
    body: [
      'The Mandaya are one of the indigenous peoples of Davao Oriental, their name meaning "those who live upstream" or "first people of the upper land." For centuries they have thrived along the highlands and rivers of eastern Mindanao, weaving intricate abaca cloth, chanting oral epics called "uggayam," and practicing animist rituals in harmony with nature.',
      'Today Mandaya culture is both preserved and celebrated in Mati. Their distinctive geometric patterns appear on weavings sold at local markets, while their warrior dances and rituals are central to the Kinabayo and Hugyaw Mandaya festivals each year.',
    ],
  },
  {
    id: 'museum',
    label: 'Local Museum',
    title: 'Subangan Museum',
    body: [
      'The Subangan Museum in the heart of Mati City is the gateway to Davao Oriental\'s natural and cultural heritage. "Subangan" means "the place where the sun rises" — a fitting name for a collection that illuminates the region\'s storied past.',
      'Exhibits span prehistoric artifacts, Mandaya traditional wear and weapons, colonial-era photographs, and natural history displays showcasing Davao Oriental\'s extraordinary biodiversity. A visit here anchors every journey through Mati in genuine historical context.',
    ],
  },
  {
    id: 'festivals',
    label: 'Celebrations',
    title: 'Festivals of Mati',
    body: [
      'Mati\'s calendar overflows with color and music. The Kinabayo Festival in July commemorates the Battle of Covadonga with a spectacular street dance depicting the Christian-Moro conflict. Hugyaw Mandaya celebrates indigenous culture through dance competitions, weaving exhibitions, and tribal rituals.',
      'Buling-buling Festival heralds the new year with revelry along the coast, while the Mati City Fiesta in honor of the patron saint San Nicolas de Tolentino draws pilgrims and visitors alike each September.',
    ],
  },
]

export default function CulturePage() {
  return (
    <>
      {/* Hero banner */}
      <div className="relative min-h-[50vh] flex items-end overflow-hidden bg-on-surface pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-on-surface/90 to-secondary/60" />
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-primary-container/10 translate-x-1/3" />
        <Container size="xl" className="relative z-10 pb-16">
          <span className="font-sans text-sm font-semibold tracking-widest uppercase text-primary-container mb-4 block">
            Heritage &amp; Tradition
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-tight max-w-3xl">
            Culture &amp; Heritage
          </h1>
          <p className="mt-4 font-sans text-xl text-white/70 max-w-xl">
            Thousands of years of Mandaya tradition, living and thriving in the Wild East.
          </p>
        </Container>
      </div>

      {/* Sections */}
      <div className="bg-surface">
        {CULTURE_SECTIONS.map((section, i) => (
          <section
            key={section.id}
            className={`section-gap ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-dim'}`}
          >
            <Container size="md">
              <ScrollReveal>
                <span className="font-sans text-sm font-semibold tracking-widest uppercase text-tertiary mb-4 block">
                  {section.label}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-on-surface tracking-tight leading-tight mb-8">
                  {section.title}
                </h2>
                <div className="space-y-5">
                  {section.body.map((para, j) => (
                    <p key={j} className="font-sans text-lg text-on-surface-variant leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            </Container>
          </section>
        ))}
      </div>

      {/* Festivals CTA */}
      <div className="section-gap bg-surface-highest">
        <Container size="xl">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center gap-6">
              <SectionHeading
                label="Join the Celebration"
                title="Witness Living Culture"
                description="The best way to understand Mati is to celebrate with its people. Plan your visit around one of these vibrant festivals."
              />
              <Link href="/destinations">
                <Button variant="primary" size="lg">Explore All Destinations</Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </div>
    </>
  )
}
