# Design Doc: Testimonials Block Upgrade & Design System Refactor

## Objective
Upgrade the existing `testimonialsBlock` to support the premium "Community Voices" design from `culture.html`, and migrate `accentColor` to a shared `blockDesign` property for all layout blocks.

## Proposed Changes

### 1. Global Design System (`blockDesign.ts` & `BlockContainer.tsx`)
- **Move Accent Color**: `accentColorRef` is now part of the `blockDesign` schema. This ensures consistency across all blocks (Highlights, Testimonials, Grid).
- **Background Reference**: Update `BlockContainer.tsx` to resolve `backgroundColorRef` (Reference to `color`) instead of simple strings.

### 2. Testimonials Block (`testimonialsBlock.ts` & `TestimonialsBlockUI.tsx`)
- **Italic Heading Toggle**: Add `headingItalic` boolean to allow the "Community Voices" italic style.
- **Quote Icons**: Add a customizable `quoteIcon` (default: `format_quote`) to each testimonial card.
- **Author Avatars**: Add `authorAvatar` support to the testimonial array items.
- **Card Styling**: The grid will display 3 columns on desktop, stacking on mobile. Cards will use the `bg-surface-container` background with `rounded-lg` corners.

### 3. Highlights Block (`HighlightsBlock.tsx`)
- Update to use the shared `accentColorRef` from `design.accentColorRef` instead of the previous top-level `accentColor`.

## Verification Plan
### Automated Tests
- `npm run build` to verify type safety after refactoring props.

### Manual Verification
- Verify that the Mandaya pattern still appears correctly in Highlights Block using the new color refs.
- Verify that the Testimonials Block rendered in Sanity matches the `culture.html` mockup.
