import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: {
    default: "Rezidence U sv. Anny | Moderní bydlení v Kutné Hoře",
    template: "%s | Rezidence U sv. Anny",
  },
  description: "134 bytů v Kutné Hoře - městě UNESCO. Nízkoenergetické budovy třídy B s kvalitními materiály. Moderní bydlení v centru historické Kutné Hory.",
  keywords: ["rezidence kutná hora", "byty kutná hora", "nové byty kutná hora", "byty unesco", "nízkoenergetické byty", "byty prodej kutná hora", "moderní bydlení kutná hora", "rezidence u sv anny"],
  authors: [{ name: "ANOMIA Real Estate" }],
  creator: "ANOMIA Real Estate",
  publisher: "Rezidence U sv. Anny",
  metadataBase: new URL('https://rezidenceusvanny.cz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://rezidenceusvanny.cz',
    siteName: 'Rezidence U sv. Anny',
    title: 'Rezidence U sv. Anny | Moderní bydlení v Kutné Hoře',
    description: '134 bytů v Kutné Hoře - městě UNESCO. Nízkoenergetické budovy třídy B s kvalitními materiály.',
    images: [
      {
        url: '/images/DSC02932.jpg',
        width: 1200,
        height: 630,
        alt: 'Rezidence U sv. Anny - Moderní bydlení v Kutné Hoře',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rezidence U sv. Anny | Moderní bydlení v Kutné Hoře',
    description: '134 bytů v Kutné Hoře - městě UNESCO. Nízkoenergetické budovy třídy B.',
    images: ['/images/DSC02932.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Přidej po vytvoření:
    // google: 'tvůj-google-verification-code',
    // yandex: 'tvůj-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
