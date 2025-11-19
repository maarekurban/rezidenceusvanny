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

async function importHomepage() {
  try {
    console.log('🏠 Importuji Homepage data...\n')

    const homepageData = {
      _type: 'homepage',
      _id: 'homepage-singleton',
      
      // Hero Section
      heroTitle: 'Rezidence U sv. Anny',
      heroSubtitle: 'Moderní bydlení v historickém centru Kutné Hory',
      
      // About Section
      aboutBadge: 'O projektu',
      aboutTitle: 'Rezidence U sv. Anny',
      aboutDescription: 'Moderní bytové domy v klidné části historického centra Kutné Hory. Projekt nabízí kvalitní bydlení s promyšleným dispozičním řešením a špičkovou energetickou třídou B.',
      aboutStats: [
        { number: '51', label: 'bytů' },
        { number: '3', label: 'bytové domy' },
        { number: 'B', label: 'energetická třída' },
      ],
      
      // Apartments Section
      apartmentsBadge: 'Byty',
      apartmentsTitle: 'Vyberte si váš nový domov',
      apartmentsDescription: 'Nabízíme byty od dispozice 1+kk až po prostorné 5+kk s možností individuálních úprav.',
      
      // Features Section
      featuresBadge: 'Výhody bydlení',
      featuresTitle: 'Proč si vybrat Rezidenci U sv. Anny',
      featuresDescription: 'Moderní bydlení s historickým duchem v srdci UNESCO lokality.',
      features: [
        {
          title: 'UNESCO lokalita',
          description: 'Bydlení v historickém městě zapsaném na Seznam světového kulturního dědictví UNESCO.',
          icon: 'star',
        },
        {
          title: 'Výborná dostupnost',
          description: 'Díky integraci do PID systému se do Prahy dostanete pohodlně a rychle.',
          icon: 'location',
        },
        {
          title: 'Moderní bydlení',
          description: 'Nízkoenergetické byty s promyšleným dispozičním řešením a kvalitním vybavením.',
          icon: 'home',
        },
        {
          title: 'Kompletní občanská vybavenost',
          description: 'Školy, školky, obchody a veškeré služby v dosahu pěší chůze.',
          icon: 'check',
        },
      ],
      
      // Location Section
      locationBadge: 'Lokalita',
      locationTitle: 'Život v historickém centru',
      locationDescription: 'Kutná Hora je královské město s bohatou historií, které díky své blízkosti Prahy nabízí ideální kombinaci klidného bydlení a dostupnosti velkoměsta. Město je plné památek, kulturních akcí a nabízí kompletní občanskou vybavenost.',
      locationFeatures: [
        {
          title: '60 minut do Prahy',
          description: 'Pravidelné autobusové i vlakové spojení',
        },
        {
          title: 'UNESCO památky',
          description: 'Chrám sv. Barbory, Kostnice v Sedlci',
        },
        {
          title: 'Kompletní vybavenost',
          description: 'Školy, školky, obchody, restaurace',
        },
        {
          title: 'Sport a kultura',
          description: 'Aquapark, kino, galerie, muzea',
        },
      ],
      
      // Gallery Section
      galleryTitle: 'Realizované byty z předchozích etap',
      galleryDescription: 'Prohlédněte si reálné fotografie dokončených bytů z I. a II. etapy projektu.',
      
      // Contact Section
      contactBadge: 'Kontaktujte nás',
      contactTitle: 'Máte zájem o více informací?',
      contactDescription: 'Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin. Rádi vám představíme projekt, provedeme vás areálem a odpovíme na všechny vaše dotazy.',
      contactEmail: 'info@rezidenceusvanny.cz',
      
      // Video Section
      videoBadge: 'Proč si vybrat tento projekt',
      videoTitle: 'Proč bydlet v Rezidenci U sv. Anny',
      videoUrl: 'https://www.youtube.com/embed/VVlxe2bvtlg',
      videoFeatures: [
        {
          title: 'UNESCO lokalita',
          description: 'Bydlení v historickém městě zapsaném na Seznam světového kulturního dědictví UNESCO',
        },
        {
          title: 'Výborná dostupnost',
          description: 'Díky integraci do PID systému se do Prahy dostanete pohodlně a rychle',
        },
        {
          title: 'Moderní bydlení',
          description: 'Nízkoenergetické byty s promyšleným dispozičním řešením a kvalitním vybavením',
        },
        {
          title: 'Kompletní občanská vybavenost',
          description: 'Školy, školky, obchody a veškeré služby v dosahu pěší chůze',
        },
      ],
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(homepageData)
    
    console.log('✅ Homepage data úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Co bylo naplněno:')
    console.log('   - Hero sekce (nadpis, podnadpis)')
    console.log('   - O projektu (text, statistiky)')
    console.log('   - Byty sekce (texty)')
    console.log('   - Výhody bydlení (4 položky)')
    console.log('   - Lokalita (text, 4 vlastnosti)')
    console.log('   - Galerie (nadpis, popis)')
    console.log('   - Kontakt (texty, email)')
    console.log('   - Video sekce (URL, 4 vlastnosti)')
    console.log('\n💡 Nyní můžeš editovat všechny texty v Sanity Studio!')
    console.log('   http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importHomepage()

