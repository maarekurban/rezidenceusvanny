'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { useState } from 'react'

// Sample apartment data for III. Etapa (expanded dataset)
const apartments = [
  // 1. patro
  { id: 1, number: '3.01', disposition: '1+kk', size: 32, floor: 1, price: 2_890_000, status: 'available', balcony: false },
  { id: 2, number: '3.02', disposition: '2+kk', size: 52, floor: 1, price: 4_680_000, status: 'available', balcony: true },
  { id: 3, number: '3.03', disposition: '2+kk', size: 58, floor: 1, price: 5_220_000, status: 'available', balcony: true },
  { id: 4, number: '3.04', disposition: '3+kk', size: 72, floor: 1, price: 6_480_000, status: 'reserved', balcony: true },
  { id: 5, number: '3.05', disposition: '1+kk', size: 34, floor: 1, price: 3_060_000, status: 'available', balcony: false },
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

type SortField = 'number' | 'disposition' | 'size' | 'floor' | 'price'
type SortDirection = 'asc' | 'desc'

export default function BytyPage() {
  const [selectedDisposition, setSelectedDisposition] = useState<string>('all')
  const [selectedFloor, setSelectedFloor] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('number')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Filter apartments
  const filteredApartments = apartments.filter(apt => {
    if (selectedDisposition !== 'all' && apt.disposition !== selectedDisposition) return false
    if (selectedFloor !== 'all' && apt.floor.toString() !== selectedFloor) return false
    if (selectedStatus !== 'all' && apt.status !== selectedStatus) return false
    if (priceRange !== 'all') {
      if (priceRange === 'low' && apt.price > 5_000_000) return false
      if (priceRange === 'medium' && (apt.price <= 5_000_000 || apt.price > 8_000_000)) return false
      if (priceRange === 'high' && apt.price <= 8_000_000) return false
    }
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

  const availableCount = filteredApartments.filter(apt => apt.status === 'available').length

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
            Prodán
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
            src="/images/DSC02841.jpg"
            alt="Byty III. etapy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <Container className="relative z-10 py-32">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            III. Etapa v prodeji
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Dostupné byty<br />
            <span className="text-gradient bg-gradient-to-r from-gold-light to-gold-primary bg-clip-text text-transparent">III. etapa</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 font-light mb-8 leading-relaxed">
            Vyberte si z {availableCount} dostupných bytů s dispozicemi 1+kk až 5+kk.
            Moderní bydlení v energetické třídě B.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">{availableCount}</div>
              <div className="text-xs text-grey-600 font-medium">Volných bytů</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">1-5+kk</div>
              <div className="text-xs text-grey-600 font-medium">Dispozice</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">32-115</div>
              <div className="text-xs text-grey-600 font-medium">m² plocha</div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">B</div>
              <div className="text-xs text-grey-600 font-medium">Energ. třída</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-grey-200 sticky top-0 z-30 shadow-sm">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-semibold text-grey-600 uppercase tracking-wide">Filtrovat:</span>

              {/* Disposition Filter */}
              <select
                value={selectedDisposition}
                onChange={(e) => setSelectedDisposition(e.target.value)}
                className="px-4 py-2 bg-grey-100 border border-grey-300 rounded-xl text-sm font-medium text-dark hover:bg-grey-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-primary"
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
                className="px-4 py-2 bg-grey-100 border border-grey-300 rounded-xl text-sm font-medium text-dark hover:bg-grey-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-primary"
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
                className="px-4 py-2 bg-grey-100 border border-grey-300 rounded-xl text-sm font-medium text-dark hover:bg-grey-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-primary"
              >
                <option value="all">Všechny stavy</option>
                <option value="available">Volný</option>
                <option value="reserved">Rezervován</option>
                <option value="sold">Prodán</option>
              </select>

              {/* Price Range Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 bg-grey-100 border border-grey-300 rounded-xl text-sm font-medium text-dark hover:bg-grey-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-primary"
              >
                <option value="all">Všechny ceny</option>
                <option value="low">Do 5 mil. Kč</option>
                <option value="medium">5-8 mil. Kč</option>
                <option value="high">Nad 8 mil. Kč</option>
              </select>

              {/* Reset Button */}
              {(selectedDisposition !== 'all' || selectedFloor !== 'all' || selectedStatus !== 'all' || priceRange !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedDisposition('all')
                    setSelectedFloor('all')
                    setSelectedStatus('all')
                    setPriceRange('all')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gold-primary hover:text-gold-secondary transition-colors"
                >
                  Zrušit filtry
                </button>
              )}
            </div>

            <div className="text-sm text-grey-600">
              Zobrazeno: <span className="font-semibold text-dark">{sortedApartments.length}</span> bytů
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
                          <button
                            onClick={() => handleSort('number')}
                            className="flex items-center gap-2 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
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
                            className="flex items-center gap-2 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
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
                            className="flex items-center gap-2 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
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
                          <button
                            onClick={() => handleSort('floor')}
                            className="flex items-center gap-2 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
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
                            className="flex items-center gap-2 text-sm font-semibold text-grey-600 uppercase tracking-wide hover:text-gold-primary transition-colors"
                          >
                            Cena
                            {sortField === 'price' && (
                              <svg className={`w-4 h-4 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left">
                          <span className="text-sm font-semibold text-grey-600 uppercase tracking-wide">Dostupnost</span>
                        </th>
                        <th className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-grey-600 uppercase tracking-wide">Akce</span>
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
                            <span className="text-base font-bold text-dark">Byt {apt.number}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base font-semibold text-gold-primary">{apt.disposition}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base text-grey-800">{apt.size} m²</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base text-grey-800">{apt.floor}. NP</span>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-base font-bold text-dark">
                                {apt.price.toLocaleString('cs-CZ')} Kč
                              </div>
                              <div className="text-xs text-grey-600">
                                {Math.round(apt.price / apt.size).toLocaleString('cs-CZ')} Kč/m²
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(apt.status)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link href={`/byty/${apt.id}`}>
                              <button className="px-4 py-2 bg-gold-primary hover:bg-gold-secondary text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                                Detail
                              </button>
                            </Link>
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
                        <div className="text-lg font-bold text-dark mb-1">Byt {apt.number}</div>
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

                    <div className="mb-4">
                      <div className="text-xs text-grey-600 mb-1">Cena</div>
                      <div className="text-xl font-bold text-dark">
                        {apt.price.toLocaleString('cs-CZ')} Kč
                      </div>
                      <div className="text-xs text-grey-600">
                        {Math.round(apt.price / apt.size).toLocaleString('cs-CZ')} Kč/m²
                      </div>
                    </div>

                    <Link href={`/byty/${apt.id}`}>
                      <button className="w-full px-4 py-3 bg-gold-primary hover:bg-gold-secondary text-white font-semibold rounded-xl transition-all duration-300">
                        Detail bytu
                      </button>
                    </Link>
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
                  setPriceRange('all')
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
            {[
              { src: '/images/DSC02841.jpg', title: 'Obývací pokoj s kuchyní' },
              { src: '/images/DSC02745.jpg', title: 'Moderní interiér' },
              { src: '/images/DSC02913.jpg', title: 'Detail kuchyně' },
              { src: '/images/DSC02870.jpg', title: 'Koupelna' },
              { src: '/images/DSC02756.jpg', title: 'Obývací prostor' },
              { src: '/images/DSC02819.jpg', title: 'Jídelní část' },
            ].map((image, index) => (
              <div
                key={index}
                className="relative h-80 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-xl font-bold">{image.title}</h4>
                </div>
              </div>
            ))}
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <button className="px-8 py-4 bg-white text-gold-primary font-semibold rounded-2xl hover:bg-grey-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Kontaktní formulář
                </button>
              </Link>

              <Link href="/o-projektu">
                <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gold-primary font-semibold rounded-2xl transition-all duration-300">
                  Více o projektu
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
