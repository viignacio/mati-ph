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
  - `highlightedWord` (string, for italicized dynamic colored text in the heading)
  - `secondaryCta` (object with text and link, matching the "Watch Story" secondary action)

### 2. `gridBlock`
Used for dynamic listings like "Archipelago of Wonders" or "Must-Try Delicacies".
- **Fields Added**:
  - `design` (`blockDesign`)
  - `manualItems` (Array of Reference items with a settings wrapper for overriding layout per-item)
  - `itemSettings` (per-item overrides: `colSpan` 1 vs 2, `aspectRatio` portrait vs landscape, `badge` label, and `ctaText` override).
  - `layoutVariant` (`standard-grid`, `asymmetric-masonry`, `bento-grid`)
  - `cardStyle` (`elevated`, `flat`)

### 3. `featuresBlock`
Used for narrative lists like "Ride the Pacific Swell" and "Tailored Island Expeditions".
- **Fields Added**:
  - `design` (`blockDesign`)
  - `tagline` (string, the kicker text above the heading, e.g. "Water Sports")
  - `mainImage`
  - `imagePosition` (`left`, `right`)
  - `layoutVariant` (`feature-list-with-image`)
  - `cta` (block-level call to action, e.g. "Find a Coach")

### 4. `textWithImageBlock`
Used for specific highlights like the "Sambuokan Festival" split section.
- **Fields Added**:
  - `design` (`blockDesign`)
  - `tagline` (string, the kicker text, e.g. "Upcoming Experience")
  - `preamble` (string, intro or sub-text)
  - `date` (string, event date context)
  - `cta` (block-level call to action, e.g. "Get Event Schedule")
  - `images` (array of images, max 3, to support multi-column image grids alongside text)
  - `layoutVariant` (`split-container`)

## Frontend Implementation Rules
1. Every Block Schema will map 1:1 to a React Server Component inside `src/components/blocks/`.
2. The `PageBuilder.tsx` component will render these blocks dynamically.
3. No 1px borders. Layering and boundaries are fully driven by the `blockDesign` backgroundColor and containerStyle rules.
