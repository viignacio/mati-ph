import { defineField, defineType } from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  groups: [
    { name: 'content', title: 'Text Content' },
    { name: 'image', title: 'Image Section' },
  ],
  fields: [
    defineField({
      name: 'layoutVariant',
      title: 'Layout Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Full Screen', value: 'full-screen' },
          { title: 'Split Content', value: 'split-content' },
        ],
      },
      initialValue: 'full-screen',
    }),
    defineField({
      name: 'heroType',
      title: 'Hero Type',
      type: 'string',
      options: {
        list: [
          { title: 'Single Image', value: 'image' },
          { title: 'Single Video', value: 'video' },
          { title: 'Hero Slides', value: 'slides' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'design',
      title: 'Design Options',
      type: 'blockDesign',
    }),
    defineField({
      name: 'animateText',
      title: 'Animate Text',
      type: 'boolean',
      description: 'Stagger semantic text entrances',
      initialValue: false,
    }),
    defineField({
      name: 'contentAlignment',
      title: 'Content Alignment',
      type: 'string',
      description: 'Which side the text content shows on (only for Split Content).',
      options: {
        list: [
          { title: 'Content Left', value: 'left' },
          { title: 'Content Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      hidden: ({ parent }) => parent?.layoutVariant !== 'split-content',
    }),

    // --- Text Content Group ---
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'highlightedWord',
      title: 'Highlighted Word',
      type: 'string',
      group: 'content',
      description: 'A word in the heading to highlight with primary color and italics.',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'highlightColor',
      title: 'Highlight Color',
      type: 'string',
      group: 'content',
      description: 'Color for the highlighted word in the heading.',
      options: {
        list: [
          { title: 'Primary (Teal)', value: 'primary' },
          { title: 'Secondary (Blue)', value: 'secondary' },
          { title: 'Tertiary (Orange)', value: 'tertiary' },
          { title: 'Neutral (Gray/Surface)', value: 'neutral' },
        ],
      },
      initialValue: 'primary',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action 1',
      type: 'object',
      group: 'content',
      hidden: ({ parent }) => parent?.heroType === 'slides',
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
          name: 'buttonStyle',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary (Deep Teal)', value: 'primary' },
              { title: 'Secondary (Ocean Blue)', value: 'secondary' },
              { title: 'Tertiary (Burnt Orange)', value: 'tertiary' },
              { title: 'Outline (Ghost)', value: 'outline' },
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Call to Action 2',
      type: 'object',
      group: 'content',
      hidden: ({ parent }) => parent?.heroType === 'slides',
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
          name: 'buttonStyle',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary (Deep Teal)', value: 'primary' },
              { title: 'Secondary (Ocean Blue)', value: 'secondary' },
              { title: 'Tertiary (Burnt Orange)', value: 'tertiary' },
              { title: 'Outline (Ghost)', value: 'outline' },
            ],
          },
          initialValue: 'secondary',
        }),
      ],
    }),

    // --- Image Section Group ---
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette']
      },
      hidden: ({ parent }) => parent?.heroType !== 'image' && parent?.heroType !== undefined, 
    }),
    defineField({
      name: 'imageAspectRatio',
      title: 'Image Aspect Ratio',
      type: 'string',
      group: 'image',
      options: {
        list: [
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Standard (4:3)', value: '4:3' },
          { title: 'Portrait (3:4)', value: 'portrait' },
        ],
      },
      initialValue: '4:3',
      hidden: ({ parent }) => parent?.layoutVariant !== 'split-content',
    }),
    defineField({
      name: 'quotation',
      title: 'Decorative Quotation',
      type: 'string',
      group: 'image',
      description: 'A decorative quote shown over the image (only for Split Content).',
      hidden: ({ parent }) => parent?.layoutVariant !== 'split-content',
    }),
    defineField({
      name: 'quotationPosition',
      title: 'Decorative Quotation Position',
      type: 'string',
      group: 'image',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
        ],
      },
      initialValue: 'bottom',
      hidden: ({ parent }) => parent?.layoutVariant !== 'split-content',
    }),
    defineField({
      name: 'quotationAspectRatio',
      title: 'Decorative Quotation Aspect Ratio',
      type: 'string',
      group: 'image',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Square', value: 'square' },
        ],
      },
      initialValue: 'landscape',
      hidden: ({ parent }) => parent?.layoutVariant !== 'split-content',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video (File)',
      type: 'file',
      group: 'image',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.heroType !== 'video',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Block',
        subtitle: 'Hero Block',
        media,
      }
    },
  },
})
