const { createClient } = require('@sanity/client')
const XLSX = require('xlsx')
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

// Helper funkce pro nahrání obrázku
async function uploadImage(imagePath) {
  try {
    const fullPath = path.join(__dirname, '..', imagePath)
    
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

// Parsování čísla bytu z Excel date formátu
function parseApartmentNumber(value) {
  if (typeof value === 'number') {
    // Excel date format - převést na datum a pak na formát DD.MM
    const date = XLSX.SSF.parse_date_code(value)
    return `${date.d}.${String(date.m).padStart(2, '0')}`
  }
  return String(value)
}

// Hlavní import funkce
async function importApartments() {
  try {
    console.log('🚀 Spouštím import bytů...\n')

    // Načtení Excel souboru
    const workbook = XLSX.readFile(path.join(__dirname, '..', 'public', 'Byty rezidence import 2.xlsx'))
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(worksheet)

    console.log(`📊 Nalezeno ${data.length} bytů v Excelu\n`)

    let imported = 0
    let skipped = 0

    for (const row of data) {
      try {
        const apartmentNumber = parseApartmentNumber(row['Číslo bytu'])
        
        // Přeskočit byty bez cesty k půdorysu (ty nejsou připravené)
        if (!row['Cesta k půdorysu'] || row['Cesta k půdorysu'] === '') {
          console.log(`⏭️  Přeskakuji byt ${apartmentNumber} (bez půdorysu)`)
          skipped++
          continue
        }
        console.log(`\n📦 Zpracovávám byt: ${apartmentNumber} (${row['Bytový dům']})`)

        // Parsování místností
        const rooms = []
        for (let i = 1; i <= 20; i++) {
          const roomNum = row[`Číslo místnosti ${i}`]
          const roomArea = row[`Plocha místnosti ${i}`]
          
          if (roomNum && roomArea) {
            rooms.push({
              _type: 'object',
              _key: `room-${i}`,
              number: String(roomNum),
              area: Number(roomArea),
            })
          }
        }

        // Parsování venkovních prostorů
        const outdoorSpaces = []
        if (row['Balkon']) {
          outdoorSpaces.push({
            _type: 'object',
            _key: 'balcony',
            type: 'balcony',
            area: Number(row['Balkon']),
          })
        }
        if (row['Terasa']) {
          outdoorSpaces.push({
            _type: 'object',
            _key: 'terrace',
            type: 'terrace',
            area: Number(row['Terasa']),
          })
        }
        if (row['Zahrada']) {
          outdoorSpaces.push({
            _type: 'object',
            _key: 'garden',
            type: 'garden',
            area: Number(row['Zahrada']),
          })
        }

        // Nahrání půdorysu
        let floorPlan = null
        if (row['Cesta k půdorysu']) {
          const floorPlanPath = row['Cesta k půdorysu'].replace('/public/', '')
          floorPlan = await uploadImage(floorPlanPath)
        }

        // Nahrání hero obrázku
        const heroImage = await uploadImage('public/images/DSC02913.jpg')

        // Vytvoření dokumentu bytu
        const apartment = {
          _type: 'apartment',
          _id: `apartment-${row['Bytový dům']}-${apartmentNumber}`.toLowerCase().replace(/\./g, '-'),
          number: apartmentNumber,
          building: row['Bytový dům'],
          floor: Number(row['Patro']),
          disposition: row['Dispozice'],
          floorArea: Number(row['Podlahová plocha']),
          usableArea: Number(row['Užitná plocha']),
          price: Number(row['Cena']),
          status: 'available',
          rooms: rooms,
          outdoorSpaces: outdoorSpaces,
          floorPlan: floorPlan,
          heroImage: heroImage,
        }

        // Uložení do Sanity
        const result = await client.createOrReplace(apartment)
        console.log(`✅ Byt ${apartmentNumber} úspěšně importován (ID: ${result._id})`)
        imported++

      } catch (error) {
        console.error(`❌ Chyba při importu bytu ${row['Číslo bytu']}:`, error.message)
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('✅ IMPORT DOKONČEN')
    console.log('='.repeat(60))
    console.log(`📊 Importováno: ${imported} bytů`)
    console.log(`⏭️  Přeskočeno: ${skipped} bytů`)
    console.log('='.repeat(60))

  } catch (error) {
    console.error('❌ KRITICKÁ CHYBA:', error)
    process.exit(1)
  }
}

// Spuštění importu
importApartments()

