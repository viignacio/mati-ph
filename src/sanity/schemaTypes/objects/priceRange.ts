import { defineField, defineType } from 'sanity'

export const priceRange = defineType({
  name: 'priceRange',
  title: 'Price Range',
  type: 'object',
  fields: [
    defineField({
      name: 'level',
      title: 'Price Level',
      type: 'string',
      options: {
        list: [
          { title: '$ (Budget)', value: '$' },
          { title: '$$ (Moderate)', value: '$$' },
          { title: '$$$ (Premium)', value: '$$$' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional detail (e.g. "₱500 - ₱1,500 per person")',
    }),
  ],
})
