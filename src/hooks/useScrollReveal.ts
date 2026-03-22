'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' as never })
  const prefersReducedMotion = useReducedMotion()
  return { ref, isInView: prefersReducedMotion ? true : isInView }
}
