import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'importantInfoPageComplete',
  title: 'Důležité informace - Stránka',
  type: 'document',
  fields: [
    // === HERO SECTION ===
    defineField({
      name: 'heroBadge',
      title: 'Hero - Badge text',
      type: 'string',
      initialValue: 'Informace pro kupující',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Hlavní nadpis (1. část)',
      type: 'string',
      description: 'Např. "Důležité"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero - Zvýrazněný text',
      type: 'string',
      description: 'Např. "informace" - zobrazí se zlatým gradientem',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero - Popis',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero - Obrázek pozadí',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    
    // === FINANCOVÁNÍ SECTION ===
    defineField({
      name: 'financingBadge',
      title: 'Financování - Badge text',
      type: 'string',
      initialValue: 'Financování',
    }),
    defineField({
      name: 'financingTitle',
      title: 'Financování - Hlavní nadpis (1. část)',
      type: 'string',
      initialValue: 'Financování',
    }),
    defineField({
      name: 'financingTitleHighlight',
      title: 'Financování - Zvýrazněný text',
      type: 'string',
      initialValue: 'bytů',
    }),
    defineField({
      name: 'financingIntro',
      title: 'Financování - Úvodní text',
      type: 'text',
      rows: 3,
      description: 'První odstavec o financování',
    }),
    defineField({
      name: 'financingCards',
      title: 'Financování - Výhody (4 karty)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Nadpis', type: 'string', validation: Rule => Rule.required() },
          { name: 'description', title: 'Popis', type: 'text', rows: 2, validation: Rule => Rule.required() },
        ],
        preview: {
          select: {
            title: 'title'
          }
        }
      }],
      validation: Rule => Rule.max(4),
    }),
    defineField({
      name: 'financingOutro',
      title: 'Financování - Závěrečný text',
      type: 'text',
      rows: 2,
      description: 'Poslední odstavec o financování',
    }),
    
    // === DOKUMENTY SECTION ===
    defineField({
      name: 'documentsBadge',
      title: 'Dokumenty - Badge text',
      type: 'string',
      initialValue: 'Dokumentace',
    }),
    defineField({
      name: 'documentsTitle',
      title: 'Dokumenty - Hlavní nadpis (1. část)',
      type: 'string',
      initialValue: 'Užitečné',
    }),
    defineField({
      name: 'documentsTitleHighlight',
      title: 'Dokumenty - Zvýrazněný text',
      type: 'string',
      initialValue: 'dokumenty',
    }),
    defineField({
      name: 'documentsDescription',
      title: 'Dokumenty - Popis',
      type: 'text',
      rows: 1,
    }),
    defineField({
      name: 'documentsBackgroundImage',
      title: 'Dokumenty - Obrázek pozadí',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'documents',
      title: 'Dokumenty - Seznam PDF',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Název dokumentu', type: 'string', validation: Rule => Rule.required() },
          { name: 'file', title: 'PDF soubor', type: 'file', options: { accept: 'application/pdf' }, validation: Rule => Rule.required() },
        ],
        preview: {
          select: {
            title: 'title'
          }
        }
      }],
      description: '5 dokumentů (PENB A1, A2, B1, Standard, Zásady)',
    }),
    
    // === KONTAKT FORMULÁŘ SECTION ===
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
      initialValue: 'Máte zájem o byt ve III. etapě?',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Kontakt - Popis',
      type: 'text',
      rows: 1,
      initialValue: 'Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Kontakt - Email',
      type: 'string',
      initialValue: 'info@rezidenceusvanny.cz',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: 'Důležité informace - Stránka',
        subtitle: title || 'Financování, dokumenty, kontakt',
      }
    },
  },
})

