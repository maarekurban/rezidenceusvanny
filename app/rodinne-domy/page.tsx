'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { useState } from 'react'

// Mock data for family houses - pouze 3 fotky pro galerii
const houses = [
  {
    id: 1,
    name: 'Rodinný dům A',
    type: 'A',
    size: 145,
    plot: 613,
    rooms: '4+kk',
    image: '/images/RD-A_vizualizace-zahrada-trava-min.jpg',
    images: [
      '/images/RD-A_vizualizace-zahrada-trava-min.jpg',
    ],
    features: ['Garáž', 'Terasa', 'Zahrada'],
  },
  {
    id: 2,
    name: 'Rodinný dům B',
    type: 'B',
    size: 138,
    plot: 520,
    rooms: '4+kk',
    image: '/images/KH_vizualizace_BD_04-min.jpg',
    images: [
      '/images/KH_vizualizace_BD_04-min.jpg',
    ],
    features: ['Garáž', 'Zahrada', 'Sklep'],
  },
  {
    id: 3,
    name: 'Rodinný dům C',
    type: 'C',
    size: 152,
    plot: 580,
    rooms: '5+kk',
    image: '/images/vizualizace_RD-C_01-min.jpg',
    images: [
      '/images/vizualizace_RD-C_01-min.jpg',
    ],
    features: ['Garáž', 'Terasa', 'Zahrada', 'Pracovna'],
  },
]

export default function RodinneDomyPage() {
  // Sanity odstraněno - používáme hardcoded data (fallbacky níže)
  const pageData: any = null
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/RD-A_vizualizace-zahrada-trava-min.jpg"
            alt="Rodinné domy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-32">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            {pageData?.heroBadge || "Portfolio realizací"}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {pageData?.heroTitle || "Realizace"}<br />
            <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">
              {pageData?.heroTitleHighlight || "rodinných domů"}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-light mb-8 leading-relaxed">
            {pageData?.heroDescription || "14 moderních rodinných domů s pozemky až 613 m². Všechny domy jsou vyprodány."}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-gold-primary mb-1">{pageData?.statHousesCount || "14"}</div>
                <div className="text-xs text-grey-600 font-medium">{pageData?.statHousesLabel || "Rodinných domů"}</div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-gold-primary mb-1">{pageData?.statDispositions || "4-5+kk"}</div>
                <div className="text-xs text-grey-600 font-medium">{pageData?.statDispositionsLabel || "Dispozice"}</div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-gold-primary mb-1">{pageData?.statArea || "138-156"}</div>
                <div className="text-xs text-grey-600 font-medium">{pageData?.statAreaLabel || "m² plocha"}</div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-gold-primary mb-1">{pageData?.statPlot || "400-613"}</div>
                <div className="text-xs text-grey-600 font-medium">{pageData?.statPlotLabel || "m² pozemek"}</div>
              </div>
            </div>
        </Container>
      </section>

      {/* Sold Out Notice */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="bg-gold-primary/10 border-2 border-gold-primary/30 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gold-primary rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">
                  {pageData?.soldOutTitle || "Všechny rodinné domy jsou vyprodány"}
                </h2>
                <p className="text-lg font-semibold text-dark mb-6">
                  {pageData?.soldOutDescription2 || "✨ Aktuálně jsou k dispozici byty z III. etapy"}
                </p>
                <Link href={pageData?.soldOutButtonLink || "/byty"}>
                  <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg">
                    {pageData?.soldOutButtonText || "Prohlédnout dostupné byty →"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Houses Gallery */}
      <section className="py-16 md:py-24 bg-light-grey">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
              {pageData?.galleryBadge || "Naše realizace"}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
              {pageData?.galleryTitle || "Galerie"} <span className="text-gradient">{pageData?.galleryTitleHighlight || "rodinných domů"}</span>
            </h2>
          </div>

          {/* Masonry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(pageData?.galleryImages || houses).map((item: any, index: number) => (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={houses[index]?.image || '/images/placeholder.jpg'}
                    alt={`Rodinný dům ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Content - Byty III. etapa */}
      <section className="py-16 md:py-24 bg-white border-t border-grey-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/DSC02913.jpg"
                alt="Byty III. etapy"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: Text */}
            <div>
              <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
                {pageData?.ctaBadge || "Aktuálně v prodeji"}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
                {pageData?.ctaTitle || "Byty III. etapy"}<br />
                <span className="text-gradient">{pageData?.ctaTitleHighlight || "jsou k dispozici"}</span>
              </h2>
              <p className="text-lg text-grey-600 mb-8 leading-relaxed">
                {pageData?.ctaDescription || "Máme k dispozici moderní byty s dispozicemi 1+kk až 5+kk v III. etapě projektu. Využijte předprodejových cen."}
              </p>
              <Link href={pageData?.ctaButtonLink || "/byty"}>
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                  {pageData?.ctaButtonText || "Zobrazit dostupné byty"}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}



