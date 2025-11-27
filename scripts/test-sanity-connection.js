const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function testConnection() {
  console.log('\n🔍 SANITY CONNECTION TEST\n');
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
  console.log('Token:', process.env.SANITY_API_TOKEN ? '✅ Nastavený' : '❌ Chybí');
  console.log('\n---\n');

  try {
    // Test 1: Homepage Complete
    console.log('TEST 1: Homepage Complete data');
    const homepageData = await client.fetch(`*[_type == "homepageComplete"][0]`);
    console.log('✅ Homepage data:', homepageData ? 'NALEZENO' : '❌ NENALEZENO');
    if (homepageData) {
      console.log('   - heroTitle:', homepageData.heroTitle ? '✅' : '❌');
      console.log('   - aboutTitle:', homepageData.aboutTitle ? '✅' : '❌');
      console.log('   - videoUrl:', homepageData.videoUrl ? '✅' : '❌');
    }
    console.log('\n---\n');

    // Test 2: Important Info Page Complete
    console.log('TEST 2: Important Info Page Complete data');
    const importantInfoData = await client.fetch(`*[_type == "importantInfoPageComplete"][0]`);
    console.log('✅ Important Info data:', importantInfoData ? 'NALEZENO' : '❌ NENALEZENO');
    if (importantInfoData) {
      console.log('   - heroTitle:', importantInfoData.heroTitle ? '✅' : '❌');
      console.log('   - financingTitle:', importantInfoData.financingTitle ? '✅' : '❌');
      console.log('   - paymentScheduleTitle:', importantInfoData.paymentScheduleTitle ? '✅' : '❌');
      console.log('   - faqTitle:', importantInfoData.faqTitle ? '✅' : '❌');
    }
    console.log('\n---\n');

    // Test 3: Contact Page Complete
    console.log('TEST 3: Contact Page Complete data');
    const contactData = await client.fetch(`*[_type == "contactPageComplete"][0]`);
    console.log('✅ Contact Page data:', contactData ? 'NALEZENO' : '❌ NENALEZENO');
    if (contactData) {
      console.log('   - heroTitle:', contactData.heroTitle ? '✅' : '❌');
      console.log('   - agent1Name:', contactData.agent1Name ? '✅' : '❌');
      console.log('   - agent2Name:', contactData.agent2Name ? '✅' : '❌');
    }
    console.log('\n---\n');

    // Test 4: Family Houses Page Complete
    console.log('TEST 4: Family Houses Page Complete data');
    const familyHousesData = await client.fetch(`*[_type == "familyHousesPageComplete"][0]`);
    console.log('✅ Family Houses data:', familyHousesData ? 'NALEZENO' : '❌ NENALEZENO');
    if (familyHousesData) {
      console.log('   - heroTitle:', familyHousesData.heroTitle ? '✅' : '❌');
    }
    console.log('\n---\n');

    // Test 5: Apartments
    console.log('TEST 5: Apartments data');
    const apartmentsData = await client.fetch(`*[_type == "apartment"] | order(building asc, number asc)`);
    console.log('✅ Apartments:', apartmentsData ? `NALEZENO ${apartmentsData.length} bytů` : '❌ NENALEZENO');
    console.log('\n---\n');

    // Test 6: All document types
    console.log('TEST 6: All document types in Sanity');
    const allTypes = await client.fetch(`array::unique(*[]._type)`);
    console.log('✅ Nalezené document types:', allTypes);
    console.log('\n---\n');

    console.log('✅ VŠECHNY TESTY DOKONČENY\n');
  } catch (error) {
    console.error('❌ CHYBA:', error.message);
    console.error('Stack:', error.stack);
  }
}

testConnection();



