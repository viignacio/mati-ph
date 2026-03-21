import { defineField, defineType } from 'sanity'

export const dictionaryEntry = defineType({
  name: 'dictionaryEntry',
  title: 'Dictionary Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Description / Context',
      type: 'string',
      description: 'Used for internal identification in the studio (e.g. "Read More Button Label").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'A unique code identifier without spaces (e.g. "readMoreBtn").',
      validation: (Rule) => Rule.required().regex(/^[a-zA-Z0-9_\-]+$/, {
        name: 'alphanumeric',
        invert: false,
      }),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The localized text that will appear in the UI.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'value',
    },
  },
})
