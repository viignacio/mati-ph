# Mati, Davao Oriental - Tourism Website

## Context

Build a tourism website for Mati City, Davao Oriental, Philippines — a one-stop destination guide showcasing beaches, islands, surfing, cultural heritage, festivals, food, and travel logistics. The site should feel tropical, vibrant, warm, and inviting, reflecting Mati's turquoise waters, white sand beaches, lush greenery, and colorful Mandaya culture.

**Tech stack:** Next.js 16.2 (App Router, Turbopack), Sanity CMS, Tailwind CSS, TypeScript, deployed on Vercel.

**Component architecture:** Using `vercel-composition-patterns` for React composition (compound components, render props, context providers).

**Theme:** Light mode only. Tropical aesthetic works best with bright, warm backgrounds. Dark mode can be added later.

**Hero:** Full-screen video/slideshow with auto-advancing Sanity-powered slides.

---

## Design System

> **CRITICAL**: For all UI components, colors, typography, styling, and visual rules, **ALWAYS refer to `DESIGN.md` as the single source of truth**.

- **Theme Strategy**: "The Tropical Curator" (editorial travel magazine feel)
- **Palette**: `surface`, `primary`, `secondary`, `tertiary` (from `DESIGN.md`). Do NOT use legacy colors.
- **Typography**: Noto Serif, Plus Jakarta Sans. Do NOT use Playfair Display or Inter.
- **Visual Style**:
  - The "No-Line" Rule and Glassmorphism
  - Asymmetrical Compositions and Organic Layering
  - Adhere strictly to the design aesthetic detailed in `DESIGN.md`.

---

## Phase 1: Project Initialization ✅

**Skills:** `next-best-practices`, `sanity-best-practices`

### Commands

```bash
# 1. Scaffold Next.js 16.2
npx create-next-app@latest . --typescript --tailwind --eslint --app --turbopack --src-dir

# 2. Install Sanity packages
npm install sanity next-sanity @sanity/image-url @sanity/icons @sanity/vision
npm install -D @sanity/typegen

# 3. Install utilities
npm install motion clsx tailwind-merge

# 4. Initialize Sanity project (interactive — creates .env.local)
npx sanity@latest init --env

# 5. Initialize git
git init && git add -A && git commit -m "Initial project scaffold"
```

### Expected Output

```
mati-ph/
├── src/app/layout.tsx
├── src/app/page.tsx
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── sanity.config.ts
├── sanity.cli.ts
├── .env.local          # SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_READ_TOKEN
└── .gitignore
```

---

## Phase 2: Design System & Base Components ✅

**Skills:** `ui-ux-pro-max`, `frontend-design`, `vercel-composition-patterns`

### Tailwind Config
Extend `tailwind.config.ts` with custom color tokens from `DESIGN.md` (`surface`, `primary`, `secondary`, `tertiary`, etc.) and font families via CSS variables.

### Font Setup
Configure Noto Serif and Plus Jakarta Sans in `src/app/layout.tsx` via `next/font/google`. Apply CSS variable classes to `<html>`.

### Global CSS
- `surface` background, custom gradient utilities as per `DESIGN.md`.

### Base UI Components (`src/components/ui/`)

| Component | Notes |
|-----------|-------|
| `button.tsx` | Primary (sunset), secondary (ocean), ghost variants |
| `card.tsx` | Compound: Card.Root, Card.Image, Card.Body, Card.Title |
| `badge.tsx` | Category/difficulty pills |
| `container.tsx` | Max-width responsive wrapper |
| `section-heading.tsx` | Playfair heading + Caveat accent + gradient underline |
| `sanity-image.tsx` | `next/image` + Sanity `urlFor()` |

### Layout Components (`src/components/layout/`)

| Component | Notes |
|-----------|-------|
| `navbar.tsx` | Transparent on hero, solid on scroll. Mobile hamburger |
| `footer.tsx` | Site links, social icons, contact (from Sanity siteSettings) |
| `mobile-menu.tsx` | `'use client'` slide-out drawer |

---

## Phase 3: Sanity CMS Schema & Data Layer ✅

**Skills:** `sanity-best-practices`, `content-modeling-best-practices`

### Embedded Studio
`src/app/studio/[[...tool]]/page.tsx` — renders `<NextStudio />`

### Sanity Client (`src/sanity/lib/`)
- `client.ts` — `createClient` with CDN
- `live.ts` — `defineLive` for real-time updates + Visual Editing
- `image.ts` — `urlFor` helper
- `queries.ts` — typed GROQ queries with `defineQuery`

### Content Schemas

**Shared objects** (`src/sanity/schemaTypes/objects/`):
- `seo.ts` — title, description, image, noIndex
- `locationPoint.ts` — lat, lng, address
- `priceRange.ts` — level ($, $$, $$$), description

**Documents** (`src/sanity/schemaTypes/documents/`):

| Schema | Key Fields |
|--------|------------|
| `destination.ts` | name, slug, tagline, description (PT), mainImage, gallery, category, location, howToGetThere (PT), bestTimeToVisit, relatedActivities (refs), seo |
| `activity.ts` | name, slug, description (PT), mainImage, destination (ref), difficulty, duration, priceRange, seo |
| `festival.ts` | name, slug, description (PT), mainImage, gallery, month, activities, seo |
| `foodSpot.ts` | name, slug, description (PT), mainImage, cuisineType, location, priceRange, seo |
| `travelGuide.ts` | title, slug, category, content (PT), mainImage, seo |
| `heroSlide.ts` | title, subtitle, image, ctaText, ctaLink, order |
| `siteSettings.ts` | siteName, tagline, description, logo, socialLinks, contactEmail, contactPhone (singleton) |

**Content modeling decisions:**
- Destination/Activity use **references** (independent lifecycles, cross-linking)
- SEO and location are **embedded objects** (page-specific)
- Categories use **string option lists** (appropriate for this scale)
- Rich content uses **Portable Text** for structured editability

### GROQ Queries
`HOME_QUERY`, `DESTINATIONS_QUERY`, `DESTINATION_BY_SLUG_QUERY`, `ACTIVITIES_QUERY`, `FESTIVALS_QUERY`, `FOOD_SPOTS_QUERY`, `TRAVEL_GUIDES_QUERY`, `SITE_SETTINGS_QUERY` — all with TypeGen types.

---

## Phase 4: Core Pages

**Skills:** `next-best-practices`, `frontend-design`, `vercel-react-best-practices`, `vercel-composition-patterns`

All pages are **Server Components** by default. Only interactive elements use `'use client'`.

### 4.1 — Home/Landing (`src/app/page.tsx`)

Scroll-triggered storytelling layout with these sections (`src/components/sections/`):

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen video/slideshow — auto-advancing slides from Sanity, cinematic full-viewport imagery, ocean-to-transparent gradient overlay, Playfair Display heading, sunset CTA button, slide indicators |
| **Intro** | "Discover Mati" — key stats, Caveat accent labels |
| **Destinations** | Asymmetric grid of 6 cards, scroll-triggered stagger reveal |
| **Activities** | Horizontal scroll carousel with difficulty badges |
| **Culture** | Full-bleed image with overlay text about Mandaya people |
| **Festivals** | Timeline layout — Pujada Bay Festival + Sambuokan Festival |
| **Food** | Photo grid with handwritten Caveat labels |
| **CTA** | "Plan Your Trip" with sunset gradient background |

Thin `'use client'` wrapper `scroll-reveal.tsx` for InView animations.

### 4.2 — Destinations (`src/app/destinations/`)
- List page with category filter (client component with `useSearchParams` in Suspense)
- Detail page `[slug]/page.tsx` with hero, Portable Text body, gallery, "How to Get There," related activities
- `generateStaticParams` + `generateMetadata` on detail pages

### 4.3 — Activities (`src/app/activities/`)
- List with difficulty filter, detail pages

### 4.4 — Culture & Heritage (`src/app/culture/page.tsx`)
- Editorial magazine layout: Mandaya culture, Subangan Museum, festivals section

### 4.5 — Food & Dining (`src/app/food/page.tsx`)
- Grid of food spots, cuisine type filter, price range indicators

### 4.6 — Travel Guide (`src/app/travel-guide/`)
- Category tabs (Getting There, Getting Around, Itineraries, Budget Tips)
- Individual guide articles as Portable Text

### 4.7 — About Mati (`src/app/about/page.tsx`)
- Geography, history, people. Mostly static with some Sanity content

### Shared patterns:
- Every page: `generateMetadata` with Sanity SEO + `coalesce()` fallbacks
- Detail pages: `generateStaticParams` for SSG
- `loading.tsx` with skeleton components per route
- `error.tsx` and `not-found.tsx` per route

---

## Phase 5: SEO & Performance

**Skills:** `seo-audit`, `web-design-guidelines`, `vercel-react-best-practices`

### Metadata & Open Graph
- Root layout default metadata
- Dynamic OG images via `src/app/opengraph-image.tsx` (tropical gradient + title)

### Sitemap & Robots
- `src/app/sitemap.ts` — dynamic from Sanity slugs
- `src/app/robots.ts` — allow all, reference sitemap

### JSON-LD Structured Data
- `TouristDestination` / `TouristAttraction` on destination pages
- `Restaurant` on food spots
- `Event` on festivals
- `WebSite` + `Organization` on homepage
- `BreadcrumbList` on all inner pages

### Performance
- `next/image` with `priority` on hero, proper `sizes` attributes
- Sanity image builder for auto WebP + resizing
- `Suspense` boundaries for parallel data fetching
- `'use cache'` on stable queries
- Dynamic imports for heavy client components (lightbox, maps)

### Accessibility
- Alt text enforced in Sanity schema
- WCAG AA color contrast
- Semantic HTML, keyboard navigation, skip-to-content link
- `prefers-reduced-motion` respected

---

## Phase 6: Deployment

### Vercel Setup
- Connect GitHub repo, configure env vars (`SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_READ_TOKEN`)

### Sanity Webhook
- `src/app/api/revalidate/route.ts` — on-demand revalidation via Sanity webhook

### CORS
- Add Vercel production URL to Sanity CORS origins

### Pre-launch Audit
- Run `web-design-guidelines` skill for UI compliance
- Run `seo-audit` skill for technical SEO verification
- Run `agent-browser` for automated visual testing

---

## Project Structure

```
mati-ph/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, metadata, SanityLive)
│   │   ├── page.tsx                # Home/Landing
│   │   ├── globals.css
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx
│   │   ├── studio/[[...tool]]/page.tsx
│   │   ├── destinations/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── activities/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── culture/page.tsx
│   │   ├── food/page.tsx
│   │   ├── travel-guide/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   └── api/revalidate/route.ts
│   ├── components/
│   │   ├── ui/                     # Button, Card, Badge, Container, etc.
│   │   ├── sections/               # Hero, FeaturedDestinations, CTA, etc.
│   │   ├── layout/                 # Navbar, Footer, MobileMenu
│   │   ├── portable-text.tsx
│   │   └── json-ld.tsx
│   ├── sanity/
│   │   ├── lib/                    # client, live, image, queries
│   │   └── schemaTypes/
│   │       ├── documents/          # destination, activity, festival, etc.
│   │       ├── objects/            # seo, locationPoint, priceRange
│   │       └── index.ts
│   └── lib/
│       └── utils.ts                # cn() helper
├── sanity.config.ts
├── sanity.cli.ts
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## Verification Plan

1. **Dev server:** `npm run dev` — verify all pages render, navigation works, fonts load
2. **Sanity Studio:** Visit `/studio` — verify all schemas appear, documents can be created
3. **Content flow:** Create a test destination in Studio, verify it appears on `/destinations`
4. **Responsive:** Test at 375px, 768px, 1024px, 1440px
5. **Lighthouse:** Run audit, target 90+ on Performance, Accessibility, SEO
6. **Skills audit:** Run `seo-audit` and `web-design-guidelines` skills for final check
7. **Deploy:** Push to Vercel, verify production build, test Sanity webhook revalidation
