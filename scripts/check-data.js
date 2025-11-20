const { createClient } = require('@sanity/client')
const path = require('path')

// Načíst env variables
const envPath = path.resolve(__dirname, '..', '.env.local')
require('dotenv').config({ path: envPath })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function checkData() {
  try {
    console.log('🔍 Kontroluji data v Sanity...\n')

    // Načíst jeden byt jako test (1.02 - víme, že má data)
    const apartment = await client.fetch(`
      *[_type == "apartment" && number == "1.02"][0] {
        _id,
        number,
        building,
        floor,
        disposition,
        price,
        status,
        floorArea,
        usableArea,
        rooms,
        outdoorSpaces,
        floorPlan,
        heroImage
      }
    `)

    if (!apartment) {
      console.log('❌ Byt 1.02 nenalezen!')
      return
    }

    console.log('✅ Byt nalezen:', apartment.number, apartment.building)
    console.log('\n📊 DETAILY:')
    console.log('   Status:', apartment.status)
    console.log('   Cena:', apartment.price)
    console.log('   Podlahová plocha:', apartment.floorArea)
    console.log('   Užitná plocha:', apartment.usableArea)
    
    console.log('\n🏠 MÍSTNOSTI:', apartment.rooms?.length || 0)
    if (apartment.rooms && apartment.rooms.length > 0) {
      apartment.rooms.forEach(room => {
        console.log(`   ${room.number}. ${room.name} - ${room.area} m²`)
      })
    } else {
      console.log('   ❌ ŽÁDNÉ MÍSTNOSTI!')
    }
    
    console.log('\n🌳 VENKOVNÍ PROSTORY:', apartment.outdoorSpaces?.length || 0)
    if (apartment.outdoorSpaces && apartment.outdoorSpaces.length > 0) {
      apartment.outdoorSpaces.forEach(space => {
        console.log(`   ${space.type} - ${space.area} m²`)
      })
    } else {
      console.log('   ❌ ŽÁDNÉ VENKOVNÍ PROSTORY!')
    }
    
    console.log('\n📸 OBRÁZKY:')
    console.log('   Půdorys:', apartment.floorPlan ? '✅ Ano' : '❌ Ne')
    console.log('   Hero:', apartment.heroImage ? '✅ Ano' : '❌ Ne')

    // Zkontrolovat, kolik bytů má data
    const allApartments = await client.fetch(`
      *[_type == "apartment"] {
        number,
        "roomsCount": count(rooms),
        "outdoorCount": count(outdoorSpaces),
        "hasFloorPlan": defined(floorPlan),
        "hasHero": defined(heroImage)
      }
    `)

    console.log('\n\n📊 STATISTIKA VŠECH BYTŮ:')
    console.log('   Celkem bytů:', allApartments.length)
    const withRooms = allApartments.filter(a => a.roomsCount > 0).length
    const withOutdoor = allApartments.filter(a => a.outdoorCount > 0).length
    const withFloorPlan = allApartments.filter(a => a.hasFloorPlan).length
    const withHero = allApartments.filter(a => a.hasHero).length
    
    console.log('   S místnostmi:', withRooms)
    console.log('   S venkovními prostory:', withOutdoor)
    console.log('   S půdorysem:', withFloorPlan)
    console.log('   S hero obrázkem:', withHero)

  } catch (error) {
    console.error('❌ Chyba:', error.message)
  }
}

checkData()


