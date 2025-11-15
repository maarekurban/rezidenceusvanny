import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'

export default function DuleziteInformacePage() {
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
            src="/images/DSC02841.jpg"
            alt="Důležité informace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-32">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            Informace pro kupující
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Důležité <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">informace</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-3xl">
            Vše, co potřebujete vědět o financování, dokumentaci a procesu koupě bytu v naší rezidenci.
          </p>
        </Container>
      </section>

      {/* Financování bytů Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-gold-primary/10 text-gold-primary text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
                Financování
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
                Financování <span className="text-gradient">bytů</span>
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-grey-700 leading-relaxed mb-6">
                Při koupi bytu v naší rezidenci vám rádi pomůžeme s vyřízením hypotéky. Spolupracujeme s renomovanými 
                bankovními institucemi, které nabízejí výhodné podmínky pro financování nemovitostí.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-light-grey rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">Výhodné úrokové sazby</h3>
                  <p className="text-grey-600 leading-relaxed">
                    Díky spolupráci s našimi bankovními partnery můžeme nabídnout velmi konkurenceschopné úrokové sazby.
                  </p>
                </div>

                <div className="bg-light-grey rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">Komplexní asistence</h3>
                  <p className="text-grey-600 leading-relaxed">
                    Pomůžeme vám s celým procesem vyřízení hypotéky od A do Z včetně vyhodnocení vaší bonity.
                  </p>
                </div>

                <div className="bg-light-grey rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">Partnerské banky</h3>
                  <p className="text-grey-600 leading-relaxed">
                    Spolupracujeme s předními finančními institucemi jako Komerční banka a Hypoteční banka.
                  </p>
                </div>

                <div className="bg-light-grey rounded-2xl p-6">
                  <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">Rychlé vyřízení</h3>
                  <p className="text-grey-600 leading-relaxed">
                    Díky naší dlouholeté spolupráci s bankami dokážeme urychlit proces schvalování hypotéky.
                  </p>
                </div>
              </div>

              <p className="text-grey-700 leading-relaxed">
                Pokud máte zájem o více informací ohledně financování, neváhejte nás kontaktovat. 
                Rádi vám poskytneme nezávaznou konzultaci a pomůžeme najít nejvhodnější řešení pro váš rozpočet.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Užitečné dokumenty Section */}
      <section className="py-16 md:py-24 relative bg-dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/BD-1-16_vizualizace-01-min.jpg"
            alt="Pozadí"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
              Dokumentace
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Užitečné <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">dokumenty</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ke stažení najdete všechny důležité dokumenty týkající se projektu
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* PENB A1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-6">PENB A1</h3>
              <a 
                href="/dokumentace/PENB_A1.pdf" 
                download
                className="text-gold-primary hover:text-gold-secondary font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                Stáhnout PDF
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

            {/* PENB A2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-6">PENB A2</h3>
              <a 
                href="/dokumentace/PENB_A2.pdf" 
                download
                className="text-gold-primary hover:text-gold-secondary font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                Stáhnout PDF
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

            {/* PENB B1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-6">PENB B1</h3>
              <a 
                href="/dokumentace/PENB_B1.pdf" 
                download
                className="text-gold-primary hover:text-gold-secondary font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                Stáhnout PDF
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

            {/* Standard provedení a vybavení */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-6">Standard provedení a vybavení - III. etapa</h3>
              <a 
                href="/dokumentace/Standard provedení a vybavení - III. etapa.pdf" 
                download
                className="text-gold-primary hover:text-gold-secondary font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                Stáhnout PDF
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

            {/* Zásady pro provádění klientských změn */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-6">Zásady pro provádění klientských změn</h3>
              <a 
                href="/dokumentace/Zásady pro provádění klientských změn.pdf" 
                download
                className="text-gold-primary hover:text-gold-secondary font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                Stáhnout PDF
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden bg-gradient-to-br from-gold-primary to-gold-secondary">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
                Kontaktujte nás
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                Máte zájem o byt ve III. etapě?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed font-light">
                Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin
              </p>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">info@rezidenceusvanny.cz</span>
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

