'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { useState } from 'react'


// Helper function to generate apartment slug
const generateApartmentSlug = (building: string, number: string): string => {
  const buildingSlug = building.toLowerCase() // bd-b1, bd-a1, bd-a2
  const numberSlug = number.replace('.', '-') // 1.04 -> 1-04
  return `${buildingSlug}-${numberSlug}`
}

// Format number to max 2 decimal places
const formatNumber = (num: number): number => {
  return Math.round(num * 100) / 100
}

type Apartment = {
  id: number
  number: string
  building: string
  disposition: string
  size: number
  balcony: number
  floor: number
  price: number
  status: 'available' | 'sold' | 'reserved'
  floorPlanPath: string | null
  rooms: any[]
  floorArea: number
  outdoorSpaces: any[]
  usableArea: number
}

interface ApartmentDetailClientProps {
  apartment: Apartment
}

export default function ApartmentDetailClient({ apartment }: ApartmentDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Use real rooms data from Excel or empty array for apartments without room data
  const rooms = apartment.rooms || []

  // Výpočet celkové plochy (podlahová plocha + venkovní prostory)
  const floorArea = apartment.floorArea || apartment.size
  const outdoorTotal = apartment.outdoorSpaces?.reduce((sum: number, space: any) => sum + space.area, 0) || 0
  const totalArea = floorArea + outdoorTotal

  const pricePerSqm = Math.round(apartment.price / apartment.size)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    // Sestavení dat pro odeslání - s explicitní konverzí na string
    const apartmentInfo = `${apartment.building} ${apartment.number}`
    const messageText = formData.get('message')?.toString() || ''

    const data = {
      page: 'Detail bytu',
      apartment: apartmentInfo,
      name: formData.get('name')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      message: messageText,
    }

    console.log('Submitting form data:', data)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.message || 'Network response was not ok')
      }

      const result = await response.json()

      if (result.success) {
        // Přesměrování na děkovnou stránku
        window.location.href = '/dekujeme'
      } else {
        setSubmitMessage('❌ Chyba při odesílání. Zkuste to prosím později.')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('❌ Chyba při odesílání. Zkuste to prosím později.')
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-xl">
            ● Volný
          </span>
        )
      case 'reserved':
        return (
          <span className="inline-flex items-center px-4 py-2 bg-orange-50 text-orange-700 text-sm font-semibold rounded-xl">
            ● Rezervován
          </span>
        )
      case 'sold':
        return (
          <span className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 text-sm font-semibold rounded-xl">
            ● Prodáno
          </span>
        )
      default:
        return null
    }
  }

  // Mock gallery images
  const galleryImages = [
    '/images/DSC02697.jpg',
    '/images/DSC02713.jpg',
    '/images/DSC02720.jpg',
    '/images/DSC02727.jpg',
    '/images/DSC02745.jpg',
    '/images/DSC02756.jpg',
    '/images/DSC02793.jpg',
    '/images/DSC02819.jpg',
    '/images/DSC02841.jpg',
    '/images/DSC02870.jpg',
    '/images/DSC02905.jpg',
    '/images/DSC02913.jpg',
    '/images/DSC02932.jpg',
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02913.jpg"
            alt={`Byt ${apartment.number}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Úvod
            </Link>
            <span>/</span>
            <Link href="/byty" className="hover:text-white transition-colors">
              Byty
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Byt {apartment.number}</span>
          </div>

          {/* Title & Status */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-xl sm:text-lg sm:text-xl md:text-2xl lg:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Byt {apartment.number} • {apartment.building}
            </h1>
            {getStatusBadge(apartment.status)}
          </div>

          <p className="text-lg md:text-xl text-white/90 font-light mb-8 leading-relaxed">
            Moderní byt s dispozicí {apartment.disposition} na {apartment.floor}. patře 
            v energetické třídě B.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gold-primary mb-1">{apartment.disposition}</div>
              <div className="text-xs text-grey-600 font-medium">Dispozice</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gold-primary mb-1">{apartment.floor}. NP</div>
              <div className="text-xs text-grey-600 font-medium">Patro</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gold-primary mb-1">{formatNumber(totalArea)}</div>
              <div className="text-xs text-grey-600 font-medium">m² plocha</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-base sm:text-lg md:text-xl font-bold text-gold-primary mb-1">
                {apartment.price.toLocaleString('cs-CZ')} Kč
              </div>
              <div className="text-xs text-grey-600 font-medium">Cena</div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Information (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">Byt {apartment.number}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-grey-600 mb-1">Dispozice</div>
                  <div className="text-lg font-bold text-gold-primary">{apartment.disposition}</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Podlaží</div>
                  <div className="text-lg font-bold text-dark">{apartment.floor}. NP</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Celková plocha</div>
                  <div className="text-lg font-bold text-dark">{formatNumber(totalArea)} m²</div>
                </div>
                <div>
                  <div className="text-sm text-grey-600 mb-1">Dostupnost</div>
                  {getStatusBadge(apartment.status)}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-grey-200">
                <div className="text-sm text-grey-600 mb-1">Cena s DPH</div>
                <div className="text-3xl font-bold text-dark">{apartment.price.toLocaleString('cs-CZ')} Kč</div>
              </div>
              <div className="mt-4 pt-4 border-t border-grey-200">
                <p className="text-sm text-grey-700 leading-relaxed">
                  Sklepní kóje je zahrnuta v kupní ceně. K bytu je možné zakoupit také venkovní parkovací stání. 
                  Kupní cena parkovacího stání je <span className="font-semibold">290.000,- Kč vč. DPH</span>.
                </p>
              </div>
            </div>

            {/* Detailed Room List */}
            {rooms.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-dark mb-4">Přehled ploch</h3>
                <div className="space-y-2">
                  {rooms.map((room: any) => (
                    <div key={room.number} className="flex justify-between items-center py-2 border-b border-grey-200">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-grey-500">{room.number}</span>
                        <span className="text-sm text-dark">{room.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-dark">{formatNumber(room.area)} m²</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outdoor Spaces */}
            {apartment.outdoorSpaces && apartment.outdoorSpaces.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-dark mb-4">Venkovní prostory</h3>
                <div className="space-y-2">
                  {apartment.outdoorSpaces.map((space: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-grey-200">
                      <span className="text-sm text-dark">{space.type}</span>
                      <span className="text-sm font-semibold text-dark">{formatNumber(space.area)} m²</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Area Summary */}
            <div className="bg-light-grey rounded-xl p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-grey-600">Podlahová plocha</span>
                  <span className="font-semibold text-dark">{formatNumber(floorArea)} m²</span>
                </div>
                {apartment.outdoorSpaces && apartment.outdoorSpaces.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-grey-600">Venkovní prostory</span>
                    <span className="font-semibold text-dark">
                      {formatNumber(outdoorTotal)} m²
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-grey-300">
                  <span className="font-semibold text-dark">Celková plocha</span>
                  <span className="font-bold text-gold-primary text-lg">
                    {formatNumber(totalArea)} m²
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  const formElement = document.getElementById('contact-form')
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="w-full px-6 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300"
              >
                Poptávka
              </button>
              <a 
                href={apartment.floorPlanPath || "/images/pudorys_ukazka.jpg"} 
                download={`Byt_${apartment.number}_pudorys.jpg`}
                className="block"
              >
                <button className="w-full px-6 py-3 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white font-semibold rounded-xl transition-all duration-300">
                  Stáhnout kartu bytu
                </button>
              </a>
            </div>
          </div>

          {/* Right Column - Visuals (2/3 width) */}
          <div className="lg:col-span-2 bg-light-grey rounded-2xl p-6 md:p-8">
            <div className="space-y-6">
              {/* Floor Plan */}
              <div>
                <a 
                  href={apartment.floorPlanPath || "/images/pudorys_ukazka.jpg"} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-[600px] bg-white rounded overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={apartment.floorPlanPath || "/images/pudorys_ukazka.jpg"}
                    alt={`Půdorys bytu ${apartment.number}`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </a>
                <div className="text-center mt-3">
                  <p className="text-sm text-grey-500 italic">
                    Plochy jednotlivých místností jsou pouze orientační. Vizualizace má ilustrativní charakter.
                  </p>
                </div>
              </div>

              {/* Building Location - Single Image */}
              {(apartment as any)?.locationInAreaUrl && (
                <div>
                  <h3 className="text-base font-bold text-dark mb-3">Umístění v areálu</h3>
                  <a 
                    href={(apartment as any).locationInAreaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative h-48 bg-white rounded overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={(apartment as any).locationInAreaUrl}
                      alt="Umístění v areálu"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <div className="text-center mt-2">
                    <p className="text-xs text-grey-500">Poloha bytu v areálu rezidence • {apartment.building}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Photo Gallery Section - Full Width */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-8">
            Fotogalerie
          </h2>

          {/* Main Image */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-6 shadow-lg">
            <Image
              src={galleryImages[selectedImage]}
              alt={`Interiér bytu ${selectedImage + 1}`}
              fill
              className="object-cover"
            />
            
            {/* Navigation Buttons */}
            <button
              onClick={() => setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
            >
              <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
            >
              <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-dark/80 backdrop-blur-sm text-white rounded-full text-sm font-medium">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {galleryImages.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 md:h-24 rounded overflow-hidden transition-all ${
                  selectedImage === index 
                    ? 'ring-4 ring-gold-primary ring-offset-2 scale-105' 
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <Image
                  src={image}
                  alt={`Náhled ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <p className="text-sm text-grey-600 mt-6 text-center leading-relaxed">
            Fotografie zobrazují dokončené byty z I. a II. etapy projektu. 
            Standardy kvality a materiálů jsou zachovány i pro III. etapu.
          </p>
        </Container>
      </section>

      {/* Similar Apartments Section */}
      <section className="py-16 md:py-24 relative bg-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/zobrazeni_domu.png"
            alt="Pozadí"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container className="relative z-10">
          <h2 className="text-xl sm:text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-white mb-8">
            Podobné <span className="text-gradient">byty</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {apartmentsFallback
              .filter(apt => 
                apt.id !== apartment.id && 
                apt.disposition === apartment.disposition &&
                apt.status === 'available'
              )
              .slice(0, 3)
              .map((apt: any) => (
                <Link key={apt.id} href={`/byty/${generateApartmentSlug(apt.building, apt.number)}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-grey-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-xl font-bold text-dark mb-1">Byt {apt.number}</div>
                        <div className="text-sm text-grey-600">{apt.floor}. patro</div>
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-grey-200">
                      <div>
                        <div className="text-xs text-grey-600 mb-1">Dispozice</div>
                        <div className="text-base font-semibold text-gold-primary">{apt.disposition}</div>
                      </div>
                      <div>
                        <div className="text-xs text-grey-600 mb-1">Rozloha</div>
                        <div className="text-base font-semibold text-dark">{formatNumber(apt.size)} m²</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-grey-600 mb-1">Cena</div>
                      <div className="text-xl font-bold text-dark">
                        {apt.price.toLocaleString('cs-CZ')} Kč
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/byty">
              <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                Zobrazit všechny byty →
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden bg-gradient-to-br from-gold-primary to-gold-secondary">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
                Kontaktujte nás
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                Máte zájem o byt {apartment.number} ({apartment.building})?
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
                  placeholder={`Mám zájem o více informací o bytu ${apartment.number}...`}
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

      {/* Why Live Here Section */}
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/VVlxe2bvtlg"
                title="Rezidence U sv. Anny - Prohlídka projektu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="space-y-8">
              <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em]">
                Proč si vybrat tento projekt
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark leading-[1.15] tracking-tight">
                Proč bydlet v<br />
                <span className="text-gradient">Rezidenci U sv. Anny</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-2">UNESCO lokalita</h3>
                    <p className="text-grey-600 font-light leading-relaxed">
                      Bydlení v historickém městě zapsaném na Seznam světového kulturního dědictví UNESCO
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-2">Výborná dostupnost</h3>
                    <p className="text-grey-600 font-light leading-relaxed">
                      Díky integraci do PID systému se do Prahy dostanete pohodlně a rychle
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-2">Moderní bydlení</h3>
                    <p className="text-grey-600 font-light leading-relaxed">
                      Nízkoenergetické byty s promyšleným dispozičním řešením a kvalitním vybavením
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-2">Kompletní občanská vybavenost</h3>
                    <p className="text-grey-600 font-light leading-relaxed">
                      Školy, školky, obchody a veškeré služby v dosahu pěší chůze
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/kontakt">
                  <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Kontaktovat
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
