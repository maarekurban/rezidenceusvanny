const { createClient } = require('@sanity/client')
const path = require('path')
const fs = require('fs')

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

async function uploadImage(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(path.resolve(__dirname, '..', 'public', imagePath))
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
    console.error(`❌ Chyba při nahrávání obrázku ${imagePath}:`, error.message)
    return null
  }
}

async function importApartmentsPage() {
  try {
    console.log('🏢 Importuji Byty stránku...\n')

    // Upload hero image
    console.log('📸 Nahrávám hero obrázek...')
    const heroImage = await uploadImage('images/DSC02841.jpg')

    const apartmentsPageData = {
      _type: 'apartmentsPageComplete',
      _id: 'apartments-page-complete-singleton',
      
      // === HERO SECTION ===
      heroBadge: 'III. Etapa v prodeji',
      heroTitle: 'Dostupné byty',
      heroTitleHighlight: 'III. etapa',
      heroDescription: 'Vyberte si z {count} dostupných bytů s dispozicemi 1+kk až 5+kk. Moderní bydlení v energetické třídě B.',
      heroImage: heroImage,
      
      // === QUICK STATS ===
      statDispositions: '1-5+kk',
      statDispositionsLabel: 'Dispozice',
      statArea: '32-115',
      statAreaLabel: 'm² plocha',
      statEnergyClass: 'B',
      statEnergyClassLabel: 'Energ. třída',
      
      // === FILTER SECTION ===
      filterLabel: 'Filtrovat:',
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(apartmentsPageData)
    
    console.log('✅ Byty stránka úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Importované sekce:')
    console.log('   ✅ Hero (badge, nadpis, popis, obrázek)')
    console.log('   ✅ 4 Quick Stats (volné byty, dispozice, plocha, třída)')
    console.log('   ✅ Filter label')
    console.log('\n💡 Tabulka bytů se načítá z dokumentů "Apartment" v Sanity!')
    console.log('   http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importApartmentsPage()



