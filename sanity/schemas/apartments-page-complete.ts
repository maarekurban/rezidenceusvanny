import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'apartmentsPageComplete',
  title: 'Byty - Stránka s přehledem',
  type: 'document',
  fields: [
    // === HERO SECTION ===
    defineField({
      name: 'heroBadge',
      title: 'Hero - Badge text',
      type: 'string',
      initialValue: 'III. Etapa v prodeji',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Hlavní nadpis (1. řádek)',
      type: 'string',
      description: 'Např. "Dostupné byty"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero - Zvýrazněný text (2. řádek)',
      type: 'string',
      description: 'Např. "III. etapa" - zobrazí se zlatým gradientem',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero - Popis',
      type: 'text',
      rows: 2,
      description: 'Popis pod nadpisem. {count} bude nahrazeno aktuálním počtem volných bytů.',
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
    
    // === QUICK STATS (4 karty) ===
    defineField({
      name: 'statDispositions',
      title: 'Statistika - Dispozice (text)',
      type: 'string',
      initialValue: '1-5+kk',
      description: 'Např. "1-5+kk"',
    }),
    defineField({
      name: 'statDispositionsLabel',
      title: 'Statistika - Dispozice (label)',
      type: 'string',
      initialValue: 'Dispozice',
    }),
    defineField({
      name: 'statArea',
      title: 'Statistika - Plocha (text)',
      type: 'string',
      initialValue: '32-115',
      description: 'Např. "32-115" (bez m²)',
    }),
    defineField({
      name: 'statAreaLabel',
      title: 'Statistika - Plocha (label)',
      type: 'string',
      initialValue: 'm² plocha',
    }),
    defineField({
      name: 'statEnergyClass',
      title: 'Statistika - Energetická třída (text)',
      type: 'string',
      initialValue: 'B',
    }),
    defineField({
      name: 'statEnergyClassLabel',
      title: 'Statistika - Energetická třída (label)',
      type: 'string',
      initialValue: 'Energ. třída',
    }),
    
    // === FILTER SECTION ===
    defineField({
      name: 'filterLabel',
      title: 'Filtr - Label',
      type: 'string',
      initialValue: 'Filtrovat:',
      description: 'Text zobrazený před filtry',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: 'Byty - Stránka s přehledem',
        subtitle: title || 'Hero sekce a statistiky',
      }
    },
  },
})

