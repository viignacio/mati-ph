import { defineArrayMember, defineField, defineType } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const highlightsBlock = defineType({
  name: 'highlightsBlock',
  title: 'Highlights Block',
  type: 'object',
  icon: SparklesIcon,
  groups: [
    { name: 'design', title: 'Design' },
    { name: 'content', title: 'Content' },
    { name: 'images', title: 'Images' },
  ],
  fields: [
    defineField({
      name: 'design',
      title: 'Design Settings',
      type: 'blockDesign',
      group: 'design',
    }),
    defineField({
      name: 'layoutAlignment',
      title: 'Layout Alignment',
      type: 'string',
      group: 'design',
      description: 'Position of the text content relative to the image grid.',
      options: {
        list: [
          { title: 'Content Left (Standard)', value: 'left' },
          { title: 'Content Right (Reversed)', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'icon',
      title: 'Block Icon',
      type: 'iconPicker',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      description: 'Opening paragraph of the section.',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights List',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'iconPicker' }),
            defineField({
              name: 'iconColor',
              title: 'Icon Color',
              type: 'reference',
              to: [{ type: 'color' }],
              description: 'Overrides the block accent color for this icon only.',
            }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
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
      name: 'itemImages',
      title: 'Image Grid',
      type: 'array',
      group: 'images',
      description: 'Select up to 4 images for the asymmetric grid.',
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: 'Auto', value: 'auto' },
                  { title: 'Square (1:1)', value: 'square' },
                  { title: 'Video (16:9)', value: 'video' },
                  { title: 'Portrait (3:4)', value: 'portrait' },
                ],
              },
              initialValue: 'auto',
            }),
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
              name: 'rowSpan',
              title: 'Row Span',
              type: 'number',
              options: {
                list: [1, 2],
              },
              initialValue: 1,
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'alt',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'accentColor',
      media: 'itemImages.0.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Highlights Block',
        subtitle: `Highlights Block (${subtitle || 'No Accent'})`,
        media,
      }
    },
  },
})
