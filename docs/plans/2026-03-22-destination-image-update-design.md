# Design: Optional Destination Main Image & Fallbacks

Date: 2026-03-22
Status: Approved

## Objective
Update the `destination` schema to make the `mainImage` and its `alt` text optional, and update the frontend to handle missing images with appropriate fallbacks to avoid runtime errors and maintain visual quality.

## Background
Currently, the `destination` schema requires a `mainImage` and `alt` text. Removing this requirement allows destinations to be created even before high-quality photos are available.

## Schema Changes
### `src/sanity/schemaTypes/documents/destination.ts`
- Remove `validation: (rule) => rule.required()` from the `mainImage` field.
- Remove `validation: (rule) => rule.required()` from the nested `alt` field in `mainImage`.

## Frontend Safeguards & Fallbacks

### Destination Detail Page (`src/app/(site)/destinations/[slug]/page.tsx`)
- **Metadata**: `generateMetadata` already has a check for `data.mainImage`. It will be verified to ensure it returns an empty images array if missing.
- **Hero Image**: 
    - Wrap the `Image` component in a conditional check for `data.mainImage`.
    - If `data.mainImage` is missing, display a stylized gradient background (e.g., using the `Mati` theme colors) or a generic landscape placeholder.
    - Ensure `heroSrc` and other image-related constants only compute when `data.mainImage` is present.
- **Related Activities**: Ensure the activity cards also handle potentially missing images if they use a similar pattern. (Wait, the request is for Destination schema, but I'll check consistency).

### Featured Destinations Section (`src/components/sections/featured-destinations.tsx`)
- Verify that cards handle missing images. Current code shows `{dest.mainImage && ...}` which is good. If missing, the card will show an empty area or should show a fallback. I'll add a simple placeholder background.

### Filtering (`src/app/(site)/destinations/destination-filter.tsx`)
- No changes needed for the filter itself, but ensure the cards rendered in this component handle missing images.

## Testing
- **Sanity Studio**: Verify that a destination can be saved without a main image.
- **Frontend**: Verify that a destination page without an image loads correctly with a fallback background.
- **Frontend**: Verify that listing pages (Featured, Filtered) show a fallback for destinations missing an image.
