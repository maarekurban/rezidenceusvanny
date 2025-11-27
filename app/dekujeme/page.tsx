'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'

export default function DekujemePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Full Height */}
      <section className="relative min-h-screen flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02932.jpg"
            alt="Děkujeme"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-green-500/20 backdrop-blur-sm rounded-full">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
              Děkujeme za váš zájem
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Vaše poptávka<br />
              <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">
                byla odeslána
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 font-light mb-4 leading-relaxed max-w-2xl mx-auto">
              Děkujeme za Váš zájem o Rezidenci U sv. Anny.
            </p>

            <p className="text-base md:text-lg text-white/80 font-light mb-10 leading-relaxed max-w-2xl mx-auto">
              Vaši poptávku jsme úspěšně přijali. Naši specialisté se Vám ozvou v nejbližší době s dalšími informacemi.
            </p>

            {/* CTA Button */}
            <Link href="/">
              <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Zpět na úvod
              </button>
            </Link>

            {/* Contact Info */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm mb-4">
                V případě jakýchkoli dotazů nás neváhejte kontaktovat:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/90">
                <a href="tel:+420724218841" className="flex items-center gap-2 hover:text-gold-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +420 724 218 841
                </a>
                <a href="mailto:info@rezidenceusvanny.cz" className="flex items-center gap-2 hover:text-gold-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@rezidenceusvanny.cz
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
