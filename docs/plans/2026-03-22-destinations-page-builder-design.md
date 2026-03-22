# Design Doc: Destinations Page & Global Layout System

## Overview
Re-architect the layout block system to support the high-fidelity design of the Destinations page while standardizing the global content width for improved readability.

## Global Layout Change
- **Container Width**: Reduce global page content containers from 90% wide (`max-w-7xl`) to 75% wide (`max-w-6xl` or `1080px`).
- **Exclusion**: Header (Navbar) and Footer remain wide (`max-w-screen-2xl` and `max-w-[1440px]`) for design system consistency.
- **Implementation**: Update `src/components/ui/container.tsx` size classes and ensure all `*BlockUI.tsx` components use the `Container` component instead of hardcoded width classes.

## New Block: Logistics Block
- **Purpose**: Displays transportation, travel info, and contextual stats.
- **Data Schema**:
  - `tagline` (str), `heading` (str)
  - `cards` (array, max 3):
    - `orientation`: Portrait (4/12 columns) or Landscape (8/12 columns).
    - `theme`: Light (surface color) or Dark (on-background color).
    - `backgroundImage`: Decorative image (Dark theme only).
    - `stats`: Array of `{ label, value }`.
    - `statLayout`: Stacked list or 2x2 grid.
- **Component**: `LogisticsBlock.tsx` will use CSS Grid to manage orientations and flex for stat layouts.

## Schema Updates
### Grid Block
- **Staggered Layout**: Boolean toggle to offset even-indexed items downwards.
- **Overlay Style**: New card layout with title/kicker as an overlay on the image and description in the footer.

### Block Design & CTA
- **Show Decorative Accent**: Boolean toggle to show circular Mandaya patterns trailing images.
- **Button Style**: Enum selection (Primary, Secondary, Tertiary, Outline) for CTA buttons.

## Verification
- Visual parity with `destination.html` sections.
- Responsive test: ensure 75% width feels appropriate on mobile vs desktop.
