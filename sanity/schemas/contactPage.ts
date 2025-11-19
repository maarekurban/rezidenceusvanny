import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Kontakt',
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

    // Contact Info
    defineField({
      name: 'companyName',
      title: 'Název společnosti',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'text',
      rows: 3,
    }),

    // Company Details
    defineField({
      name: 'ico',
      title: 'IČO',
      type: 'string',
    }),
    defineField({
      name: 'dic',
      title: 'DIČ',
      type: 'string',
    }),

    // Contact Form Section
    defineField({
      name: 'formBadge',
      title: 'Formulář - Badge text',
      type: 'string',
      initialValue: 'Kontaktní formulář',
    }),
    defineField({
      name: 'formTitle',
      title: 'Formulář - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'formDescription',
      title: 'Formulář - Popis',
      type: 'text',
      rows: 2,
    }),

    // Map Section
    defineField({
      name: 'mapTitle',
      title: 'Mapa - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Mapa - Embed URL',
      type: 'url',
      description: 'Google Maps embed URL',
    }),
    defineField({
      name: 'mapAddress',
      title: 'Mapa - Adresa pro zobrazení',
      type: 'string',
    }),

    // Opening Hours
    defineField({
      name: 'openingHoursTitle',
      title: 'Otevírací doba - Nadpis',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Otevírací doba',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', title: 'Den', type: 'string' },
          { name: 'hours', title: 'Hodiny', type: 'string' },
        ]
      }],
    }),

    // Social Links
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'companyName',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Kontakt',
        subtitle: subtitle || 'Kontaktní stránka',
      }
    },
  },
})

