import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pdfDocument',
  title: 'Dokumenty',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: 'Soubor',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          { title: 'PENB', value: 'penb' },
          { title: 'Standardy', value: 'standards' },
          { title: 'Zásady', value: 'rules' },
          { title: 'Ostatní', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})

