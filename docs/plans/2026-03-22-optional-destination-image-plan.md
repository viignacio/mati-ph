# Optional Destination Main Image Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Make the `mainImage` and its `alt` text optional in the `destination` schema and handle missing images in the frontend with fallbacks.

**Architecture:**
- **Sanity Schema**: Remove required validation from `mainImage` and `alt`.
- **Next.js Frontend**: Add conditional rendering and fallback UI (gradient/placeholder) for destinations without a main image.
- **Components**: Update `DestinationPage` and `FeaturedDestinations` to gracefully handle null images.

**Tech Stack:** Next.js, Sanity, Tailwind CSS, Lucide Icons (as fallback if needed, or just CSS gradients).

---

### Task 1: Update Destination Schema (DONE BY USER)

**Files:**
- Modify: `src/sanity/schemaTypes/documents/destination.ts`

**Step 1: Remove required validation (COMPLETED)**
- User already removed `validation: (rule) => rule.required()` from `mainImage` and `alt`.

**Step 2: Commit**

```bash
git add src/sanity/schemaTypes/documents/destination.ts
git commit -m "schema: make destination main image and alt text optional"
```

---

### Task 2: Update Destination Detail Page

**Files:**
- Modify: `src/app/(site)/destinations/[slug]/page.tsx`

**Step 1: Add conditional check for Hero Image and fallback**

Replace current hero image block with a conditional one that shows a fallback gradient/placeholder if `data.mainImage` is missing.

```tsx
// src/app/(site)/destinations/[slug]/page.tsx:55
  const heroSrc = data.mainImage 
    ? urlFor(data.mainImage).width(1600).height(900).auto('format').url()
    : null

// src/app/(site)/destinations/[slug]/page.tsx:72-83
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-primary/10">
        {data.mainImage ? (
          <Image
            src={heroSrc!}
            alt={data.mainImage.alt || data.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder={data.mainImage.asset?.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={data.mainImage.asset?.metadata?.lqip}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/20 to-surface-high" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent" />
```

**Step 2: Commit**

```bash
git add src/app/(site)/destinations/[slug]/page.tsx
git commit -m "feat: add fallback for destination detail page hero image"
```

---

### Task 3: Update Featured Destinations Cards

**Files:**
- Modify: `src/components/sections/featured-destinations.tsx`

**Step 1: Add fallback for card image**

```tsx
// src/components/sections/featured-destinations.tsx:72-78
                    {dest.mainImage ? (
                      <Image
                        src={urlFor(dest.mainImage).width(800).height(600).url()}
                        alt={dest.mainImage.alt || dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10" />
                    )}
```

**Step 2: Commit**

```bash
git add src/components/sections/featured-destinations.tsx
git commit -m "feat: add fallback for featured destination cards"
```

---

### Task 4: Verification

**Step 1: Manual verification**
1. Open Sanity Studio.
2. Create/edit a destination without an image.
3. Save and check if it renders correctly on the site.

**Step 2: Commit confirmation**

```bash
# Final check of all changes
git status
```
