import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Úvodní stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'heroVideo',
      title: 'Hero video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hlavní nadpis',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Podnadpis',
      type: 'text',
    }),
    defineField({
      name: 'heroStats',
      title: 'Statistiky v Hero sekci',
      type: 'object',
      fields: [
        {
          name: 'apartments',
          title: 'Počet bytů',
          type: 'number',
        },
        {
          name: 'houses',
          title: 'Počet rodinných domů',
          type: 'number',
        },
        {
          name: 'energyClass',
          title: 'Energetická třída',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'aboutSection',
      title: 'Sekce O projektu',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Nadpis',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Text',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'videoUrl',
          title: 'YouTube video URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'benefitsSection',
      title: 'Sekce Výhody projektu',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Nadpis',
          type: 'string',
        },
        {
          name: 'benefits',
          title: 'Výhody',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Ikona',
                  type: 'string',
                  description: 'SVG kód ikony',
                },
                {
                  name: 'title',
                  title: 'Název',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Popis',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galerie obrázků',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
  },
})

