import React from 'react'
import { cn } from '@/lib/utils'

export type ColorRef = {
  value: { current: string }
  hex?: string
  title?: string
}

export type BlockDesign = {
  backgroundColorRef?: ColorRef
  accentColorRef?: ColorRef
  containerStyle?: 'full-bleed' | 'rounded-container'
  topPadding?: 'none' | 'standard' | 'large' | 'larger'
  bottomPadding?: 'none' | 'standard' | 'large' | 'larger'
}

interface BlockContainerProps {
  design?: BlockDesign
  id?: string
  className?: string
  containerWidth?: string // Override the default 90% inner width e.g. '75%'
  children: React.ReactNode
}

// Static lookup for known surface tokens — maps to Tailwind classes
const KNOWN_BG_CLASSES: Record<string, string> = {
  'surface': 'bg-surface',
  'surface-container-low': 'bg-surface-container-low',
  'surface-container-highest': 'bg-surface-container-highest',
  'surface-warm': 'bg-surface-container-highest',  // pattern handled via mandaya-accent
  'primary-gradient': 'cta-gradient',
  'secondary-gradient': 'cta-gradient-secondary',
  'tertiary-gradient': 'cta-gradient-tertiary',
  'neutral-gradient': 'cta-gradient-neutral',
  'transparent': 'bg-transparent',
}

/**
 * Global wrapper for Composable Blocks.
 * Automatically resolves Sanity blockDesign fields into Tailwind classes based on "The Tropical Curator" rules.
 */
export function BlockContainer({ design, id, className, containerWidth = '75%', children }: BlockContainerProps) {
  const colorValue = design?.backgroundColorRef?.value?.current
  const colorHex = design?.backgroundColorRef?.hex

  const isWarm = colorValue === 'surface-warm'
  const bgClass = colorValue ? KNOWN_BG_CLASSES[colorValue] : undefined
  // Custom colors not in the static map fall back to a CSS var inline style
  const bgStyle = colorValue && !bgClass && !isWarm
    ? { backgroundColor: `var(--color-${colorValue}, ${colorHex ?? 'transparent'})` }
    : undefined

  // Resolve Padding
  const ptClasses = {
    'none': 'pt-0',
    'standard': 'pt-20',
    'large': 'pt-24',
    'larger': 'pt-32',
  }[design?.topPadding || 'none']

  const pbClasses = {
    'none': 'pb-0',
    'standard': 'pb-20',
    'large': 'pb-24',
    'larger': 'pb-32',
  }[design?.bottomPadding || 'none']

  const isRounded = design?.containerStyle === 'rounded-container'

  if (isRounded) {
    // surface-warm: mandaya pattern on outer section, solid bg on inner rounded div
    // custom colors: bgStyle applied to inner div only
    return (
      <section
        id={id}
        className={cn("w-full py-0", ptClasses, pbClasses, isWarm && "mandaya-accent")}
      >
        <div
          className={cn("mx-auto rounded-3xl overflow-hidden p-8 md:p-16 lg:p-24", bgClass, className)}
          style={{ width: containerWidth, ...(bgStyle ?? {}) }}
        >
          {children}
        </div>
      </section>
    )
  }

  // Full Bleed (Edge to Edge)
  return (
    <section
      id={id}
      className={cn("w-full", bgClass, isWarm && "mandaya-accent", ptClasses, pbClasses, className)}
      style={bgStyle}
    >
      <div className="mx-auto h-full" style={{ width: containerWidth }}>
        {children}
      </div>
    </section>
  )
}
