'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'

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

// Fallback apartments data (will be replaced by Sanity data)
const apartmentsFallback = [
  { id: 1, number: '1.01', building: 'BD-B1', disposition: '2+kk', size: 47.1, balcony: 39.08, floor: 1, price: 4544640, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 40.04 },
  { id: 2, number: '1.02', building: 'BD-B1', disposition: '2+kk', size: 55.55, balcony: 112.12, floor: 1, price: 5558060, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 1.02.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 5.27}, {'number': 2, 'name': 'Toaleta', 'area': 1.51}, {'number': 3, 'name': 'Koupelna', 'area': 2.96}, {'number': 4, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 30.14}, {'number': 5, 'name': 'Lo\u017enice', 'area': 12.56}], floorArea: 52.44, outdoorSpaces: [{'type': 'Terasa', 'area': 7.95}, {'type': 'Zahrada', 'area': 112.12}], usableArea: 44.57 },
  { id: 3, number: '1.03', building: 'BD-B1', disposition: '5+kk', size: 101.61, balcony: 139.3, floor: 1, price: 9766020, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 1.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.42}, {'number': 2, 'name': 'Toaleta', 'area': 1.63}, {'number': 3, 'name': 'Koupelna', 'area': 5.31}, {'number': 4, 'name': 'Pokoj', 'area': 10.93}, {'number': 5, 'name': 'Lo\u017enice', 'area': 14.32}, {'number': 6, 'name': 'Pokoj', 'area': 12.3}, {'number': 7, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.22}, {'number': 8, 'name': 'Pokoj', 'area': 11.54}], floorArea: 93.67, outdoorSpaces: [{'type': 'Terasa', 'area': 5.41}, {'type': 'Terasa', 'area': 7.95}, {'type': 'Zahrada', 'area': 139.3}], usableArea: 79.62 },
  { id: 4, number: '2.01', building: 'BD-B1', disposition: '2+kk', size: 51.75, balcony: 8.07, floor: 2, price: 4761000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.99 },
  { id: 5, number: '2.02', building: 'BD-B1', disposition: '1+kk', size: 33.32, balcony: 5.68, floor: 2, price: 3265360, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.32 },
  { id: 6, number: '2.03', building: 'BD-B1', disposition: '3+kk', size: 69.0, balcony: 7.95, floor: 2, price: 6348000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 58.65 },
  { id: 7, number: '2.04', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 2, price: 6445520, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 2.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Lo\u017enice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 8, number: '2.05', building: 'BD-B1', disposition: '1+kk', size: 29.83, balcony: 5.52, floor: 2, price: 2923340, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 25.36 },
  { id: 9, number: '2.06', building: 'BD-B1', disposition: '2+kk', size: 49.52, balcony: 8.08, floor: 2, price: 4555840, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 42.09 },
  { id: 10, number: '3.01', building: 'BD-B1', disposition: '2+kk', size: 51.75, balcony: 6.71, floor: 3, price: 4864500, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.99 },
  { id: 11, number: '3.02', building: 'BD-B1', disposition: '1+kk', size: 33.32, balcony: 4.45, floor: 3, price: 3245360, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.32 },
  { id: 12, number: '3.03', building: 'BD-B1', disposition: '3+kk', size: 69.0, balcony: 7.95, floor: 3, price: 6486000, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 58.65 },
  { id: 13, number: '3.04', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 3, price: 6585640, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 3.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Lo\u017enice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 14, number: '3.05', building: 'BD-B1', disposition: '1+kk', size: 29.83, balcony: 4.45, floor: 3, price: 3350000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 25.36 },
  { id: 15, number: '3.06', building: 'BD-B1', disposition: '2+kk', size: 49.52, balcony: 6.71, floor: 3, price: 4654880, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 42.09 },
  { id: 16, number: '4.01', building: 'BD-B1', disposition: '4+kk', size: 86.78, balcony: 8.07, floor: 4, price: 7983760, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 4.01.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 10.54}, {'number': 2, 'name': 'Toaleta', 'area': 1.6}, {'number': 3, 'name': 'Komora', 'area': 1.56}, {'number': 4, 'name': 'Pokoj', 'area': 10.9}, {'number': 5, 'name': 'Lo\u017enice', 'area': 13.19}, {'number': 6, 'name': 'Pokoj', 'area': 9.96}, {'number': 7, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 26.39}, {'number': 8, 'name': 'Koupelna', 'area': 6.05}], floorArea: 80.19, outdoorSpaces: [{'type': 'Balkon', 'area': 5.52}, {'type': 'Balkon', 'area': 8.07}], usableArea: 68.16 },
  { id: 17, number: '4.02', building: 'BD-B1', disposition: '3+kk', size: 69.0, balcony: 7.95, floor: 4, price: 6624000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 58.65 },
  { id: 18, number: '4.03', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 4, price: 6725760, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 4.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Lo\u017enice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 19, number: '4.04', building: 'BD-B1', disposition: '1+kk', size: 29.82, balcony: 5.52, floor: 4, price: 2922360, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 25.35 },
  { id: 20, number: '4.05', building: 'BD-B1', disposition: '2+kk', size: 49.52, balcony: 8.08, floor: 4, price: 4753920, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 42.09 },
  { id: 21, number: '1.23', building: 'BD-A1', disposition: '4+kk', size: 81.9, balcony: 118.24, floor: 1, price: 7889520, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 1.23.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 3.61}, {'number': 2, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 26.28}, {'number': 3, 'name': 'Chodba', 'area': 5.41}, {'number': 4, 'name': 'Pokoj', 'area': 11.18}, {'number': 5, 'name': 'Pokoj', 'area': 8.49}, {'number': 6, 'name': 'Lo\u017enice', 'area': 12.9}, {'number': 7, 'name': 'Koupelna', 'area': 6.13}, {'number': 8, 'name': 'Toaleta', 'area': 1.56}], floorArea: 75.56, outdoorSpaces: [{'type': 'Zahrada', 'area': 118.24}, {'type': 'Terasa', 'area': 13.77}], usableArea: 64.23 },
  { id: 22, number: '1.22', building: 'BD-A1', disposition: '1+kk', size: 33.1, balcony: 26.44, floor: 1, price: 3323120, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.14 },
  { id: 23, number: '1.21', building: 'BD-A1', disposition: '1+kk', size: 32.95, balcony: 17.86, floor: 1, price: 3282680, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.01 },
  { id: 24, number: '2.09', building: 'BD-A1', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 2, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 25, number: '2.10', building: 'BD-A1', disposition: '2+kk', size: 57.75, balcony: 8.72, floor: 2, price: 5428500, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 49.09 },
  { id: 26, number: '2.11', building: 'BD-A1', disposition: '4+kk', size: 87.84, balcony: 8.1, floor: 2, price: 7905600, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 2.11.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Pokoj', 'area': 11.32}, {'number': 3, 'name': 'Pokoj', 'area': 13.32}, {'number': 4, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 23.75}, {'number': 5, 'name': 'Lo\u017enice', 'area': 14.87}, {'number': 6, 'name': 'Toaleta', 'area': 1.31}, {'number': 7, 'name': 'Koupelna', 'area': 3.4}], floorArea: 81.61, outdoorSpaces: [{'type': 'Balkon', 'area': 6.03}, {'type': 'Balkon', 'area': 8.1}], usableArea: 69.37 },
  { id: 27, number: '2.12', building: 'BD-A1', disposition: '2+kk', size: 54.29, balcony: 5.66, floor: 2, price: 4994680, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 46.15 },
  { id: 28, number: '3.09', building: 'BD-A1', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 3, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 29, number: '3.10', building: 'BD-A1', disposition: '2+kk', size: 57.36, balcony: 8.72, floor: 3, price: 5506560, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 3.10.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Lo\u017enice', 'area': 12.22}, {'number': 5, 'name': '\u0160atna', 'area': 3.49}], floorArea: 53.76, outdoorSpaces: [{'type': 'Balkon', 'area': 8.72}], usableArea: 45.70 },
  { id: 30, number: '3.11', building: 'BD-A1', disposition: '2+kk', size: 46.52, balcony: 8.1, floor: 3, price: 4465920, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 39.54 },
  { id: 31, number: '3.12', building: 'BD-A1', disposition: '1+kk', size: 47.3, balcony: 7.62, floor: 3, price: 4635400, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 40.20 },
  { id: 32, number: '3.13', building: 'BD-A1', disposition: '1+kk', size: 39.97, balcony: 4.45, floor: 3, price: 3917060, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 33.97 },
  { id: 33, number: '4.09', building: 'BD-A1', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 4, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 34, number: '4.10', building: 'BD-A1', disposition: '2+kk', size: 57.36, balcony: 9.0, floor: 4, price: 5621280, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 4.10.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Lo\u017enice', 'area': 12.22}, {'number': 5, 'name': '\u0160atna', 'area': 3.49}], floorArea: 53.77, outdoorSpaces: [{'type': 'Balkon', 'area': 9.0}], usableArea: 45.70 },
  { id: 35, number: '4.11', building: 'BD-A1', disposition: '4+kk', size: 87.46, balcony: 8.1, floor: 4, price: 8221240, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 4.11.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Pokoj', 'area': 11.32}, {'number': 3, 'name': 'Pokoj', 'area': 13.32}, {'number': 4, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 23.75}, {'number': 5, 'name': 'Lo\u017enice', 'area': 14.87}, {'number': 6, 'name': 'Toaleta', 'area': 1.31}, {'number': 7, 'name': 'Koupelna', 'area': 3.4}], floorArea: 81.61, outdoorSpaces: [{'type': 'Balkon', 'area': 6.12}, {'type': 'Balkon', 'area': 8.1}], usableArea: 69.37 },
  { id: 36, number: '4.12', building: 'BD-A1', disposition: '2+kk', size: 54.49, balcony: 5.66, floor: 4, price: 5122060, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 46.32 },
  { id: 37, number: '1.07', building: 'BD-A2', disposition: '1+kk', size: 32.95, balcony: 17.6, floor: 1, price: 3281900, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.01 },
  { id: 38, number: '1.06', building: 'BD-A2', disposition: '1+kk', size: 33.04, balcony: 26.14, floor: 1, price: 3316340, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.08 },
  { id: 39, number: '1.05', building: 'BD-A2', disposition: '4+kk', size: 80.64, balcony: 110.3, floor: 1, price: 7749780, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 1.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 3.61}, {'number': 2, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 26.27}, {'number': 3, 'name': 'Chodba', 'area': 5.41}, {'number': 4, 'name': 'Pokoj', 'area': 10.92}, {'number': 5, 'name': 'Pokoj', 'area': 8.49}, {'number': 6, 'name': 'Lo\u017enice', 'area': 12.9}, {'number': 7, 'name': 'Koupelna', 'area': 6.13}, {'number': 8, 'name': 'Toaleta', 'area': 1.38}], floorArea: 75.11, outdoorSpaces: [{'type': 'Zahrada', 'area': 110.3}, {'type': 'Terasa', 'area': 13.75}], usableArea: 63.84 },
  { id: 40, number: '2.03', building: 'BD-A2', disposition: '2+kk', size: 54.37, balcony: 5.66, floor: 2, price: 5002040, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 46.21 },
  { id: 41, number: '2.04', building: 'BD-A2', disposition: '4+kk', size: 87.47, balcony: 6.12, floor: 2, price: 7872300, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 2.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Koupelna', 'area': 3.4}, {'number': 3, 'name': 'Toaleta', 'area': 1.56}, {'number': 4, 'name': 'Lo\u017enice', 'area': 14.87}, {'number': 5, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 23.49}, {'number': 6, 'name': 'Pokoj', 'area': 13.32}, {'number': 7, 'name': 'Pokoj', 'area': 11.7}], floorArea: 81.98, outdoorSpaces: [{'type': 'Balkon', 'area': 8.39}, {'type': 'Balkon', 'area': 6.12}], usableArea: 69.68 },
  { id: 42, number: '2.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 2, price: 5428500, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 49.09 },
  { id: 43, number: '2.06', building: 'BD-A2', disposition: '2+kk', size: 50.75, balcony: 6.51, floor: 2, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 44, number: '3.03', building: 'BD-A2', disposition: '3+kk', size: 71.77, balcony: 4.45, floor: 3, price: 6746380, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 3.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 9.55}, {'number': 2, 'name': 'Lo\u017enice', 'area': 12.94}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.16}, {'number': 4, 'name': '\u0160atna', 'area': 2.12}, {'number': 5, 'name': 'Pokoj', 'area': 10.55}, {'number': 6, 'name': 'Koupelna', 'area': 5.49}, {'number': 7, 'name': 'Toaleta', 'area': 1.35}], floorArea: 66.16, outdoorSpaces: [{'type': 'Balkon', 'area': 4.45}], usableArea: 56.24 },
  { id: 45, number: '3.04', building: 'BD-A2', disposition: '3+kk', size: 71.48, balcony: 7.62, floor: 3, price: 6572080, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 60.76 },
  { id: 46, number: '3.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 3, price: 5544000, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 3.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Lo\u017enice', 'area': 12.6}, {'number': 5, 'name': '\u0160atna', 'area': 3.49}], floorArea: 54.15, outdoorSpaces: [{'type': 'Balkon', 'area': 9.01}], usableArea: 46.03 },
  { id: 47, number: '3.06', building: 'BD-A2', disposition: '2+kk', size: 50.75, balcony: 6.5, floor: 3, price: 4770500, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 48, number: '4.03', building: 'BD-A2', disposition: '2+kk', size: 54.37, balcony: 5.66, floor: 4, price: 5219520, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 4.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 6.22}, {'number': 2, 'name': 'Lo\u017enice', 'area': 12.05}, {'number': 3, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 26.66}, {'number': 4, 'name': 'Koupelna + WC', 'area': 6.3}], floorArea: 51.24, outdoorSpaces: [{'type': 'Balkon', 'area': 5.66}], usableArea: 43.55 },
  { id: 49, number: '4.04', building: 'BD-A2', disposition: '4+kk', size: 87.47, balcony: 6.12, floor: 4, price: 8047240, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 4.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Koupelna', 'area': 3.4}, {'number': 3, 'name': 'Toaleta', 'area': 1.56}, {'number': 4, 'name': 'Lo\u017enice', 'area': 14.88}, {'number': 5, 'name': 'Ob\u00fdvac\u00ed pokoj + KK', 'area': 23.49}, {'number': 6, 'name': 'Pokoj', 'area': 13.32}, {'number': 7, 'name': 'Pokoj', 'area': 11.7}], floorArea: 81.99, outdoorSpaces: [{'type': 'Balkon', 'area': 8.39}, {'type': 'Balkon', 'area': 6.12}], usableArea: 69.69 },
  { id: 50, number: '4.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 4, price: 5659500, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 49.09 },
  { id: 51, number: '4.06', building: 'BD-A2', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 4, price: 4872000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 }
]

type SortField = 'number' | 'disposition' | 'size' | 'floor' | 'price'
type SortDirection = 'asc' | 'desc'

export default function BytyPage() {
  // State for apartments from Sanity
  const [apartments, setApartments] = useState(apartmentsFallback)
  const [loading, setLoading] = useState(true)

  const [selectedDisposition, setSelectedDisposition] = useState<string>('all')
  const [selectedFloor, setSelectedFloor] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('number')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Fetch apartments from Sanity
  useEffect(() => {
    async function fetchApartments() {
      try {
        const data = await client.fetch(`
          *[_type == "apartment"] | order(number asc) {
            _id,
            number,
            building,
            floor,
            disposition,
            floorArea,
            usableArea,
            price,
            status,
            rooms,
            outdoorSpaces[] {
              type,
              area
            }
          }
        `, {}, { cache: 'no-store' })
        
        // Transform Sanity data to match original format
        const transformed = data.map((apt: any, index: number) => ({
          id: index + 1,
          number: apt.number,
          building: apt.building,
          disposition: apt.disposition,
          size: apt.floorArea,
          balcony: getTotalOutdoorArea(apt.outdoorSpaces),
          floor: apt.floor,
          price: apt.price,
          status: apt.status,
          floorPlanPath: null, // We don't need this for listing
          rooms: apt.rooms || [],
          floorArea: apt.floorArea,
          outdoorSpaces: apt.outdoorSpaces || [],
          usableArea: apt.usableArea
        }))
        
        setApartments(transformed)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching apartments:', error)
        setLoading(false)
      }
    }
    
    fetchApartments()
  }, [])
  
  // Calculate min and max prices
  const minPrice = Math.min(...apartments.map(apt => apt.price))
  const maxPrice = Math.max(...apartments.map(apt => apt.price))
  const [priceRangeSlider, setPriceRangeSlider] = useState<number>(maxPrice)

  // Update price range when apartments load
  useEffect(() => {
    if (!loading && apartments.length > 0) {
      const max = Math.max(...apartments.map(apt => apt.price))
      setPriceRangeSlider(max)
    }
  }, [loading, apartments])

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
            Vyberte si z {totalAvailableCount} dostupných bytů s dispozicemi 1+kk až 5+kk.
            Moderní bydlení v energetické třídě B.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-primary mb-1">{totalAvailableCount}</div>
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
      <section className="py-8 bg-gradient-to-br from-gold-primary to-gold-secondary sticky top-0 z-30 shadow-sm">
        <Container>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-semibold text-white uppercase tracking-wide">Filtrovat:</span>

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
              <option value="sold">Prodán</option>
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
                            <span className="text-base text-grey-800">{apt.size} m²</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-base text-grey-800">
                              {apt.balcony > 0 ? `${apt.balcony} m²` : '—'}
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
                        <div className="text-base font-semibold text-dark">{apt.size} m²</div>
                      </div>
                      <div>
                        <div className="text-xs text-grey-600 mb-1">Balkon/Zahrádka</div>
                        <div className="text-base font-semibold text-dark">
                          {apt.balcony > 0 ? `${apt.balcony} m²` : '—'}
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
                onClick={() => setSelectedImage(image.src)}
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
