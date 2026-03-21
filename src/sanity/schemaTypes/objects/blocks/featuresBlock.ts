import { defineField, defineType } from 'sanity'

export const featuresBlock = defineType({
  name: 'featuresBlock',
  title: 'Features Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon (Optional string identifier)',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
