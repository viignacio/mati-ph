'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface pt-24">
      <Container size="sm">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-tertiary-container flex items-center justify-center">
            <span className="font-serif text-3xl font-semibold text-tertiary">!</span>
          </div>
          <h1 className="font-serif text-4xl font-semibold text-on-surface">Something went wrong</h1>
          <p className="font-sans text-base text-on-surface-variant leading-relaxed max-w-sm">
            We hit an unexpected wave. Please try again or head back to explore Mati.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" onClick={reset}>Try Again</Button>
            <Link href="/">
              <Button variant="secondary">Go Home</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
