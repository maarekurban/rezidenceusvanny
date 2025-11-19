import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageComplete',
  title: 'Homepage - Úvodní stránka',
  type: 'document',
  fields: [
    // === HERO SECTION ===
    defineField({
      name: 'heroTitle',
      title: 'Hero - Hlavní nadpis',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero - Podnadpis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero - Video pozadí (MP4)',
      type: 'file',
      options: {
        accept: 'video/mp4'
      },
    }),
    defineField({
      name: 'heroBadgeText',
      title: 'Hero - Badge text',
      type: 'string',
      initialValue: 'III. Etapa v prodeji',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero - Statistiky',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Číslo', type: 'string', validation: Rule => Rule.required() },
          { name: 'label', title: 'Popisek', type: 'string', validation: Rule => Rule.required() },
        ],
        preview: {
          select: {
            title: 'number',
            subtitle: 'label'
          }
        }
      }],
      validation: Rule => Rule.max(3),
    }),
    
    // === O PROJEKTU (UNESCO MĚSTO) ===
    defineField({
      name: 'aboutBadge',
      title: 'O projektu - Badge text',
      type: 'string',
      initialValue: 'MĚSTO PAMÁTKY UNESCO',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'O projektu - Nadpis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'aboutDescription',
      title: 'O projektu - Popis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'aboutVideoUrl',
      title: 'O projektu - YouTube Video URL',
      type: 'url',
    }),
    
    // === TŘI ETAPY VÝSTAVBY ===
    defineField({
      name: 'stagesBadge',
      title: 'Etapy - Badge text',
      type: 'string',
      initialValue: 'PRŮBĚH REALIZACE',
    }),
    defineField({
      name: 'stagesTitle',
      title: 'Etapy - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'stagesDescription',
      title: 'Etapy - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'stages',
      title: 'Etapy výstavby',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Název etapy', type: 'string' },
          { name: 'number', title: 'Počet bytů', type: 'number' },
          { name: 'status', title: 'Status', type: 'string', options: { list: ['Prodáno', 'Dokončování', 'V prodeji'] } },
          { name: 'description', title: 'Popis', type: 'text', rows: 2 },
          { 
            name: 'features', 
            title: 'Vlastnosti', 
            type: 'array',
            of: [{ type: 'string' }]
          },
          { name: 'featured', title: 'Zvýrazněná karta?', type: 'boolean' },
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'status'
          }
        }
      }],
      validation: Rule => Rule.max(3),
    }),
    
    // === KVALITNÍ BYDLENÍ V UNESCO ZÓNĚ ===
    defineField({
      name: 'qualityBadge',
      title: 'Kvalitní bydlení - Badge text',
      type: 'string',
      initialValue: 'Exkluzivita čtvrti',
    }),
    defineField({
      name: 'qualityTitle',
      title: 'Kvalitní bydlení - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'qualityDescription',
      title: 'Kvalitní bydlení - Popis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'distances',
      title: 'Vzdálenosti',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'time', title: 'Čas', type: 'string' },
          { name: 'label', title: 'Popisek', type: 'string' },
        ],
        preview: {
          select: {
            title: 'time',
            subtitle: 'label'
          }
        }
      }],
      validation: Rule => Rule.max(4),
    }),
    
    // === PROČ SI KOUPIT BYT (SERVICES) ===
    defineField({
      name: 'servicesBadge',
      title: 'Výhody - Badge text',
      type: 'string',
      initialValue: 'HLAVNÍ VÝHODY PROJEKTU',
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Výhody - Nadpis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'services',
      title: 'Služby / Výhody',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Nadpis', type: 'string' },
          { name: 'description', title: 'Popis', type: 'text', rows: 2 },
          { name: 'linkText', title: 'Text odkazu', type: 'string' },
          { name: 'linkUrl', title: 'URL odkazu', type: 'string' },
        ],
        preview: {
          select: {
            title: 'title'
          }
        }
      }],
      validation: Rule => Rule.max(4),
    }),
    
    // === MAPA AREÁLU ===
    defineField({
      name: 'mapBadge',
      title: 'Mapa - Badge text',
      type: 'string',
      initialValue: 'MĚSTO PAMÁTKY UNESCO',
    }),
    defineField({
      name: 'mapTitle',
      title: 'Mapa - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'mapImage',
      title: 'Mapa - Obrázek areálu',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // === JAK PROBÍHÁ KOUPĚ ===
    defineField({
      name: 'processBadge',
      title: 'Proces - Badge text',
      type: 'string',
      initialValue: 'JAK TO FUNGUJE',
    }),
    defineField({
      name: 'processTitle',
      title: 'Proces - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'processDescription',
      title: 'Proces - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'processSteps',
      title: 'Kroky procesu',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Nadpis', type: 'string' },
          { name: 'description', title: 'Popis', type: 'text', rows: 2 },
        ],
        preview: {
          select: {
            title: 'title'
          }
        }
      }],
      validation: Rule => Rule.max(4),
    }),
    
    // === FOTOGALERIE ===
    defineField({
      name: 'galleryBadge',
      title: 'Galerie - Badge text',
      type: 'string',
      initialValue: 'DOKONČENÉ BYTY',
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
      }],
    }),
    
    // === FAQ ===
    defineField({
      name: 'faqBadge',
      title: 'FAQ - Badge text',
      type: 'string',
      initialValue: 'FAQ',
    }),
    defineField({
      name: 'faqTitle',
      title: 'FAQ - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'faqDescription',
      title: 'FAQ - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ - Otázky a odpovědi',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Otázka', type: 'string' },
          { name: 'answer', title: 'Odpověď', type: 'text', rows: 3 },
        ],
        preview: {
          select: {
            title: 'question'
          }
        }
      }],
    }),
    
    // === KONTAKTNÍ FORMULÁŘ ===
    defineField({
      name: 'contactBadge',
      title: 'Kontakt - Badge text',
      type: 'string',
      initialValue: 'KONTAKTUJTE NÁS',
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
    
    // === VIDEO SEKCE (PROČ BYDLET) ===
    defineField({
      name: 'videoBadge',
      title: 'Video - Badge text',
      type: 'string',
      initialValue: 'PROČ SI VYBRAT TENTO PROJEKT',
    }),
    defineField({
      name: 'videoTitle',
      title: 'Video - Nadpis',
      type: 'text',
      rows: 2,
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
          { name: 'description', title: 'Popis', type: 'text', rows: 2 },
        ],
        preview: {
          select: {
            title: 'title'
          }
        }
      }],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: 'Homepage - Úvodní stránka',
        subtitle: title || 'Kompletní obsah homepage',
      }
    },
  },
})

