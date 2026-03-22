import { defineField, defineType } from 'sanity'

export const carouselBlock = defineType({
  name: 'carouselBlock',
  title: 'Carousel Block',
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
      options: {
        list: [
          { title: 'Destinations', value: 'destination' },
          { title: 'Activities', value: 'activity' },
          { title: 'Festivals', value: 'festival' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'destination' }, { type: 'activity' }, { type: 'festival' }] }
      ],
      description: 'Select specific items to feature in the carousel. Ensure they match the selected Content Type.',
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
        defineField({
          name: 'buttonVariant',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Filled', value: 'filled' },
              { title: 'Outline', value: 'outline' },
              { title: 'Ghost', value: 'ghost' },
            ],
          },
          initialValue: 'filled',
        }),
        defineField({
          name: 'buttonColor',
          title: 'Button Color',
          type: 'reference',
          to: [{ type: 'color' }],
        }),
        defineField({
          name: 'icon',
          title: 'Button Icon',
          type: 'iconPicker',
          description: 'Optional trailing icon (Material Symbol).',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Carousel Block',
        subtitle: 'Carousel Block',
      }
    },
  },
})
