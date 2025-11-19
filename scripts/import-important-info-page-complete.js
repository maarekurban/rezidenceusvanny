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

async function uploadPDF(pdfPath) {
  try {
    const pdfBuffer = fs.readFileSync(path.resolve(__dirname, '..', 'public', pdfPath))
    const asset = await client.assets.upload('file', pdfBuffer, {
      filename: path.basename(pdfPath),
      contentType: 'application/pdf',
    })
    return {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`❌ Chyba při nahrávání PDF ${pdfPath}:`, error.message)
    return null
  }
}

async function importImportantInfoPage() {
  try {
    console.log('📄 Importuji Důležité informace stránku...\n')

    // Upload images
    console.log('📸 Nahrávám obrázky...')
    const heroImage = await uploadImage('images/DSC02841.jpg')
    const documentsBackground = await uploadImage('images/BD-1-16_vizualizace-01-min.jpg')

    // Upload PDFs
    console.log('📎 Nahrávám PDF dokumenty...')
    const penbA1 = await uploadPDF('dokumentace/PENB_A1.pdf')
    const penbA2 = await uploadPDF('dokumentace/PENB_A2.pdf')
    const penbB1 = await uploadPDF('dokumentace/PENB_B1.pdf')
    const standard = await uploadPDF('dokumentace/Standard provedení a vybavení - III. etapa.pdf')
    const zasady = await uploadPDF('dokumentace/Zásady pro provádění klientských změn.pdf')

    const importantInfoPageData = {
      _type: 'importantInfoPageComplete',
      _id: 'important-info-page-complete-singleton',
      
      // === HERO SECTION ===
      heroBadge: 'Informace pro kupující',
      heroTitle: 'Důležité',
      heroTitleHighlight: 'informace',
      heroDescription: 'Vše, co potřebujete vědět o financování, dokumentaci a procesu koupě bytu v naší rezidenci.',
      heroImage: heroImage,
      
      // === FINANCOVÁNÍ SECTION ===
      financingBadge: 'Financování',
      financingTitle: 'Financování',
      financingTitleHighlight: 'bytů',
      financingIntro: 'Při koupi bytu v naší rezidenci vám rádi pomůžeme s vyřízením hypotéky. Spolupracujeme s renomovanými bankovními institucemi, které nabízejí výhodné podmínky pro financování nemovitostí.',
      financingCards: [
        {
          _key: 'fin1',
          title: 'Výhodné úrokové sazby',
          description: 'Díky spolupráci s našimi bankovními partnery můžeme nabídnout velmi konkurenceschopné úrokové sazby.',
        },
        {
          _key: 'fin2',
          title: 'Komplexní asistence',
          description: 'Pomůžeme vám s celým procesem vyřízení hypotéky od A do Z včetně vyhodnocení vaší bonity.',
        },
        {
          _key: 'fin3',
          title: 'Partnerské banky',
          description: 'Spolupracujeme s předními finančními institucemi jako Komerční banka a Hypoteční banka.',
        },
        {
          _key: 'fin4',
          title: 'Rychlé vyřízení',
          description: 'Díky naší dlouholeté spolupráci s bankami dokážeme urychlit proces schvalování hypotéky.',
        },
      ],
      financingOutro: 'Pokud máte zájem o více informací ohledně financování, neváhejte nás kontaktovat. Rádi vám poskytneme nezávaznou konzultaci a pomůžeme najít nejvhodnější řešení pro váš rozpočet.',
      
      // === DOKUMENTY SECTION ===
      documentsBadge: 'Dokumentace',
      documentsTitle: 'Užitečné',
      documentsTitleHighlight: 'dokumenty',
      documentsDescription: 'Ke stažení najdete všechny důležité dokumenty týkající se projektu',
      documentsBackgroundImage: documentsBackground,
      documents: [
        { _key: 'doc1', title: 'PENB A1', file: penbA1 },
        { _key: 'doc2', title: 'PENB A2', file: penbA2 },
        { _key: 'doc3', title: 'PENB B1', file: penbB1 },
        { _key: 'doc4', title: 'Standard provedení a vybavení - III. etapa', file: standard },
        { _key: 'doc5', title: 'Zásady pro provádění klientských změn', file: zasady },
      ],
      
      // === KONTAKT FORMULÁŘ SECTION ===
      contactBadge: 'Kontaktujte nás',
      contactTitle: 'Máte zájem o byt ve III. etapě?',
      contactDescription: 'Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin',
      contactEmail: 'info@rezidenceusvanny.cz',
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(importantInfoPageData)
    
    console.log('✅ Důležité informace stránka úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Importované sekce:')
    console.log('   ✅ Hero (badge, nadpis, popis, obrázek)')
    console.log('   ✅ Financování (badge, nadpis, úvod, 4 karty, závěr)')
    console.log('   ✅ Dokumenty (badge, nadpis, 5 PDF, obrázek pozadí)')
    console.log('   ✅ Kontakt formulář (badge, nadpis, popis, email)')
    console.log('\n💡 Nyní můžeš editovat všechny texty a dokumenty v Sanity Studio!')
    console.log('   http://localhost:3000/studio')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importImportantInfoPage()

