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

// Calculate total outdoor space
const getTotalOutdoorArea = (spaces?: { type: string; area: number }[]) => {
  if (!spaces || spaces.length === 0) return 0
  return spaces.reduce((sum, space) => sum + space.area, 0)
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

type SortField = 'number' | 'disposition' | 'size' | 'floor' | 'price'
type SortDirection = 'asc' | 'desc'

interface BytyPageClientProps {
  apartments: Apartment[]
}

export default function BytyPageClient({ apartments }: BytyPageClientProps) {
  const loading = false
  const pageData: any = null

  const [selectedDisposition, setSelectedDisposition] = useState<string>('all')
  const [selectedFloor, setSelectedFloor] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('number')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentGalleryShowroom, setCurrentGalleryShowroom] = useState<string[]>([])
  const [currentIndexShowroom, setCurrentIndexShowroom] = useState<number>(0)

  // Calculate min and max prices
  const minPrice = Math.min(...apartments.map(apt => apt.price))
  const maxPrice = Math.max(...apartments.map(apt => apt.price))
  const [priceRangeSlider, setPriceRangeSlider] = useState<number>(maxPrice)

  // Count available apartments (without price filter for hero section)
  const totalAvailableCount = apartments.filter(apt => apt.status === 'available').length

  // Filter apartments
  const filteredApartments = apartments.filter(apt => {
    if (selectedDisposition !== 'all' && apt.disposition !== selectedDisposition) return false
    if (selectedFloor !== 'all' && apt.floor.toString() !== selectedFloor) return false
    if (selectedStatus !== 'all' && apt.status !== selectedStatus) return false
    if (apt.price > priceRangeSlider) return false
    return true
  })

  // Sort apartments
  const sortedApartments = [...filteredApartments].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case 'number':
        comparison = a.number.localeCompare(b.number)
        break
      case 'disposition':
        comparison = a.disposition.localeCompare(b.disposition)
        break
      case 'size':
        comparison = a.size - b.size
        break
      case 'floor':
        comparison = a.floor - b.floor
        break
      case 'price':
        comparison = a.price - b.price
        break
    }

    return sortDirection === 'asc' ? comparison : -comparison
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg">
            Volný
          </span>
        )
      case 'reserved':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-lg">
            Rezervován
          </span>
        )
      case 'sold':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-lg">
            Prodáno
          </span>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-grey-100">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC02932.jpg"
            alt="Byty III. etapy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-32">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            {pageData?.heroBadge || "III. Etapa v prodeji"}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {pageData?.heroTitle || "Dostupné byty"}<br />
            <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">{pageData?.heroTitleHighlight || "III. etapa"}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-light mb-8 leading-relaxed">
            {pageData?.heroDescription ? pageData.heroDescription.replace('{count}', totalAvailableCount.toString()) : `Vyberte si z ${totalAvailableCount} dostupných bytů s dispozicemi 1+kk až 5+kk. Moderní bydlení v energetické třídě B.`}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">{totalAvailableCount}</div>
              <div className="text-xs text-grey-600 font-medium">Volných bytů</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">{pageData?.statDispositions || "1-5+kk"}</div>
              <div className="text-xs text-grey-600 font-medium">{pageData?.statDispositionsLabel || "Dispozice"}</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">{pageData?.statArea || "32-115"}</div>
              <div className="text-xs text-grey-600 font-medium">{pageData?.statAreaLabel || "m² plocha"}</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">{pageData?.statEnergyClass || "B"}</div>
              <div className="text-xs text-grey-600 font-medium">{pageData?.statEnergyClassLabel || "Energ. třída"}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gradient-to-br from-gold-primary to-gold-secondary sticky top-0 z-30 shadow-sm">
        <Container>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-semibold text-white uppercase tracking-wide">{pageData?.filterLabel || "Filtrovat:"}</span>

            {/* Disposition Filter */}
            <select
              value={selectedDisposition}
              onChange={(e) => setSelectedDisposition(e.target.value)}
              className="pl-4 pr-12 py-2 bg-white/20 border border-white/30 rounded-xl text-sm font-medium text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              <option value="all">Všechny dispozice</option>
              <option value="1+kk">1+kk</option>
              <option value="2+kk">2+kk</option>
              <option value="3+kk">3+kk</option>
              <option value="4+kk">4+kk</option>
              <option value="5+kk">5+kk</option>
            </select>

            {/* Floor Filter */}
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="pl-4 pr-12 py-2 bg-white/20 border border-white/30 rounded-xl text-sm font-medium text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              <option value="all">Všechna patra</option>
              <option value="1">1. patro</option>
              <option value="2">2. patro</option>
              <option value="3">3. patro</option>
              <option value="4">4. patro</option>
              <option value="5">5. patro</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-4 pr-12 py-2 bg-white/20 border border-white/30 rounded-xl text-sm font-medium text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              <option value="all">Všechny stavy</option>
              <option value="available">Volný</option>
              <option value="reserved">Rezervován</option>
              <option value="sold">Prodáno</option>
            </select>

            {/* Price Range Filter */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/30 rounded-xl">
              <span className="text-sm font-medium text-white whitespace-nowrap">Cena do:</span>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={100000}
                value={priceRangeSlider}
                onChange={(e) => setPriceRangeSlider(Number(e.target.value))}
                className="w-32 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-sm font-bold text-white whitespace-nowrap">
                {(priceRangeSlider / 1000000).toFixed(1)} mil. Kč
              </span>
            </div>

            {/* Reset Button */}
            {(selectedDisposition !== 'all' || selectedFloor !== 'all' || selectedStatus !== 'all' || priceRangeSlider < maxPrice) && (
              <button
                onClick={() => {
                  setSelectedDisposition('all')
                  setSelectedFloor('all')
                  setSelectedStatus('all')
                  setPriceRangeSlider(maxPrice)
                }}
                className="px-4 py-2 text-sm font-medium text-white hover:bg-white/20 rounded-xl transition-colors"
              >
                Zrušit filtry
              </button>
            )}

            <div className="text-sm text-white/90 ml-auto">
              Zobrazeno: <span className="font-semibold">{sortedApartments.length}</span> bytů
            </div>
          </div>
        </Container>
      </section>

      {/* Apartments Table */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          {sortedApartments.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden border border-grey-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-light-grey border-b border-grey-200">
                        <th className="px-6 py-4 text-left">
                          <span className="text-sm font-semibold text-grey-600 uppercase tracking-wide">Bytový dům</span>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <button
                            onClick={() => handleSort('number')}
                            className="flex items-center gap-2 pr-4 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
                          >
                            Číslo bytu
                            {sortField === 'number' && (
                              <svg className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <button
                            onClick={() => handleSort('disposition')}
                            className="flex items-center gap-2 pr-4 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
                          >
                            Dispozice
                            {sortField === 'disposition' && (
                              <svg className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <button
                            onClick={() => handleSort('size')}
                            className="flex items-center gap-2 pr-4 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
                          >
                            Rozloha
                            {sortField === 'size' && (
                              <svg className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <div className="text-sm font-semibold text-grey-600 uppercase tracking-wide">
                            <div>Balkon/</div>
                            <div>Zahrádka</div>
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <button
                            onClick={() => handleSort('floor')}
                            className="flex items-center gap-2 pr-4 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
                          >
                            Patro
                            {sortField === 'floor' && (
                              <svg className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <button
                            onClick={() => handleSort('price')}
                            className="flex items-center gap-2 pr-4 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
                          >
                            Cena
                            <svg className={`w-4 h-4 transition-transform ${sortField === 'price' && sortDirection === 'desc' ? 'rotate-180' : ''} ${sortField === 'price' ? 'text-gold-primary' : 'text-grey-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <span className="text-sm font-semibold text-grey-600 uppercase tracking-wide">Dostupnost</span>
                        </th>
                        <th className="px-6 py-4 text-right">
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-grey-200">
                      {sortedApartments.map((apt, index) => (
                        <tr
                          key={apt.id}
                          className={`hover:bg-light-grey transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-grey-50'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className="text-base font-semibold text-dark">{apt.building}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base font-bold text-dark">Byt {apt.number}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base font-semibold text-gold-primary">{apt.disposition}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base text-grey-800">{formatNumber(apt.size)} m²</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base text-grey-800">
                              {apt.balcony > 0 ? `${formatNumber(apt.balcony)} m²` : '—'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base text-grey-800">{apt.floor}. NP</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-base font-bold text-dark whitespace-nowrap">
                              {apt.price.toLocaleString('cs-CZ')} Kč
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(apt.status)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {apt.status !== 'sold' && (
                              <Link href={`/byty/${generateApartmentSlug(apt.building, apt.number)}`}>
                                <button className="px-4 py-2 bg-gold-primary hover:bg-gold-secondary text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                                  Detail
                                </button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {sortedApartments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white rounded-2xl p-6 shadow-md border border-grey-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-grey-600 mb-1">{apt.building}</div>
                        <div className="text-lg font-bold text-dark">Byt {apt.number}</div>
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
                      <div>
                        <div className="text-xs text-grey-600 mb-1">Balkon/Zahrádka</div>
                        <div className="text-base font-semibold text-dark">
                          {apt.balcony > 0 ? `${formatNumber(apt.balcony)} m²` : '—'}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-grey-600 mb-1">Cena</div>
                      <div className="text-xl font-bold text-dark">
                        {apt.price.toLocaleString('cs-CZ')} Kč
                      </div>
                    </div>

                    {apt.status !== 'sold' && (
                      <Link href={`/byty/${generateApartmentSlug(apt.building, apt.number)}`}>
                        <button className="w-full px-4 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300">
                          Detail bytu
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-grey-200 flex items-center justify-center">
                <svg className="w-10 h-10 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3">Žádné byty nenalezeny</h3>
              <p className="text-grey-600 mb-6">Zkuste změnit filtry nebo je zrušte úplně</p>
              <button
                onClick={() => {
                  setSelectedDisposition('all')
                  setSelectedFloor('all')
                  setSelectedStatus('all')
                  setPriceRangeSlider(maxPrice)
                }}
                className="px-6 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300"
              >
                Zobrazit všechny byty
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs md:text-sm text-gold-primary font-semibold uppercase tracking-[0.2em] mb-4 block">
              Interiéry bytů
            </span>
            <h2 className="text-xl sm:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-[1.15] tracking-tight">
              Ukázka <span className="text-gradient">dokončených bytů</span>
            </h2>
            <p className="text-lg text-grey-600 font-light leading-relaxed">
              Prohlédněte si reálné fotografie dokončených bytů z I. a II. etapy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const showroomImages = [
                { src: '/images/DSC02727.jpg', title: 'Obývací pokoj s kuchyní' },
                { src: '/images/DSC02745.jpg', title: 'Moderní interiér' },
                { src: '/images/DSC02913.jpg', title: 'Detail kuchyně' },
                { src: '/images/DSC02870.jpg', title: 'Koupelna' },
                { src: '/images/DSC02756.jpg', title: 'Obývací prostor' },
                { src: '/images/DSC02819.jpg', title: 'Jídelní část' },
              ];
              return showroomImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedImage(image.src);
                    setCurrentGalleryShowroom(showroomImages.map(img => img.src));
                    setCurrentIndexShowroom(index);
                  }}
                  className="relative h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
              ))
            })()}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/DSC02932.jpg"
            alt="Rezidence pozadí"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-6 py-2.5 text-xs md:text-sm text-white font-semibold uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full border border-white/20 mb-6">
              Kontakt
            </span>

            <h2 className="text-xl sm:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
              Nenašli jste vhodný <span className="text-gradient">byt?</span>
            </h2>

            <p className="text-lg md:text-xl text-white/90 font-light mb-12 leading-relaxed">
              Kontaktujte nás a pomůžeme vám najít ideální byt podle vašich představ
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

            <div className="flex justify-center">
              <Link href="/kontakt">
                <button className="px-8 py-4 bg-white text-gold-primary font-semibold rounded-2xl hover:bg-grey-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Kontaktní formulář
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-10"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {currentGalleryShowroom.length > 0 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = currentIndexShowroom === 0 ? currentGalleryShowroom.length - 1 : currentIndexShowroom - 1;
                  setCurrentIndexShowroom(newIndex);
                  setSelectedImage(currentGalleryShowroom[newIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = currentIndexShowroom === currentGalleryShowroom.length - 1 ? 0 : currentIndexShowroom + 1;
                  setCurrentIndexShowroom(newIndex);
                  setSelectedImage(currentGalleryShowroom[newIndex]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium z-10">
                {currentIndexShowroom + 1} / {currentGalleryShowroom.length}
              </div>
            </>
          )}

          <div className="relative w-full max-w-6xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Detail fotografie"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  )
}
