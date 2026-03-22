import { defineField, defineType } from 'sanity'

export const testimonialsBlock = defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials Block',
  type: 'object',
  groups: [
    { name: 'design', title: 'Design Settings' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    defineField({
      name: 'design',
      title: 'Design Settings',
      type: 'blockDesign',
      group: 'design',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'headingItalic',
      title: 'Italic Heading',
      type: 'boolean',
      group: 'content',
      description: 'Display the heading in italic style (Community Voices).',
      initialValue: false,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      group: 'content',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
            }),
            defineField({
              name: 'authorAvatar',
              title: 'Author Avatar',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'quoteIcon',
              title: 'Quote Icon',
              type: 'string',
              description: 'Material Symbol name (default: format_quote).',
              initialValue: 'format_quote',
            }),
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'quote',
              media: 'authorAvatar',
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
        title: title || 'Testimonials Block',
        subtitle: 'Testimonials Block',
      }
    },
  },
})
