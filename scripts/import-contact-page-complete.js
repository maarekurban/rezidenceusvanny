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

async function importContactPage() {
  try {
    console.log('📞 Importuji Kontakt stránku...\n')

    // Upload images
    console.log('📸 Nahrávám obrázky...')
    const heroImage = await uploadImage('images/DJI_0526.jpg')
    const quickInfoBackground = await uploadImage('images/DSC02913.jpg')

    const contactPageData = {
      _type: 'contactPageComplete',
      _id: 'contact-page-complete-singleton',
      
      // === HERO SECTION ===
      heroBadge: 'Rezidenční čtvrť U sv. Anny',
      heroTitle: 'Kontaktní',
      heroTitleHighlight: 'informace',
      heroDescription: 'V rámci webu se dozvíte spoustu důležitých informací. Nic ale nenahradí osobní prohlídku přímo v místě výstavby. Ozvěte se nám a vše vám ukážeme, vysvětlíme.',
      heroImage: heroImage,
      
      // === CONTACT INTRO SECTION ===
      introBadge: 'Kontaktujte nás',
      introTitle: 'Neváhejte se na nás',
      introTitleHighlight: 'obrátit',
      introDescription: 'Odpovědi na nejčastější dotazy najdete v sekci Důležité informace. Pokud odpověď na otázku nenajdete jsme Vám plně k dispozici. Můžeme si zavolat, zorganizovat online schůzku, nebo se potkat přímo v Kutné hoře. Poptávku můžete zadat také pomocí poptávkového formuláře níže.',
      
      // === AGENTS SECTION ===
      agentsTitle: 'Realitní makléři',
      agents: [
        {
          _key: 'agent1',
          name: 'Terezie Příhodová',
          title: 'Realitní makléřka',
          phone: '+420 724 218 841',
          email: 'terezie.prihodova@anomia.cz',
          facebookUrl: '#',
        },
        {
          _key: 'agent2',
          name: 'Ing. Jan Křivánek',
          title: 'Realitní makléř',
          phone: '+420 775 908 881',
          email: 'jan.krivanek@anomia.cz',
        },
      ],
      
      // === FORM SECTION ===
      formTitle: 'Poptávkový formulář',
      
      // === QUICK INFO CARDS SECTION ===
      quickInfoBadge: 'Máte otázky?',
      quickInfoTitle: 'Volné',
      quickInfoTitleHighlight: 'byty',
      quickInfoTitleEnd: 'stále k dispozici',
      quickInfoBackgroundImage: quickInfoBackground,
      quickInfoLocation: 'Kutná Hora',
      quickInfoPhone: '+420 724 218 841',
      quickInfoEmail: 'info@rezidenceusvanny.cz',
      quickInfoTotalHomes: 145,
      
      // === INSTAGRAM SECTION ===
      instagramTitle: 'Sledujte nás na',
      instagramTitleHighlight: 'Instagramu',
      instagramDescription: 'Chcete být v obraze o novinkách z naší rezidence? Sledujte náš Instagram profil pro aktuální fotky, videa a informace o projektu.',
      instagramUrl: 'https://www.instagram.com/anomia__rk/',
      instagramHandle: '@anomia__rk',
      
      // === MAP SECTION ===
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2567.4516369657385!2d15.247726677480854!3d49.946629871500406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c41bcb45d5ccf%3A0x6414c40edc19dc61!2zUmV6aWRlbsSNbsOtIMSNdHZyxaUgVSBzdi4gQW5ueQ!5e0!3m2!1scs!2scz!4v1762443431743!5m2!1scs!2scz',
      
      // === CTA SECTION ===
      ctaTitle: 'Chcete se podívat na místo?',
      ctaDescription: 'Rádi vám osobně ukážeme projekt a odpovíme na všechny vaše otázky přímo na místě.',
      ctaButton1Text: 'Prohlédnout byty',
      ctaButton1Link: '/byty',
      ctaButton2Text: 'Zavolat makléři',
      ctaButton2Phone: '+420724218841',
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(contactPageData)
    
    console.log('✅ Kontakt stránka úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Importované sekce:')
    console.log('   ✅ Hero (badge, nadpis, popis, obrázek)')
    console.log('   ✅ Úvod (badge, nadpis, popis)')
    console.log('   ✅ Makléři (2 kontakty s tel/email)')
    console.log('   ✅ Formulář (nadpis)')
    console.log('   ✅ Quick Info karty (4 karty + obrázek pozadí)')
    console.log('   ✅ Instagram (nadpis, popis, URL)')
    console.log('   ✅ Mapa (Google Maps embed)')
    console.log('   ✅ CTA (nadpis, popis, 2 tlačítka)')
    console.log('\n💡 Nyní můžeš editovat všechny texty a kontakty v Sanity Studio!')
    console.log('   http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importContactPage()


