import { defineField, defineType } from 'sanity'

export const textWithImageBlock = defineType({
  name: 'textWithImageBlock',
  title: 'Text With Image Block',
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
          { title: 'Standard Split', value: 'standard-split' },
          { title: 'Split Container (Sambuokan)', value: 'split-container' },
        ],
      },
      initialValue: 'standard-split',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Optional kicker text, e.g. "Upcoming Experience"',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'preamble',
      title: 'Preamble / Sub-text',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText', // Reusing the existing richText schema
    }),
    defineField({
      name: 'date',
      title: 'Date Context',
      type: 'string',
      description: 'Optional date field, e.g. 2024-10-XX or "OCT 2024".',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
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
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Add up to 3 images to create a side-by-side gallery next to the text.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['lqip', 'palette']
          },
        }
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
})
