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
      heroTitle: 'Moderní bydlení\nv srdci UNESCO',
      heroSubtitle: 'Objevte 131 bytů a 14 rodinných domů v historické Kutné Hoře, kde se moderní architektura setkává s bohatou historií',
      
      // About Section (UNESCO město)
      aboutBadge: 'MĚSTO PAMÁTKY UNESCO',
      aboutTitle: 'Nechte se uchvátit krásou Kutné Hory',
      aboutDescription: 'Město zapsané na Seznam světového kulturního dědictví UNESCO ve středověku označované za stříbrnou pokladnici českého království s malebným historickým centrem, vinicemi a celou řadou kaváren, cukráren a restaurací.\n\nDíky připojení Kutnohorska do integrovaného dopravního systému Prahy se do hlavního města pohodlně dostanete přímo z Kutné Hory v pracovních dnech i o víkendu.',
      aboutStats: [
        { number: '131', label: 'Bytů' },
        { number: '14', label: 'Rodinných domů' },
        { number: 'B', label: 'Energetická třída' },
      ],
      
      // Apartments Section (Kvalitní bydlení)
      apartmentsBadge: 'Exkluzivita čtvrti',
      apartmentsTitle: 'Kvalitní bydlení v UNESCO zóně',
      apartmentsDescription: 'Hlavním cílem projektu Rezidence u sv. Anny je vytvoření moderního a dostupného domova ve městě, jehož historické centrum je zapsané na seznamu UNESCO. Umístění v klidné části města s dobrou dopravní dostupností do centra vytváří potenciál pro naplnění bytových potřeb i těch nejnáročnějších klientů.',
      
      // Features Section (Proč si koupit byt)
      featuresBadge: 'PROČ BYDLET V REZIDENCI',
      featuresTitle: 'Proč si koupit byt\nv naší rezidenci?',
      featuresDescription: 'Moderní byty s promyšleným dispozičním řešením v klidné části historického města',
      features: [
        {
          title: 'Energetická třída B',
          description: 'Nízké náklady na provoz díky špičkovým izolacím a moderním technologiím',
          icon: 'star',
        },
        {
          title: 'Kvalitní provedení',
          description: 'Použití prvotřídních materiálů a precizní řemeslné zpracování',
          icon: 'check',
        },
        {
          title: 'Moderní architektura',
          description: 'Čisté linie a nadčasový design respektující okolní zástavbu',
          icon: 'home',
        },
        {
          title: 'Výhled do zeleně',
          description: 'Majority bytů nabízí výhled do parku nebo klidného okolí',
          icon: 'location',
        },
      ],
      
      // Location Section (Areál rezidenční čtvrti)
      locationBadge: 'MĚSTO PAMÁTKY UNESCO',
      locationTitle: 'Areál rezidenční čtvrti U sv. Anny',
      locationDescription: 'Rezidenční čtvrť U sv. Anny se nachází v klidné části historického centra Kutné Hory. Lokalita nabízí ideální kombinaci dostupnosti městské vybavenosti a klidného bydlení v zeleni.',
      locationFeatures: [
        {
          title: 'Pěší dostupnost centra',
          description: '5 minut do historického centra města',
        },
        {
          title: 'Dopravní spojení',
          description: 'Autobusová a vlaková zastávka v docházkové vzdálenosti',
        },
        {
          title: 'Vybavenost',
          description: 'Školky, školy, obchody, zdravotní péče v okolí',
        },
        {
          title: 'Zeleň a park',
          description: 'Park sv. Anny přímo v sousedství projektu',
        },
      ],
      
      // Gallery Section
      galleryBadge: 'DOKONČENÉ BYTY',
      galleryTitle: 'Prohlédněte si naši práci',
      galleryDescription: 'Fotografie z dokončených bytů I. a II. etapy. Standardy kvality jsou zachovány i pro III. etapu.',
      
      // Contact Section
      contactBadge: 'KONTAKTUJTE NÁS',
      contactTitle: 'Máte zájem o byt?',
      contactDescription: 'Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin',
      contactEmail: 'info@rezidenceusvanny.cz',
      
      // Video Section (YouTube - O Kutné Hoře)
      videoBadge: 'MĚSTO PAMÁTKY UNESCO',
      videoTitle: 'Nechte se uchvátit krásou Kutné Hory',
      videoUrl: 'https://www.youtube.com/embed/VVlxe2bvtlg',
      videoFeatures: [
        {
          title: 'UNESCO památky',
          description: 'Chrám sv. Barbory, Kostnice v Sedlci, Vlašský dvůr',
        },
        {
          title: 'Historické centrum',
          description: 'Malebné uličky, náměstí a památkové budovy',
        },
        {
          title: 'Kultura a sport',
          description: 'Divadlo, kino, galerie, muzea, aquapark',
        },
        {
          title: 'Dopravní dostupnost',
          description: '60 minut do Prahy vlakem nebo autobusem',
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

