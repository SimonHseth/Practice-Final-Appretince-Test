import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tursider',
  title: 'Tursider',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'beskrivelse',
      title: 'Beskrivelse',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vanskelighetsgrad',
      title: 'Vanskelighetsgrad',
      type: 'string',
      options: {
        list: [
          {title: 'Lett', value: 'lett'},
          {title: 'Middels', value: 'middels'},
          {title: 'Vanskelig', value: 'vanskelig'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lengde',
      title: 'Lengde',
      type: 'number',
      description: 'Lengde i kilometer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estimertTid',
      title: 'Estimert tid',
      type: 'number',
      description: 'Estimert tid i timer (gangfart)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'anbefaltStartpunkt',
      title: 'Anbefalt startpunkt',
      type: 'string',
      description: 'hvis denne ikke passer til turstien kan du skrive lokasjon i stedet',
    }),
    defineField({
      name: 'lokasjon',
      title: 'Lokasjon',
      type: 'string',
      description: 'hvis denne ikke passer til turstien kan du skrive anbefalt startpunkt i stedet',
    }),
    defineField({
      name: 'height',
      title: 'Høyde',
      type: 'number',
      description: 'total høyde i meter',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageGallery',
      title: 'Bildegalleri',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.required().min(1).error('Du må legge til minst ett bilde i galleriet'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
