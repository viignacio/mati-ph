'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { colorVar, onColorVar, type ColorRef } from '@/lib/color'

const sizeClasses = {
  sm: 'px-6 py-2 text-sm',
  md: 'px-8 py-3',
  lg: 'px-10 py-4 text-lg',
} as const

export interface CtaButtonProps {
  text: string
  href?: string
  /** Visual style of the button */
  variant?: 'filled' | 'outline' | 'ghost'
  /** Sanity ColorRef for CMS-driven color. Overrides defaultColor when present. */
  color?: ColorRef
  /** CSS token name used when no ColorRef is provided. Defaults to 'primary'. */
  defaultColor?: string
  size?: 'sm' | 'md' | 'lg'
  /** Material Symbols icon name shown after the label */
  icon?: string
  className?: string
  onClick?: () => void
}

export function CtaButton({
  text,
  href,
  variant = 'filled',
  color,
  defaultColor = 'primary',
  size = 'md',
  icon,
  className,
  onClick,
}: CtaButtonProps) {
  const bg = colorVar(color) ?? `var(--color-${defaultColor})`
  const textCol = onColorVar(color, defaultColor)

  let style: React.CSSProperties
  let variantClasses: string

  switch (variant) {
    case 'outline':
      style = { borderColor: bg, color: bg }
      variantClasses = 'rounded-full border-2'
      break
    case 'ghost':
      style = { color: bg }
      variantClasses = ''
      break
    default: // filled
      style = { backgroundColor: bg, color: textCol }
      variantClasses = 'rounded-full shadow-lg hover:-translate-y-0.5'
  }

  const content = (
    <>
      {text}
      {icon && (
        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[inherit]">
          {icon}
        </span>
      )}
    </>
  )

  const cls = cn(
    'group inline-flex items-center gap-2 font-bold transition-all',
    variant !== 'ghost' && sizeClasses[size],
    variantClasses,
    className,
  )

  if (href) {
    return (
      <Link href={href} className={cls} style={style} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={cls} style={style} onClick={onClick}>
      {content}
    </button>
  )
}
