import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface pt-24">
      <Container size="sm">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Decorative wave shapes */}
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full bg-primary-container/40" />
            <div className="absolute inset-4 rounded-full bg-primary-container/30" />
            <div className="absolute inset-8 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="font-serif text-4xl font-semibold text-primary">404</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-on-surface tracking-tight leading-tight">
            Island Not Found
          </h1>
          <p className="font-sans text-lg text-on-surface-variant leading-relaxed max-w-sm">
            Looks like this island drifted off the map. Let&apos;s get you back to shore.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">Back to Home</Button>
            </Link>
            <Link href="/destinations">
              <Button variant="secondary" size="lg">Browse Destinations</Button>
            </Link>
          </div>

          <p className="font-sans text-sm text-on-surface-variant mt-4">
            Or try exploring{' '}
            <Link href="/travel-guide" className="text-primary underline underline-offset-2 hover:text-primary/80">
              the travel guide
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  )
}
