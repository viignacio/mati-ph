import React from 'react'
import { cn } from '@/lib/utils'

export type BlockDesign = {
  backgroundColor?: 'surface' | 'surface-container-low' | 'surface-container-highest' | 'primary-gradient' | 'transparent'
  containerStyle?: 'full-bleed' | 'rounded-container'
  topPadding?: 'none' | 'standard' | 'large'
  bottomPadding?: 'none' | 'standard' | 'large'
}

interface BlockContainerProps {
  design?: BlockDesign
  id?: string
  className?: string
  containerWidth?: string // Override the default 90% inner width e.g. '75%'
  children: React.ReactNode
}

/**
 * Global wrapper for Composable Blocks.
 * Automatically resolves Sanity blockDesign fields into Tailwind classes based on "The Tropical Curator" rules.
 */
export function BlockContainer({ design, id, className, containerWidth = '90%', children }: BlockContainerProps) {
  // Resolve Background Color (Layering Rule)
  const bgClasses = {
    'surface': 'bg-surface',
    'surface-container-low': 'bg-surface-container-low',
    'surface-container-highest': 'bg-surface-container-highest',
    'primary-gradient': 'bg-gradient-to-br from-primary to-primary-container',
    'transparent': 'bg-transparent',
  }[design?.backgroundColor || 'transparent']

  // Resolve Padding
  const ptClasses = {
    'none': 'pt-0',
    'standard': 'pt-20',
    'large': 'pt-24',
  }[design?.topPadding || 'none']

  const pbClasses = {
    'none': 'pb-0',
    'standard': 'pb-20',
    'large': 'pb-24',
  }[design?.bottomPadding || 'none']

  // Resolve Container Style
  // A rounded container has a max width, horizontal padding, and is centered with rounded corners.
  const isRounded = design?.containerStyle === 'rounded-container'
  
  // If it's a rounded-container, the outer section acts as a wrapper, and the background is applied to an inner div.
  // If full-bleed, the background is on the section.
  
  if (isRounded) {
    return (
      <section id={id} className={cn("w-full py-0", ptClasses, pbClasses)}>
        <div className={cn("mx-auto rounded-3xl overflow-hidden p-8 md:p-16 lg:p-24", bgClasses, className)} style={{ width: containerWidth }}>
          {children}
        </div>
      </section>
    )
  }

  // Full Bleed (Edge to Edge)
  return (
    <section 
      id={id} 
      className={cn(
        "w-full",
        bgClasses,
        ptClasses,
        pbClasses,
        className
      )}
    >
      <div className="mx-auto" style={{ width: containerWidth }}>
        {children}
      </div>
    </section>
  )
}
