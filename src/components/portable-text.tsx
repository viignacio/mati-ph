import { PortableText as SanityPortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-on-surface tracking-tight leading-tight mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-on-surface tracking-tight leading-tight mt-10 mb-5 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-on-surface leading-snug mt-8 mb-4 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="font-serif text-xl font-semibold text-on-surface leading-snug mt-6 mb-3 first:mt-0">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-sans text-base text-on-surface-variant leading-relaxed mb-5 last:mb-0">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic">
        <p className="font-serif text-xl text-on-surface leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="font-sans text-base text-on-surface-variant leading-relaxed mb-5 space-y-2 list-none pl-0">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="font-sans text-base text-on-surface-variant leading-relaxed mb-5 space-y-2 list-none pl-0 counter-reset-[item]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3">
        <span className="mt-0.5 h-6 w-6 rounded-full bg-primary-container text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">
          {/* counter managed externally */}
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-on-surface">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      const src = urlFor(value).width(1200).auto('format').url()
      return (
        <figure className="my-10 rounded-3xl overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={src}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-sans text-sm text-on-surface-variant">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null

  return (
    <div className={cn('prose-none', className)}>
      <SanityPortableText value={value} components={components} />
    </div>
  )
}
