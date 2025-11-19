import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    // Sitemap zatím zakázán - aktivuje se po spuštění na ostré doméně
    // sitemap: 'https://rezidenceusvanny.cz/sitemap.xml',
  }
}

