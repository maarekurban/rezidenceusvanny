import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ParallaxSection } from '@/components/ParallaxSection';

export default function Home() {
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
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">III. Etapa v prodeji</span>
          </div>

          {/* Main Headline - Large & Bold */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight max-w-5xl px-4">
            Moderní bydlení<br />
            <span className="text-gradient">v srdci UNESCO</span>
          </h1>

          {/* Subtitle - Light Weight */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mb-8 sm:mb-10 md:mb-12 leading-relaxed px-6">
            Objevte 131 bytů a 14 rodinných domů v historické Kutné Hoře,<br className="hidden md:block" />
            kde se moderní architektura setkává s bohatou historií
          </p>

          {/* CTA Buttons - Housify Style */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
            <Link href="/byty">
              <button className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gold-primary hover:bg-gold-secondary text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto">
                Nabídka bytů
              </button>
            </Link>
            <Link href="/o-projektu">
              <button className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl border border-white/30 transition-all duration-300 w-full sm:w-auto">
                O projektu
              </button>
            </Link>
          </div>

          {/* Stats Bar - Minimal */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-0 right-0 flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">131</div>
              <div className="text-xs sm:text-sm text-white/70 font-light">Bytů</div>
            </div>
            <div className="w-px h-8 sm:h-10 md:h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">14</div>
              <div className="text-xs sm:text-sm text-white/70 font-light">Rodinných domů</div>
            </div>
            <div className="w-px h-8 sm:h-10 md:h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">B</div>
              <div className="text-xs sm:text-sm text-white/70 font-light">Energetická třída</div>
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
                  MĚSTO PAMÁTKY UNESCO
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
                  Nechte se uchvátit{' '}
                  <span className="text-gradient">krásou</span>
                  <br />
                  Kutné Hory
                </h2>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light">
                Město zapsané na Seznam světového kulturního dědictví UNESCO ve středověku označované za stříbrnou pokladnici českého království s malebným historickým centrem, vinicemi a celou řadou kaváren, cukráren a restaurací.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light">
                Díky připojení Kutnohorska do integrovaného dopravního systému Prahy se do hlavního města pohodlně dostanete přímo z Kutné Hory v pracovních dnech i o víkendu.
              </p>

              <Link href="/byty">
                <button className="inline-flex items-center gap-3 px-6 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                  Prohlédnout byty
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Right: YouTube Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <iframe
                src="https://www.youtube.com/embed/VVlxe2bvtlg?autoplay=0&mute=0&controls=1&modestbranding=1&rel=0"
                title="Kutná Hora UNESCO"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
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
              NAŠE SLUŽBY
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-6 leading-[1.15] tracking-tight">
              Poskytujeme služby<br />moderního bydlení
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

      {/* Bento Grid - Photo Gallery Section - Housify Clean Style */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
        <Container>
          {/* Section Header - Minimalist */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="text-[10px] sm:text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
              FOTOGALERIE
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
              Prohlédněte si<br />
              <span className="text-gradient">realizaci projektu</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light mt-6">
              První a druhá etapa jsou kompletně dokončeny. Podívejte se na reálné fotografie
              bytů a rodinných domů.
            </p>
          </div>

          {/* Bento Grid Layout - Clean Housify Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Large Image 1 - with overlay and price badge */}
            <div className="md:col-span-7 md:row-span-2 relative h-96 md:h-full min-h-[500px] rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02745.jpg"
                alt="Interiér bytu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info badge - always visible */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <div className="text-xl font-bold text-gold-primary">2+kk</div>
                <div className="text-xs text-grey-600 font-medium">65 m²</div>
              </div>

              {/* Bottom info - shows on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">Dokončené byty</h3>
                <p className="text-white/90 font-light mb-4">I. a II. etapa - moderní interiéry</p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white">
                  Zobrazit více
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Small Image 1 */}
            <div className="md:col-span-5 relative h-64 md:h-60 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02913.jpg"
                alt="Detail interiéru"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-lg font-semibold">Detail kuchyně</h4>
              </div>
            </div>

            {/* Small Image 2 */}
            <div className="md:col-span-5 relative h-64 md:h-60 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02870.jpg"
                alt="Koupelna"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-lg font-semibold">Moderní koupelna</h4>
              </div>
            </div>

            {/* Medium Image - Aerial view */}
            <div className="md:col-span-6 relative h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DJI_0526.jpg"
                alt="Letecký pohled"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <div className="text-xl font-bold text-gold-primary">145</div>
                <div className="text-xs text-grey-600 font-medium">Bytů celkem</div>
              </div>

              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold mb-2">Celý areál</h3>
                <p className="text-white/90 font-light">Unikátní poloha v centru města</p>
              </div>
            </div>

            {/* Medium Image */}
            <div className="md:col-span-6 relative h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02756.jpg"
                alt="Obývací pokoj"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold mb-1">Prostorný obývací pokoj</h3>
                <p className="text-white/90 font-light text-sm">S výhledem do zahrady</p>
              </div>
            </div>
          </div>

          {/* CTA Button - Housify Style */}
          <div className="text-center mt-12">
            <Link href="/byty">
              <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Zobrazit všechny byty III. etapy →
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Etapy - Dark Section with Featured Card */}
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
              PRŮBĚH REALIZACE
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-6 leading-[1.15] tracking-tight">
              Tři etapy výstavby
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-[1.8] font-light mt-6">
              Projekt je realizován ve třech etapách. První dvě jsou dokončeny,
              třetí etapa je nyní v prodeji.
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
              JAK TO FUNGUJE
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
              Jak probíhá koupě bytu
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light mt-6">
              Proces koupě bytu rozdělen do jednoduchých kroků
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group relative">
              {/* Connecting line - hidden on mobile, shown on desktop between steps */}
              <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-grey-300 -z-10"></div>

              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-gold-primary flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark mb-3">Výběr bytu</h3>
              <p className="text-grey-600 leading-[1.7] font-light text-sm">
                Prohlédněte si dostupné byty a vyberte ten, který vám nejvíce vyhovuje
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group relative">
              <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-grey-300 -z-10"></div>

              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full bg-gold-primary flex items-center justify-center text-2xl sm:text-2xl md:text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark mb-3">Rezervace</h3>
              <p className="text-grey-600 leading-[1.7] font-light text-sm">
                Uhraďte rezervační zálohu 100.000 Kč a byt je váš
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group relative">
              <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-grey-300 -z-10"></div>

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
                DOKONČENÉ BYTY
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mt-6 leading-[1.15] tracking-tight">
                Prohlédněte si <span className="text-gradient">naši práci</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-grey-600 leading-[1.8] font-light mt-6 mb-8">
                Vytvářelisme moderní bydlení s důrazem na kvalitu materiálů a detailní zpracování.
                Podívejte se na dokončené byty z I. a II. etapy.
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

            {/* Right: Large Image */}
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Image
                src="/images/DSC02819.jpg"
                alt="Interiér bytu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Grid of smaller images */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <Image
                src="/images/DSC02697.jpg"
                alt="Detail kuchyně"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-lg font-semibold">Detail kuchyně</h4>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <Image
                src="/images/DSC02720.jpg"
                alt="Obývací pokoj"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-lg font-semibold">Obývací pokoj</h4>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <Image
                src="/images/DSC02905.jpg"
                alt="Moderní koupelna"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-lg font-semibold">Moderní koupelna</h4>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Rodinné domy - Dark Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative bg-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/RD-A_vizualizace-zahrada-trava-min.jpg"
            alt="Rodinné domy pozadí"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="inline-block px-6 py-2.5 text-[10px] sm:text-xs md:text-sm text-white font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full border border-white/20">
              PORTFOLIO
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-6 leading-[1.15] tracking-tight">
              Rodinné domy - Naše realizace
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-[1.8] font-light mt-6">
              14 moderních rodinných domů s pozemky až 613 m². Všechny domy jsou vyprodány
              a obývány spokojenými majiteli.
            </p>
          </div>

          {/* Bento Grid for houses */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Large Image */}
            <div className="md:col-span-8 relative h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Image
                src="/images/RD-A_vizualizace-zahrada-trava-min.jpg"
                alt="Rodinný dům - vizualizace"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Badge - always visible */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <div className="text-xl font-bold text-gold-primary">Typ A</div>
                <div className="text-xs text-grey-600 font-medium">S garáží</div>
              </div>

              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Rodinný dům</h3>
                <p className="text-white/90 font-light">Pozemek 400-613 m²</p>
              </div>
            </div>

            {/* Smaller images */}
            <div className="md:col-span-4 space-y-4 md:space-y-6">
              <div className="relative h-44 md:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <Image
                  src="/images/KH_vizualizace_BD_04-min.jpg"
                  alt="Rodinný dům detail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-semibold">Exteriér</h4>
                </div>
              </div>
              <div className="relative h-44 md:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                <Image
                  src="/images/vizualizace_RD-C_01-min.jpg"
                  alt="Rodinný dům typ C"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-semibold">Typ C</h4>
                </div>
              </div>
            </div>

            {/* Interior images */}
            <div className="md:col-span-6 relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <Image
                src="/images/vizualizace-RD-interier2.jpg"
                alt="Interiér rodinného domu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl font-bold mb-1">Moderní interiér</h4>
                <p className="text-white/90 font-light text-sm">Prostorný obývací pokoj</p>
              </div>
            </div>
            <div className="md:col-span-6 relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
              <Image
                src="/images/BD-1-16_vizualizace-01-min.jpg"
                alt="Vizualizace domu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl font-bold mb-1">Vizualizace</h4>
                <p className="text-white/90 font-light text-sm">Výhled na zahradu</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/rodinne-domy">
              <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Prohlédnout portfolio →
              </button>
            </Link>
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

      {/* CTA Section - Housify Clean Gradient */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden bg-gradient-to-br from-gold-primary to-gold-secondary">
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
              Předprodej III. etapy
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Zajistěte si byt ve III. etapě
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-light max-w-3xl mx-auto">
              Využijte výhodných předprodejových cen a možnosti úprav dispozic podle vašich představ.
              Kontaktujte nás ještě dnes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/byty">
                <button className="px-8 py-4 bg-white hover:bg-white/90 text-gold-primary font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-w-[220px]">
                  Prohlédnout byty
                </button>
              </Link>
              <Link href="/kontakt">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/30 transition-all duration-300 min-w-[220px]">
                  Kontakt na makléře
                </button>
              </Link>
            </div>

            {/* Quick Info */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-white/90">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">+420 724 218 841</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">info@rezidenceusvanny.cz</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
