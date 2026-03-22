import { defineField, defineType } from 'sanity'

export const gridBlock = defineType({
  name: 'gridBlock',
  title: 'Grid Block',
  type: 'object',
  fields: [
    defineField({
      name: 'design',
      title: 'Design Options',
      type: 'blockDesign',
    }),
    defineField({
      name: 'layoutVariant',
      title: 'Layout Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Grid', value: 'standard-grid' },
          { title: 'Asymmetric Masonry', value: 'asymmetric-masonry' },
          { title: 'Bento Grid', value: 'bento-grid' },
        ],
      },
      initialValue: 'standard-grid',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      options: {
        list: [
          { title: 'Elevated (Layered)', value: 'elevated' },
          { title: 'Flat (No background)', value: 'flat' },
          { title: 'Overlay Content (Islands Style)', value: 'overlay-content' },
        ],
      },
      initialValue: 'elevated',
    }),
    defineField({
      name: 'staggered',
      title: 'Staggered Layout',
      type: 'boolean',
      description: 'Offset middle items in a 3-column grid (Islands style).',
      initialValue: false,
    }),
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
      name: 'manualItems',
      title: 'Manual Items',
      type: 'array',
      description: 'Select specific items to display in this grid, with optional layout overrides per item.',
      of: [
        defineField({
          name: 'gridItem',
          type: 'object',
          fields: [
            defineField({
              name: 'reference',
              title: 'Content Reference',
              type: 'reference',
              to: [
                { type: 'destination' },
                { type: 'activity' },
                { type: 'foodSpot' },
                { type: 'travelGuide' },
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'itemSettings',
              title: 'Layout & Design Overrides',
              type: 'object',
              fields: [
                defineField({
                  name: 'colSpan',
                  title: 'Column Span',
                  type: 'number',
                  options: {
                    list: [1, 2],
                  },
                  initialValue: 1,
                }),
                defineField({
                  name: 'aspectRatio',
                  title: 'Aspect Ratio',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Square (1:1)', value: 'square' },
                      { title: 'Portrait', value: 'portrait' },
                      { title: 'Landscape', value: 'landscape' },
                      { title: 'Ultra Wide', value: 'wide' },
                    ],
                  },
                  initialValue: 'square',
                }),
                defineField({
                  name: 'ctaType',
                  title: 'CTA Stylization',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Arrow Icon', value: 'arrow' },
                      { title: 'Text Button', value: 'button' },
                      { title: 'None', value: 'none' }
                    ],
                  },
                  initialValue: 'arrow',
                }),
                defineField({
                  name: 'ctaText',
                  title: 'CTA Text',
                  type: 'string',
                  description: 'Used only if CTA Stylization is "Text Button". e.g. "Explore Beach"',
                  hidden: ({ parent }) => parent?.ctaType !== 'button',
                }),
                defineField({
                  name: 'ctaLink',
                  title: 'CTA Link Override',
                  type: 'string',
                  description: 'Optional URL override. If blank, it links directly to the content page.',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'reference.name',
              subtitle: 'itemSettings.aspectRatio',
              media: 'reference.mainImage',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Block Call to Action (Optional)',
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
  preview: {
    select: {
      title: 'heading',
      media: 'manualItems.0.reference.mainImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Grid Block',
        subtitle: 'Grid Block',
        media,
      }
    },
  },
})
