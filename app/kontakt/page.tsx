'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { useState } from 'react'

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    interest: '',
    email: '',
    phone: '',
    message: '',
    gdpr: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Děkujeme za vaši zprávu! Brzy se vám ozveme.')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/DJI_0526.jpg"
            alt="Kontakt"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-20">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            Rezidenční čtvrť U sv. Anny
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Kontaktní <br />
            <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">
              informace
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
            V rámci webu se dozvíte spoustu důležitých informací. Nic ale nenahradí osobní prohlídku 
            přímo v místě výstavby. Ozvěte se nám a vše vám ukážeme, vysvětlíme.
          </p>
        </Container>
      </section>

      {/* Contact Intro */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
              Kontaktujte nás
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
              Neváhejte se na nás <span className="text-gradient">obrátit</span>
            </h2>
            <p className="text-lg text-grey-600 leading-relaxed">
              Odpovědi na nejčastější dotazy najdete v sekci{' '}
              <Link href="/dulezite-informace" className="text-gold-primary hover:underline">
                Důležité informace
              </Link>
              . Pokud odpověď na otázku nenajdete jsme Vám plně k dispozici. 
              Můžeme si zavolat, zorganizovat online schůzku, nebo se potkat přímo v Kutné hoře. 
              Poptávku můžete zadat také pomocí poptávkového formuláře níže.
            </p>
          </div>
        </Container>
      </section>

      {/* Agents & Form Section */}
      <section className="py-16 md:py-24 bg-light-grey">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Agents */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                Realitní makléři
              </h2>

              {/* Agent 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gold-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-10 h-10 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-dark mb-1">Terezie Příhodová</h3>
                    <p className="text-gold-primary font-medium mb-4">Realitní makléřka</p>
                    
                    <div className="space-y-3">
                      <a 
                        href="tel:+420724218841" 
                        className="flex items-center gap-3 text-grey-700 hover:text-gold-primary transition-colors group"
                      >
                        <div className="w-10 h-10 bg-light-grey rounded-lg flex items-center justify-center group-hover:bg-gold-primary/10 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="font-medium">+420 724 218 841</span>
                      </a>

                      <a 
                        href="mailto:terezie.prihodova@anomia.cz" 
                        className="flex items-center gap-3 text-grey-700 hover:text-gold-primary transition-colors group"
                      >
                        <div className="w-10 h-10 bg-light-grey rounded-lg flex items-center justify-center group-hover:bg-gold-primary/10 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="font-medium">terezie.prihodova@anomia.cz</span>
                      </a>

                      <a 
                        href="#" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-grey-700 hover:text-gold-primary transition-colors group"
                      >
                        <div className="w-10 h-10 bg-light-grey rounded-lg flex items-center justify-center group-hover:bg-gold-primary/10 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </div>
                        <span className="font-medium">Profil na Facebooku</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gold-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-10 h-10 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-dark mb-1">Ing. Jan Křivánek</h3>
                    <p className="text-gold-primary font-medium mb-4">Realitní makléř</p>
                    
                    <div className="space-y-3">
                      <a 
                        href="tel:+420775908881" 
                        className="flex items-center gap-3 text-grey-700 hover:text-gold-primary transition-colors group"
                      >
                        <div className="w-10 h-10 bg-light-grey rounded-lg flex items-center justify-center group-hover:bg-gold-primary/10 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <span className="font-medium">+420 775 908 881</span>
                      </a>

                      <a 
                        href="mailto:jan.krivanek@anomia.cz" 
                        className="flex items-center gap-3 text-grey-700 hover:text-gold-primary transition-colors group"
                      >
                        <div className="w-10 h-10 bg-light-grey rounded-lg flex items-center justify-center group-hover:bg-gold-primary/10 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="font-medium">jan.krivanek@anomia.cz</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                Poptávkový formulář
              </h2>

              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
                      Vaše jméno a příjmení <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-light-grey border border-grey-300 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent transition-all"
                      placeholder="Jan Novák"
                    />
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="interest" className="block text-sm font-semibold text-dark mb-2">
                      Mám zájem o: <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="interest"
                      required
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 bg-light-grey border border-grey-300 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent transition-all"
                    >
                      <option value="">Vyberte jednu z možností</option>
                      <option value="byt">Rezervaci bytu</option>
                      <option value="dum">Rezervaci domu</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                      Emailová adresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-light-grey border border-grey-300 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent transition-all"
                      placeholder="jan.novak@email.cz"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-light-grey border border-grey-300 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent transition-all"
                      placeholder="+420 123 456 789"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-dark mb-2">
                      Vaše zpráva
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-light-grey border border-grey-300 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent transition-all resize-none"
                      placeholder="Mám zájem o byt 3+kk..."
                    />
                  </div>

                  {/* GDPR */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="gdpr"
                      required
                      checked={formData.gdpr}
                      onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                      className="mt-1 w-5 h-5 text-gold-primary border-grey-300 rounded focus:ring-gold-primary"
                    />
                    <label htmlFor="gdpr" className="text-sm text-grey-600 leading-relaxed">
                      Souhlasím se zpracováním osobních údajů dle GDPR. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Odeslat
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Info Cards */}
      <section className="relative py-16 md:py-24 bg-dark">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02913.jpg"
            alt="Rezidence"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs md:text-sm font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
              Máte otázky?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Volné <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">byty</span> stále k dispozici
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Info Card 1 */}
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-grey-600 uppercase tracking-wide mb-2">Lokalita</h3>
              <p className="text-xl font-bold text-dark">Kutná Hora</p>
            </div>

            {/* Info Card 2 */}
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-grey-600 uppercase tracking-wide mb-2">Telefon</h3>
              <a href="tel:+420724218841" className="text-xl font-bold text-dark hover:text-gold-primary transition-colors">
                +420 724 218 841
              </a>
            </div>

            {/* Info Card 3 */}
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-grey-600 uppercase tracking-wide mb-2">E-mail</h3>
              <a href="mailto:info@rezidenceusvanny.cz" className="text-lg font-bold text-dark hover:text-gold-primary transition-colors break-all">
                info@rezidenceusvanny.cz
              </a>
            </div>

            {/* Info Card 4 */}
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-grey-600 uppercase tracking-wide mb-2">Celkem</h3>
              <p className="text-3xl font-bold text-gold-primary">145</p>
              <p className="text-sm text-grey-600 mt-1">Nových domovů</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="h-[500px] md:h-[600px] bg-grey-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2567.4516369657385!2d15.247726677480854!3d49.946629871500406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c41bcb45d5ccf%3A0x6414c40edc19dc61!2zUmV6aWRlbsSNbsOtIMSNdHZyxaUgVSBzdi4gQW5ueQ!5e0!3m2!1scs!2scz!4v1762443431743!5m2!1scs!2scz" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa umístění Rezidence U sv. Anny"
        />
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-light-grey">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              Chcete se podívat na místo?
            </h2>
            <p className="text-lg text-grey-600 mb-8 leading-relaxed">
              Rádi vám osobně ukážeme projekt a odpovíme na všechny vaše otázky přímo na místě.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/byty">
                <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                  Prohlédnout byty
                </button>
              </Link>
              <a href="tel:+420724218841">
                <button className="px-8 py-4 bg-white hover:bg-grey-100 text-dark border-2 border-grey-300 font-semibold rounded-2xl transition-all duration-300">
                  Zavolat makléři
                </button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}



