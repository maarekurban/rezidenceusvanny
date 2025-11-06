import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

export const metadata: Metadata = {
  title: "Rezidence U sv. Anny | Moderní bydlení v Kutné Hoře",
  description: "131 bytů a 14 rodinných domů v Kutné Hoře - městě UNESCO. Nízkoenergetické budovy třídy B s kvalitními materiály. III. etapa nyní v prodeji.",
  keywords: ["Rezidence U sv. Anny", "Kutná Hora", "byty", "rodinné domy", "UNESCO", "nízkoenergetické bydlení"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="antialiased">
        <AnnouncementBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
