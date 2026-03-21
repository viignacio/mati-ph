import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="section-gap cta-gradient">
      <Container size="xl">
        <div className="flex flex-col items-center text-center gap-8">
          <span className="font-sans text-sm font-semibold tracking-widest uppercase text-on-primary/70">
            Start Your Journey
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight max-w-3xl">
            Ready to Experience Mati?
          </h2>
          <p className="font-sans text-lg text-white/80 max-w-xl leading-relaxed">
            Plan your perfect escape to the Wild East of the Philippines.
            Beaches, culture, adventure — all waiting for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/destinations">
              <Button variant="secondary" size="lg">
                Browse Destinations
              </Button>
            </Link>
            <Link href="/travel-guide">
              <Button
                variant="tertiary"
                size="lg"
                className="text-white decoration-white hover:text-white/80"
              >
                View Travel Guide
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
