'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default function DuleziteInformacePage() {
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  
  // State for page content from Sanity
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // FAQ open/close state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  
  // Fetch page content from Sanity
  useEffect(() => {
    async function fetchPageContent() {
      try {
        const data = await client.fetch(`
          *[_type == "importantInfoPageComplete" && _id == "important-info-page-complete-singleton"][0] {
            heroBadge,
            heroTitle,
            heroTitleHighlight,
            heroDescription,
            heroImage,
            financingBadge,
            financingTitle,
            financingTitleHighlight,
            financingIntro,
            financingCards,
            financingOutro,
            paymentScheduleBadge,
            paymentScheduleTitle,
            paymentScheduleTitleHighlight,
            paymentScheduleDescription,
            paymentSchedule,
            faqBadge,
            faqTitle,
            faqTitleHighlight,
            faqDescription,
            faqItems,
            documentsBadge,
            documentsTitle,
            documentsTitleHighlight,
            documentsDescription,
            documentsBackgroundImage,
            documents[] {
              title,
              file {
                asset-> {
                  url
                }
              }
            },
            contactBadge,
            contactTitle,
            contactDescription,
            contactEmail
          }
        `, {}, { cache: 'no-store' })
        
        setPageData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching page content:', error)
        setLoading(false)
      }
    }
    
    fetchPageContent()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      page: 'Důležité informace',
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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src={pageData?.heroImage ? urlFor(pageData.heroImage).url() : "/images/DSC02841.jpg"}
            alt="Důležité informace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-32">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            {pageData?.heroBadge || "Informace pro kupující"}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {pageData?.heroTitle || "Důležité"} <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">{pageData?.heroTitleHighlight || "informace"}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-3xl">
            {pageData?.heroDescription || "Vše, co potřebujete vědět o financování, dokumentaci a procesu koupě bytu v naší rezidenci."}
          </p>
        </Container>
      </section>

      {/* Financování bytů Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-gold-primary/10 text-gold-primary text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
                {pageData?.financingBadge || "Financování"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
                {pageData?.financingTitle || "Financování"} <span className="text-gradient">{pageData?.financingTitleHighlight || "bytů"}</span>
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-grey-700 leading-relaxed mb-6">
                {pageData?.financingIntro || "Při koupi bytu v naší rezidenci vám rádi pomůžeme s vyřízením hypotéky. Spolupracujeme s renomovanými bankovními institucemi, které nabízejí výhodné podmínky pro financování nemovitostí."}
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                {(pageData?.financingCards || [
                  {title: "Výhodné úrokové sazby", description: "Díky spolupráci s našimi bankovními partnery můžeme nabídnout velmi konkurenceschopné úrokové sazby."},
                  {title: "Komplexní asistence", description: "Pomůžeme vám s celým procesem vyřízení hypotéky od A do Z včetně vyhodnocení vaší bonity."},
                  {title: "Partnerské banky", description: "Spolupracujeme s předními finančními institucemi jako Komerční banka a Hypoteční banka."},
                  {title: "Rychlé vyřízení", description: "Díky naší dlouholeté spolupráci s bankami dokážeme urychlit proces schvalování hypotéky."}
                ]).map((card: any, index: number) => {
                  const icons = [
                    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                    "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                    "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
                    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ];
                  return (
                    <div key={index} className="bg-light-grey rounded-2xl p-6">
                      <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d={icons[index]} />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-dark mb-3">{card.title}</h3>
                      <p className="text-grey-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="text-grey-700 leading-relaxed">
                {pageData?.financingOutro || "Pokud máte zájem o více informací ohledně financování, neváhejte nás kontaktovat. Rádi vám poskytneme nezávaznou konzultaci a pomůžeme najít nejvhodnější řešení pro váš rozpočet."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Platební kalendář Section */}
      <section className="py-16 md:py-24 bg-light-grey">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
                {pageData?.paymentScheduleBadge || "Flexibilní"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
                {pageData?.paymentScheduleTitle || "Splátkový"} <span className="text-gradient">{pageData?.paymentScheduleTitleHighlight || "kalendář"}</span>
              </h2>
              <p className="text-base md:text-lg text-grey-600 leading-relaxed max-w-3xl mx-auto">
                {pageData?.paymentScheduleDescription || "Placení kupní ceny bytu probíhá postupně s tím, jak postupuje výstavba projektu. Po podpisu rezervační smlouvy podepisujete smlouvu o smlouvě budoucí kupní."}
              </p>
            </div>

            {/* Payment Schedule Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(pageData?.paymentSchedule || [
                { step: 'Záloha', amount: '100 000 Kč', description: 'Rezervační záloha do 10 dnů po podpisu rezervační smlouvy.' },
                { step: '1. platba', amount: '15%', description: '15 % kupní ceny do 10 dnů od podpisu smlouvy o smlouvě budoucí.' },
                { step: '2. platba', amount: '30%', description: '30 % kupní ceny po dokončení hrubé stavby.' },
                { step: '3. platba', amount: '20%', description: '20 % kupní ceny po dokončení hrubých instalací a výplní otvorů mimo prostory interiéru.' },
                { step: '4. platba', amount: '20%', description: '20 % kupní ceny po dokončení fasády, omítek a podlah bez finální vrstvy (splatnost cca 14 měsíců od zahájení výstavby).' },
                { step: '5. platba', amount: '15%', description: '15 % kupní ceny po kolaudaci a změně zápisu převáděné jednotky v katastru nemovitostí z rozestavěné na dokončenou.' }
              ]).map((payment: any, index: number) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
                {pageData?.faqBadge || "Máte otázky?"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
                {pageData?.faqTitle || "Nejčastější"} <span className="text-gradient">{pageData?.faqTitleHighlight || "dotazy"}</span>
              </h2>
              <p className="text-base md:text-lg text-grey-600 leading-relaxed">
                {pageData?.faqDescription || "Ze zkušeností z prvních dvou etap víme, co klienty nejčastěji zajímá. Pokud odpověď na otázku nenajdete, neváhejte kontaktovat náš prodejní tým."}
              </p>
            </div>

            <div className="space-y-4">
              {(pageData?.faqItems || [
                { question: 'Co dělat v případě zájmu o koupi nemovitosti v projektu?', answer: 'Kontaktním fomulářem, mailem nebo telefonicky nám oznámíte zájem o vybranou nemovitost. Ověříme její dostupnost, sdělíme Vám veškeré důležité informace a v případě přetrvávajícího zájmu připravíme návrhy smluv, které Vám následně zašleme k odsouhlasení do emailu. V případě zájmu není problém domluvit se na úvodní, osobní schůzce přímo v Kutné Hoře, Kolíně, nebo v Praze.' },
                { question: 'Pomůžete mi s financováním?', answer: 'Financování můžete řešit po vlastní ose nebo ve spolupráci s námi doporučenými hypotečními specialisty. Pokud spolupracujete s nimi, je proces jednodušší a rychlejší. Získáte také zvýhodněné úrokové sazby a odhady zdarma v bankách, kde je projekt schválený.' },
                { question: 'Jaká je energetická náročnost budov?', answer: 'Novostavby jsou koncipovány jako nízkoenergetické a spadají do energetické třídy B. Díky tomu zaplatíte výrazně méně na platbách za energie. Průkaz energetické náročnosti je ke stažení v sekci Užitečné dokumenty.' },
                { question: 'Je možné si k bytu koupit více parkovacích míst?', answer: 'Ke každému bytu je zatím možnost zakoupit pouze jedno vyhrazené parkovací stání. Pokud budete mít zájem o více míst, dejte nám vědět a zkusíme vymyslet individuální řešení.' },
                { question: 'Co znamená styl Shell & core?', answer: 'Shell & core, také známý jako Shell and core je způsob výstavby prostor, kde se prostory ponechají v základní úpravě, které si budoucí majitel zařídí dle svého přání sám či s pomocí architekta. Vychází z anglického shell – plášť, fasáda a core – jádro, u staveb struktura a vertikální komunikace.' },
                { question: 'Jsou možné klientské změny?', answer: 'Ano. Klientské změny je možné řešit v průběhu výstavby. Při podpisu smlouvy dostanete zásady pro provedení klientských změn.' },
                { question: 'Jaká je dopravní dostupnost do Prahy?', answer: 'Hned u rezidenční čtvrti se nachází frekventovaná autobusová zastávka, odkud se dostanete na vlakové nádraží. Vlakový přímý spoj jede na Hlavní nádraží v Praze 58 min. Autem se dostanete na kraj Prahy za 51 minut do centra Prahy za cca 1 hodinu a 8 minut, záleží na dopravní situaci. Díky připojení Kutnohorska do integrovaného dopravního systému Prahy se do hlavního města pohodlně dostanete v pracovních dnech i o víkendu.' },
                { question: 'Kutná hora je na seznamu UNESCO, nebude mě rušit přehnaný turistický ruch?', answer: 'Vzhledem k umístění projektu na kraji města u přírody s dobrou dopravní dostupností do centra určitě nikoliv. Naopak díky turistickému ruchu je velký tlak na poskytování kvalitních služeb, z kterého profitují i místní rezidenti.' }
              ]).map((faq: any, index: number) => (
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

      {/* Užitečné dokumenty Section */}
      <section className="py-16 md:py-24 relative bg-dark">
        <div className="absolute inset-0 z-0">
          <Image
            src={pageData?.documentsBackgroundImage ? urlFor(pageData.documentsBackgroundImage).url() : "/images/BD-1-16_vizualizace-01-min.jpg"}
            alt="Pozadí"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
              {pageData?.documentsBadge || "Dokumentace"}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              {pageData?.documentsTitle || "Užitečné"} <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">{pageData?.documentsTitleHighlight || "dokumenty"}</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              {pageData?.documentsDescription || "Ke stažení najdete všechny důležité dokumenty týkající se projektu"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {(pageData?.documents || []).map((doc: any, index: number) => {
              const icons = [
                "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ];
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={icons[index % icons.length]} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-6">{doc.title}</h3>
                  <a 
                    href={doc.file?.asset?.url || "#"} 
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-primary hover:text-gold-secondary font-semibold text-sm flex items-center gap-2 transition-colors"
                  >
                    Stáhnout PDF
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden bg-gradient-to-br from-gold-primary to-gold-secondary">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
                {pageData?.contactBadge || "Kontaktujte nás"}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                {pageData?.contactTitle || "Máte zájem o byt ve III. etapě?"}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed font-light">
                {pageData?.contactDescription || "Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin"}
              </p>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{pageData?.contactEmail || "info@rezidenceusvanny.cz"}</span>
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
    </main>
  )
}

