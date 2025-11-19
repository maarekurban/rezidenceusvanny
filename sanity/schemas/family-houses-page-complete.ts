import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'familyHousesPageComplete',
  title: 'Rodinné domy - Stránka',
  type: 'document',
  fields: [
    // === HERO SECTION ===
    defineField({
      name: 'heroBadge',
      title: 'Hero - Badge text',
      type: 'string',
      initialValue: 'Portfolio realizací',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Hlavní nadpis (1. řádek)',
      type: 'string',
      description: 'Např. "Realizace"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Hero - Zvýrazněný text (2. řádek)',
      type: 'string',
      description: 'Např. "rodinných domů" - zobrazí se zlatým gradientem',
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
    
    // === QUICK STATS (4 karty) ===
    defineField({
      name: 'statHousesCount',
      title: 'Statistika - Počet domů',
      type: 'string',
      initialValue: '14',
    }),
    defineField({
      name: 'statHousesLabel',
      title: 'Statistika - Počet domů (label)',
      type: 'string',
      initialValue: 'Rodinných domů',
    }),
    defineField({
      name: 'statDispositions',
      title: 'Statistika - Dispozice',
      type: 'string',
      initialValue: '4-5+kk',
    }),
    defineField({
      name: 'statDispositionsLabel',
      title: 'Statistika - Dispozice (label)',
      type: 'string',
      initialValue: 'Dispozice',
    }),
    defineField({
      name: 'statArea',
      title: 'Statistika - Plocha',
      type: 'string',
      initialValue: '138-156',
    }),
    defineField({
      name: 'statAreaLabel',
      title: 'Statistika - Plocha (label)',
      type: 'string',
      initialValue: 'm² plocha',
    }),
    defineField({
      name: 'statPlot',
      title: 'Statistika - Pozemek',
      type: 'string',
      initialValue: '400-613',
    }),
    defineField({
      name: 'statPlotLabel',
      title: 'Statistika - Pozemek (label)',
      type: 'string',
      initialValue: 'm² pozemek',
    }),
    
    // === SOLD OUT NOTICE ===
    defineField({
      name: 'soldOutTitle',
      title: 'Sold Out - Nadpis',
      type: 'string',
      initialValue: 'Všechny rodinné domy jsou vyprodány',
    }),
    defineField({
      name: 'soldOutDescription1',
      title: 'Sold Out - Popis (1. odstavec)',
      type: 'text',
      rows: 2,
      initialValue: 'Děkujeme za zájem! Rodinné domy z I. etapy jsou všechny prodány a obývány spokojenými majiteli.',
    }),
    defineField({
      name: 'soldOutDescription2',
      title: 'Sold Out - Popis (2. odstavec)',
      type: 'string',
      initialValue: '✨ Aktuálně jsou k dispozici byty z III. etapy',
    }),
    defineField({
      name: 'soldOutButtonText',
      title: 'Sold Out - Text tlačítka',
      type: 'string',
      initialValue: 'Prohlédnout dostupné byty →',
    }),
    defineField({
      name: 'soldOutButtonLink',
      title: 'Sold Out - Link tlačítka',
      type: 'string',
      initialValue: '/byty',
    }),
    
    // === HOUSES GALLERY ===
    defineField({
      name: 'galleryBadge',
      title: 'Galerie - Badge text',
      type: 'string',
      initialValue: 'Naše realizace',
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Galerie - Hlavní nadpis (1. část)',
      type: 'string',
      initialValue: 'Galerie',
    }),
    defineField({
      name: 'galleryTitleHighlight',
      title: 'Galerie - Zvýrazněný text',
      type: 'string',
      initialValue: 'rodinných domů',
    }),
    defineField({
      name: 'galleryDescription',
      title: 'Galerie - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galerie - Obrázky domů',
      type: 'array',
      of: [{ 
        type: 'image',
        options: {
          hotspot: true,
        },
      }],
      description: '6 obrázků rodinných domů',
      validation: Rule => Rule.max(6),
    }),
    
    // === RELATED CONTENT - Byty CTA ===
    defineField({
      name: 'ctaBadge',
      title: 'CTA - Badge text',
      type: 'string',
      initialValue: 'Aktuálně v prodeji',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA - Hlavní nadpis (1. část)',
      type: 'string',
      initialValue: 'Byty III. etapy',
    }),
    defineField({
      name: 'ctaTitleHighlight',
      title: 'CTA - Zvýrazněný text',
      type: 'string',
      initialValue: 'jsou k dispozici',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaImage',
      title: 'CTA - Obrázek',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA - Text tlačítka',
      type: 'string',
      initialValue: 'Zobrazit dostupné byty',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA - Link tlačítka',
      type: 'string',
      initialValue: '/byty',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: 'Rodinné domy - Stránka',
        subtitle: title || 'Hero, Sold Out, Galerie, CTA',
      }
    },
  },
})

