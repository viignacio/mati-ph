import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  ImagesIcon,
  EarthGlobeIcon,
  StarIcon,
  CalendarIcon,
  BasketIcon,
  BookIcon,
} from '@sanity/icons'

// Singleton document types — excluded from generic list to avoid duplication
const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mati City')
    .items([
      // ── Singleton ────────────────────────────────────────────────────────────
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // ── Hero ─────────────────────────────────────────────────────────────────
      S.documentTypeListItem('heroSlide').title('Hero Slides').icon(ImagesIcon),

      S.divider(),

      // ── Main Content ──────────────────────────────────────────────────────────
      S.documentTypeListItem('destination').title('Destinations').icon(EarthGlobeIcon),
      S.documentTypeListItem('activity').title('Activities').icon(StarIcon),
      S.documentTypeListItem('festival').title('Festivals').icon(CalendarIcon),
      S.documentTypeListItem('foodSpot').title('Food Spots').icon(BasketIcon),
      S.documentTypeListItem('travelGuide').title('Travel Guides').icon(BookIcon),

      S.divider(),

      // ── All other document types (filtered to exclude singletons) ─────────────
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string) &&
          !['heroSlide', 'destination', 'activity', 'festival', 'foodSpot', 'travelGuide']
            .includes(item.getId() as string)
      ),
    ])
