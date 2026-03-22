import type { ColorRef } from '@/components/blocks/BlockContainer'

export type { ColorRef }

/**
 * Resolves a Sanity ColorRef to a CSS custom property expression.
 * Returns undefined when no color is configured — callers should provide a fallback.
 */
export function colorVar(color?: ColorRef): string | undefined {
  if (!color?.value?.current) return undefined
  return `var(--color-${color.value.current}, ${color.hex ?? 'inherit'})`
}

/**
 * Resolves the semantic "on" (text/icon) color for a given background ColorRef.
 * Uses the CSS --color-on-{token} convention with a dark fallback (#003430).
 * @param fallbackToken  CSS token to use when no ColorRef is provided (default: 'primary')
 */
export function onColorVar(color?: ColorRef, fallbackToken = 'primary'): string {
  if (!color?.value?.current) return `var(--color-on-${fallbackToken}, #003430)`
  return `var(--color-on-${color.value.current}, #003430)`
}
