# Design System Strategy: The Radiant Shore

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Tropical Curator."** We are moving away from the "template-heavy" look of standard travel sites. Instead, this system treats digital real estate like a high-end editorial travel magazine. It is built on a foundation of intentional asymmetry, where large-scale imagery breaks the grid and typography acts as a structural element rather than just information.

The visual language rejects rigid, boxy layouts in favor of **Organic Layering**. By using overlapping elements—such as a serif headline partially obscuring a vibrant image—we create a sense of three-dimensional depth that mimics the layered landscape of Mati City (from the depths of Dahican Beach to the heights of the Sleeping Dinosaur).

## 2. Colors & Atmospheric Depth
This palette is a technical translation of a Mati sunset meeting the turquoise shoreline.

### The "No-Line" Rule
**Strict Mandate:** Prohibit the use of 1px solid borders for sectioning or card definition. Boundaries must be defined solely through background color shifts. To separate a testimonial section from a gallery, transition from `surface` (#fefee5) to `surface-container-low` (#fbfbe0). This creates a seamless, high-end feel that mimics natural light transitions.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, handmade paper.
- **Base Layer:** `surface` (#fefee5)
- **Nested Content:** Use `surface-container` tiers (Lowest to Highest) to define importance. A primary booking widget should sit on `surface-container-highest` (#e9eaca) to naturally draw the eye without the "noise" of a stroke.

### The "Glass & Gradient" Rule
To capture the "Sun-Drenched" feel, use **Glassmorphism** for floating navigation and weather widgets.
- Use `surface-variant` (#e9eaca) at 60% opacity with a `backdrop-blur` of 16px.
- **Signature Gradients:** For primary CTAs, do not use flat colors. Apply a subtle linear gradient from `primary` (#007168) to `primary-container` (#56f1e0) at a 135-degree angle to give the UI "soul" and a shimmering, aquatic energy.

## 3. Typography: Editorial Sophistication
The contrast between the elegant Serif and the modern Sans-Serif is the heartbeat of this system.

- **Display & Headlines (Noto Serif):** These are your "Signature" elements. Use `display-lg` (3.5rem) for hero sections with tight letter-spacing (-0.02em). This font choice reflects the premium, cultural heritage of the Mandaya people.
- **Body & Labels (Plus Jakarta Sans):** Chosen for its friendly, open apertures. It maintains readability even against vibrant backgrounds.
- **Hierarchy as Identity:** Use `title-lg` in `tertiary` (#bc3000) for sub-headers to inject the "Sunset Orange" energy into text-heavy sections, ensuring the brand’s warmth is felt in every paragraph.

## 4. Elevation & Depth
We achieve hierarchy through **Tonal Layering** rather than traditional shadows or lines.

- **The Layering Principle:** To create a "lifted" card, place a `surface-container-lowest` (#ffffff) element on top of a `surface-dim` (#e3e5c3) background. The 1.5% difference in luminosity provides a sophisticated, "quiet" elevation.
- **Ambient Shadows:** For high-impact floating elements (like a "Book Now" FAB), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(55, 57, 40, 0.06)`. Note the use of the `on-surface` color for the shadow tint—never use pure black.
- **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` (#babba4) at **15% opacity**. It should be felt, not seen.

## 5. Components & UI Patterns

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `xl` (3rem) roundness. No border. Text in `on-primary`.
- **Secondary:** `surface-container-highest` fill with `primary` text. This creates a "soft-touch" interaction.
- **Tertiary:** Pure text with a 2px underline in `tertiary` (#bc3000), suggesting a "hand-drawn" cultural accent.

### Cards & Discovery Tiles
- **The Divider Ban:** Strictly forbid divider lines in lists or cards. Use `spacing-8` (2.75rem) to create clear groupings.
- **Image Integration:** Images within cards must use `md` (1.5rem) corner radius. Use a `tertiary-container` overlay at 10% on hover to mimic the warmth of the sun.

### Mandaya Pattern Accents
- Use Mandaya-inspired patterns (red, black, yellow) as **non-structural motifs**. Place them as subtle background watermarks or as 4px "accent stripes" at the very top of a container, never as a container border itself.

### Signature Component: The "Island Navigation"
- A bottom-aligned, floating navigation bar using the Glassmorphism rule. It should feel like it's floating over the content, utilizing the `full` (9999px) roundness for a pill-like, organic shape.

## 6. Do’s and Don’ts

### Do:
- **Use White Space as Luxury:** Utilize the `20` (7rem) and `24` (8.5rem) spacing tokens between major sections to let the photography breathe.
- **Asymmetrical Compositions:** Offset text blocks from center-aligned images to create a dynamic, editorial flow.
- **Color-Logic Alignment:** Use `secondary` (#0068a8) for all water-related activities and `tertiary` (#bc3000) for land-based cultural experiences.

### Don’t:
- **No Sharp Corners:** Never use `none` or `sm` roundness. The island is organic; the UI must be too.
- **No Heavy Shadows:** Avoid standard "Material Design" shadows. If it looks like a "software app," it has failed the "Tropical Curator" test.
- **No Stark White:** Avoid using pure `#ffffff` for large backgrounds. Use `surface` (#fefee5) to maintain the "White Sand" warmth and reduce eye strain under "sunny" design conditions.