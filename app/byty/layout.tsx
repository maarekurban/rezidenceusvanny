import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Byty na prodej v Kutné Hoře',
  description: '51 bytů 1+kk až 5+kk v prodejí v Kutné Hoře - městě UNESCO. Energetická třída B, moderní dispozice, předprodejové ceny. III. etapa zahájení výstavby 2025.',
  keywords: ['byty kutná hora', 'byty prodej kutná hora', 'byty unesco', 'nové byty kutná hora', '1+kk kutná hora', '2+kk kutná hora', '3+kk kutná hora', '4+kk kutná hora'],
  openGraph: {
    title: 'Byty na prodej v Kutné Hoře | Rezidence U sv. Anny',
    description: '51 bytů 1+kk až 5+kk v prodejí. Energetická třída B, moderní dispozice, předprodejové ceny.',
    url: 'https://rezidenceusvanny.cz/byty',
    images: [
      {
        url: '/images/DSC02932.jpg',
        width: 1200,
        height: 630,
        alt: 'Byty na prodej Kutná Hora - Rezidence U sv. Anny',
      },
    ],
  },
}

export default function BytyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

