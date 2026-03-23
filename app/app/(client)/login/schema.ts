import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'loginPage',
  title: 'Login Page',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      media: 'backgroundImage',
    },
    prepare() {
      return { title: 'Login Page' }
    },
  },
})
