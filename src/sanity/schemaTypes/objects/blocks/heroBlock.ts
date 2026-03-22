import { defineField, defineType } from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'highlightedWord',
      title: 'Highlighted Word',
      type: 'string',
      description: 'A word in the heading to highlight with primary color and italics.',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      hidden: ({ parent }) => parent?.heroType === 'slides',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette']
      },
      hidden: ({ parent }) => parent?.heroType !== 'image' && parent?.heroType !== undefined, 
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video (File)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.heroType !== 'video',
    }),

    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
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
      title: 'Secondary Call to Action',
      type: 'object',
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
