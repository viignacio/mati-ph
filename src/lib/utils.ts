import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves the canonical site URL in order of preference:
 * 1. NEXT_PUBLIC_SITE_URL  — set manually in Vercel for the production domain
 * 2. VERCEL_URL            — auto-injected by Vercel on every deployment (preview + prod)
 * 3. localhost:3000         — local development fallback
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
