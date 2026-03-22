# Destinations Page UI Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement the complex layout variants and schema modifications required for the Destinations page without breaking existing functionality.

**Architecture:** Update `destination.ts` to include a new `shortDescription` field. Update the four core React UI components (`HeroBlockUI`, `FeaturesBlockUI`, `GridBlockUI`, `LogisticsBlockUI`) to integrate the Tailwind CSS and HTML structure from the prototype, switching rendering logic based on `layoutVariant`.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Sanity

---

### Task 1: Update Destination Schema

**Files:**
- Modify: `src/sanity/schemaTypes/documents/destination.ts`

**Step 1: Write the failing test**
N/A - Schema configuration update

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
We will append the new `shortDescription` field after the `tagline` in `destination.ts`.
```typescript
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Used inside the image overlay for Islands grid',
    }),
```

**Step 4: Run test to verify it passes**
Run: User navigates to `/studio/structure/destination` to verify the schema compiles and the field appears in the studio.
Expected: Studio loads without "Unknown type" or compilation errors.

**Step 5: Commit**
```bash
git add src/sanity/schemaTypes/documents/destination.ts
git commit -m "feat: add shortDescription to destination schema"
```

---

### Task 2: Implement HeroBlockUI Full-Screen Variant

**Files:**
- Modify: `src/components/blocks/HeroBlockUI.tsx`

**Step 1: Write the failing test**
N/A - Visual UI Update

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
Modify `HeroBlockUI.tsx` to check if `layoutVariant === 'full-screen'`. If true, return the exact HTML structure for the Hero section from `destination.html` (adjusting class names to standard Tailwind and resolving image props).
```tsx
if (block.layoutVariant === 'full-screen') {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Implementation... */}
    </section>
  )
}
```

**Step 4: Run test to verify it passes**
Run: User verifies on local dev server `/destinations` (or similar page rendering the hero block).
Expected: Hero section renders as full viewport with gradient and correct typography.

**Step 5: Commit**
```bash
git add src/components/blocks/HeroBlockUI.tsx
git commit -m "feat: implement full-screen variant for HeroBlock UI"
```

---

### Task 3: Implement FeaturesBlockUI Image Variant

**Files:**
- Modify: `src/components/blocks/FeaturesBlockUI.tsx`

**Step 1: Write the failing test**
N/A - Visual UI Update

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
Modify `FeaturesBlockUI.tsx` to handle `layoutVariant === 'feature-list-with-image'`. Pull in the Dahican Beach structure, using the block's `mainImage`, `imageTag`, `heading`, `description`, and mapping over `block.features`.
```tsx
if (block.layoutVariant === 'feature-list-with-image') {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Implementation looping block.features... */}
    </section>
  )
}
```

**Step 4: Run test to verify it passes**
Run: User verifies on local dev server.
Expected: Dahican Beach section matches prototype design.

**Step 5: Commit**
```bash
git add src/components/blocks/FeaturesBlockUI.tsx
git commit -m "feat: implement feature-list-with-image variant"
```

---

### Task 4: Implement GridBlockUI Islands Variant

**Files:**
- Modify: `src/components/blocks/GridBlockUI.tsx`

**Step 1: Write the failing test**
N/A - Visual UI Update

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
Modify `GridBlockUI.tsx` to recognize card overrides for the `islands-style` or handle `layoutVariant === 'asymmetric-masonry'`. Render the 3-column grid, map the manual items, and style the card with the inner overlay text (`tagline` + `shortDescription`) and the outer text (`description`).

**Step 4: Run test to verify it passes**
Run: User verifies on local dev server.
Expected: Islands grid renders with hover scale and gradient overlays.

**Step 5: Commit**
```bash
git add src/components/blocks/GridBlockUI.tsx
git commit -m "feat: implement islands grid variant"
```

---

### Task 5: Implement LogisticsBlockUI Layout

**Files:**
- Modify: `src/components/blocks/LogisticsBlockUI.tsx`

**Step 1: Write the failing test**
N/A - Visual UI Update

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
Fully implement `LogisticsBlockUI.tsx` based on the design. Map the `cards` array. Use `md:col-span-4` for `orientation === 'portrait'` and `md:col-span-8` with dark styling for `landscape`. Map the `stats` array correctly into grids or lists (using `statLayout`).

**Step 4: Run test to verify it passes**
Run: User verifies on local dev server.
Expected: "Plan Your Visit" block matches the exact design snippet.

**Step 5: Commit**
```bash
git add src/components/blocks/LogisticsBlockUI.tsx
git commit -m "feat: implement logistics block ui"
```
