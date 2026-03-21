import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/sections/scroll-reveal'

export const metadata: Metadata = {
  title: 'About Mati City',
  description: 'Learn about Mati City — its geography, history, people, and why it\'s called the tourism capital of Davao Oriental, Philippines.',
}

const FACTS = [
  { label: 'Province', value: 'Davao Oriental' },
  { label: 'Region', value: 'Davao Region (XI)' },
  { label: 'Population', value: '~135,000' },
  { label: 'Area', value: '617 km²' },
  { label: 'Coastline', value: '27 km' },
  { label: 'Elevation', value: '0 – 1,800 m' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="pt-32 pb-20 bg-surface-dim">
        <Container size="xl">
          <div className="max-w-3xl">
            <span className="font-sans text-sm font-semibold tracking-widest uppercase text-tertiary mb-4 block">
              Davao Oriental, Philippines
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-on-surface tracking-tight leading-tight mb-6">
              About Mati City
            </h1>
            <p className="font-sans text-xl text-on-surface-variant leading-relaxed">
              Where the Pacific meets the Philippines — Mati is the provincial capital and tourism
              heart of Davao Oriental, a city shaped by sea, mountain, and centuries of culture.
            </p>
          </div>
        </Container>
      </div>

      {/* Geography */}
      <section className="section-gap bg-surface">
        <Container size="md">
          <ScrollReveal>
            <span className="font-sans text-sm font-semibold tracking-widest uppercase text-tertiary mb-4 block">
              Geography
            </span>
            <h2 className="font-serif text-4xl font-semibold text-on-surface mb-6">
              Land of Contrasts
            </h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-5">
              Mati City occupies the southeastern corner of Mindanao, facing the Pacific Ocean to the
              east. Its geography is dramatic — coral-fringed beaches and crystal lagoons give way to
              steep forested ridges and Pujada Bay, one of the most biodiverse marine sanctuaries in
              the Philippines.
            </p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-5">
              The city encompasses 617 square kilometers of varied terrain: mangrove-lined estuaries,
              karst hills, agricultural lowlands, and the spine of the Pujada Peninsula. Offshore lie
              seven islands of the Pujada Archipelago, each a world unto itself.
            </p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              The climate is tropical with no defined dry season — the sea breezes moderate the heat,
              making Mati enjoyable year-round. Peak surfing season runs October through March when
              northeast swells power through the Pacific.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* History */}
      <section className="section-gap bg-surface-dim">
        <Container size="md">
          <ScrollReveal>
            <span className="font-sans text-sm font-semibold tracking-widest uppercase text-tertiary mb-4 block">
              History
            </span>
            <h2 className="font-serif text-4xl font-semibold text-on-surface mb-6">
              Roots Run Deep
            </h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-5">
              The Mandaya people settled the Mati watershed long before Spanish colonization, building
              communities along river systems and practicing a rich animist tradition. Spanish
              missionaries established a mission in the 17th century, and the town slowly grew around
              the mouth of the Mati River.
            </p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-5">
              American colonial governance in the early 20th century brought infrastructure, schools,
              and the first road connections to the rest of Mindanao. The municipality steadily grew
              and was officially chartered as a component city in 2007, becoming one of the youngest
              cities in the Philippines.
            </p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              Today Mati is recognized as the eco-tourism gateway of Davao Oriental, drawing surfers,
              divers, island-hoppers, and cultural travelers from around the world.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Quick Facts */}
      <section className="section-gap bg-surface">
        <Container size="xl">
          <ScrollReveal>
            <SectionHeading label="At a Glance" title="Mati by the Numbers" />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {FACTS.map((fact, i) => (
              <ScrollReveal key={fact.label} delay={i * 0.08}>
                <div className="bg-surface-low rounded-3xl p-6 shadow-ambient text-center">
                  <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest mb-2">{fact.label}</p>
                  <p className="font-serif text-2xl font-semibold text-on-surface">{fact.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <div className="section-gap cta-gradient">
        <Container size="xl">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
              Ready to Visit Mati?
            </h2>
            <p className="font-sans text-lg text-white/80 max-w-xl">
              Plan your journey with our comprehensive travel guides and start exploring.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/travel-guide">
                <Button variant="secondary" size="lg">View Travel Guide</Button>
              </Link>
              <Link href="/destinations">
                <Button variant="tertiary" size="lg" className="text-white decoration-white hover:text-white/80">
                  Explore Destinations
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
