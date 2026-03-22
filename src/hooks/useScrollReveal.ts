'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' as never })
  return { ref, isInView }
}
