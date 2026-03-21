import { defineField, defineType } from 'sanity'

export const gridBlock = defineType({
  name: 'gridBlock',
  title: 'Grid Block',
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
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      description: 'Which type of content should this grid display?',
      options: {
        list: [
          { title: 'Destinations', value: 'destination' },
          { title: 'Activities', value: 'activity' },
          { title: 'Food & Dining Spots', value: 'foodSpot' },
          { title: 'Travel Guides', value: 'travelGuide' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action (Optional)',
      type: 'object',
      description: 'Optional link to View All content',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string',
        }),
      ],
    }),
  ],
})
