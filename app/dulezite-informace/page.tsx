'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { useState } from 'react'

const paymentScheduleFlats = [
  {
    step: 'Záloha',
    amount: '100 000 Kč',
    description: 'Rezervační záloha do 10 dnů po podpisu rezervační smlouvy.',
  },
  {
    step: '1. platba',
    amount: '15%',
    description: '15 % kupní ceny do 10 dnů od podpisu smlouvy o smlouvě budoucí.',
  },
  {
    step: '2. platba',
    amount: '30%',
    description: '30 % kupní ceny po dokončení hrubé stavby.',
  },
  {
    step: '3. platba',
    amount: '20%',
    description: '20 % kupní ceny po dokončení hrubých instalací a výplní otvorů mimo prostory interiéru.',
  },
  {
    step: '4. platba',
    amount: '20%',
    description: '20 % kupní ceny po dokončení fasády, omítek a podlah bez finální vrstvy (splatnost cca 14 měsíců od zahájení výstavby).',
  },
  {
    step: '5. platba',
    amount: '15%',
    description: '15 % kupní ceny po kolaudaci a změně zápisu převáděné jednotky v katastru nemovitostí z rozestavěné na dokončenou.',
  },
]

const documents = [
  { name: 'PENB BD A4', type: 'PDF', size: '245 KB' },
  { name: 'PENB BD B2', type: 'PDF', size: '238 KB' },
  { name: 'Stavební povolení II. etapa', type: 'PDF', size: '1.2 MB' },
  { name: 'PENB BD A3', type: 'PDF', size: '241 KB' },
]

const faqs = [
  {
    question: 'Co dělat v případě zájmu o koupi nemovitosti v projektu?',
    answer: 'Kontaktním fomulářem, mailem nebo telefonicky nám oznámíte zájem o vybranou nemovitost. Ověříme její dostupnost, sdělíme Vám veškeré důležité informace a v případě přetrvávajícího zájmu připravíme návrhy smluv, které Vám následně zašleme k odsouhlasení do emailu. V případě zájmu není problém domluvit se na úvodní, osobní schůzce přímo v Kutné Hoře, Kolíně, nebo v Praze.',
  },
  {
    question: 'Pomůžete mi s financováním?',
    answer: 'Financování můžete řešit po vlastní ose nebo ve spolupráci s námi doporučenými hypotečními specialisty. Pokud spolupracujete s nimi, je proces jednodušší a rychlejší. Získáte také zvýhodněné úrokové sazby a odhady zdarma v bankách, kde je projekt schválený.',
  },
  {
    question: 'Jaká je energetická náročnost budov?',
    answer: 'Novostavby jsou koncipovány jako nízkoenergetické a spadají do energetické třídy B. Díky tomu zaplatíte výrazně méně na platbách za energie. Průkaz energetické náročnosti je ke stažení v sekci Užitečné dokumenty.',
  },
  {
    question: 'Je možné si k bytu koupit více parkovacích míst?',
    answer: 'Ke každému bytu je zatím možnost zakoupit pouze jedno vyhrazené parkovací stání. Pokud budete mít zájem o více míst, dejte nám vědět a zkusíme vymyslet individuální řešení.',
  },
  {
    question: 'Co znamená styl Shell & core?',
    answer: 'Shell & core, také známý jako Shell and core je způsob výstavby prostor, kde se prostory ponechají v základní úpravě, které si budoucí majitel zařídí dle svého přání sám či s pomocí architekta. Vychází z anglického shell – plášť, fasáda a core – jádro, u staveb struktura a vertikální komunikace.',
  },
  {
    question: 'Jsou možné klientské změny?',
    answer: 'Ano. Klientské změny je možné řešit v průběhu výstavby. Při podpisu smlouvy dostanete zásady pro provedení klientských změn.',
  },
  {
    question: 'Jaká je dopravní dostupnost do Prahy?',
    answer: 'Hned u rezidenční čtvrti se nachází frekventovaná autobusová zastávka, odkud se dostanete na vlakové nádraží. Vlakový přímý spoj jede na Hlavní nádraží v Praze 58 min. Autem se dostanete na kraj Prahy za 51 minut do centra Prahy za cca 1 hodinu a 8 minut, záleží na dopravní situaci. Díky připojení Kutnohorska do integrovaného dopravního systému Prahy se do hlavního města pohodlně dostanete v pracovních dnech i o víkendu.',
  },
  {
    question: 'Kutná hora je na seznamu UNESCO, nebude mě rušit přehnaný turistický ruch?',
    answer: 'Vzhledem k umístění projektu na kraji města u přírody s dobrou dopravní dostupností do centra určitě nikoliv. Naopak díky turistickému ruchu je velký tlak na poskytování kvalitních služeb, z kterého profitují i místní rezidenti.',
  },
]

export default function DuleziteInformacePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02841.jpg"
            alt="Důležité informace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-20">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            Na jednom místě
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Vše, co potřebujete <br />
            <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">
              vědět
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
            131 bytů a 14 rodinných domů stavěných ve třech etapách v atraktivním městě Kutné Hory. 
            Ideální spojení veškeré občanské vybavenosti, historických památek a přírody. 
            V dojezdové vzdálenosti do Prahy.
          </p>
        </Container>
      </section>

      {/* Financing - Apartments (Sloučené sekce) */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
                Flexibilní
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
                Financování <span className="text-gradient">bytů</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-grey-600 leading-relaxed max-w-3xl mx-auto">
                <p>
                  Projekt je zasmluvněný u vybraných bank, které proces financování znají a souhlasí s ním. 
                  Díky tomu vše probíhá rychle a bez problémů. V případě zájmu Vám můžeme doporučit 
                  naše vyzkoušené hypoteční poradce.
                </p>
                <p>
                  Placení kupní ceny bytu probíhá postupně s tím, jak postupuje výstavba projektu. 
                  Po podpisu rezervační smlouvy podepisujete smlouvu o smlouvě budoucí kupní. 
                  Kupní smlouva se podepisuje po kolaudaci a následně dochází k předání bytu. 
                  Po domluvě je možné upravit proces financování tak, aby Vám stačilo pouze 10 % vlastních zdrojů na začátku.
                </p>
              </div>
            </div>

            {/* Payment Schedule Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentScheduleFlats.map((payment, index) => (
                <div
                  key={index}
                  className={`bg-light-grey rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                    index === 0 ? 'border-gold-primary' : 'border-grey-200'
                  }`}
                >
                  <div className="text-xs text-gold-primary font-semibold uppercase tracking-wide mb-2">
                    {payment.step}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-dark mb-4">
                    {payment.amount}
                  </div>
                  <p className="text-sm text-grey-600 leading-relaxed">
                    {payment.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Documents Section */}
      <section className="relative py-16 md:py-24 bg-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/BD-1-16_vizualizace-01-min.jpg"
            alt="Rezidence U sv. Anny"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-6 py-2.5 text-[10px] sm:text-xs md:text-sm text-white font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full border border-white/20 mb-4">
                Ke stažení
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                Užitečné <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">dokumenty</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <button
                  key={index}
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* PDF Icon */}
                  <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      <path d="M14 2v6h6M10 13h4M10 17h4M10 9h1"/>
                    </svg>
                  </div>

                  <div className="flex-1 text-left">
                    <div className="font-semibold text-dark group-hover:text-gold-primary transition-colors">
                      {doc.name}
                    </div>
                    <div className="text-sm text-grey-600">
                      {doc.type} • {doc.size}
                    </div>
                  </div>

                  {/* Download Icon */}
                  <svg className="w-5 h-5 text-grey-400 group-hover:text-gold-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
                Máte otázky?
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
                Nejčastější <span className="text-gradient">dotazy</span>
              </h2>
              <p className="text-base md:text-lg text-grey-600 leading-relaxed">
                Ze zkušeností z prvních dvou etap víme, co klienty nejčastěji zajímá. 
                Pokud odpověď na otázku nenajdete, neváhejte kontaktovat náš prodejní tým.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-light-grey rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-lg font-semibold text-dark pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 text-gold-primary transition-transform flex-shrink-0 ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openFaqIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-grey-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/DJI_0548.jpg"
            alt="Areál rezidence"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Máte další <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">dotazy?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              Rádi vám odpovíme na všechny vaše otázky a pomůžeme s výběrem vhodného bytu nebo domu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Kontaktovat nás
                </button>
              </Link>
              <Link href="/byty">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/30 transition-all duration-300">
                  Prohlédnout byty
                </button>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                <a href="tel:+420724218841" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold">+420 724 218 841</span>
                </a>
                <a href="mailto:info@rezidenceusvanny.cz" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">info@rezidenceusvanny.cz</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

