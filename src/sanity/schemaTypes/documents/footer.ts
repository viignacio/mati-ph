import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const footer = defineType({
  name: 'footer',
  title: 'Global Footer',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Global Footer Settings',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ]
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ]
        }
      ]
    }),
    defineField({
      name: 'explore',
      title: 'Explore Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'links', title: 'Links', type: 'array', of: [{ type: 'navigationItem' }] }),
      ]
    }),
    defineField({
      name: 'connect',
      title: 'Connect Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
      ]
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Section',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Copyright Text', type: 'string' }),
        defineField({ name: 'privacyPolicyUrl', title: 'Privacy Policy URL', type: 'string' }),
        defineField({ name: 'termsOfUseUrl', title: 'Terms of Use URL', type: 'string' }),
      ]
    }),
  ],
})
