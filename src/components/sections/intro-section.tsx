import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { ScrollReveal } from './scroll-reveal'

const STATS = [
  { value: '27km', label: 'of Coastline', icon: '🌊' },
  { value: 'World-Class', label: 'Surfing', icon: '🏄' },
  { value: '7', label: 'Pristine Islands', icon: '🏝️' },
  { value: 'Mandaya', label: 'Heritage', icon: '🎭' },
]

export function IntroSection() {
  return (
    <section className="section-gap bg-surface">
      <Container size="xl">
        <ScrollReveal>
          <SectionHeading
            label="About Mati"
            title="Where Philippines Gets Wilder"
            description="Nestled at the southeastern tip of Davao Oriental, Mati City is a pristine paradise where turquoise waters meet rugged mountains, rich culture, and warm Mindanaoan hospitality."
          />
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center gap-3">
                <span className="text-4xl" role="img" aria-label={stat.label}>
                  {stat.icon}
                </span>
                <span className="font-serif text-5xl font-semibold text-primary leading-none">
                  {stat.value}
                </span>
                <span className="font-sans text-sm text-on-surface-variant uppercase tracking-widest leading-tight">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
