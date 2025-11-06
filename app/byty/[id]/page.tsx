'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { notFound } from 'next/navigation'
import { useState, use } from 'react'

// Mock apartment data with detailed room information
const apartments = [
  // 1. patro
  { id: 1, number: '3.01', disposition: '1+kk', size: 32, floor: 1, price: 2_890_000, status: 'available', balcony: false, garage: 'G1', cellar: 'S01', usableArea: 28, floorArea: 30 },
  { id: 2, number: '3.02', disposition: '2+kk', size: 52, floor: 1, price: 4_680_000, status: 'available', balcony: true, garage: 'G2', cellar: 'S02', usableArea: 45, floorArea: 48 },
  { id: 3, number: '3.03', disposition: '2+kk', size: 58, floor: 1, price: 5_220_000, status: 'available', balcony: true, garage: 'G3', cellar: 'S03', usableArea: 50, floorArea: 53 },
  { id: 4, number: '3.04', disposition: '3+kk', size: 72, floor: 1, price: 6_480_000, status: 'reserved', balcony: true, garage: 'G4, G5', cellar: 'S04', usableArea: 62, floorArea: 66 },
  { id: 5, number: '3.05', disposition: '1+kk', size: 34, floor: 1, price: 3_060_000, status: 'available', balcony: false, garage: null, cellar: 'S05', usableArea: 30, floorArea: 32 },
  { id: 6, number: '3.06', disposition: '2+kk', size: 54, floor: 1, price: 4_860_000, status: 'sold', balcony: true },
  { id: 7, number: '3.07', disposition: '3+kk', size: 74, floor: 1, price: 6_660_000, status: 'available', balcony: true },
  { id: 8, number: '3.08', disposition: '4+kk', size: 92, floor: 1, price: 8_280_000, status: 'available', balcony: true },
  
  // 2. patro
  { id: 9, number: '3.09', disposition: '1+kk', size: 35, floor: 2, price: 3_150_000, status: 'available', balcony: false },
  { id: 10, number: '3.10', disposition: '2+kk', size: 55, floor: 2, price: 4_950_000, status: 'available', balcony: true },
  { id: 11, number: '3.11', disposition: '3+kk', size: 75, floor: 2, price: 6_750_000, status: 'available', balcony: true },
  { id: 12, number: '3.12', disposition: '4+kk', size: 95, floor: 2, price: 8_550_000, status: 'reserved', balcony: true },
  { id: 13, number: '3.13', disposition: '1+kk', size: 33, floor: 2, price: 2_970_000, status: 'available', balcony: false },
  { id: 14, number: '3.14', disposition: '2+kk', size: 56, floor: 2, price: 5_040_000, status: 'available', balcony: true },
  { id: 15, number: '3.15', disposition: '3+kk', size: 76, floor: 2, price: 6_840_000, status: 'sold', balcony: true },
  { id: 16, number: '3.16', disposition: '5+kk', size: 112, floor: 2, price: 10_080_000, status: 'available', balcony: true },
  
  // 3. patro
  { id: 17, number: '3.17', disposition: '2+kk', size: 54, floor: 3, price: 4_860_000, status: 'available', balcony: true },
  { id: 18, number: '3.18', disposition: '2+kk', size: 59, floor: 3, price: 5_310_000, status: 'available', balcony: true },
  { id: 19, number: '3.19', disposition: '3+kk', size: 78, floor: 3, price: 7_020_000, status: 'available', balcony: true },
  { id: 20, number: '3.20', disposition: '4+kk', size: 98, floor: 3, price: 8_820_000, status: 'available', balcony: true },
  { id: 21, number: '3.21', disposition: '1+kk', size: 36, floor: 3, price: 3_240_000, status: 'reserved', balcony: false },
  { id: 22, number: '3.22', disposition: '2+kk', size: 57, floor: 3, price: 5_130_000, status: 'available', balcony: true },
  { id: 23, number: '3.23', disposition: '3+kk', size: 77, floor: 3, price: 6_930_000, status: 'available', balcony: true },
  { id: 24, number: '3.24', disposition: '4+kk', size: 96, floor: 3, price: 8_640_000, status: 'available', balcony: true },
  
  // 4. patro
  { id: 25, number: '3.25', disposition: '1+kk', size: 36, floor: 4, price: 3_240_000, status: 'available', balcony: false },
  { id: 26, number: '3.26', disposition: '2+kk', size: 56, floor: 4, price: 5_040_000, status: 'available', balcony: true },
  { id: 27, number: '3.27', disposition: '3+kk', size: 80, floor: 4, price: 7_200_000, status: 'available', balcony: true },
  { id: 28, number: '3.28', disposition: '5+kk', size: 115, floor: 4, price: 10_350_000, status: 'available', balcony: true },
  { id: 29, number: '3.29', disposition: '2+kk', size: 58, floor: 4, price: 5_220_000, status: 'reserved', balcony: true },
  { id: 30, number: '3.30', disposition: '3+kk', size: 79, floor: 4, price: 7_110_000, status: 'available', balcony: true },
  { id: 31, number: '3.31', disposition: '4+kk', size: 97, floor: 4, price: 8_730_000, status: 'available', balcony: true },
  { id: 32, number: '3.32', disposition: '2+kk', size: 55, floor: 4, price: 4_950_000, status: 'available', balcony: true },
  
  // 5. patro (podkroví)
  { id: 33, number: '3.33', disposition: '3+kk', size: 82, floor: 5, price: 7_380_000, status: 'available', balcony: true },
  { id: 34, number: '3.34', disposition: '4+kk', size: 102, floor: 5, price: 9_180_000, status: 'available', balcony: true },
  { id: 35, number: '3.35', disposition: '5+kk', size: 118, floor: 5, price: 10_620_000, status: 'available', balcony: true },
  { id: 36, number: '3.36', disposition: '3+kk', size: 81, floor: 5, price: 7_290_000, status: 'sold', balcony: true },
  { id: 37, number: '3.37', disposition: '4+kk', size: 100, floor: 5, price: 9_000_000, status: 'available', balcony: true },
  { id: 38, number: '3.38', disposition: '5+kk', size: 120, floor: 5, price: 10_800_000, status: 'reserved', balcony: true },
  { id: 39, number: '3.39', disposition: '3+kk', size: 83, floor: 5, price: 7_470_000, status: 'available', balcony: true },
  { id: 40, number: '3.40', disposition: '4+kk', size: 99, floor: 5, price: 8_910_000, status: 'available', balcony: true },
]

// Mock room data generator based on disposition
const generateRooms = (disposition: string, totalSize: number) => {
  const dispositionMap: { [key: string]: { name: string; ratio: number }[] } = {
    '1+kk': [
      { name: 'Obývací pokoj s kuchyní', ratio: 0.65 },
      { name: 'Koupelna', ratio: 0.15 },
      { name: 'Předsíň', ratio: 0.20 },
    ],
    '2+kk': [
      { name: 'Obývací pokoj s kuchyní', ratio: 0.45 },
      { name: 'Ložnice', ratio: 0.25 },
      { name: 'Koupelna', ratio: 0.12 },
      { name: 'Předsíň', ratio: 0.18 },
    ],
    '3+kk': [
      { name: 'Obývací pokoj s kuchyní', ratio: 0.40 },
      { name: 'Ložnice', ratio: 0.20 },
      { name: 'Pokoj', ratio: 0.18 },
      { name: 'Koupelna', ratio: 0.10 },
      { name: 'Předsíň', ratio: 0.12 },
    ],
    '4+kk': [
      { name: 'Obývací pokoj s kuchyní', ratio: 0.35 },
      { name: 'Ložnice', ratio: 0.18 },
      { name: 'Pokoj 1', ratio: 0.15 },
      { name: 'Pokoj 2', ratio: 0.14 },
      { name: 'Koupelna', ratio: 0.09 },
      { name: 'Předsíň', ratio: 0.09 },
    ],
    '5+kk': [
      { name: 'Obývací pokoj s kuchyní', ratio: 0.30 },
      { name: 'Ložnice', ratio: 0.16 },
      { name: 'Pokoj 1', ratio: 0.13 },
      { name: 'Pokoj 2', ratio: 0.13 },
      { name: 'Pokoj 3', ratio: 0.12 },
      { name: 'Koupelna', ratio: 0.08 },
      { name: 'Předsíň', ratio: 0.08 },
    ],
  }

  const rooms = dispositionMap[disposition] || dispositionMap['2+kk']
  return rooms.map((room, index) => ({
    id: String(index + 1).padStart(2, '0'),
    name: room.name,
    size: parseFloat((totalSize * room.ratio).toFixed(1))
  }))
}

export default function ApartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const apartment = apartments.find(apt => apt.id === parseInt(resolvedParams.id))
  const [selectedImage, setSelectedImage] = useState(0)

  if (!apartment) {
    notFound()
  }

  const rooms = generateRooms(apartment.disposition, apartment.size)
  const pricePerSqm = Math.round(apartment.price / apartment.size)

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
            ● Prodán
          </span>
        )
      default:
        return null
    }
  }

  // Mock gallery images
  const galleryImages = [
    '/images/DSC02841.jpg',
    '/images/DSC02745.jpg',
    '/images/DSC02913.jpg',
    '/images/DSC02870.jpg',
    '/images/DSC02756.jpg',
    '/images/DSC02819.jpg',
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02841.jpg"
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
              Byt {apartment.number}
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
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gold-primary mb-1">{apartment.size}</div>
              <div className="text-xs text-grey-600 font-medium">m² plocha</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gold-primary mb-1">
                {(apartment.price / 1_000_000).toFixed(2).replace('.', ',')}
              </div>
              <div className="text-xs text-grey-600 font-medium">mil. Kč</div>
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
                  <div className="text-lg font-bold text-dark">{apartment.size} m²</div>
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
              {apartment.garage && (
                <div className="mt-4 pt-4 border-t border-grey-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-grey-600 mb-1">Garáž č.</div>
                      <div className="font-semibold text-dark">{apartment.garage}</div>
                    </div>
                    {apartment.cellar && (
                      <div>
                        <div className="text-grey-600 mb-1">Sklep</div>
                        <div className="font-semibold text-dark">{apartment.cellar}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Room List */}
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">Přehled ploch</h3>
              <div className="space-y-2">
                {rooms.map((room) => (
                  <div key={room.id} className="flex justify-between items-center py-2 border-b border-grey-200">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-grey-500">{room.id}</span>
                      <span className="text-sm text-dark">{room.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-dark">{room.size} m²</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Area Summary */}
            {apartment.usableArea && (
              <div className="bg-light-grey rounded-xl p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-grey-600">Užitná plocha</span>
                    <span className="font-semibold text-dark">{apartment.usableArea} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-600">Podlahová plocha</span>
                    <span className="font-semibold text-dark">{apartment.floorArea} m²</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-grey-300">
                    <span className="font-semibold text-dark">Celková plocha</span>
                    <span className="font-bold text-gold-primary text-lg">{apartment.size} m²</span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link href="/kontakt" className="block">
                <button className="w-full px-6 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300">
                  Poptávka
                </button>
              </Link>
              <div className="block">
                <button className="w-full px-6 py-3 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white font-semibold rounded-xl transition-all duration-300">
                  Stáhnout kartu bytu
                </button>
              </div>
              <Link href="/dulezite-informace" className="block">
                <button className="w-full px-6 py-3 border-2 border-grey-300 text-dark hover:border-gold-primary hover:text-gold-primary font-semibold rounded-xl transition-all duration-300">
                  Standardy
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Visuals (2/3 width) */}
          <div className="lg:col-span-2 bg-light-grey rounded-2xl p-6 md:p-8">
            <div className="space-y-6">
              {/* Floor Plan */}
              <div>
                <div className="relative h-[600px] bg-white rounded overflow-hidden">
                  <Image
                    src="/images/pudorys_ukazka.jpg"
                    alt={`Půdorys bytu ${apartment.number}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="text-sm text-grey-500 italic">
                    Plochy jednotlivých místností jsou pouze orientační. Vizualizace má ilustrativní charakter.
                  </p>
                </div>
              </div>

              {/* Building Location - Small */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-bold text-dark mb-3">Umístění v budově</h3>
                  <div className="relative h-32 bg-white rounded overflow-hidden">
                    <Image
                      src="/images/zobrazeni_domu.png"
                      alt="Umístění v budově"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs text-grey-500">Poloha bytu • {apartment.floor}. NP</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-dark mb-3">Umístění v rezidenci</h3>
                  <div className="relative h-32 bg-white rounded overflow-hidden">
                    <Image
                      src="/images/zobrazeni_domu.png"
                      alt="Umístění v rezidenci"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs text-grey-500">Areál rezidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Photo Gallery Section - Full Width */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-8">
            Fotogalerie <span className="text-gradient">interiérů</span>
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
            {galleryImages.map((image, index) => (
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
            {apartments
              .filter(apt => 
                apt.id !== apartment.id && 
                apt.disposition === apartment.disposition &&
                apt.status === 'available'
              )
              .slice(0, 3)
              .map((apt) => (
                <Link key={apt.id} href={`/byty/${apt.id}`}>
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
                        <div className="text-base font-semibold text-dark">{apt.size} m²</div>
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

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/o-projektu">
                  <button className="px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    O projektu
                  </button>
                </Link>

                <Link href="/kontakt">
                  <button className="px-8 py-4 border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-white font-semibold rounded-2xl transition-all duration-300">
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

