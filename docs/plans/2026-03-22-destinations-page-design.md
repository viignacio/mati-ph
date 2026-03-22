# Destinations Page Design Document

## 1. Overview
This document outlines the design decisions and implementation approach for building the Destinations page based on the `destination.html` static design.

## 2. Approach: In-Place Evolution
The strategy is to evolve our existing React Server Components (`*BlockUI.tsx`) to support the new variants and layouts required for the Destinations page, integrating the specific Tailwind CSS classes and DOM structures from the HTML prototype.

## 3. Section Implementations

### A. Hero Section (`HeroBlockUI`)
- **Variant:** `full-screen`
- **Updates:** Implement the 80vh layout with background image `object-cover` and bottom-to-top gradient. The text content uses `font-serif` 6xl/8xl for the title and `font-body` for the subtitle.

### B. Dahican Beach (`FeaturesBlockUI`)
- **Variant:** `feature-list-with-image`
- **Updates:** Reuses the existing design from the Home Page ("Ride the Pacific Swell" section). We will ensure the `FeaturesBlockUI` successfully handles the left-aligned image, badge, text content, and the mapping of the feature icon-list on the right.

### C. Pujada Bay Islands (`GridBlockUI`)
- **Variant:** `islands-style` (New card style/layout variant for GridBlock)
- **Updates:**
  - **Grid Level:** Supports an asymmetric or staggered layout. Supports rendering the block `description` next to the `heading` in a flexbox layout.
  - **Schema Update (`destination.ts`):** We will add a new `shortDescription` field (type: text) to the Destination document schema.
  - **Card Level:** The `shortDescription` will be displayed inside/over the image alongside the title (or `tagline`), utilizing a dark gradient overlay. The `description` field (or a separate caption field if richText is not preferred) will be used as the text block *below* the image.

### D. Plan Your Visit (`LogisticsBlockUI`)
- **Schema Mapping:** Tagline, Heading, followed by an array of cards. Cards can be configured as `portrait` or `landscape`.
- **Updates:** Implement the 12-column grid. Portrait cards receive `md:col-span-4` (Light theme) and Landscape cards receive `md:col-span-8` (Dark theme, with background image overlay). Stat layouts will handle `list` (flex-between) or `grid` (2x2) layouts exactly as mocked up in the design.

## 4. Next Steps
Move to Execution phase by invoking the `writing-plans` skill to break this design down into a concrete implementation plan for the schemas and React components.
