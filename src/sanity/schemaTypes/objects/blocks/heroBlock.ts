import { defineField, defineType } from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
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
      },
      hidden: ({ parent }) => parent?.heroType !== 'image' && parent?.heroType !== undefined, // undefined might be the case for existing docs
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
      ],
    }),
  ],
})
