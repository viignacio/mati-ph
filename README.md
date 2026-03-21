# Mati, Davao Oriental - Tourism Website 🌴

A vibrant and intuitive tourism website for Mati City, Davao Oriental, Philippines. It serves as a one-stop destination guide showcasing beaches, islands, surfing, cultural heritage, festivals, food, and travel logistics. The site feels tropical, warm, and inviting, reflecting Mati's turquoise waters, white sand beaches, lush greenery, and colorful Mandaya culture.

> **Note for Contributors**: Please refer to `DESIGN.md` as the single source of truth for the project's design system, UI components, typography, and styling rules.
> Our design system, **"The Tropical Curator"**, treats digital real estate like a high-end editorial travel magazine.

## Tech Stack 🛠

This project is built with a modern, performant stack:

- **Framework**: [Next.js 16.2](https://nextjs.org) (App Router, Turbopack)
- **CMS / Data**: [Sanity](https://www.sanity.io)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & CSS Variables
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Animations**: [Motion](https://motion.dev)
- **Utilities**: `clsx`, `tailwind-merge`
- **Icons**: Lucide React & Sanity Icons
- **Typography**: Noto Serif & Plus Jakarta Sans

## Developing Locally 💻

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+) installed.

### Getting Started

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Set up your Sanity environment variables. Create a `.env.local` file in the root directory:

```env
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_api_read_token
```

> **Note:** You can initialize your Sanity project settings by running `npx sanity@latest init --env`.

3. Run the development server (configured to use Turbopack):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. The Sanity Content Studio is embedded and available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Project Structure 📁

- `src/app/` - Next.js App Router pages and layouts (e.g., destinations, activities, culture).
- `src/components/` - Reusable React components split into `ui/`, `sections/`, and `layout/`.
- `src/sanity/` - Sanity CMS configuration, including document and object schemas, and GROQ queries.

## Design Rules & Contributing 🎨

If you are contributing UI components, you **must** adhere strictly to the guidelines detailed in `DESIGN.md`. Key principles include:
- **The "No-Line" Rule**: Avoid 1px solid borders. Use background tonal shifts (`surface` to `surface-container-low`) to group content.
- **Organic Layering**: Favor asymmetrical compositions and overlapping elements to mimic the island's landscape.
- **Glass & Gradient**: Use glassmorphism and subtle gradients instead of flat, heavy colors for primary CTAs and floating elements. 

## Deploy on Vercel 🚀

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. Don't forget to configure your Vercel project environment variables and set up the Sanity webhook for on-demand revalidation.
