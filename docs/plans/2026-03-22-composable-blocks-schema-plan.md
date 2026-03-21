# Composable Layout Blocks Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement the Sanity schema data layer for the "Tropical Curator" composable blocks based on the Stitch mockups, completely resolving all data gaps needed to perfectly render the Home screen sections.

**Architecture:** We are creating a shared `blockDesign` object mapped to every feature block, allowing editors to control global section containers, padding, and backgrounds without hardcoding layout data. Additional block-specific variants allow for structurally different React implementations on the frontend.

**Tech Stack:** Sanity (Schema config), TypeScript, Next.js.

---

### Task 1: Create Shared `blockDesign` Schema

**Files:**
- Create: `src/sanity/schemaTypes/objects/blocks/blockDesign.ts`
- Modify: `src/sanity/schemaTypes/index.ts` (to export/register the new type)

**Step 1: Write the schema definition**
Create the file and add the fields for `backgroundColor`, `containerStyle`, `topPadding`, and `bottomPadding`.

**Step 2: Register in Sanity indexes**
Add `blockDesign` to `schemaTypes/index.ts` so Sanity recognizes the object.

**Step 3: Test Sanity Typegen**
Run: `npx sanity typegen generate`
Expected: PASS with no errors indicating the schema is valid.

**Step 4: Commit**
```bash
git add src/sanity/schemaTypes/objects/blocks/blockDesign.ts src/sanity/schemaTypes/index.ts
git commit -m "feat(sanity): create shared blockDesign object schema"
```

---

### Task 2: Update `heroBlock` Schema

**Files:**
- Modify: `src/sanity/schemaTypes/objects/blocks/heroBlock.ts`

**Step 1: Add new fields**
Import and define `design` (type: `blockDesign`), `layoutVariant`, `animateText`, `highlightedWord` (for dynamic italic text rendering), and `secondaryCta` (object with text and link).

**Step 2: Test Sanity Typegen**
Run: `npx sanity typegen generate`
Expected: PASS.

**Step 3: Commit**
```bash
git add src/sanity/schemaTypes/objects/blocks/heroBlock.ts
git commit -m "feat(sanity): enhance heroBlock with design rules, second CTA, and smart text highlighting"
```

---

### Task 3: Update `gridBlock` Schema

**Files:**
- Modify: `src/sanity/schemaTypes/objects/blocks/gridBlock.ts`

**Step 1: Add new fields**
Define the `design`, `manualItems` array. The objects in `manualItems` must contain the document reference PLUS `itemSettings` (which holds `colSpan`, `aspectRatio`, optional `badge`, and optional `ctaText` overrides). Add `layoutVariant` and `cardStyle`.

**Step 2: Test Sanity Typegen**
Run: `npx sanity typegen generate`
Expected: PASS.

**Step 3: Commit**
```bash
git add src/sanity/schemaTypes/objects/blocks/gridBlock.ts
git commit -m "feat(sanity): upgrade grid to support asymmetric layouts with manual item configurations"
```

---

### Task 4: Update `featuresBlock` Schema

**Files:**
- Modify: `src/sanity/schemaTypes/objects/blocks/featuresBlock.ts`

**Step 1: Add new fields**
Define the `design`, `tagline`, `mainImage`, `imagePosition`, `layoutVariant`, and a block-level `cta` field.

**Step 2: Test Sanity Typegen**
Run: `npx sanity typegen generate`
Expected: PASS.

**Step 3: Commit**
```bash
git add src/sanity/schemaTypes/objects/blocks/featuresBlock.ts
git commit -m "feat(sanity): expand features block to support split image layouts, overall tagline, and main CTA"
```

---

### Task 5: Update `textWithImageBlock` Schema

**Files:**
- Modify: `src/sanity/schemaTypes/objects/blocks/textWithImageBlock.ts`

**Step 1: Add new fields**
Define the `design`, `tagline`, `preamble`, `date`, `cta`, and `layoutVariant` fields. Replace the existing single `image` field with an `images` array field.

**Step 2: Test Sanity Typegen**
Run: `npx sanity typegen generate`
Expected: PASS.

**Step 3: Commit**
```bash
git add src/sanity/schemaTypes/objects/blocks/textWithImageBlock.ts
git commit -m "feat(sanity): transform textWithImageBlock into flexible, multi-image split container"
```
