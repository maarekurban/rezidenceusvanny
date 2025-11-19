import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Úvodní stránka',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero - Hlavní nadpis',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero - Podnadpis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero - Video pozadí',
      type: 'file',
      options: {
        accept: 'video/*'
      },
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero - Záložní obrázek pozadí',
      type: 'image',
      description: 'Zobrazí se pokud video nebude dostupné',
    }),

    // About Section
    defineField({
      name: 'aboutBadge',
      title: 'O projektu - Badge text',
      type: 'string',
      initialValue: 'O projektu',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'O projektu - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'O projektu - Popis',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'aboutImage',
      title: 'O projektu - Obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutStats',
      title: 'O projektu - Statistiky',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Číslo', type: 'string' },
          { name: 'label', title: 'Popisek', type: 'string' },
        ]
      }],
      validation: Rule => Rule.max(3),
    }),

    // Apartments Section
    defineField({
      name: 'apartmentsBadge',
      title: 'Byty - Badge text',
      type: 'string',
      initialValue: 'Byty',
    }),
    defineField({
      name: 'apartmentsTitle',
      title: 'Byty - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'apartmentsDescription',
      title: 'Byty - Popis',
      type: 'text',
      rows: 3,
    }),

    // Features Section
    defineField({
      name: 'featuresBadge',
      title: 'Výhody - Badge text',
      type: 'string',
      initialValue: 'Výhody bydlení',
    }),
    defineField({
      name: 'featuresTitle',
      title: 'Výhody - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'featuresDescription',
      title: 'Výhody - Popis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Výhody - Seznam',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Nadpis', type: 'string' },
          { name: 'description', title: 'Popis', type: 'text', rows: 3 },
          { 
            name: 'icon', 
            title: 'Ikona', 
            type: 'string',
            options: {
              list: [
                { title: 'Checkmark', value: 'check' },
                { title: 'Star', value: 'star' },
                { title: 'Location', value: 'location' },
                { title: 'Home', value: 'home' },
              ]
            }
          },
        ]
      }],
    }),

    // Location Section
    defineField({
      name: 'locationBadge',
      title: 'Lokalita - Badge text',
      type: 'string',
      initialValue: 'Lokalita',
    }),
    defineField({
      name: 'locationTitle',
      title: 'Lokalita - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Lokalita - Popis',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'locationImage',
      title: 'Lokalita - Obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'locationFeatures',
      title: 'Lokalita - Vlastnosti',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Nadpis', type: 'string' },
          { name: 'description', title: 'Popis', type: 'text', rows: 2 },
        ]
      }],
    }),

    // Gallery Section
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
            name: 'alt',
            title: 'Alt text',
            type: 'string',
          }
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
      rows: 3,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Kontakt - Email',
      type: 'string',
    }),

    // Video Section
    defineField({
      name: 'videoBadge',
      title: 'Video - Badge text',
      type: 'string',
      initialValue: 'Proč si vybrat tento projekt',
    }),
    defineField({
      name: 'videoTitle',
      title: 'Video - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video - YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'videoFeatures',
      title: 'Video - Vlastnosti',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Nadpis', type: 'string' },
          { name: 'description', title: 'Popis', type: 'text', rows: 3 },
        ]
      }],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Úvodní stránka',
        subtitle: 'Homepage obsah',
      }
    },
  },
})
