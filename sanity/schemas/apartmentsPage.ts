import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'apartmentsPage',
  title: 'Byty - stránka',
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

    // Intro Section
    defineField({
      name: 'introBadge',
      title: 'Úvod - Badge text',
      type: 'string',
      initialValue: 'Dostupné byty',
    }),
    defineField({
      name: 'introTitle',
      title: 'Úvod - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'introDescription',
      title: 'Úvod - Popis',
      type: 'text',
      rows: 3,
    }),

    // Filters Section
    defineField({
      name: 'filtersTitle',
      title: 'Filtry - Nadpis',
      type: 'string',
      initialValue: 'Filtrovat byty',
    }),

    // Gallery Section
    defineField({
      name: 'galleryBadge',
      title: 'Galerie - Badge text',
      type: 'string',
      initialValue: 'Interiéry bytů',
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Galerie - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'galleryDescription',
      title: 'Galerie - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galerie - Obrázky',
      type: 'array',
      of: [{ 
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'title',
            title: 'Název obrázku',
            type: 'string',
          }
        ]
      }],
      validation: Rule => Rule.min(6),
    }),

    // CTA Section
    defineField({
      name: 'ctaBadge',
      title: 'CTA - Badge text',
      type: 'string',
      initialValue: 'Kontakt',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaBackgroundImage',
      title: 'CTA - Obrázek pozadí',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Byty',
        subtitle: 'Obsah stránky byty',
      }
    },
  },
})


