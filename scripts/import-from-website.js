const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Data bytů z webu
const apartments = [
  { id: 1, number: '1.01', building: 'BD-B1', disposition: '1+kk', size: 33.32, balcony: 5.68, floor: 1, price: 3191040, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 1.01.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 3.23}, {'number': 2, 'name': 'Koupelna + WC', 'area': 4.02}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 23.35}], floorArea: 30.60, outdoorSpaces: [{'type': 'Balkon', 'area': 5.68}], usableArea: 26.02 },
  { id: 2, number: '1.02', building: 'BD-B1', disposition: '2+kk', size: 51.75, balcony: 8.07, floor: 1, price: 4556400, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 1.02.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 6.57}, {'number': 2, 'name': 'Koupelna + WC', 'area': 4.67}, {'number': 3, 'name': 'Pokoj', 'area': 13.35}, {'number': 4, 'name': 'Obývací pokoj + KK', 'area': 24.65}], floorArea: 49.24, outdoorSpaces: [{'type': 'Balkon', 'area': 8.07}], usableArea: 41.86 },
  { id: 3, number: '1.03', building: 'BD-B1', disposition: '5+kk', size: 101.61, balcony: 139.3, floor: 1, price: 9766020, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 1.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.42}, {'number': 2, 'name': 'Toaleta', 'area': 1.63}, {'number': 3, 'name': 'Koupelna', 'area': 5.31}, {'number': 4, 'name': 'Pokoj', 'area': 10.93}, {'number': 5, 'name': 'Ložnice', 'area': 14.32}, {'number': 6, 'name': 'Pokoj', 'area': 12.3}, {'number': 7, 'name': 'Obývací pokoj + KK', 'area': 24.22}, {'number': 8, 'name': 'Pokoj', 'area': 11.54}], floorArea: 93.67, outdoorSpaces: [{'type': 'Terasa', 'area': 5.41}, {'type': 'Terasa', 'area': 7.95}, {'type': 'Zahrada', 'area': 139.3}], usableArea: 79.62 },
  { id: 7, number: '2.04', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 2, price: 6445520, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 2.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Ložnice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 12, number: '3.03', building: 'BD-B1', disposition: '3+kk', size: 69.0, balcony: 7.95, floor: 3, price: 6486000, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 58.65 },
  { id: 13, number: '3.04', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 3, price: 6585640, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 3.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Ložnice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 16, number: '4.01', building: 'BD-B1', disposition: '4+kk', size: 86.78, balcony: 8.07, floor: 4, price: 7983760, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 4.01.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 10.54}, {'number': 2, 'name': 'Toaleta', 'area': 1.6}, {'number': 3, 'name': 'Komora', 'area': 1.56}, {'number': 4, 'name': 'Pokoj', 'area': 10.9}, {'number': 5, 'name': 'Ložnice', 'area': 13.19}, {'number': 6, 'name': 'Pokoj', 'area': 9.96}, {'number': 7, 'name': 'Obývací pokoj + KK', 'area': 26.39}, {'number': 8, 'name': 'Koupelna', 'area': 6.05}], floorArea: 80.19, outdoorSpaces: [{'type': 'Balkon', 'area': 5.52}, {'type': 'Balkon', 'area': 8.07}], usableArea: 68.16 },
  { id: 18, number: '4.03', building: 'BD-B1', disposition: '3+kk', size: 70.06, balcony: 7.95, floor: 4, price: 6725760, status: 'available', floorPlanPath: '/pudorysy/B1/BD_B1 4.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 4.97}, {'number': 2, 'name': 'Toaleta', 'area': 1.23}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.15}, {'number': 4, 'name': 'Chodba', 'area': 3.13}, {'number': 5, 'name': 'Koupelna + WC', 'area': 4.73}, {'number': 6, 'name': 'Komora', 'area': 2.01}, {'number': 7, 'name': 'Pokoj', 'area': 10.51}, {'number': 8, 'name': 'Ložnice', 'area': 12.72}], floorArea: 63.45, outdoorSpaces: [{'type': 'Balkon', 'area': 7.95}], usableArea: 53.93 },
  { id: 21, number: '1.23', building: 'BD-A1', disposition: '4+kk', size: 81.9, balcony: 118.24, floor: 1, price: 7889520, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 1.23.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 3.61}, {'number': 2, 'name': 'Obývací pokoj + KK', 'area': 26.28}, {'number': 3, 'name': 'Chodba', 'area': 5.41}, {'number': 4, 'name': 'Pokoj', 'area': 11.18}, {'number': 5, 'name': 'Pokoj', 'area': 8.49}, {'number': 6, 'name': 'Ložnice', 'area': 12.9}, {'number': 7, 'name': 'Koupelna', 'area': 6.13}, {'number': 8, 'name': 'Toaleta', 'area': 1.56}], floorArea: 75.56, outdoorSpaces: [{'type': 'Zahrada', 'area': 118.24}, {'type': 'Terasa', 'area': 13.77}], usableArea: 64.23 },
  { id: 25, number: '2.10', building: 'BD-A1', disposition: '2+kk', size: 57.75, balcony: 8.72, floor: 2, price: 5428500, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 49.09 },
  { id: 26, number: '2.11', building: 'BD-A1', disposition: '4+kk', size: 87.84, balcony: 8.1, floor: 2, price: 7905600, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 2.11.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Pokoj', 'area': 11.32}, {'number': 3, 'name': 'Pokoj', 'area': 13.32}, {'number': 4, 'name': 'Obývací pokoj + KK', 'area': 23.75}, {'number': 5, 'name': 'Ložnice', 'area': 14.87}, {'number': 6, 'name': 'Toaleta', 'area': 1.31}, {'number': 7, 'name': 'Koupelna', 'area': 3.4}], floorArea: 81.61, outdoorSpaces: [{'type': 'Balkon', 'area': 6.03}, {'type': 'Balkon', 'area': 8.1}], usableArea: 69.37 },
  { id: 29, number: '3.10', building: 'BD-A1', disposition: '2+kk', size: 57.36, balcony: 8.72, floor: 3, price: 5506560, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 3.10.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Ložnice', 'area': 12.22}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 53.76, outdoorSpaces: [{'type': 'Balkon', 'area': 8.72}], usableArea: 45.70 },
  { id: 34, number: '4.10', building: 'BD-A1', disposition: '2+kk', size: 57.36, balcony: 9.0, floor: 4, price: 5621280, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 4.10.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Ložnice', 'area': 12.22}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 53.77, outdoorSpaces: [{'type': 'Balkon', 'area': 9.0}], usableArea: 45.70 },
  { id: 35, number: '4.11', building: 'BD-A1', disposition: '4+kk', size: 87.46, balcony: 8.1, floor: 4, price: 8221240, status: 'available', floorPlanPath: '/pudorysy/A1/BD_A1 4.11.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Pokoj', 'area': 11.32}, {'number': 3, 'name': 'Pokoj', 'area': 13.32}, {'number': 4, 'name': 'Obývací pokoj + KK', 'area': 23.75}, {'number': 5, 'name': 'Ložnice', 'area': 14.87}, {'number': 6, 'name': 'Toaleta', 'area': 1.31}, {'number': 7, 'name': 'Koupelna', 'area': 3.4}], floorArea: 81.61, outdoorSpaces: [{'type': 'Balkon', 'area': 6.12}, {'type': 'Balkon', 'area': 8.1}], usableArea: 69.37 },
  { id: 39, number: '1.05', building: 'BD-A2', disposition: '4+kk', size: 80.64, balcony: 110.3, floor: 1, price: 7749780, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 1.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 3.61}, {'number': 2, 'name': 'Obývací pokoj + KK', 'area': 26.27}, {'number': 3, 'name': 'Chodba', 'area': 5.41}, {'number': 4, 'name': 'Pokoj', 'area': 10.92}, {'number': 5, 'name': 'Pokoj', 'area': 8.49}, {'number': 6, 'name': 'Ložnice', 'area': 12.9}, {'number': 7, 'name': 'Koupelna', 'area': 6.13}, {'number': 8, 'name': 'Toaleta', 'area': 1.38}], floorArea: 75.11, outdoorSpaces: [{'type': 'Zahrada', 'area': 110.3}, {'type': 'Terasa', 'area': 13.75}], usableArea: 63.84 },
  { id: 41, number: '2.04', building: 'BD-A2', disposition: '4+kk', size: 87.47, balcony: 6.12, floor: 2, price: 7872300, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 2.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Koupelna', 'area': 3.4}, {'number': 3, 'name': 'Toaleta', 'area': 1.56}, {'number': 4, 'name': 'Ložnice', 'area': 14.87}, {'number': 5, 'name': 'Obývací pokoj + KK', 'area': 23.49}, {'number': 6, 'name': 'Pokoj', 'area': 13.32}, {'number': 7, 'name': 'Pokoj', 'area': 11.7}], floorArea: 81.98, outdoorSpaces: [{'type': 'Balkon', 'area': 8.39}, {'type': 'Balkon', 'area': 6.12}], usableArea: 69.68 },
  { id: 42, number: '2.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 2, price: 5428500, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 49.09 },
  { id: 44, number: '3.03', building: 'BD-A2', disposition: '3+kk', size: 71.77, balcony: 4.45, floor: 3, price: 6746380, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 3.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 9.55}, {'number': 2, 'name': 'Ložnice', 'area': 12.94}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.16}, {'number': 4, 'name': 'Šatna', 'area': 2.12}, {'number': 5, 'name': 'Pokoj', 'area': 10.55}, {'number': 6, 'name': 'Koupelna', 'area': 5.49}, {'number': 7, 'name': 'Toaleta', 'area': 1.35}], floorArea: 66.16, outdoorSpaces: [{'type': 'Balkon', 'area': 4.45}], usableArea: 56.24 },
  { id: 46, number: '3.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 3, price: 5544000, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 3.05.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 8.18}, {'number': 2, 'name': 'Koupelna + WC', 'area': 5.48}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 24.4}, {'number': 4, 'name': 'Ložnice', 'area': 12.6}, {'number': 5, 'name': 'Šatna', 'area': 3.49}], floorArea: 54.15, outdoorSpaces: [{'type': 'Balkon', 'area': 9.01}], usableArea: 46.03 },
  { id: 48, number: '4.03', building: 'BD-A2', disposition: '2+kk', size: 54.37, balcony: 5.66, floor: 4, price: 5219520, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 4.03.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 6.22}, {'number': 2, 'name': 'Ložnice', 'area': 12.05}, {'number': 3, 'name': 'Obývací pokoj + KK', 'area': 26.66}, {'number': 4, 'name': 'Koupelna + WC', 'area': 6.3}], floorArea: 51.24, outdoorSpaces: [{'type': 'Balkon', 'area': 5.66}], usableArea: 43.55 },
  { id: 49, number: '4.04', building: 'BD-A2', disposition: '4+kk', size: 87.47, balcony: 6.12, floor: 4, price: 8047240, status: 'available', floorPlanPath: '/pudorysy/A2/BD_A2 4.04.jpg', rooms: [{'number': 1, 'name': 'Chodba', 'area': 13.64}, {'number': 2, 'name': 'Koupelna', 'area': 3.4}, {'number': 3, 'name': 'Toaleta', 'area': 1.56}, {'number': 4, 'name': 'Ložnice', 'area': 14.88}, {'number': 5, 'name': 'Obývací pokoj + KK', 'area': 23.49}, {'number': 6, 'name': 'Pokoj', 'area': 13.32}, {'number': 7, 'name': 'Pokoj', 'area': 11.7}], floorArea: 81.99, outdoorSpaces: [{'type': 'Balkon', 'area': 8.39}, {'type': 'Balkon', 'area': 6.12}], usableArea: 69.69 },
  { id: 50, number: '4.05', building: 'BD-A2', disposition: '2+kk', size: 57.75, balcony: 9.01, floor: 4, price: 5659500, status: 'available', floorPlanPath: null, rooms: [], floorArea: 0, outdoorSpaces: [], usableArea: 49.09 }
]

// Helper pro nahrání obrázku
async function uploadImage(imagePath) {
  try {
    if (!imagePath) return null
    
    const fullPath = path.join(__dirname, '..', 'public', imagePath)
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Obrázek nenalezen: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    })

    console.log(`✅ Nahrán obrázek: ${imagePath}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`❌ Chyba při nahrávání ${imagePath}:`, error.message)
    return null
  }
}

// Hlavní import
async function importApartments() {
  try {
    console.log('🚀 Spouštím import bytů z webu...\n')
    console.log(`📊 Celkem ${apartments.length} volných bytů k importu\n`)

    let imported = 0
    let failed = 0

    // Hero obrázek (společný pro všechny byty)
    console.log('📸 Nahrávám společný hero obrázek...')
    const heroImage = await uploadImage('/images/DSC02913.jpg')

    for (const apt of apartments) {
      try {
        console.log(`\n📦 Zpracovávám byt: ${apt.number} (${apt.building})`)

        // Nahrání půdorysu
        let floorPlan = null
        if (apt.floorPlanPath) {
          floorPlan = await uploadImage(apt.floorPlanPath)
        }

        // Příprava místností
        const rooms = apt.rooms.map((room, idx) => ({
          _type: 'object',
          _key: `room-${idx}`,
          number: String(room.number),
          area: room.area,
        }))

        // Příprava venkovních prostorů
        const outdoorSpaces = apt.outdoorSpaces.map((space, idx) => ({
          _type: 'object',
          _key: `outdoor-${idx}`,
          type: space.type.toLowerCase() === 'balkon' ? 'balcony' : 
                space.type.toLowerCase() === 'terasa' ? 'terrace' : 'garden',
          area: space.area,
        }))

        // Vytvoření dokumentu
        const apartment = {
          _type: 'apartment',
          _id: `apartment-${apt.building.toLowerCase()}-${apt.number.replace('.', '-')}`,
          number: apt.number,
          building: apt.building,
          floor: apt.floor,
          disposition: apt.disposition,
          floorArea: apt.floorArea || apt.size,
          usableArea: apt.usableArea || apt.size,
          price: apt.price,
          status: apt.status,
          rooms: rooms,
          outdoorSpaces: outdoorSpaces,
          floorPlan: floorPlan,
          heroImage: heroImage,
        }

        // Uložení do Sanity
        const result = await client.createOrReplace(apartment)
        console.log(`✅ Byt ${apt.number} úspěšně importován`)
        imported++

      } catch (error) {
        console.error(`❌ Chyba při importu bytu ${apt.number}:`, error.message)
        failed++
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('✅ IMPORT DOKONČEN')
    console.log('='.repeat(60))
    console.log(`📊 Úspěšně importováno: ${imported} bytů`)
    if (failed > 0) {
      console.log(`⚠️  Chyby: ${failed} bytů`)
    }
    console.log('='.repeat(60))

  } catch (error) {
    console.error('❌ KRITICKÁ CHYBA:', error)
    process.exit(1)
  }
}

// Spuštění
importApartments()

