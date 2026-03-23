import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Hjemmeside',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Undertittel',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hovedbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredTrails',
      title: 'Fremhevede turer',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tursider'}]}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hjemmeside'}
    },
  },
})
