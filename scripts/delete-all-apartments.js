const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function deleteAllApartments() {
  try {
    console.log('🗑️  Mažu všechny byty ze Sanity...')
    
    // Najít všechny byty
    const apartments = await client.fetch('*[_type == "apartment"]')
    
    if (apartments.length === 0) {
      console.log('ℹ️  Žádné byty k smazání.')
      return
    }
    
    console.log(`📊 Nalezeno ${apartments.length} bytů`)
    
    // Smazat je všechny
    const transaction = client.transaction()
    apartments.forEach(apt => {
      transaction.delete(apt._id)
    })
    
    await transaction.commit()
    
    console.log(`✅ Smazáno ${apartments.length} bytů`)
    
  } catch (error) {
    console.error('❌ Chyba při mazání:', error.message)
    process.exit(1)
  }
}

deleteAllApartments()


