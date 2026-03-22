import { defineField, defineType } from 'sanity'

export const blockDesign = defineType({
  name: 'blockDesign',
  title: 'Block Design Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColorRef',
      title: 'Background Color',
      type: 'reference',
      to: [{ type: 'color' }],
      description: 'Select a color from the global palette.',
    }),
    defineField({
      name: 'accentColorRef',
      title: 'Accent Color',
      type: 'reference',
      to: [{ type: 'color' }],
      description: 'Used for decorative elements like icons, borders, and highlights.',
    }),
    defineField({
      name: 'containerStyle',
      title: 'Container Style',
      type: 'string',
      description: 'Controls the structural wrapper of the block.',
      options: {
        list: [
          { title: 'Full Bleed (Edge to Edge)', value: 'full-bleed' },
          { title: 'Rounded Container', value: 'rounded-container' },
        ],
      },
      initialValue: 'full-bleed',
    }),
    defineField({
      name: 'topPadding',
      title: 'Top Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Standard (80px)', value: 'standard' },
          { title: 'Large (96px)', value: 'large' },
          { title: 'Larger (128px)', value: 'larger' },
          { title: 'None (0px)', value: 'none' },
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'bottomPadding',
      title: 'Bottom Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Standard (80px)', value: 'standard' },
          { title: 'Large (96px)', value: 'large' },
          { title: 'Larger (128px)', value: 'larger' },
          { title: 'None (0px)', value: 'none' },
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'showDecorativeAccent',
      title: 'Show Decorative Accent',
      type: 'boolean',
      description: 'Show cultural motifs (Mandaya dots/circles) behind or near images.',
      initialValue: false,
    }),
  ],
})
