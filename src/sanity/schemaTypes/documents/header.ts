import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const header = defineType({
  name: 'header',
  title: 'Global Header',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Global Header Settings',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'If left blank, "Mati City Tourism" text will be shown.',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [{ type: 'navigationItem' }],
    }),
    defineField({
      name: 'searchEnabled',
      title: 'Enable Search Toggle',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'navigationItem',
    }),
  ],
})
