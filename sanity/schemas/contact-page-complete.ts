import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPageComplete',
  title: 'Kontakt - Stránka',
  type: 'document',
  fields: [
    // === HERO SECTION ===
    defineField({
      name: 'heroBadge',
      title: 'Hero - Badge text',
      type: 'string',
      initialValue: 'Rezidenční čtvrť U sv. Anny',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Hlavní nadpis (1. část)',
      type: 'string',
      description: 'Např. "Kontaktní"',
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
      rows: 3,
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
    
    // === CONTACT INTRO SECTION ===
    defineField({
      name: 'introBadge',
      title: 'Úvod - Badge text',
      type: 'string',
      initialValue: 'Kontaktujte nás',
    }),
    defineField({
      name: 'introTitle',
      title: 'Úvod - Hlavní nadpis (1. část)',
      type: 'string',
      initialValue: 'Neváhejte se na nás',
    }),
    defineField({
      name: 'introTitleHighlight',
      title: 'Úvod - Zvýrazněný text',
      type: 'string',
      initialValue: 'obrátit',
    }),
    defineField({
      name: 'introDescription',
      title: 'Úvod - Popis',
      type: 'text',
      rows: 3,
    }),
    
    // === AGENTS SECTION ===
    defineField({
      name: 'agentsTitle',
      title: 'Makléři - Nadpis sekce',
      type: 'string',
      initialValue: 'Realitní makléři',
    }),
    defineField({
      name: 'agents',
      title: 'Realitní makléři',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Jméno', type: 'string', validation: Rule => Rule.required() },
          { name: 'title', title: 'Pozice', type: 'string', initialValue: 'Realitní makléř/ka' },
          { name: 'phone', title: 'Telefon', type: 'string', validation: Rule => Rule.required() },
          { name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required() },
          { name: 'facebookUrl', title: 'Facebook URL', type: 'url' },
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'phone'
          }
        }
      }],
      description: '2 makléři',
      validation: Rule => Rule.max(2),
    }),
    
    // === FORM SECTION ===
    defineField({
      name: 'formTitle',
      title: 'Formulář - Nadpis',
      type: 'string',
      initialValue: 'Poptávkový formulář',
    }),
    
    // === QUICK INFO CARDS SECTION ===
    defineField({
      name: 'quickInfoBadge',
      title: 'Quick Info - Badge text',
      type: 'string',
      initialValue: 'Máte otázky?',
    }),
    defineField({
      name: 'quickInfoTitle',
      title: 'Quick Info - Hlavní nadpis (1. část)',
      type: 'string',
      initialValue: 'Volné',
    }),
    defineField({
      name: 'quickInfoTitleHighlight',
      title: 'Quick Info - Zvýrazněný text',
      type: 'string',
      initialValue: 'byty',
    }),
    defineField({
      name: 'quickInfoTitleEnd',
      title: 'Quick Info - Konec nadpisu',
      type: 'string',
      initialValue: 'stále k dispozici',
    }),
    defineField({
      name: 'quickInfoBackgroundImage',
      title: 'Quick Info - Obrázek pozadí',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quickInfoLocation',
      title: 'Quick Info - Lokalita',
      type: 'string',
      initialValue: 'Kutná Hora',
    }),
    defineField({
      name: 'quickInfoPhone',
      title: 'Quick Info - Telefon',
      type: 'string',
      initialValue: '+420 724 218 841',
    }),
    defineField({
      name: 'quickInfoEmail',
      title: 'Quick Info - Email',
      type: 'string',
      initialValue: 'info@rezidenceusvanny.cz',
    }),
    defineField({
      name: 'quickInfoTotalHomes',
      title: 'Quick Info - Celkem domovů',
      type: 'number',
      initialValue: 145,
    }),
    
    // === INSTAGRAM SECTION ===
    defineField({
      name: 'instagramTitle',
      title: 'Instagram - Nadpis (1. část)',
      type: 'string',
      initialValue: 'Sledujte nás na',
    }),
    defineField({
      name: 'instagramTitleHighlight',
      title: 'Instagram - Zvýrazněný text',
      type: 'string',
      initialValue: 'Instagramu',
    }),
    defineField({
      name: 'instagramDescription',
      title: 'Instagram - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram - URL profilu',
      type: 'url',
      initialValue: 'https://www.instagram.com/anomia__rk/',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram - Handle (@)',
      type: 'string',
      initialValue: '@anomia__rk',
    }),
    
    // === MAP SECTION ===
    defineField({
      name: 'mapEmbedUrl',
      title: 'Mapa - Google Maps Embed URL',
      type: 'url',
      description: 'URL pro iframe Google Maps',
    }),
    
    // === CTA SECTION ===
    defineField({
      name: 'ctaTitle',
      title: 'CTA - Nadpis',
      type: 'string',
      initialValue: 'Chcete se podívat na místo?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA - Popis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButton1Text',
      title: 'CTA - Tlačítko 1 (text)',
      type: 'string',
      initialValue: 'Prohlédnout byty',
    }),
    defineField({
      name: 'ctaButton1Link',
      title: 'CTA - Tlačítko 1 (link)',
      type: 'string',
      initialValue: '/byty',
    }),
    defineField({
      name: 'ctaButton2Text',
      title: 'CTA - Tlačítko 2 (text)',
      type: 'string',
      initialValue: 'Zavolat makléři',
    }),
    defineField({
      name: 'ctaButton2Phone',
      title: 'CTA - Tlačítko 2 (telefon)',
      type: 'string',
      initialValue: '+420724218841',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: 'Kontakt - Stránka',
        subtitle: title || 'Makléři, formulář, mapa, Instagram',
      }
    },
  },
})


