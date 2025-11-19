const { createClient } = require('@sanity/client')
const path = require('path')

const envPath = path.resolve(__dirname, '..', '.env.local')
require('dotenv').config({ path: envPath })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function checkTypes() {
  try {
    const apartment = await client.fetch(`
      *[_type == "apartment" && number == "1.02"][0] {
        number,
        rooms[] {
          _type,
          _key,
          number,
          name,
          area
        },
        outdoorSpaces[] {
          _type,
          _key,
          type,
          area
        }
      }
    `)

    console.log('🔍 Kontrola _type u bytu 1.02:\n')
    console.log('MÍSTNOSTI:')
    console.log(JSON.stringify(apartment.rooms, null, 2))
    console.log('\nVENKOVNÍ PROSTORY:')
    console.log(JSON.stringify(apartment.outdoorSpaces, null, 2))
  } catch (error) {
    console.error('❌ Chyba:', error.message)
  }
}

checkTypes()

