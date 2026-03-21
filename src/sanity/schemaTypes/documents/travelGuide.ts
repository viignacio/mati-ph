import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const travelGuide = defineType({
  name: 'travelGuide',
  title: 'Travel Guide',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting There', value: 'getting-there' },
          { title: 'Getting Around', value: 'getting-around' },
          { title: 'Itineraries', value: 'itineraries' },
          { title: 'Budget Tips', value: 'budget-tips' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'Short summary shown on listing pages (~160 characters)',
      validation: (rule) => rule.max(200).warning('Keep under 200 characters'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
