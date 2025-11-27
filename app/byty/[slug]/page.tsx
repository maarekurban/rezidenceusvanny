import { notFound, redirect } from 'next/navigation'
import { getApartmentStatus } from '@/lib/getApartmentsWithStatus'
import ApartmentDetailClient from './ApartmentDetailClient'

// Helper function to generate apartment slug
const generateApartmentSlug = (building: string, number: string): string => {
  const buildingSlug = building.toLowerCase() // bd-b1, bd-a1, bd-a2
  const numberSlug = number.replace('.', '-') // 1.04 -> 1-04
  return `${buildingSlug}-${numberSlug}`
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

// Fallback apartments data
const apartmentsFallback: Apartment[] = [
  { id: 1, number: '1.01', building: 'BD-B1', disposition: '2+kk', size: 47.1, balcony: 39.08, floor: 1, price: 4544640, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 40.04 },
  { id: 2, number: '1.02', building: 'BD-B1', disposition: '2+kk', size: 55.55, balcony: 112.12, floor: 1, price: 5558060, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 1.02.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 5.27}, {'number': 2, 'name': 'Toaleta', 'area': 1.51}, {'number': 3, 'name': 'Koupelna', 'area': 2.96}, {'number': 4, 'name': 'Obývací pokoj + KK', 'area': 30.14}, {'number': 5, 'name': 'Ložnice', 'area': 12.56}], floorArea: 52.44, outdoorSpaces: [{'type': 'Terasa', 'area': 7.95}, {'type': 'Zahrada', 'area': 112.12}], usableArea: 44.57 },
  { id: 3, number: '1.03', building: 'BD-B1', disposition: '5+kk', size: 101.61, balcony: 139.3, floor: 1, price: 9766020, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 1.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.42}, {'number': 2, 'name': 'Toaleta', 'area': 1.63}, {'number': 3, 'name': 'Koupelna', 'area': 5.31}, {'number': 4, 'name': 'Pokoj', 'area': 10.93}, {'number': 5, 'name': 'Ložnice', 'area': 14.32}, {'number': 6, 'name': 'Pokoj', 'area': 12.3}, {'number': 7, 'name': 'Obývací pokoj + KK', 'area': 24.22}, {'number': 8, 'name': 'Pokoj', 'area': 11.54}], floorArea: 93.67, outdoorSpaces: [{'type': 'Terasa', 'area': 5.41}, {'type': 'Terasa', 'area': 7.95}, {'type': 'Zahrada', 'area': 139.3}], usableArea: 79.62 },
  { id: 4, number: '2.01', building: 'BD-B1', disposition: '2+kk', size: 51.75, balcony: 8.07, floor: 2, price: 4761000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.99 },
  { id: 5, number: '2.02', building: 'BD-B1', disposition: '1+kk', size: 33.32, balcony: 5.68, floor: 2, price: 3265360, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.32 },
  { id: 6, number: '2.03', building: 'BD-B1', disposition: '3+kk', size: 69.0, balcony: 7.95, floor: 2, price: 6348000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 58.65 },
  { id: 7, number: '2.04', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 2, price: 6445520, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 2.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Ložnice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 8, number: '2.05', building: 'BD-B1', disposition: '1+kk', size: 29.83, balcony: 5.52, floor: 2, price: 2923340, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 25.36 },
  { id: 9, number: '2.06', building: 'BD-B1', disposition: '2+kk', size: 49.52, balcony: 8.08, floor: 2, price: 4555840, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 42.09 },
  { id: 10, number: '3.01', building: 'BD-B1', disposition: '2+kk', size: 51.75, balcony: 6.71, floor: 3, price: 4864500, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.99 },
  { id: 11, number: '3.02', building: 'BD-B1', disposition: '1+kk', size: 33.32, balcony: 4.45, floor: 3, price: 3245360, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.32 },
  { id: 12, number: '3.03', building: 'BD-B1', disposition: '3+kk', size: 69.0, balcony: 7.95, floor: 3, price: 6486000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 58.65 },
  { id: 13, number: '3.04', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 3, price: 6585640, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 3.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Ložnice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 14, number: '3.05', building: 'BD-B1', disposition: '1+kk', size: 29.83, balcony: 4.45, floor: 3, price: 3350000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 25.36 },
  { id: 15, number: '3.06', building: 'BD-B1', disposition: '2+kk', size: 49.52, balcony: 6.71, floor: 3, price: 4654880, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 42.09 },
  { id: 16, number: '4.01', building: 'BD-B1', disposition: '4+kk', size: 86.78, balcony: 8.07, floor: 4, price: 7983760, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 4.01.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 10.54}, {'number': 2, 'name': 'Toaleta', 'area': 1.6}, {'number': 3, 'name': 'Komora', 'area': 1.56}, {'number': 4, 'name': 'Pokoj', 'area': 10.9}, {'number': 5, 'name': 'Ložnice', 'area': 13.19}, {'number': 6, 'name': 'Pokoj', 'area': 9.96}, {'number': 7, 'name': 'Obývací pokoj + KK', 'area': 26.39}, {'number': 8, 'name': 'Koupelna', 'area': 6.05}], floorArea: 80.19, outdoorSpaces: [{'type': 'Balkon', 'area': 5.52}, {'type': 'Balkon', 'area': 8.07}], usableArea: 68.16 },
  { id: 17, number: '4.02', building: 'BD-B1', disposition: '3+kk', size: 69.0, balcony: 7.95, floor: 4, price: 6624000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 58.65 },
  { id: 18, number: '4.03', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 4, price: 6725760, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 4.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Ložnice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 19, number: '4.04', building: 'BD-B1', disposition: '1+kk', size: 29.82, balcony: 5.52, floor: 4, price: 2922360, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 25.35 },
  { id: 20, number: '4.05', building: 'BD-B1', disposition: '2+kk', size: 49.52, balcony: 8.08, floor: 4, price: 4753920, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 42.09 },
  { id: 21, number: '1.23', building: 'BD-A1', disposition: '4+kk', size: 81.9, balcony: 118.24, floor: 1, price: 7889520, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 1.23.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 3.61}, {'number': 2, 'name': 'Obývací pokoj + KK', 'area': 26.28}, {'number': 3, 'name': 'Chodba', 'area': 5.41}, {'number': 4, 'name': 'Pokoj', 'area': 11.18}, {'number': 5, 'name': 'Pokoj', 'area': 8.49}, {'number': 6, 'name': 'Ložnice', 'area': 12.9}, {'number': 7, 'name': 'Koupelna', 'area': 6.13}, {'number': 8, 'name': 'Toaleta', 'area': 1.56}], floorArea: 75.56, outdoorSpaces: [{'type': 'Zahrada', 'area': 118.24}, {'type': 'Terasa', 'area': 13.77}], usableArea: 64.23 },
  { id: 22, number: '1.22', building: 'BD-A1', disposition: '1+kk', size: 33.1, balcony: 26.44, floor: 1, price: 3323120, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.14 },
  { id: 23, number: '1.21', building: 'BD-A1', disposition: '1+kk', size: 32.95, balcony: 17.86, floor: 1, price: 3282680, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.01 },
  { id: 24, number: '2.09', building: 'BD-A1', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 2, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 25, number: '2.10', building: 'BD-A1', disposition: '2+kk', size: 57.75, balcony: 8.72, floor: 2, price: 5428500, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 2.10.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.40}, {'number': 4, 'name': 'Ložnice', 'area': 12.22}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 53.77, outdoorSpaces: [{'type': 'Balkon', 'area': 8.72}], usableArea: 49.09 },
  { id: 26, number: '2.11', building: 'BD-A1', disposition: '4+kk', size: 87.84, balcony: 8.1, floor: 2, price: 7905600, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 2.11.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Pokoj', 'area': 11.32}, {'number': 3, 'name': 'Pokoj', 'area': 13.32}, {'number': 4, 'name': 'Obývací pokoj + KK', 'area': 23.75}, {'number': 5, 'name': 'Ložnice', 'area': 14.87}, {'number': 6, 'name': 'Toaleta', 'area': 1.31}, {'number': 7, 'name': 'Koupelna', 'area': 3.4}], floorArea: 81.61, outdoorSpaces: [{'type': 'Balkon', 'area': 6.03}, {'type': 'Balkon', 'area': 8.1}], usableArea: 69.37 },
  { id: 27, number: '2.12', building: 'BD-A1', disposition: '2+kk', size: 54.29, balcony: 5.66, floor: 2, price: 4994680, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 46.15 },
  { id: 28, number: '3.09', building: 'BD-A1', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 3, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 29, number: '3.10', building: 'BD-A1', disposition: '2+kk', size: 57.36, balcony: 8.72, floor: 3, price: 5506560, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 3.10.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Ložnice', 'area': 12.22}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 53.76, outdoorSpaces: [{'type': 'Balkon', 'area': 8.72}], usableArea: 45.70 },
  { id: 30, number: '3.11', building: 'BD-A1', disposition: '2+kk', size: 46.52, balcony: 8.1, floor: 3, price: 4465920, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 39.54 },
  { id: 31, number: '3.12', building: 'BD-A1', disposition: '1+kk', size: 47.3, balcony: 7.62, floor: 3, price: 4635400, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 40.20 },
  { id: 32, number: '3.13', building: 'BD-A1', disposition: '1+kk', size: 39.97, balcony: 4.45, floor: 3, price: 3917060, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 33.97 },
  { id: 33, number: '4.09', building: 'BD-A1', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 4, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 34, number: '4.10', building: 'BD-A1', disposition: '2+kk', size: 57.36, balcony: 9.0, floor: 4, price: 5621280, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 4.10.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Ložnice', 'area': 12.22}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 53.77, outdoorSpaces: [{'type': 'Balkon', 'area': 9.0}], usableArea: 45.70 },
  { id: 35, number: '4.11', building: 'BD-A1', disposition: '4+kk', size: 87.46, balcony: 8.1, floor: 4, price: 8221240, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 4.11.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Pokoj', 'area': 11.32}, {'number': 3, 'name': 'Pokoj', 'area': 13.32}, {'number': 4, 'name': 'Obývací pokoj + KK', 'area': 23.75}, {'number': 5, 'name': 'Ložnice', 'area': 14.87}, {'number': 6, 'name': 'Toaleta', 'area': 1.31}, {'number': 7, 'name': 'Koupelna', 'area': 3.4}], floorArea: 81.61, outdoorSpaces: [{'type': 'Balkon', 'area': 6.12}, {'type': 'Balkon', 'area': 8.1}], usableArea: 69.37 },
  { id: 36, number: '4.12', building: 'BD-A1', disposition: '2+kk', size: 54.49, balcony: 5.66, floor: 4, price: 5122060, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 46.32 },
  { id: 37, number: '1.07', building: 'BD-A2', disposition: '1+kk', size: 32.95, balcony: 17.6, floor: 1, price: 3281900, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.01 },
  { id: 38, number: '1.06', building: 'BD-A2', disposition: '1+kk', size: 33.04, balcony: 26.14, floor: 1, price: 3316340, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 28.08 },
  { id: 39, number: '1.05', building: 'BD-A2', disposition: '4+kk', size: 80.64, balcony: 110.3, floor: 1, price: 7749780, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 1.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 3.61}, {'number': 2, 'name': 'Obývací pokoj + KK', 'area': 26.27}, {'number': 3, 'name': 'Chodba', 'area': 5.41}, {'number': 4, 'name': 'Pokoj', 'area': 10.92}, {'number': 5, 'name': 'Pokoj', 'area': 8.49}, {'number': 6, 'name': 'Ložnice', 'area': 12.9}, {'number': 7, 'name': 'Koupelna', 'area': 6.13}, {'number': 8, 'name': 'Toaleta', 'area': 1.38}], floorArea: 75.11, outdoorSpaces: [{'type': 'Zahrada', 'area': 110.3}, {'type': 'Terasa', 'area': 13.75}], usableArea: 63.84 },
  { id: 40, number: '2.03', building: 'BD-A2', disposition: '2+kk', size: 54.37, balcony: 5.66, floor: 2, price: 5002040, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 46.21 },
  { id: 41, number: '2.04', building: 'BD-A2', disposition: '4+kk', size: 87.47, balcony: 6.12, floor: 2, price: 7872300, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 2.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Koupelna', 'area': 3.4}, {'number': 3, 'name': 'Toaleta', 'area': 1.56}, {'number': 4, 'name': 'Ložnice', 'area': 14.87}, {'number': 5, 'name': 'Obývací pokoj + KK', 'area': 23.49}, {'number': 6, 'name': 'Pokoj', 'area': 13.32}, {'number': 7, 'name': 'Pokoj', 'area': 11.7}], floorArea: 81.98, outdoorSpaces: [{'type': 'Balkon', 'area': 8.39}, {'type': 'Balkon', 'area': 6.12}], usableArea: 69.68 },
  { id: 42, number: '2.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 2, price: 5428500, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 2.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.40}, {'number': 4, 'name': 'Ložnice', 'area': 12.61}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 54.16, outdoorSpaces: [{'type': 'Balkon', 'area': 9.01}], usableArea: 49.09 },
  { id: 43, number: '2.06', building: 'BD-A2', disposition: '2+kk', size: 50.75, balcony: 6.51, floor: 2, price: 4669000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 44, number: '3.03', building: 'BD-A2', disposition: '3+kk', size: 71.77, balcony: 4.45, floor: 3, price: 6746380, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 3.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 9.55}, {'number': 2, 'name': 'Ložnice', 'area': 12.94}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.16}, {'number': 4, 'name': 'Šatna', 'area': 2.12}, {'number': 5, 'name': 'Pokoj', 'area': 10.55}, {'number': 6, 'name': 'Koupelna', 'area': 5.49}, {'number': 7, 'name': 'Toaleta', 'area': 1.35}], floorArea: 66.16, outdoorSpaces: [{'type': 'Balkon', 'area': 4.45}], usableArea: 56.24 },
  { id: 45, number: '3.04', building: 'BD-A2', disposition: '3+kk', size: 71.48, balcony: 7.62, floor: 3, price: 6572080, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 60.76 },
  { id: 46, number: '3.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 3, price: 5544000, status: 'sold', floorPlanPath: '/pudorysy/A2/BD_A2 3.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Ložnice', 'area': 12.6}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 54.15, outdoorSpaces: [{'type': 'Balkon', 'area': 9.01}], usableArea: 46.03 },
  { id: 47, number: '3.06', building: 'BD-A2', disposition: '2+kk', size: 50.75, balcony: 6.5, floor: 3, price: 4770500, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 },
  { id: 48, number: '4.03', building: 'BD-A2', disposition: '2+kk', size: 54.37, balcony: 5.66, floor: 4, price: 5219520, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 4.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 6.22}, {'number': 2, 'name': 'Ložnice', 'area': 12.05}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 26.66}, {'number': 4, 'name': 'Koupelna + WC', 'area': 6.3}], floorArea: 51.24, outdoorSpaces: [{'type': 'Balkon', 'area': 5.66}], usableArea: 43.55 },
  { id: 49, number: '4.04', building: 'BD-A2', disposition: '4+kk', size: 87.47, balcony: 6.12, floor: 4, price: 8047240, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 4.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Koupelna', 'area': 3.4}, {'number': 3, 'name': 'Toaleta', 'area': 1.56}, {'number': 4, 'name': 'Ložnice', 'area': 14.88}, {'number': 5, 'name': 'Obývací pokoj + KK', 'area': 23.49}, {'number': 6, 'name': 'Pokoj', 'area': 13.32}, {'number': 7, 'name': 'Pokoj', 'area': 11.7}], floorArea: 81.99, outdoorSpaces: [{'type': 'Balkon', 'area': 8.39}, {'type': 'Balkon', 'area': 6.12}], usableArea: 69.69 },
  { id: 50, number: '4.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 4, price: 5659500, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 4.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.40}, {'number': 4, 'name': 'Ložnice', 'area': 12.60}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 54.15, outdoorSpaces: [{'type': 'Balkon', 'area': 9.01}], usableArea: 49.09 },
  { id: 51, number: '4.06', building: 'BD-A2', disposition: '2+kk', size: 50.75, balcony: 6.55, floor: 4, price: 4872000, status: 'sold', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 43.14 }
]

export default async function ApartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params

  // Find apartment from fallback data
  const apartment = apartmentsFallback.find(apt =>
    generateApartmentSlug(apt.building, apt.number) === resolvedParams.slug
  )

  // If apartment not found, show 404
  if (!apartment) {
    notFound()
  }

  // Fetch current status from Vercel KV
  const currentStatus = await getApartmentStatus(apartment.id)

  // Redirect to homepage if apartment is sold
  if (currentStatus === 'sold') {
    redirect('/')
  }

  // Merge apartment data with current status from KV
  const apartmentWithStatus = {
    ...apartment,
    status: currentStatus
  }

  return <ApartmentDetailClient apartment={apartmentWithStatus} allApartments={apartmentsFallback} />
}
