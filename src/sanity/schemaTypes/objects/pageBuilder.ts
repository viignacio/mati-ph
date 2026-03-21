import { defineType } from 'sanity'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    { type: 'heroBlock' },
    { type: 'textWithImageBlock' },
    { type: 'carouselBlock' },
    { type: 'gridBlock' },
    { type: 'callToActionBlock' },
    { type: 'featuresBlock' },
    { type: 'testimonialsBlock' },
  ],
})
