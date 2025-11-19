import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    // Site Info
    defineField({
      name: 'siteName',
      title: 'Název webu',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Popis webu (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Contact Info
    defineField({
      name: 'phone',
      title: 'Hlavní telefon',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Hlavní email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'text',
      rows: 2,
    }),

    // Social Media
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
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),

    // Footer
    defineField({
      name: 'footerText',
      title: 'Footer - Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      type: 'string',
      initialValue: '© 2024 Rezidence U sv. Anny. Všechna práva vyhrazena.',
    }),

    // Navigation
    defineField({
      name: 'navigationCTA',
      title: 'Navigace - CTA tlačítko text',
      type: 'string',
      initialValue: 'Zobrazit byty',
    }),
    defineField({
      name: 'navigationCTALink',
      title: 'Navigace - CTA tlačítko odkaz',
      type: 'string',
      initialValue: '/byty',
    }),

    // SEO
    defineField({
      name: 'ogImage',
      title: 'OG Image (Social Media)',
      type: 'image',
      description: 'Obrázek pro sdílení na sociálních sítích',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),

    // Analytics
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'např. G-XXXXXXXXXX',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteDescription',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Nastavení webu',
        subtitle: subtitle || 'Globální nastavení',
      }
    },
  },
})
