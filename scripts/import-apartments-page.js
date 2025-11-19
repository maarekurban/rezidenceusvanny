const { createClient } = require('@sanity/client')
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

async function importApartmentsPage() {
  try {
    console.log('🏢 Importuji Byty stránka data...\n')

    const apartmentsPageData = {
      _type: 'apartmentsPage',
      _id: 'apartments-page-singleton',
      
      // Hero Section
      heroTitle: 'Dostupné byty',
      heroSubtitle: 'Vyberte si váš nový domov v Rezidenci U sv. Anny',
      
      // Intro Section
      introBadge: 'Dostupné byty',
      introTitle: 'Najděte svůj ideální byt',
      introDescription: 'Nabízíme širokou škálu bytů od kompaktních 1+kk až po prostorné 5+kk. Všechny byty jsou navrženy s důrazem na funkčnost, světlo a kvalitu provedení.',
      
      // Filters Section
      filtersTitle: 'Filtrovat byty',
      
      // Gallery Section
      galleryBadge: 'Interiéry bytů',
      galleryTitle: 'Ukázka dokončených bytů',
      galleryDescription: 'Prohlédněte si reálné fotografie dokončených bytů z I. a II. etapy projektu. Standardy kvality a materiálů jsou zachovány i pro III. etapu.',
      
      // CTA Section
      ctaBadge: 'Kontakt',
      ctaTitle: 'Nenašli jste vhodný byt?',
      ctaDescription: 'Kontaktujte nás a pomůžeme vám najít ideální byt podle vašich představ',
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(apartmentsPageData)
    
    console.log('✅ Byty stránka data úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Co bylo naplněno:')
    console.log('   - Hero sekce (nadpis, podnadpis)')
    console.log('   - Úvodní sekce (badge, nadpis, popis)')
    console.log('   - Filtry (nadpis)')
    console.log('   - Galerie (badge, nadpis, popis)')
    console.log('   - CTA sekce (badge, nadpis, popis)')
    console.log('\n💡 Nyní můžeš editovat všechny texty v Sanity Studio!')
    console.log('   http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importApartmentsPage()

