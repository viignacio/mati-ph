import { defineField, defineType } from 'sanity'

export const locationPoint = defineType({
  name: 'locationPoint',
  title: 'Location Point',
  type: 'object',
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Physical address or general location description',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'lng',
      title: 'Longitude',
      type: 'number',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
  ],
})
