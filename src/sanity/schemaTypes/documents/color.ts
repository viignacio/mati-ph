import { defineField, defineType } from 'sanity'

export const color = defineType({
  name: 'color',
  title: 'Color',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Token',
      type: 'slug',
      description: 'CSS token name — must match a --color-{token} variable in globals.css (e.g. "dark-teal" → var(--color-dark-teal))',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hex',
      title: 'Hex Value',
      type: 'string',
      description: '#RRGGBB — for Studio preview and inline style fallback',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'hex' },
  },
})
