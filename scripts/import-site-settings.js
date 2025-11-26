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

async function importSiteSettings() {
  try {
    console.log('⚙️  Importuji Site Settings data...\n')

    const siteSettingsData = {
      _type: 'siteSettings',
      _id: 'site-settings-singleton',
      
      // Site Info
      siteName: 'Rezidence U sv. Anny',
      siteDescription: 'Moderní bytové domy v historickém centru Kutné Hory. Kvalitní bydlení s promyšleným dispozičním řešením a špičkovou energetickou třídou B.',
      
      // Contact Info
      phone: '+420 724 218 841',
      email: 'info@rezidenceusvanny.cz',
      address: 'Kutná Hora\nČeská republika',
      
      // Footer
      footerText: 'Moderní bydlení v historickém centru Kutné Hory. Projekt nabízí kvalitní byty s promyšleným dispozičním řešením.',
      copyrightText: '© 2024 Rezidence U sv. Anny. Všechna práva vyhrazena.',
      
      // Navigation
      navigationCTA: 'Zobrazit byty',
      navigationCTALink: '/byty',
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(siteSettingsData)
    
    console.log('✅ Site Settings data úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Co bylo naplněno:')
    console.log('   - Název webu a popis (SEO)')
    console.log('   - Kontaktní údaje (telefon, email, adresa)')
    console.log('   - Footer texty')
    console.log('   - Navigace (CTA tlačítko)')
    console.log('\n💡 Nyní můžeš editovat globální nastavení v Sanity Studio!')
    console.log('   http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importSiteSettings()



