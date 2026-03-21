import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  ImagesIcon,
  EarthGlobeIcon,
  StarIcon,
  CalendarIcon,
  BasketIcon,
  BookIcon,
  MenuIcon,
  StackCompactIcon,
  ComposeIcon,
} from '@sanity/icons'

// Singleton document types — excluded from the catch-all list to avoid duplication
const SINGLETONS = ['siteSettings', 'header', 'footer']

// All explicitly listed document types
const EXPLICITLY_LISTED = [
  'header',
  'footer',
  'page',
  'dictionaryEntry',
  'heroSlide',
  'destination',
  'activity',
  'festival',
  'foodSpot',
  'travelGuide',
  'siteSettings',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mati City')
    .items([

      // ── Content ──────────────────────────────────────────────────────────────
      S.divider().title('Content'),
      S.listItem()
        .title('Header')
        .icon(MenuIcon)
        .child(
          S.document()
            .schemaType('header')
            .documentId('global-header')
            .title('Global Header')
        ),
      S.listItem()
        .title('Footer')
        .icon(StackCompactIcon)
        .child(
          S.document()
            .schemaType('footer')
            .documentId('global-footer')
            .title('Global Footer')
        ),
      S.documentTypeListItem('page').title('Pages').icon(ComposeIcon),
      S.documentTypeListItem('dictionaryEntry').title('Dictionary Entry').icon(BookIcon),

      // ── References ───────────────────────────────────────────────────────────
      S.divider().title('References'),
      S.documentTypeListItem('heroSlide').title('Hero Slides').icon(ImagesIcon),
      S.documentTypeListItem('destination').title('Destinations').icon(EarthGlobeIcon),
      S.documentTypeListItem('activity').title('Activities').icon(StarIcon),
      S.documentTypeListItem('festival').title('Festivals').icon(CalendarIcon),
      S.documentTypeListItem('foodSpot').title('Food Spots').icon(BasketIcon),
      S.documentTypeListItem('travelGuide').title('Travel Guides').icon(BookIcon),

      // ── Settings ─────────────────────────────────────────────────────────────
      S.divider().title('Settings'),
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      // ── Catch-all (any schema not explicitly listed above) ────────────────────
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETONS.includes(item.getId() as string) &&
          !EXPLICITLY_LISTED.includes(item.getId() as string)
      ),
    ])
