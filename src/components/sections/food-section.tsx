import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from './scroll-reveal'

const FOOD_TEASERS = [
  {
    id: 'seafood',
    title: 'Fresh Seafood',
    description: 'From the morning catch at Pujada Bay to grilled bangus — Mati\'s coast feeds the soul.',
    gradient: 'from-secondary/20 to-primary/10',
    icon: '🐟',
  },
  {
    id: 'local',
    title: 'Local Delicacies',
    description: 'Durian, marang, and kinilaw crafted with generations of Davaoeno tradition.',
    gradient: 'from-tertiary/10 to-secondary/10',
    icon: '🥭',
  },
  {
    id: 'street',
    title: 'Street Food',
    description: 'Isaw, balut, and fish balls along the heritage walk — the flavors of everyday Mati.',
    gradient: 'from-primary/10 to-tertiary/15',
    icon: '🍢',
  },
]

export function FoodSection() {
  return (
    <section className="section-gap bg-surface">
      <Container size="xl">
        <ScrollReveal>
          <SectionHeading
            label="Food & Dining"
            title="Taste the Wild East"
            description="A food scene shaped by the sea, the jungle, and the generosity of Mindanaoan culture."
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {FOOD_TEASERS.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <div
                className={`rounded-3xl p-8 bg-gradient-to-br ${item.gradient} bg-surface-low shadow-ambient flex flex-col gap-4`}
              >
                <span className="text-5xl" role="img" aria-label={item.title}>
                  {item.icon}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-on-surface">{item.title}</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.35} className="mt-12 flex justify-center">
          <Link href="/food">
            <Button variant="primary" size="lg">Explore Food Scene</Button>
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  )
}
