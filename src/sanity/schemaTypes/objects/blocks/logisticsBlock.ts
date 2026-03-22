import { defineField, defineType } from 'sanity'

export const logisticsBlock = defineType({
  name: 'logisticsBlock',
  title: 'Logistics Block',
  type: 'object',
  fields: [
    defineField({
      name: 'design',
      title: 'Design Options',
      type: 'blockDesign',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'link', title: 'Button Link', type: 'string' }),
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
      ],
    }),
    defineField({
      name: 'cards',
      title: 'Logistics Cards',
      type: 'array',
      validation: (Rule) => Rule.max(3),
      of: [
        defineField({
          name: 'logisticsCard',
          type: 'object',
          fields: [
            defineField({
              name: 'orientation',
              title: 'Orientation',
              type: 'string',
              options: {
                list: [
                  { title: 'Portrait (Narrow)', value: 'portrait' },
                  { title: 'Landscape (Wide)', value: 'landscape' },
                ],
              },
              initialValue: 'portrait',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'iconPicker',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'theme',
              title: 'Theme',
              type: 'string',
              options: {
                list: [
                  { title: 'Light', value: 'light' },
                  { title: 'Dark (Primary/On-Background)', value: 'dark' },
                ],
              },
              initialValue: 'light',
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.theme !== 'dark',
            }),
            defineField({
              name: 'statLayout',
              title: 'Stat Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Vertical List', value: 'list' },
                  { title: '2x2 Grid', value: 'grid' },
                ],
              },
              initialValue: 'list',
            }),
            defineField({
              name: 'stats',
              title: 'Stats / Key Details',
              type: 'array',
              of: [
                defineField({
                  name: 'stat',
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', type: 'string' }),
                    defineField({ name: 'value', type: 'string' }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'orientation',
            },
          },
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
        title: title || 'Logistics Block',
        subtitle: 'Logistics Block',
      }
    },
  },
})
