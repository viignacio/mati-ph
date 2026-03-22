import { defineField, defineType } from 'sanity'

export const gridBlock = defineType({
  name: 'gridBlock',
  title: 'Grid Block',
  type: 'object',
  groups: [
    { name: 'design', title: 'Design' },
    { name: 'content', title: 'Content' },
    { name: 'grid', title: 'Grid Items' },
  ],
  fields: [
    defineField({
      name: 'layoutVariant',
      title: 'Layout Variant',
      type: 'string',
      group: 'design',
      options: {
        list: [
          { title: 'Standard Grid', value: 'standard-grid' },
          { title: 'Asymmetric Masonry', value: 'asymmetric-masonry' },
          { title: 'Masonry with Captions (Islands)', value: 'masonry-captions' },
          { title: 'Bento Grid', value: 'bento-grid' },
        ],
      },
      initialValue: 'standard-grid',
    }),
    defineField({
      name: 'design',
      title: 'Design Options',
      type: 'blockDesign',
      group: 'design',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      group: 'design',
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
      group: 'design',
      description: 'Offset middle items in a 3-column grid (Islands style).',
      initialValue: false,
    }),
    // Content Group
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'cta',
      title: 'Block Call to Action (Optional)',
      type: 'object',
      group: 'content',
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
          initialValue: 'ghost',
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

    // --- Standard Grid Items (Manual References) ---
    defineField({
      name: 'manualItems',
      title: 'Manual Items (Content References)',
      type: 'array',
      group: 'grid',
      description: 'Select specific items to display in this grid. NOT used in Bento Grid.',
      hidden: ({ parent }) => parent?.layoutVariant === 'bento-grid',
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
              validation: (Rule) => Rule.custom((value, context) => {
                const { document, path } = context
                
                // If we're inside a bento grid, validation is not required
                // We resolve this by checking the block's layoutVariant in the document content
                const blocks = (document as any)?.content || []
                const blockKey = path?.[1] ? (path[1] as any)?._key : null
                const currentBlock = blocks.find((b: any) => b._key === blockKey)
                
                const layout = currentBlock?.layoutVariant || (document as any)?.layoutVariant
                
                if (layout === 'bento-grid') return true
                return value ? true : 'Required'
              }),
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

    // --- Bento Image Grid Items ---
    defineField({
      name: 'imageGrid',
      title: 'Bento Image Grid',
      type: 'array',
      group: 'grid',
      description: 'Used only for the Bento Grid variant.',
      hidden: ({ parent }) => parent?.layoutVariant !== 'bento-grid',
      of: [
        defineField({
          name: 'bentoItem',
          type: 'object',
          fields: [
            defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'itemTagline', title: 'Item Tagline', type: 'string' }),
            defineField({ name: 'itemHeading', title: 'Item Heading', type: 'string' }),
            defineField({ name: 'itemSubheading', title: 'Item Subheading', type: 'string' }),
            defineField({ 
              name: 'enableHover', 
              title: 'Enable Special Hover Effect', 
              type: 'boolean',
              description: 'When enabled, shows a colored overlay with centered text box on hover.',
              initialValue: false 
            }),
            defineField({
              name: 'hoverColor',
              title: 'Hover Overlay Color',
              type: 'reference',
              to: [{ type: 'color' }],
              hidden: ({ parent }) => !parent?.enableHover,
            }),
            defineField({
              name: 'hoverText',
              title: 'Hover Box Text',
              type: 'string',
              hidden: ({ parent }) => !parent?.enableHover,
            }),
            defineField({
              name: 'colSpan',
              title: 'Column Span',
              type: 'number',
              options: { list: [1, 2, 3, 4] },
              initialValue: 1,
            }),
            defineField({
              name: 'rowSpan',
              title: 'Row Span',
              type: 'number',
              options: { list: [1, 2] },
              initialValue: 1,
            }),
            defineField({ name: 'ctaLink', title: 'Link (Optional)', type: 'string' }),
          ],
          preview: {
            select: {
              title: 'itemHeading',
              subtitle: 'itemTagline',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'manualItems.0.reference.mainImage',
      mediaBento: 'imageGrid.0.image',
    },
    prepare({ title, media, mediaBento }) {
      return {
        title: title || 'Grid Block',
        subtitle: 'Grid Block',
        media: media || mediaBento,
      }
    },
  },
})
