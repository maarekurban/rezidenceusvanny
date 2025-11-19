import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Název webu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Popis webu',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactInfo',
      title: 'Kontaktní údaje',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string',
        },
        {
          name: 'email',
          title: 'E-mail',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Adresa',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'realtors',
      title: 'Realitní makléři',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Jméno',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Pozice',
              type: 'string',
            },
            {
              name: 'phone',
              title: 'Telefon',
              type: 'string',
            },
            {
              name: 'email',
              title: 'E-mail',
              type: 'string',
            },
            {
              name: 'photo',
              title: 'Fotka',
              type: 'image',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sociální sítě',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
  },
})

