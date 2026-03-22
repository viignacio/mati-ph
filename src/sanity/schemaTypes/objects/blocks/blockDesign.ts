import { defineField, defineType } from 'sanity'

export const blockDesign = defineType({
  name: 'blockDesign',
  title: 'Block Design Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Defines the tonal layering color of this block.',
      options: {
        list: [
          { title: 'Surface (Standard)', value: 'surface' },
          { title: 'Surface Container Low', value: 'surface-container-low' },
          { title: 'Surface Container Highest', value: 'surface-container-highest' },
          { title: 'Primary Gradient', value: 'primary-gradient' },
          { title: 'Transparent', value: 'transparent' },
        ],
      },
      initialValue: 'surface',
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
