'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ParallaxSection } from '@/components/ParallaxSection';

// Dummy parseTitle - Sanity odstraněno
const parseTitle = (title: string | null | undefined) => {
  if (!title) return null;
  // Nahrazujeme <strong> tagy a \n
  const parts = title.split(/(<strong>.*?<\/strong>)/g);
  return parts.map((part, i) => {
    if (part.startsWith('<strong>')) {
      const text = part.replace(/<\/?strong>/g, '');
      return <span key={i} className="text-gradient">{text.split('\n').map((line, j) => <span key={j}>{line}{j < text.split('\n').length - 1 && <br />}</span>)}</span>;
    }
    return part.split('\n').map((line, j) => <span key={`${i}-${j}`}>{line}{j < part.split('\n').length - 1 && <br />}</span>);
  });
};

export default function Home() {
  // Sanity odstraněno - používáme hardcoded data (fallbacky níže)
  const pageData: any = null;
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      page: 'Homepage',
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    console.log('📤 Odesílám data:', data)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log('📥 Response status:', response.status)
      const result = await response.json()
      console.log('📥 Response data:', result)

      if (response.ok) {
        setSubmitMessage('✅ Děkujeme! Vaše zpráva byla úspěšně odeslána.')
        form.reset()
      } else {
        setSubmitMessage('❌ Chyba při odesílání. Zkuste to prosím později.')
      }
    } catch (error) {
      console.error('❌ Chyba:', error)
      setSubmitMessage('❌ Chyba při odesílání. Zkuste to prosím později.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Carousel images
  const carouselImages = [
    '/images/DSC02697.jpg',
    '/images/DSC02913.jpg',
    '/images/DSC02932.jpg',
    '/images/DSC02745.jpg',
    '/images/DSC02819.jpg',
    '/images/DJI_0548.jpg',
    '/images/DSC02905.jpg',
    '/images/DSC02720.jpg'
  ];

  const nextSlide = () => {
    // Posun o jednu fotku doprava, ale max do konce aby se zobrazily 3 fotky
    setCarouselIndex((prev) => {
      const maxIndex = carouselImages.length - 3;
      return prev < maxIndex ? prev + 1 : prev;
    });
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section - Housify Style */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-grey-100">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          suppressHydrationWarning
        >
          <source src="/images/05.mp4" type="video/mp4" />
        </video>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />

        {/* Hero Content - Minimalist Centered */}
        <Container className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-green-600/90 backdrop-blur-md rounded-full border border-green-400/30 mb-6 sm:mb-8 shadow-lg">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">{pageData?.heroBadge || "III. Etapa v prodeji"}</span>
          </div>

          {/* Main Headline - Large & Bold */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight max-w-5xl px-4">
            {parseTitle(pageData?.heroTitle) || (
              <>
                Moderní bydlení<br />
                <span className="text-gradient">v srdci UNESCO</span>
              </>
            )}
          </h1>

          {/* Subtitle - Light Weight */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mb-8 sm:mb-10 md:mb-12 leading-relaxed px-6">
            {pageData?.heroDescription?.split('\n').map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i < pageData.heroDescription.split('\n').length - 1 && <br />}
              </span>
            )) || (
              <>
                Objevte 131 bytů a 14 rodinných domů v historické Kutné Hoře,<br className="hidden md:block" />
                kde se moderní architektura setkává s bohatou historií
              </>
            )}
          </p>

          {/* CTA Buttons - Housify Style */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
            <Link href="/byty">
              <button className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gold-primary hover:bg-gold-secondary text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto">
                {pageData?.heroButton1Text || "Nabídka bytů"}
              </button>
            </Link>
            <a href="#unesco-zone">
              <button className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl border border-white/30 transition-all duration-300 w-full sm:w-auto">
                {pageData?.heroButton2Text || "O projektu"}
              </button>
            </a>
          </div>

          {/* Stats Bar - Minimal */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-0 right-0 flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{pageData?.stat1Value || "131"}</div>
              <div className="text-xs sm:text-sm text-white/70 font-light">{pageData?.stat1Label || "Bytů"}</div>
            </div>
            <div className="w-px h-8 sm:h-10 md:h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{pageData?.stat2Value || "14"}</div>
              <div className="text-xs sm:text-sm text-white/70 font-light">{pageData?.stat2Label || "Rodinných domů"}</div>
            </div>
            <div className="w-px h-8 sm:h-10 md:h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{pageData?.stat3Value || "B"}</div>
              <div className="text-xs sm:text-sm text-white/70 font-light">{pageData?.stat3Label || "Energetická třída"}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* O Rezidenci - Housify Light Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div>
                <span className="text-[10px] sm:text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
                  {pageData?.aboutBadge || "MĚSTO PAMÁTKY UNESCO"}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
                  {parseTitle(pageData?.aboutTitle) || (
                    <>
                      Nechte se uchvátit <span className="text-gradient">krásou</span>
                      <br />
                      Kutné Hory
                    </>
                  )}
                </h2>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light">
                {pageData?.aboutParagraph1 || "Město zapsané na Seznam světového kulturního dědictví UNESCO ve středověku označované za stříbrnou pokladnici českého království s malebným historickým centrem, vinicemi a celou řadou kaváren, cukráren a restaurací."}
              </p>

              <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light">
                {pageData?.aboutParagraph2 || "Díky připojení Kutnohorska do integrovaného dopravního systému Prahy se do hlavního města pohodlně dostanete přímo z Kutné Hory v pracovních dnech i o víkendu."}
              </p>

              <Link href="/byty">
                <button className="inline-flex items-center gap-3 px-6 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                  {pageData?.aboutButtonText || "Prohlédnout byty"}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Right: YouTube Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300" suppressHydrationWarning>
              <iframe
                src={pageData?.aboutVideoUrl || "https://www.youtube.com/embed/VVlxe2bvtlg?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&loop=1&playlist=VVlxe2bvtlg"}
                title="Kutná Hora UNESCO"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Tři etapy výstavby - Dark Section with Featured Card */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative bg-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/DSC02932.jpg"
            alt="Rezidence pozadí"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="inline-block px-6 py-2.5 text-[10px] sm:text-xs md:text-sm text-white font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full border border-white/20">
              {pageData?.stagesBadge || "PRŮBĚH REALIZACE"}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-6 leading-[1.15] tracking-tight">
              {pageData?.stagesTitle || "Tři etapy výstavby"}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-[1.8] font-light mt-6">
              {pageData?.stagesDescription || "Projekt je realizován ve třech etapách. První dvě jsou dokončeny, třetí etapa je nyní v prodeji."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Etapa I - Completed */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-white/70 uppercase tracking-[0.15em]">
                  Etapa I
                </span>
                <span className="px-3 py-1.5 bg-red-500/20 text-red-300 text-xs font-semibold rounded-lg border border-red-500/30">
                  Prodáno
                </span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-primary mb-3">51</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Bytů</h3>
              <p className="text-white/60 mb-6 leading-[1.7] font-light text-sm">
                První etapa byla kompletně vyprodána a předána majitelům v roce 2023.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Dispozice 1+kk až 4+kk
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Kolaudováno 2023
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Všechny byty obsazeny
                </li>
              </ul>
            </div>

            {/* Etapa II - In Progress */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-white/70 uppercase tracking-[0.15em]">
                  Etapa II
                </span>
                <span className="px-3 py-1.5 bg-orange-500/20 text-orange-300 text-xs font-semibold rounded-lg border border-orange-500/30">
                  Dokončování
                </span>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-primary mb-3">36</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Bytů</h3>
              <p className="text-white/60 mb-6 leading-[1.7] font-light text-sm">
                Druhá etapa je vyprodána, probíhá finalizace a předání bytů.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Dispozice 2+kk až 5+kk
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Kolaudace Q4 2025
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Všechny byty prodány
                </li>
              </ul>
            </div>

            {/* Etapa III - Featured/Active */}
            <div className="bg-gradient-to-br from-gold-primary to-gold-secondary rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Subtle decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full" />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-xs font-bold text-white/90 uppercase tracking-[0.15em]">
                  Etapa III
                </span>
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  V prodeji
                </span>
              </div>
              <div className="text-5xl font-bold text-white mb-3">51</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Bytů k dispozici</h3>
              <p className="text-white/90 mb-6 leading-[1.7] font-light text-sm">
                Třetí etapa je nyní v předprodeji. Zajistěte si výhodné ceny!
              </p>
              <ul className="space-y-3 text-sm text-white/90 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Dispozice 1+kk až 5+kk
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Zahájení stavby 2025
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Předprodejové ceny
                </li>
              </ul>
              <Link href="/byty">
                <button className="w-full px-6 py-3 bg-white hover:bg-white/90 text-gold-primary font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                  Zobrazit byty →
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Kvalitní bydlení v UNESCO zóně */}
      <section id="unesco-zone" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-light-grey">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="text-[10px] sm:text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
              {pageData?.qualityBadge || "Exkluzivita čtvrti"}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
              {parseTitle(pageData?.qualityTitle) || (
                <>
                  Kvalitní bydlení v <span className="text-gradient">UNESCO</span> zóně
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light">
              {pageData?.qualityDescription || "Hlavním cílem projektu Rezidence u sv. Anny je vytvoření moderního a dostupného domova ve městě, jehož historické centrum je zapsané na seznamu UNESCO. Umístění v klidné části města s dobrou dopravní dostupností do centra vytváří potenciál pro naplnění bytových potřeb i těch nejnáročnějších klientů."}
            </p>
          </div>

          {/* Vzdálenosti - Distance Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gold-primary mb-2">1 min</div>
              <div className="text-grey-600 font-medium">Autobusová zastávka</div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gold-primary mb-2">4 min</div>
              <div className="text-grey-600 font-medium">Venkovní sportoviště</div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gold-primary mb-2">6 min</div>
              <div className="text-grey-600 font-medium">Škola</div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gold-primary mb-2">12 min</div>
              <div className="text-grey-600 font-medium">Historické centrum</div>
            </div>
          </div>

          {/* Photo Carousel */}
          <div className="grid md:grid-cols-3 gap-6">
            {(pageData?.qualityImages || ["/images/DSC02932.jpg", "/images/DSC02745.jpg", "/images/DJI_0548.jpg", "/images/DSC02819.jpg", "/images/DSC02697.jpg", "/images/DSC02905.jpg"]).slice(0, 6).map((img: any, index: number) => (
              <div key={index} className="relative h-64 md:h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
                <Image
                  src={img}
                  alt="Rezidence U sv. Anny"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services/Benefits - Dark Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative bg-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/zobrazeni_domu.png"
            alt="Rezidence pozadí"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="inline-block px-6 py-2.5 text-[10px] sm:text-xs md:text-sm text-white font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full border border-white/20">
              {pageData?.whyBuyBadge || "HLAVNÍ VÝHODY PROJEKTU"}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-6 leading-[1.15] tracking-tight">
              {parseTitle(pageData?.whyBuyTitle) || (
                <>
                  Proč si koupit byt<br />v naší <span className="text-gradient">rezidenci?</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Service 1 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 md:mb-6 rounded-xl bg-gold-primary flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 leading-tight">Moderní dispozice</h3>
              <p className="text-white/70 leading-[1.7] font-light text-sm mb-4">
                Pečlivě navržené dispozice bytů s důrazem na funkčnost a maximální využití prostoru
              </p>
              <Link href="/byty" className="inline-flex items-center text-gold-primary font-semibold text-sm hover:gap-2 transition-all">
                Zobrazit byty
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 md:mb-6 rounded-xl bg-gold-primary flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 leading-tight">Úsporné bydlení</h3>
              <p className="text-white/70 leading-[1.7] font-light text-sm mb-4">
                Energetická třída B zajišťuje nízké náklady na vytápění a provoz vašeho bytu
              </p>
              <Link href="/o-projektu" className="inline-flex items-center text-gold-primary font-semibold text-sm hover:gap-2 transition-all">
                Více informací
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 md:mb-6 rounded-xl bg-gold-primary flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 leading-tight">Kvalitní materiály</h3>
              <p className="text-white/70 leading-[1.7] font-light text-sm mb-4">
                Používáme pouze prověřené materiály od renomovaných dodavatelů s dlouhou životností
              </p>
              <Link href="/o-projektu" className="inline-flex items-center text-gold-primary font-semibold text-sm hover:gap-2 transition-all">
                Více informací
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-5 md:mb-6 rounded-xl bg-gold-primary flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 leading-tight">Kompletní vybavení</h3>
              <p className="text-white/70 leading-[1.7] font-light text-sm mb-4">
                Parkovací stání, sklepy a možnost individuálních úprav podle vašich představ
              </p>
              <Link href="/byty" className="inline-flex items-center text-gold-primary font-semibold text-sm hover:gap-2 transition-all">
                Zobrazit byty
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Mapa areálu - Housify Light Style */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="text-[10px] sm:text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
              MĚSTO PAMÁTKY UNESCO
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
              Areál rezidenční čtvrti <span className="text-gradient">U sv. Anny</span>
            </h2>
          </div>

          {/* Mapa areálu - velký obrázek */}
          <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/DJI_0548.jpg"
              alt="Mapa areálu rezidenční čtvrti U sv. Anny"
              fill
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Jak to probíhá - Light Steps Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-light-grey">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="text-[10px] sm:text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
              {pageData?.purchaseBadge || "JAK TO FUNGUJE"}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
              {pageData?.purchaseTitle || "Jak probíhá koupě bytu"}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light mt-6">
              {pageData?.purchaseDescription || "Proces koupě bytu rozdělen do jednoduchých kroků"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-gold-primary flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark mb-3">Výběr bytu</h3>
              <p className="text-grey-600 leading-[1.7] font-light text-sm">
                Prohlédněte si dostupné byty a vyberte ten, který vám nejvíce vyhovuje
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-gold-primary flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark mb-3">Rezervace</h3>
              <p className="text-grey-600 leading-[1.7] font-light text-sm">
                Uhraďte rezervační zálohu 100.000 Kč a byt je váš
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-gold-primary flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark mb-3">Financování</h3>
              <p className="text-grey-600 leading-[1.7] font-light text-sm">
                Pomůžeme s hypotékou a postupnými platbami dle harmonogramu
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-gold-primary flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark mb-3">Předání klíčů</h3>
              <p className="text-grey-600 leading-[1.7] font-light text-sm">
                Po dokončení výstavby vám předáme klíče od vašeho nového domova
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link href="/dulezite-informace">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                Důležité informace
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Více fotografií - White Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            {/* Left: Text */}
            <div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
                {pageData?.galleryBadge || "DOKONČENÉ BYTY"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
                {parseTitle(pageData?.galleryTitle) || (
                  <>
                    Prohlédněte si <span className="text-gradient">naši práci</span>
                  </>
                )}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light mt-6 mb-8">
                {pageData?.galleryDescription || "Vytvářelisme moderní bydlení s důrazem na kvalitu materiálů a detailní zpracování. Podívejte se na dokončené byty z I. a II. etapy."}
              </p>
              <Link href="/byty">
                <button className="inline-flex items-center gap-3 px-6 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                  Zobrazit všechny byty
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Right: Large Image - Clickable */}
            <div 
              onClick={() => setSelectedImage('/images/DSC02819.jpg')}
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <Image
                src="/images/DSC02819.jpg"
                alt="Interiér bytu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Carousel Section - 3 photos side by side */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(calc(-${carouselIndex * 33.333}% - ${carouselIndex * 24}px))` 
                }}
              >
                {carouselImages.map((image, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Galerie obrázek ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                      <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {carouselIndex > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              >
                <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {carouselIndex < carouselImages.length - 3 && (
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              >
                <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </Container>
      </section>

      {/* FAQ Section - White */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-start">
            {/* Left: Header */}
            <div className="md:sticky md:top-32">
              <span className="text-[10px] sm:text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
                FAQ
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
                Často kladené <span className="text-gradient">otázky</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light mt-6 mb-8">
                Máte dotazy ohledně nákupu bytu? Najděte odpovědi na nejčastější otázky.
              </p>
              <Link href="/kontakt">
                <button className="inline-flex items-center gap-3 px-6 py-3 bg-white hover:bg-grey-100 text-dark border border-grey-300 font-semibold rounded-xl transition-all duration-300">
                  Kontaktujte nás
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Right: FAQ Items */}
            <div className="space-y-4">
              {/* FAQ 1 */}
              <details className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-dark pr-4">
                    Jaké jsou možnosti financování?
                  </h3>
                  <svg
                    className="w-6 h-6 text-gold-primary transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-grey-600 leading-[1.7] font-light text-sm">
                  Nabízíme spolupráci s většinou bank, které poskytují hypotéky. Cena se platí postupně
                  dle harmonogramu výstavby v 5 splátkách. Rezervační záloha činí 100.000 Kč.
                </p>
              </details>

              {/* FAQ 2 */}
              <details className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-dark pr-4">
                    Mohu si přizpůsobit dispozici bytu?
                  </h3>
                  <svg
                    className="w-6 h-6 text-gold-primary transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-grey-600 leading-[1.7] font-light text-sm">
                  Ano! Při včasné rezervaci můžete ovlivnit dispozici bytu, výběr materiálů a povrchových
                  úprav podle vašich představ.
                </p>
              </details>

              {/* FAQ 3 */}
              <details className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-dark pr-4">
                    Kdy bude III. etapa dokončena?
                  </h3>
                  <svg
                    className="w-6 h-6 text-gold-primary transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-grey-600 leading-[1.7] font-light text-sm">
                  Zahájení výstavby III. etapy je plánováno na rok 2025. Předpokládané dokončení
                  je 18-24 měsíců od zahájení výstavby.
                </p>
              </details>

              {/* FAQ 4 */}
              <details className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-dark pr-4">
                    Jaké jsou energetické náklady?
                  </h3>
                  <svg
                    className="w-6 h-6 text-gold-primary transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-grey-600 leading-[1.7] font-light text-sm">
                  Všechny byty jsou v energetické třídě B, což znamená nízké náklady na vytápění
                  a provoz. Odhadované roční náklady činí cca 20.000-30.000 Kč dle velikosti bytu.
                </p>
              </details>

              {/* FAQ 5 */}
              <details className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-dark pr-4">
                    Je v ceně parkovací stání?
                  </h3>
                  <svg
                    className="w-6 h-6 text-gold-primary transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-grey-600 leading-[1.7] font-light text-sm">
                  Parkovací stání a sklep jsou součástí ceny bytu. Lze dokoupit i další stání
                  v podzemních garážích.
                </p>
              </details>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Section - Housify Clean Gradient */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden bg-gradient-to-br from-gold-primary to-gold-secondary">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
                {pageData?.contactFormBadge || "Kontaktujte nás"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                {pageData?.contactFormTitle || "Máte zájem o byt ve III. etapě?"}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed font-light">
                {pageData?.contactFormDescription || "Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin"}
              </p>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{pageData?.contactFormEmail || "info@rezidenceusvanny.cz"}</span>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">Jméno a příjmení *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all"
                    placeholder="Jan Novák"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white font-semibold mb-2">Telefon *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all"
                    placeholder="+420 123 456 789"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-white font-semibold mb-2">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all"
                  placeholder="jan.novak@email.cz"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-white font-semibold mb-2">Zpráva</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 border border-white/30 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all resize-none"
                  placeholder="Mám zájem o více informací o bytech..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 text-white/90 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 rounded border-white/30 bg-white/90 focus:ring-2 focus:ring-white/50"
                  />
                  <span>Souhlasím se zpracováním osobních údajů za účelem zodpovězení dotazu *</span>
                </label>
              </div>
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-xl ${submitMessage.includes('✅') ? 'bg-green-500/20 text-white' : 'bg-red-500/20 text-white'}`}>
                  {submitMessage}
                </div>
              )}



              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-white hover:bg-grey-100 text-gold-primary font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Odesílání...' : 'Odeslat poptávku'}
              </button>
            </form>
          </div>
        </Container>
      </section>

      {/* Partners Carousel Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark mb-4">
              Spolupracujeme s <span className="text-gradient">důvěryhodnými partnery</span>
            </h3>
            <p className="text-grey-600 font-light">
              Zajistíme vám financování i kvalitní služby související s vaším novým bydlením
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            <div className="flex items-center justify-center p-6 bg-grey-50 rounded-xl">
              <Image
                src="/images/partneri/Logo-kb.png"
                alt="Komerční banka"
                width={150}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-grey-50 rounded-xl">
              <Image
                src="/images/partneri/Logo-hypotecni-banka.png"
                alt="Hypoteční banka"
                width={150}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-grey-50 rounded-xl">
              <Image
                src="/images/partneri/Logo-Komfort.png"
                alt="Komfort"
                width={150}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-grey-50 rounded-xl">
              <Image
                src="/images/partneri/Logo-pyramida.png"
                alt="Pyramida"
                width={150}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-grey-50 rounded-xl">
              <Image
                src="/images/partneri/anomia-realestate-horizontal-basic-rgb.png"
                alt="Anomia Real Estate"
                width={150}
                height={80}
                className="w-full h-auto"
              />
            </div>

            <div className="flex items-center justify-center p-6 bg-grey-50 rounded-xl">
              <Image
                src="/images/partneri/image002.jpg"
                alt="Partner"
                width={150}
                height={80}
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-6xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Detail fotografie"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
