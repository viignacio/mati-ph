# React Composable Blocks Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Build the React UI Layer mapped to the Sanity block schemas to perfectly recreate the Stitch Home screen layout.

**Architecture:** We are creating a DRY React architecture utilizing a universal `<BlockContainer>` wrapper component that dynamically inherits design configurations from Sanity. Then, we implement the four specific layout blocks (`HeroBlock`, `GridBlock`, `FeaturesBlock`, `TextWithImageBlock`) and wire them to the router via `PageBuilder.tsx`.

**Tech Stack:** React 19, Next.js App Router (Server Components), Tailwind CSS, Framer Motion (if needed).

---

### Task 1: Build `<BlockContainer>` Utility Component

**Files:**
- Create: `src/components/blocks/BlockContainer.tsx`

**Step 1: Write the React Component**
Implement a reusable wrapper that intercepts the `design` prop (type `blockDesign`) and maps `backgroundColor`, `containerStyle`, `topPadding`, and `bottomPadding` fields into a Tailwind `cn()` string applied to standard HTML `<section>` tags. Ensure the wrapper exposes an `id` and child references.

**Step 2: Verify Syntax**
Lint the codebase using `npm run lint` conceptually or manually resolving typing. Ensure the Next.js Server Component is stable.

**Step 3: Commit**
```bash
git add src/components/blocks/BlockContainer.tsx
git commit -m "feat(ui): build universal BlockContainer layout wrapper"
```

---

### Task 2: Build `<HeroBlock>` Component

**Files:**
- Create: `src/components/blocks/HeroBlock.tsx`

**Step 1: Write the React Component**
Implement the Hero component mirroring the HTML from Stitch. It should wrap its internal JSX inside `<BlockContainer design={data.design}>`. Support `heading` parsing for `highlightedWord`, render the background image with gradient overlay, and handle both `cta` and `secondaryCta` buttons.

**Step 2: Commit**
```bash
git add src/components/blocks/HeroBlock.tsx
git commit -m "feat(ui): implement HeroBlock to recreate the Radiant Shore"
```

---

### Task 3: Build `<GridBlock>` Component

**Files:**
- Create: `src/components/blocks/GridBlock.tsx`

**Step 1: Write the React Component**
Implement the Grid component wrapped in `<BlockContainer>`. Parse the `manualItems` array, calculate Tailwind logic for `md:col-span-8` vs `md:col-span-4` based on `colSpan` properties, and apply the `cardStyle`. Replicate the visual UI strings and CTAs for "Dahican Beach" equivalent layout cards.

**Step 2: Commit**
```bash
git add src/components/blocks/GridBlock.tsx
git commit -m "feat(ui): build asymmetric masonry GridBlock component"
```

---

### Task 4: Build `<FeaturesBlock>` Component

**Files:**
- Create: `src/components/blocks/FeaturesBlock.tsx`

**Step 1: Write the React Component**
Build the list and image layout wrapped in `<BlockContainer>`. Inject the `mainImage`, loop through the `features` array to build the icon items list, and attach the overhead `tagline` and block-level `cta`.

**Step 2: Commit**
```bash
git add src/components/blocks/FeaturesBlock.tsx
git commit -m "feat(ui): build Ride the Pacific Swell FeaturesBlock component"
```

---

### Task 5: Build `<TextWithImageBlock>` Component

**Files:**
- Create: `src/components/blocks/TextWithImageBlock.tsx`

**Step 1: Write the React Component**
Build the split container wrapped in `<BlockContainer>`. Dedicate the left side to structured text (`tagline`, `heading`, `preamble`, `date`, `cta`) and map the `images` array into a dual-image CSS grid structure on the right to match the Festival aesthetic.

**Step 2: Commit**
```bash
git add src/components/blocks/TextWithImageBlock.tsx
git commit -m "feat(ui): implement multi-image TextWithImage split block"
```

---

### Task 6: Wire the UI via `PageBuilder.tsx`

**Files:**
- Modify: `src/components/PageBuilder.tsx`

**Step 1: Write the Route Switch Logic**
Import the 4 newly created block components into `PageBuilder.tsx`. Update the `switch` statement to correctly return `<HeroBlock data={block} />`, `<GridBlock data={block} />`, `<FeaturesBlock data={block} />`, and `<TextWithImageBlock data={block} />` based on the Sanity `_type`.

**Step 2: Commit**
```bash
git add src/components/PageBuilder.tsx
git commit -m "feat(ui): wire Sanity schema types to React block components in route builder"
```
