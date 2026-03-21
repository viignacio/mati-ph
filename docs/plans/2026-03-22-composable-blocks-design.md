# Composable Layout Blocks Design

## Overview
This document outlines the Sanity Schema data layer for the composable page architecture of the Mati City Tourism Website. The goal is to support "The Tropical Curator" aesthetic across all pages, matching the mockups from Stitch while keeping the content entirely dynamic and driven by Sanity.

## Shared Schema: `blockDesign`
A universal object schema embedded in all layout blocks to handle structural containers and aesthetic backgrounds consistently.

- **`backgroundColor`**: Surface hierarchy shifts (e.g. `surface`, `surface-container-low`, `surface-container-highest`, `primary-gradient`, `transparent`).
- **`containerStyle`**: Structural wrapper style (`full-bleed` edge-to-edge vs. `rounded-container` max-width with rounded corners).
- **`topPadding`**: `none`, `standard` (20), `large` (24).
- **`bottomPadding`**: `none`, `standard` (20), `large` (24).

## Block Specific Schemas

### 1. `heroBlock`
Used for full-screen entryways like "The Radiant Shore of Dahican".
- **Fields Added**:
  - `design` (`blockDesign`)
  - `layoutVariant` (`full-screen`, `split-content`)
  - `animateText` (boolean for staggered entrance)

### 2. `gridBlock`
Used for dynamic listings like "Archipelago of Wonders" or "Must-Try Delicacies".
- **Fields Added**:
  - `design` (`blockDesign`)
  - `manualItems` (Array of Reference items with wrapper for overriding layout per-item)
  - `itemSettings` (per-item override: `colSpan` 1 or 2, `aspectRatio` portrait or landscape).
  - `layoutVariant` (`standard-grid`, `asymmetric-masonry`, `bento-grid`)
  - `cardStyle` (`elevated`, `flat`)

### 3. `featuresBlock`
Used for narrative lists like "Ride the Pacific Swell" and "Tailored Island Expeditions".
- **Fields Added**:
  - `design` (`blockDesign`)
  - `mainImage`
  - `imagePosition` (`left`, `right`)
  - `layoutVariant` (`feature-list-with-image`)

### 4. `textWithImageBlock`
Used for specific highlights like the "Sambuokan Festival" split section.
- **Fields Added**:
  - `design` (`blockDesign`)
  - `preamble` / `tagline`
  - `date`
  - `layoutVariant` (`split-container`)

## Frontend Implementation Rules
1. Every Block Schema will map 1:1 to a React Server Component inside `src/components/blocks/`.
2. The `PageBuilder.tsx` component will render these blocks dynamically.
3. No 1px borders. Layering and boundaries are fully driven by the `blockDesign` backgroundColor and containerStyle rules.
