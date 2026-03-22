import { defineField, defineType } from 'sanity'
import { featureIconOptions } from '../../../lib/featureIconOptions'

export const featuresBlock = defineType({
  name: 'featuresBlock',
  title: 'Features Block',
  type: 'object',
  fields: [
    defineField({
      name: 'layoutVariant',
      title: 'Layout Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Icon List', value: 'icon-list' },
          { title: 'Feature List with Image', value: 'feature-list-with-image' },
        ],
      },
      initialValue: 'icon-list',
    }),
    defineField({
      name: 'design',
      title: 'Design Options',
      type: 'blockDesign',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Optional kicker text above the heading, e.g. "Water Sports"',
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
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Anchor image used for the feature-list-with-image layout.',
      options: { 
        hotspot: true,
        metadata: ['lqip', 'palette']
      },
      hidden: ({ parent }) => parent?.layoutVariant !== 'feature-list-with-image',
    }),
    defineField({
      name: 'imageTag',
      title: 'Image Tag',
      type: 'string',
      description: 'Short label overlaid on the image, e.g. "Adrenaline" or "Family-Friendly".',
      hidden: ({ parent }) => parent?.layoutVariant !== 'feature-list-with-image',
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
      initialValue: 'left',
      hidden: ({ parent }) => parent?.layoutVariant !== 'feature-list-with-image',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: featureIconOptions,
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Block Call to Action',
      type: 'object',
      description: 'Optional block level primary button, e.g. "Find a Coach".',
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
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'mainImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Features Block',
        subtitle: 'Features Block',
        media,
      }
    },
  },
})
