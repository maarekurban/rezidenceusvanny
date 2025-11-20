import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'importantInfoPage',
  title: 'Důležité informace',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero - Nadpis',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero - Podnadpis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero - Obrázek pozadí',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Documents Section
    defineField({
      name: 'documentsBadge',
      title: 'Dokumenty - Badge text',
      type: 'string',
      initialValue: 'Dokumenty',
    }),
    defineField({
      name: 'documentsTitle',
      title: 'Dokumenty - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'documentsDescription',
      title: 'Dokumenty - Popis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'documents',
      title: 'Užitečné dokumenty',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pdfDocument' }] }],
      validation: Rule => Rule.required().min(1),
    }),

    // Standards Section
    defineField({
      name: 'standardsBadge',
      title: 'Standardy - Badge text',
      type: 'string',
      initialValue: 'Standardy',
    }),
    defineField({
      name: 'standardsTitle',
      title: 'Standardy - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'standardsDescription',
      title: 'Standardy - Popis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'standardsItems',
      title: 'Standardy - Seznam',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'category', title: 'Kategorie', type: 'string' },
          { name: 'title', title: 'Nadpis', type: 'string' },
          { name: 'description', title: 'Popis', type: 'text', rows: 3 },
        ]
      }],
    }),

    // Energy Class Section
    defineField({
      name: 'energyBadge',
      title: 'Energetická třída - Badge text',
      type: 'string',
      initialValue: 'Energetická třída',
    }),
    defineField({
      name: 'energyTitle',
      title: 'Energetická třída - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'energyDescription',
      title: 'Energetická třída - Popis',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'energyClass',
      title: 'Energetická třída - Označení',
      type: 'string',
      options: {
        list: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      },
    }),
    defineField({
      name: 'energyFeatures',
      title: 'Energetická třída - Vlastnosti',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Nadpis', type: 'string' },
          { name: 'description', title: 'Popis', type: 'text', rows: 2 },
        ]
      }],
    }),

    // Contact Form Section
    defineField({
      name: 'contactBadge',
      title: 'Kontakt - Badge text',
      type: 'string',
      initialValue: 'Kontaktujte nás',
    }),
    defineField({
      name: 'contactTitle',
      title: 'Kontakt - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Kontakt - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Kontakt - Email',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Důležité informace',
        subtitle: 'Obsah stránky',
      }
    },
  },
})


