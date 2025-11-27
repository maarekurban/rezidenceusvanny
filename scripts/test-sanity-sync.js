/**
 * SANITY SYNC TEST
 * 
 * Tento skript testuje, zda se změny v Sanity propisují na frontend.
 * Pro každé pole v Sanity zkontroluje:
 * 1. Zda data existují v Sanity
 * 2. Zda se data zobrazují na frontendu (localhost)
 * 3. Zda se změny propisují správně
 */

const { createClient } = require('@sanity/client');
const http = require('http');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Funkce pro fetch HTML z localhostu
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Test jednotlivých polí
async function testHomepage() {
  console.log('\n🏠 === HOMEPAGE TEST ===\n');
  
  try {
    // 1. Načti data ze Sanity
    const sanityData = await client.fetch(`*[_type == "homepageComplete"][0]{
      heroTitle,
      heroBadge,
      heroDescription,
      heroDescriptionLine2,
      aboutBadge,
      aboutTitle,
      aboutDescription,
      stagesTitle,
      qualityTitle,
      whyBuyTitle,
      mapTitle,
      processTitle,
      galleryTitle,
      faqTitle,
      contactTitle,
      videoTitle,
      videoUrl,
      'hasHeroImage': defined(heroImage),
      'hasStagesBackgroundImage': defined(stagesBackgroundImage),
      'hasWhyBuyBackgroundImage': defined(whyBuyBackgroundImage)
    }`);
    
    console.log('📊 SANITY DATA:');
    console.log('---------------');
    
    const fields = {
      'Hero Badge': sanityData?.heroBadge,
      'Hero Title': sanityData?.heroTitle,
      'Hero Description': sanityData?.heroDescription,
      'About Badge': sanityData?.aboutBadge,
      'About Title': sanityData?.aboutTitle,
      'Stages Title': sanityData?.stagesTitle,
      'Quality Title': sanityData?.qualityTitle,
      'Why Buy Title': sanityData?.whyBuyTitle,
      'Map Title': sanityData?.mapTitle,
      'Process Title': sanityData?.processTitle,
      'Gallery Title': sanityData?.galleryTitle,
      'FAQ Title': sanityData?.faqTitle,
      'Contact Title': sanityData?.contactTitle,
      'Video Title': sanityData?.videoTitle,
      'Video URL': sanityData?.videoUrl,
      'Hero Image': sanityData?.hasHeroImage ? '✅ Nahráno' : '❌ Chybí',
      'Stages BG Image': sanityData?.hasStagesBackgroundImage ? '✅ Nahráno' : '❌ Chybí',
      'Why Buy BG Image': sanityData?.hasWhyBuyBackgroundImage ? '✅ Nahráno' : '❌ Chybí',
    };
    
    for (const [field, value] of Object.entries(fields)) {
      const status = value ? '✅' : '❌';
      const displayValue = typeof value === 'string' && value.length > 50 
        ? value.substring(0, 50) + '...' 
        : value || 'CHYBÍ';
      console.log(`${status} ${field}: ${displayValue}`);
    }
    
    // 2. Zkontroluj HTML
    console.log('\n🌐 FRONTEND CHECK (http://localhost:3000):');
    console.log('------------------------------------------');
    
    try {
      const html = await fetchHTML('http://localhost:3000');
      
      // Testuj jednotlivé hodnoty
      const testsHTML = [
        { name: 'Hero Badge', value: sanityData?.heroBadge, fallback: 'III. Etapa v prodeji' },
        { name: 'Hero Title - "Moderní bydlení"', value: 'Moderní bydlení', required: true },
        { name: 'About Title contains text', value: sanityData?.aboutTitle?.substring(0, 20) || 'Nechte se uchvátit', partial: true },
      ];
      
      for (const test of testsHTML) {
        let found = false;
        
        if (test.value) {
          if (test.partial) {
            // Částečné porovnání
            const searchValue = test.value.replace(/<[^>]*>/g, '').substring(0, 15);
            found = html.includes(searchValue);
          } else {
            found = html.includes(test.value);
          }
        }
        
        if (!found && test.fallback) {
          found = html.includes(test.fallback);
          console.log(`⚠️  ${test.name}: Používá FALLBACK ("${test.fallback}")`);
        } else if (found) {
          console.log(`✅ ${test.name}: Zobrazeno`);
        } else {
          console.log(`❌ ${test.name}: NENALEZENO`);
        }
      }
      
    } catch (err) {
      console.log('❌ Nelze načíst HTML z localhost:3000');
      console.log('   Ujisti se, že server běží (npm run dev)');
    }
    
  } catch (error) {
    console.error('❌ Chyba při testování Homepage:', error.message);
  }
}

async function testImportantInfo() {
  console.log('\n📋 === DŮLEŽITÉ INFORMACE TEST ===\n');
  
  try {
    const sanityData = await client.fetch(`*[_type == "importantInfoPageComplete"][0]{
      heroTitle,
      financingTitle,
      documentsTitle,
      paymentScheduleTitle,
      faqTitle,
      'paymentScheduleCount': count(paymentSchedule),
      'faqItemsCount': count(faqItems),
      'documentsCount': count(documents)
    }`);
    
    console.log('📊 SANITY DATA:');
    console.log('---------------');
    
    const fields = {
      'Hero Title': sanityData?.heroTitle,
      'Financing Title': sanityData?.financingTitle,
      'Documents Title': sanityData?.documentsTitle,
      'Payment Schedule Title': sanityData?.paymentScheduleTitle,
      'FAQ Title': sanityData?.faqTitle,
      'Payment Schedule Items': sanityData?.paymentScheduleCount || 0,
      'FAQ Items': sanityData?.faqItemsCount || 0,
      'Documents': sanityData?.documentsCount || 0,
    };
    
    for (const [field, value] of Object.entries(fields)) {
      const status = value ? '✅' : '❌';
      const displayValue = typeof value === 'string' && value.length > 50 
        ? value.substring(0, 50) + '...' 
        : value || 'CHYBÍ';
      console.log(`${status} ${field}: ${displayValue}`);
    }
    
    console.log('\n🌐 FRONTEND CHECK (http://localhost:3000/dulezite-informace):');
    console.log('-------------------------------------------------------------');
    
    try {
      const html = await fetchHTML('http://localhost:3000/dulezite-informace');
      
      const testsHTML = [
        { name: 'Financing Title visible', value: 'Financování', required: true },
        { name: 'Documents section', value: 'Dokumenty', required: true },
        { name: 'Payment Schedule section', value: 'Platební kalendář', required: true },
        { name: 'FAQ section', value: 'otázky', required: true, partial: true },
      ];
      
      for (const test of testsHTML) {
        const found = html.toLowerCase().includes(test.value.toLowerCase());
        console.log(`${found ? '✅' : '❌'} ${test.name}: ${found ? 'Zobrazeno' : 'NENALEZENO'}`);
      }
      
    } catch (err) {
      console.log('❌ Nelze načíst stránku');
    }
    
  } catch (error) {
    console.error('❌ Chyba:', error.message);
  }
}

async function testContact() {
  console.log('\n📞 === KONTAKT TEST ===\n');
  
  try {
    const sanityData = await client.fetch(`*[_type == "contactPageComplete"][0]{
      heroTitle,
      contactIntroTitle,
      agent1Name,
      agent2Name,
      agent1Phone,
      agent2Phone,
      'hasAgent1Image': defined(agent1Image),
      'hasAgent2Image': defined(agent2Image)
    }`);
    
    console.log('📊 SANITY DATA:');
    console.log('---------------');
    
    const fields = {
      'Hero Title': sanityData?.heroTitle,
      'Contact Intro Title': sanityData?.contactIntroTitle,
      'Agent 1 Name': sanityData?.agent1Name,
      'Agent 2 Name': sanityData?.agent2Name,
      'Agent 1 Phone': sanityData?.agent1Phone,
      'Agent 2 Phone': sanityData?.agent2Phone,
      'Agent 1 Image': sanityData?.hasAgent1Image ? '✅ Nahráno' : '❌ Chybí',
      'Agent 2 Image': sanityData?.hasAgent2Image ? '✅ Nahráno' : '❌ Chybí',
    };
    
    for (const [field, value] of Object.entries(fields)) {
      const status = value ? '✅' : '❌';
      const displayValue = typeof value === 'string' && value.length > 50 
        ? value.substring(0, 50) + '...' 
        : value || 'CHYBÍ';
      console.log(`${status} ${field}: ${displayValue}`);
    }
    
    console.log('\n🌐 FRONTEND CHECK (http://localhost:3000/kontakt):');
    console.log('--------------------------------------------------');
    
    try {
      const html = await fetchHTML('http://localhost:3000/kontakt');
      
      const testsHTML = [
        { name: 'Contact page loads', value: 'Kontakt', required: true },
        { name: 'Agent section exists', value: 'agent', required: true, partial: true },
      ];
      
      for (const test of testsHTML) {
        const found = html.toLowerCase().includes(test.value.toLowerCase());
        console.log(`${found ? '✅' : '❌'} ${test.name}: ${found ? 'Zobrazeno' : 'NENALEZENO'}`);
      }
      
    } catch (err) {
      console.log('❌ Nelze načíst stránku');
    }
    
  } catch (error) {
    console.error('❌ Chyba:', error.message);
  }
}

// Hlavní funkce
async function runAllTests() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   SANITY SYNC TEST - FULL AUDIT       ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  console.log('📝 Tento test zkontroluje:');
  console.log('  1. Jaká data jsou v Sanity');
  console.log('  2. Zda se zobrazují na frontendu');
  console.log('  3. Zda používají Sanity data nebo fallback\n');
  
  await testHomepage();
  await testImportantInfo();
  await testContact();
  
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║           TEST DOKONČEN                ║');
  console.log('╚════════════════════════════════════════╝\n');
  
  console.log('💡 NEXT STEPS:');
  console.log('   1. Doplň chybějící data v Sanity Studio');
  console.log('   2. Spusť test znovu: node scripts/test-sanity-sync.js');
  console.log('   3. Zkontroluj, zda se změny projevily\n');
}

runAllTests().catch(console.error);



