const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Načíst env variables
const envPath = path.resolve(__dirname, '..', '.env.local')
require('dotenv').config({ path: envPath })

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Načtení všech bytů z app/byty/[slug]/page.tsx
const apartmentsFilePath = path.join(__dirname, '..', 'app', 'byty', '[slug]', 'page.tsx')
const fileContent = fs.readFileSync(apartmentsFilePath, 'utf8')

// Extrakce apartments array (hledáme apartmentsFallback)
const match = fileContent.match(/const apartmentsFallback = \[([\s\S]*?)\n\]/m)
if (!match) {
  console.error('❌ Nepodařilo se načíst data bytů z page.tsx')
  process.exit(1)
}

// Parse apartments data (vyhodnotíme jako JavaScript)
const apartmentsArrayString = `[${match[1]}]`
const apartments = eval(apartmentsArrayString)

console.log(`📊 Nalezeno ${apartments.length} bytů v page.tsx`)

// Helper pro nahrání obrázku
async function uploadImage(imagePath) {
  try {
    if (!imagePath || imagePath === null) return null
    
    const fullPath = path.join(__dirname, '..', 'public', imagePath)
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Obrázek nenalezen: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    })

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
async function importAllApartments() {
  try {
    console.log('🚀 Spouštím import VŠECH bytů...\n')

    let imported = 0
    let failed = 0

    // Hero obrázek (společný)
    console.log('📸 Nahrávám hero obrázek...')
    const heroImage = await uploadImage('/images/DSC02913.jpg')

    for (const apt of apartments) {
      try {
        console.log(`\n📦 Zpracovávám byt ${apt.number} (${apt.building}) - ${apt.status}`)

        // Nahrání půdorysu (jen pokud existuje)
        let floorPlan
        if (apt.floorPlanPath && apt.floorPlanPath !== null) {
          floorPlan = await uploadImage(apt.floorPlanPath)
        }

        // Příprava místností (jen pokud existují)
        const rooms = apt.rooms && apt.rooms.length > 0 ? apt.rooms.map((room, idx) => ({
          _type: 'object',
          _key: `room-${idx}`,
          number: String(room.number || idx + 1),
          name: String(room.name || ''),
          area: Number(room.area),
        })) : []

        // Příprava venkovních prostorů (jen pokud existují)
        const outdoorSpaces = apt.outdoorSpaces && apt.outdoorSpaces.length > 0 ? apt.outdoorSpaces.map((space, idx) => ({
          _type: 'object',
          _key: `outdoor-${idx}`,
          type: space.type.toLowerCase() === 'balkon' ? 'Balkon' : 
                space.type.toLowerCase() === 'terasa' ? 'Terasa' : 'Zahrada',
          area: Number(space.area),
        })) : []

        // Vytvoření dokumentu (vynecháme null hodnoty)
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
        }

        // Přidáme obrázky jen pokud existují (ne null)
        if (floorPlan) {
          apartment.floorPlan = floorPlan
        }
        if (heroImage) {
          apartment.heroImage = heroImage
        }

        // Uložení do Sanity
        const result = await client.createOrReplace(apartment)
        console.log(`✅ Byt ${apt.number} importován (${apt.status})`)
        imported++

      } catch (error) {
        console.error(`❌ Chyba při importu bytu ${apt.number}:`, error.message)
        failed++
      }
    }

    console.log('\n' + '='.repeat(70))
    console.log('✅ IMPORT DOKONČEN')
    console.log('='.repeat(70))
    console.log(`📊 Celkem bytů:          ${apartments.length}`)
    console.log(`✅ Úspěšně importováno: ${imported}`)
    if (failed > 0) {
      console.log(`❌ Chyby:                ${failed}`)
    }
    
    // Statistiky podle statusu
    const available = apartments.filter(a => a.status === 'available').length
    const sold = apartments.filter(a => a.status === 'sold').length
    console.log('\n📈 Statistiky:')
    console.log(`   Volné:     ${available}`)
    console.log(`   Prodané:   ${sold}`)
    console.log('='.repeat(70))

  } catch (error) {
    console.error('❌ KRITICKÁ CHYBA:', error)
    process.exit(1)
  }
}

// Spuštění
importAllApartments()

