import { defineField, defineType } from 'sanity'

export const callToActionBlock = defineType({
  name: 'callToActionBlock',
  title: 'Call to Action Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'Internal route like /destinations, or external URL.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Call to Action Block',
        subtitle: 'Call to Action Block',
        media,
      }
    },
  },
})
