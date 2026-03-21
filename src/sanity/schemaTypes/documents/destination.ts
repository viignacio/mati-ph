import { defineArrayMember, defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export const destination = defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-line hook shown on cards (~60 characters)',
      validation: (rule) => rule.max(80).warning('Keep it punchy'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Beach', value: 'beach' },
          { title: 'Island', value: 'island' },
          { title: 'Surfing', value: 'surfing' },
          { title: 'Mountain', value: 'mountain' },
          { title: 'Heritage', value: 'heritage' },
          { title: 'Waterfall', value: 'waterfall' },
          { title: 'Lagoon', value: 'lagoon' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { 
        hotspot: true,
        metadata: ['lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'locationPoint',
    }),
    defineField({
      name: 'howToGetThere',
      title: 'How to Get There',
      type: 'richText',
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      description: 'e.g. "October to May" or "Year-round"',
    }),
    defineField({
      name: 'relatedActivities',
      title: 'Related Activities',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'activity' }] })],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
