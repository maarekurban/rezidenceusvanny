'use client'

import { useState } from 'react'
import Link from 'next/link'

// Helper function to generate apartment slug
const generateApartmentSlug = (building: string, number: string): string => {
  const buildingSlug = building.toLowerCase() // bd-b1, bd-a1, bd-a2
  const numberSlug = number.replace('.', '-') // 1.04 -> 1-04
  return `${buildingSlug}-${numberSlug}`
}

type Apartment = {
  _id: string
  number: string
  building: string
  disposition: string
  floorArea: number
  price: number
  floor: number
  status: string
  outdoorSpaces?: { type: string; area: number }[]
}

type Props = {
  apartments: Apartment[]
}

export default function ApartmentsTable({ apartments }: Props) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  // Calculate total outdoor space
  const getTotalOutdoorArea = (spaces?: { type: string; area: number }[]) => {
    if (!spaces || spaces.length === 0) return 0
    return spaces.reduce((sum, space) => sum + space.area, 0)
  }

  // Sort apartments
  const sortedApartments = [...apartments].sort((a, b) => {
    if (!sortOrder) return 0
    if (sortOrder === 'asc') return a.price - b.price
    return b.price - a.price
  })

  const handleSort = () => {
    if (sortOrder === null) setSortOrder('asc')
    else if (sortOrder === 'asc') setSortOrder('desc')
    else setSortOrder(null)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Číslo bytu
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              BD
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dispozice
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Podlahová plocha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Venkovní prostory
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patro
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none group relative"
              onClick={handleSort}
            >
              <div className="flex items-center gap-2">
                <span>Cena</span>
                <span
                  className={`text-sm transition-all pr-4 ${
                    sortOrder === 'asc'
                      ? 'text-blue-600 rotate-180'
                      : sortOrder === 'desc'
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  ▼
                </span>
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Detail
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedApartments.map((apt) => (
            <tr key={apt._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {apt.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {apt.building}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {apt.disposition}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {apt.floorArea} m²
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getTotalOutdoorArea(apt.outdoorSpaces).toFixed(2)} m²
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {apt.floor}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {apt.price.toLocaleString('cs-CZ')} Kč
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {apt.status !== 'sold' ? (
                  <Link
                    href={`/byty/${generateApartmentSlug(apt.building, apt.number)}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Detail
                  </Link>
                ) : (
                  <span className="text-gray-400">Prodáno</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

