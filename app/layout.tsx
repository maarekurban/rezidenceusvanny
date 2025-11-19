import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Rezidence U sv. Anny | Moderní bydlení v Kutné Hoře",
    template: "%s | Rezidence U sv. Anny",
  },
  description: "131 bytů a 14 rodinných domů v Kutné Hoře - městě UNESCO. Nízkoenergetické budovy třídy B s kvalitními materiály. III. etapa nyní v prodeji.",
  keywords: ["rezidence kutná hora", "byty kutná hora", "rodinné domy kutná hora", "byty unesco", "nové byty kutná hora", "nízkoenergetické byty", "byty prodej kutná hora"],
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
    description: '131 bytů a 14 rodinných domů v Kutné Hoře - městě UNESCO. Nízkoenergetické budovy třídy B.',
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
    description: '131 bytů a 14 rodinných domů v Kutné Hoře - městě UNESCO.',
    images: ['/images/DSC02932.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
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
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
