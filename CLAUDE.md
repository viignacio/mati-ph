# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tourism website for Mati City, Davao Oriental, Philippines. One-stop destination guide for beaches, islands, surfing, cultural heritage, festivals, food, and travel logistics.

## Tech Stack

- **Next.js 16.2** (App Router, Turbopack, React 19.2)
- **Sanity CMS** (embedded Studio at `/studio`, `next-sanity` integration with `defineLive`)
- **Tailwind CSS** with custom tropical color tokens
- **TypeScript**
- **motion** (formerly Framer Motion) for scroll-triggered animations
- **Deployed on Vercel**

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npx sanity typegen generate  # Regenerate Sanity TypeGen types after schema changes
```

## Architecture

### Data Flow

All pages are **Server Components** by default. Data flows from Sanity CMS via `defineLive` (`src/sanity/lib/live.ts`) which handles fetching, caching, and real-time updates. Only interactive UI (scroll animations, filters, mobile menu, galleries) uses `'use client'`. Data is fetched in server components and passed as props to client wrappers — never fetch in client components.

### Sanity Integration

- **Client:** `src/sanity/lib/client.ts` — shared `createClient` instance
- **Queries:** `src/sanity/lib/queries.ts` — all GROQ queries use `defineQuery` for TypeGen
- **Images:** `src/sanity/lib/image.ts` — `urlFor()` helper wrapping `@sanity/image-url`
- **Studio:** Embedded at `src/app/studio/[[...tool]]/page.tsx`
- **Revalidation:** Webhook handler at `src/app/api/revalidate/route.ts`

After modifying any schema in `src/sanity/schemaTypes/`, run `npx sanity typegen generate` to update `sanity.types.ts`.

### Content Modeling

- Destination/Activity use **references** (not embedding) for cross-linking
- SEO and location are **embedded objects** (page-specific metadata)
- Categories use **string option lists** (not separate taxonomy documents)
- Rich content fields use **Portable Text**, rendered via `src/components/portable-text.tsx`

### Component Organization

- `src/components/ui/` — Base primitives (Button, Card, Badge, Container). Card uses compound component pattern (Card.Root, Card.Image, Card.Body, Card.Title).
- `src/components/sections/` — Page sections (Hero, FeaturedDestinations, CTA). `scroll-reveal.tsx` is the shared `'use client'` InView animation wrapper.
- `src/components/layout/` — Navbar, Footer, MobileMenu

### SEO Pattern

Every page exports `generateMetadata` pulling from Sanity's SEO object with `coalesce()` fallbacks. Detail pages export `generateStaticParams`. JSON-LD structured data via `src/components/json-ld.tsx`.

## Design System

### Colors (Tailwind tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `ocean` | `#0D9488` | Primary — buttons, links, nav highlights |
| `tropical` | `#059669` | Secondary — badges, accents |
| `sunset` | `#EA580C` | CTA buttons, attention elements |
| `sand` | `#FFFBF5` | Page background |
| `deep` | `#0F172A` | Body text |

### Typography

- **Playfair Display** (`font-serif`) — headings only
- **Inter** (`font-sans`) — body text, UI elements
- **Caveat** (`font-accent`) — decorative labels, handwritten accents

Fonts loaded via `next/font/google` with CSS variables in `src/app/layout.tsx`.

### Visual Rules

- Light mode only (no dark mode)
- Animations: 150-300ms, respect `prefers-reduced-motion`
- Use SVG icons (Lucide), never emojis as icons
- Hero images get `priority={true}`, all others lazy-loaded
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
