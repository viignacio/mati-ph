import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Longer titles may be truncated by search engines.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Longer descriptions may be truncated by search engines.'),
    }),
    defineField({
      name: 'image',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image for sharing on social media (1200x630px recommended).',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
