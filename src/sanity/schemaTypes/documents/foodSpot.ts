import { defineField, defineType } from 'sanity'
import { BasketIcon } from '@sanity/icons'

export const foodSpot = defineType({
  name: 'foodSpot',
  title: 'Food Spot',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
    }),
    defineField({
      name: 'cuisineType',
      title: 'Cuisine Type',
      type: 'string',
      options: {
        list: [
          { title: 'Seafood', value: 'seafood' },
          { title: 'Filipino', value: 'filipino' },
          { title: 'Grilled / Ihaw', value: 'grilled' },
          { title: 'Desserts & Sweets', value: 'desserts' },
          { title: 'Drinks & Juices', value: 'drinks' },
          { title: 'Mixed / Casual', value: 'mixed' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'locationPoint',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'priceRange',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'string',
      description: 'e.g. "Mon–Sat: 7am–10pm"',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'cuisineType',
      media: 'mainImage',
    },
  },
})
