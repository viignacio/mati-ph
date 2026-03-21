import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function CultureSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-on-surface">
      {/* Gradient overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-on-surface/80 to-secondary/70" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-container/10 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary-container/10 translate-y-1/3 -translate-x-1/4" />

      <Container size="xl" className="relative z-10 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-sans text-sm font-semibold tracking-widest uppercase text-primary-container mb-6 block">
            Indigenous Heritage
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight mb-8">
            The Mandaya People
          </h2>
          <p className="font-sans text-lg text-white/80 leading-relaxed mb-6">
            Long before Mati became a city, the Mandaya people — meaning "those who live upstream" —
            wove their stories into the mountains, rivers, and forests of Davao Oriental.
            Their intricate abaca weaving, oral epics, and vibrant warrior traditions continue to
            breathe life into Mati's cultural identity.
          </p>
          <p className="font-sans text-base text-white/70 leading-relaxed mb-10">
            Visit the Subangan Museum, witness traditional rituals at the Kinabayo Festival,
            and experience a culture that has thrived for centuries in harmony with the land.
          </p>
          <Link href="/culture">
            <Button variant="secondary" size="lg">
              Explore Culture & Heritage
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
