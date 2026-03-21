import { defineField, defineType } from 'sanity'

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Label Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Internal route like /destinations, or external URL (including tel: and mailto:).',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
