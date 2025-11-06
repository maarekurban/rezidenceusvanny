import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'

export default function OProjektuPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Ideální místo pro bydlení */}
      <section className="relative min-h-[90vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02745.jpg"
            alt="Vizualizace rezidenční čtvrti"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-32">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            Rezidenční čtvrť U sv. Anny
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            Ideální místo<br />pro <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">bydlení</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light mb-12 leading-relaxed">
            131 bytů a 14 rodinných domů stavěných ve třech etapách v atraktivním městě Kutné hory. Ideální spojení veškeré občanské vybavenosti, historických památek a přírody. V dojezdové vzdálenosti do Prahy..
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-gold-primary mb-2">131</div>
                <div className="text-sm text-grey-600 font-medium">Bytových jednotek</div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-gold-primary mb-2">14</div>
                <div className="text-sm text-grey-600 font-medium">Rodinných domů</div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-gold-primary mb-2">3</div>
                <div className="text-sm text-grey-600 font-medium">Etapy výstavby</div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-gold-primary mb-2">51</div>
                <div className="text-sm text-grey-600 font-medium">Bytů ve III. etapě</div>
              </div>
            </div>
        </Container>
      </section>

      {/* Exkluzivita čtvrti */}
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
              Exkluzivita čtvrti
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
              Kvalitní bydlení v <span className="text-gradient">UNESCO</span> zóně
            </h2>
            <p className="text-lg text-grey-600 font-light leading-relaxed">
              Hlavním cílem projektu Rezidence u sv. Anny je vytvoření moderního a dostupného domova ve městě, jehož historické centrum je zapsané na seznamu UNESCO. Umístění v klidné části města s dobrou dopravní dostupností do centra vytváří potenciál pro naplnění bytových potřeb i těch nejnáročnějších klientů.
            </p>
          </div>

          {/* Vzdálenosti - Distance Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-grey-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gold-primary mb-2">1 min</div>
              <div className="text-grey-600 font-medium">Autobusová zastávka</div>
            </div>

            <div className="bg-grey-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gold-primary mb-2">4 min</div>
              <div className="text-grey-600 font-medium">Venkovní sportoviště</div>
            </div>

            <div className="bg-grey-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gold-primary mb-2">6 min</div>
              <div className="text-grey-600 font-medium">Škola</div>
            </div>

            <div className="bg-grey-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gold-primary mb-2">12 min</div>
              <div className="text-grey-600 font-medium">Historické centrum</div>
            </div>
          </div>

          {/* Photo Carousel */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02932.jpg"
                alt="Rezidence U sv. Anny"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02745.jpg"
                alt="Rezidence U sv. Anny"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DJI_0548.jpg"
                alt="Rezidence U sv. Anny"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Vlastnosti rezidenční čtvrti */}
      <section className="relative py-24 md:py-32 bg-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/zobrazeni_domu.png"
            alt="Rezidence U sv. Anny"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-6 py-2.5 text-[10px] sm:text-xs md:text-sm text-white font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full border border-white/20 mb-4">
              Nejdůležitější informace
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Vlastnosti <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">rezidenční čtvrti</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gold-primary rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Kvalitní provedení</h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Kvalitní materiály s nadstandardní zvukovou izolací a možností volby vlastních úprav.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gold-primary rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Nízká energetická náročnost</h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Moderní technologie zajišťují minimální provozní náklady a ekologický provoz.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gold-primary rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Orientace na jih</h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Jižní svah zajišťuje maximální přísun denního světla do všech bytových jednotek.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gold-primary rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Výborná dostupnost</h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Blízkost MHD i možnost dojezdu osobním vozem s perfektním napojením na centrum.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gold-primary rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Klidná lokalita</h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Tichá část města s minimálním provozem, ideální pro rodinné bydlení.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gold-primary rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Vyřešené parkování</h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Dostatek parkovacích míst pro rezidenty i návštěvy v podzemních garážích.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Výstavba rezidence */}
      <section className="py-24 md:py-32 bg-grey-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
              Výstavba rezidence
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
              Od výběru bytu<br />po <span className="text-gradient">předání klíčů</span>
            </h2>
            <p className="text-lg text-grey-600 font-light leading-relaxed">
              Transparentní proces výstavby a koupě vašeho nového domova
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Výběr bytu</h3>
              <p className="text-grey-600 font-light leading-relaxed">
                Prohlédněte si dostupné byty a vyberte si ten, který vám nejlépe vyhovuje.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Rezervace</h3>
              <p className="text-grey-600 font-light leading-relaxed">
                Rezervujte si vybraný byt a domluvte si schůzku s naším týmem.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Smlouva</h3>
              <p className="text-grey-600 font-light leading-relaxed">
                Podpis kupní smlouvy a zajištění financování s naší pomocí.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Předání</h3>
              <p className="text-grey-600 font-light leading-relaxed">
                Po dokončení výstavby vám předáme klíče od vašeho nového domova.
              </p>
            </div>
          </div>

          {/* Průběh výstavby - Etapy */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {/* I. Etapa */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-dark">I. Etapa</h3>
                <span className="px-4 py-2 bg-green-available/10 text-green-available rounded-full text-sm font-semibold">
                  Dokončeno
                </span>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-gold-primary mb-2">51</div>
                <div className="text-grey-600 font-medium">Bytových jednotek</div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-grey-600">Prodáno</span>
                  <span className="font-semibold text-dark">51 bytů</span>
                </div>
                <div className="w-full bg-grey-200 rounded-full h-3">
                  <div className="bg-green-available h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <p className="text-grey-600 font-light leading-relaxed">
                První etapa byla dokončena v roce 2023 a všechny byty jsou plně obsazeny.
              </p>
            </div>

            {/* II. Etapa */}
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-dark">II. Etapa</h3>
                <span className="px-4 py-2 bg-orange-reserved/10 text-orange-reserved rounded-full text-sm font-semibold">
                  Vyprodáno
                </span>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-gold-primary mb-2">36</div>
                <div className="text-grey-600 font-medium">Bytových jednotek</div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-grey-600">Prodáno</span>
                  <span className="font-semibold text-dark">36 bytů</span>
                </div>
                <div className="w-full bg-grey-200 rounded-full h-3">
                  <div className="bg-orange-reserved h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <p className="text-grey-600 font-light leading-relaxed">
                Druhá etapa je vyprodána. Dokončení výstavby plánováno na rok 2024.
              </p>
            </div>

            {/* III. Etapa */}
            <div className="bg-gradient-to-br from-gold-primary to-gold-secondary rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">III. Etapa</h3>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  Předprodej
                </span>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold mb-2">51</div>
                <div className="text-white/90 font-medium">Bytových jednotek</div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Volných bytů</span>
                  <span className="font-semibold">51 bytů</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <p className="text-white/90 font-light leading-relaxed mb-6">
                Třetí etapa je nyní v předprodeji. Zajistěte si svůj vysněný byt již dnes.
              </p>

              <Link href="/byty">
                <button className="w-full px-6 py-4 bg-white text-gold-primary font-semibold rounded-xl hover:bg-grey-100 transition-all duration-300">
                  Prohlédnout byty
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Ukázka dokončeného bytu - Photo Gallery */}
      <section className="relative py-24 md:py-32 bg-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02913.jpg"
            alt="Rezidence U sv. Anny"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-6 py-2.5 text-[10px] sm:text-xs md:text-sm text-white font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full border border-white/20 mb-4">
              Realizace
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Ukázka <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">dokončeného bytu</span><br />z I. etapy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 relative h-96 md:h-full min-h-[500px] rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02841.jpg"
                alt="Obývací pokoj s kuchyní"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-dark mb-2">Obývací pokoj s kuchyní</h3>
                  <p className="text-grey-600 font-light">Prostor pro celou rodinu s moderním vybavením</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02745.jpg"
                alt="Detail interiéru"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02841.jpg"
                alt="Detail interiéru"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02913.jpg"
                alt="Interiér bytu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DSC02932.jpg"
                alt="Exteriér rezidence"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/images/DJI_0548.jpg"
                alt="Areál rezidence"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </Container>
      </section>

      {/* Od nápadu po realizaci */}
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/VVlxe2bvtlg"
                title="Prodej developerského projektu - Rezidence U sv. Anny, Kutná Hora"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="space-y-8">
              <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
                Od nápadu po realizaci
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark leading-[1.15] tracking-tight">
                Příběh projektu<br />
                <span className="text-gradient">Rezidence U sv. Anny</span>
              </h2>

              <p className="text-lg text-grey-600 font-light leading-relaxed">
                Projekt Rezidence U sv. Anny vznikl z vize vytvořit moderní rezidenční čtvrť,
                která respektuje historický charakter Kutné Hory a zároveň nabízí veškerý komfort
                současného bydlení.
              </p>

              <p className="text-lg text-grey-600 font-light leading-relaxed">
                Díky pečlivému plánování a spolupráci s předními odborníky jsme vytvořili prostor,
                kde se snoubí tradice s modernitou. Každý detail byl promyšlen s důrazem na kvalitu,
                udržitelnost a pohodlí budoucích majitelů.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/byty">
                  <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Prohlédnout byty
                  </button>
                </Link>

                <Link href="/rodinne-domy">
                  <button className="px-8 py-4 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white font-semibold rounded-2xl transition-all duration-300">
                    Rodinné domy
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-gold-primary to-gold-secondary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
              Kontakt
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Máte zájem o <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">byt</span><br />v našem projektu?
            </h2>

            <p className="text-lg md:text-xl text-white/90 font-light mb-12 leading-relaxed">
              Rádi vám poskytneme další informace a domluvíme si prohlídku
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="tel:+420724218841" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm text-white/70 font-light">Zavolejte nám</div>
                  <div className="text-lg font-semibold">+420 724 218 841</div>
                </div>
              </a>

              <a href="mailto:info@rezidenceusvanny.cz" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm text-white/70 font-light">Napište nám</div>
                  <div className="text-lg font-semibold">info@rezidenceusvanny.cz</div>
                </div>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/byty">
                <button className="px-8 py-4 bg-white text-gold-primary font-semibold rounded-2xl hover:bg-grey-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Zobrazit dostupné byty
                </button>
              </Link>

              <Link href="/kontakt">
                <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gold-primary font-semibold rounded-2xl transition-all duration-300">
                  Kontaktovat nás
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
