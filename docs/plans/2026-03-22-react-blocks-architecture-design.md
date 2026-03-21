# React Composable Blocks Architecture Design

## Overview
This document outlines the React Frontend UI architecture for the Mati City Tourism Website composable pages. The architecture dynamically renders Sanity layouts into fully-responsive UI blocks that match the Stitch mockups without hardcoding any content.

## Architecture Guidelines
1. **The Wrapper Strategy**: To prevent CSS duplication (`pt-20`, `bg-surface-container`), every specific block must be wrapped by the `<BlockContainer>` shared component.
2. **Dynamic Resolution**: `PageBuilder.tsx` owns the `switch` statement that dynamically mounts blocks based on the Sanity `_type`.
3. **No Legacy Styling**: Only use tokens defined in `DESIGN.md` via `tailwind.config.ts`.

## Core Components

### 1. `BlockContainer.tsx`
- **Location**: `src/components/blocks/BlockContainer.tsx`
- **Functionality**: Takes the `design` prop (type `blockDesign`) from sanity and resolves it into tailwind classes. If `containerStyle` is `rounded-container`, it injects `max-w-7xl mx-auto rounded-3xl`.

### 2. `HeroBlock.tsx`
- **Location**: `src/components/blocks/HeroBlock.tsx`
- **Features**: 
  - Parses `layoutVariant` to choose `full-screen` (with gradient) or `split-content`.
  - Checks for `animateText` to apply Framer Motion (or CSS) stagger entrances.
  - Replaces `highlightedWord` inside `heading` with `<span class="text-primary-container italic">`.
  - Supports `cta` and `secondaryCta` side-by-side display.

### 3. `GridBlock.tsx`
- **Location**: `src/components/blocks/GridBlock.tsx`
- **Features**: 
  - Resolves `manualItems` array. Focuses strictly on interpreting `colSpan` mathematically (e.g. `colSpan: 1` = `md:col-span-4`, `colSpan: 2` = `md:col-span-8` in a 12-column grid to match Dahican/Pujada).
  - Renders the conditional `badge` string and `ctaText` per item.

### 4. `FeaturesBlock.tsx`
- **Location**: `src/components/blocks/FeaturesBlock.tsx`
- **Features**:
  - Sets left-aligned `mainImage` container with the `<Lucide>` or `<SanityIcon>` list on the right.
  - Renders the overhead `tagline` above the `heading`.
  - Implements the primary block-level `cta`.

### 5. `TextWithImageBlock.tsx`
- **Location**: `src/components/blocks/TextWithImageBlock.tsx`
- **Features**:
  - Sets up the `split-container` layout. Left column for text, right column for the `images` grid (up to 3 images).
  - Handles the `date` representation and block-level `cta`.

## The PageBuilder Resolution
`src/components/PageBuilder.tsx` will be refactored to check `block._type` and dynamically import/render these `<Block />` components, passing the `block` object as their property context.
