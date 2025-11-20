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
      
      // === PLATEBNÍ KALENDÁŘ ===
      paymentSchedule: [
        {
          _key: 'payment1',
          step: 'Záloha',
          amount: '100 000 Kč',
          description: 'Rezervační záloha do 10 dnů po podpisu rezervační smlouvy.',
        },
        {
          _key: 'payment2',
          step: '1. platba',
          amount: '15%',
          description: '15 % kupní ceny do 10 dnů od podpisu smlouvy o smlouvě budoucí.',
        },
        {
          _key: 'payment3',
          step: '2. platba',
          amount: '30%',
          description: '30 % kupní ceny po dokončení hrubé stavby.',
        },
        {
          _key: 'payment4',
          step: '3. platba',
          amount: '20%',
          description: '20 % kupní ceny po dokončení hrubých instalací a výplní otvorů mimo prostory interiéru.',
        },
        {
          _key: 'payment5',
          step: '4. platba',
          amount: '20%',
          description: '20 % kupní ceny po dokončení fasády, omítek a podlah bez finální vrstvy (splatnost cca 14 měsíců od zahájení výstavby).',
        },
        {
          _key: 'payment6',
          step: '5. platba',
          amount: '15%',
          description: '15 % kupní ceny po kolaudaci a změně zápisu převáděné jednotky v katastru nemovitostí z rozestavěné na dokončenou.',
        },
      ],
      
      // === FAQ SECTION ===
      faqItems: [
        {
          _key: 'faq1',
          question: 'Co dělat v případě zájmu o koupi nemovitosti v projektu?',
          answer: 'Kontaktním fomulářem, mailem nebo telefonicky nám oznámíte zájem o vybranou nemovitost. Ověříme její dostupnost, sdělíme Vám veškeré důležité informace a v případě přetrvávajícího zájmu připravíme návrhy smluv, které Vám následně zašleme k odsouhlasení do emailu. V případě zájmu není problém domluvit se na úvodní, osobní schůzce přímo v Kutné Hoře, Kolíně, nebo v Praze.',
        },
        {
          _key: 'faq2',
          question: 'Pomůžete mi s financováním?',
          answer: 'Financování můžete řešit po vlastní ose nebo ve spolupráci s námi doporučenými hypotečními specialisty. Pokud spolupracujete s nimi, je proces jednodušší a rychlejší. Získáte také zvýhodněné úrokové sazby a odhady zdarma v bankách, kde je projekt schválený.',
        },
        {
          _key: 'faq3',
          question: 'Jaká je energetická náročnost budov?',
          answer: 'Novostavby jsou koncipovány jako nízkoenergetické a spadají do energetické třídy B. Díky tomu zaplatíte výrazně méně na platbách za energie. Průkaz energetické náročnosti je ke stažení v sekci Užitečné dokumenty.',
        },
        {
          _key: 'faq4',
          question: 'Je možné si k bytu koupit více parkovacích míst?',
          answer: 'Ke každému bytu je zatím možnost zakoupit pouze jedno vyhrazené parkovací stání. Pokud budete mít zájem o více míst, dejte nám vědět a zkusíme vymyslet individuální řešení.',
        },
        {
          _key: 'faq5',
          question: 'Co znamená styl Shell & core?',
          answer: 'Shell & core, také známý jako Shell and core je způsob výstavby prostor, kde se prostory ponechají v základní úpravě, které si budoucí majitel zařídí dle svého přání sám či s pomocí architekta. Vychází z anglického shell – plášť, fasáda a core – jádro, u staveb struktura a vertikální komunikace.',
        },
        {
          _key: 'faq6',
          question: 'Jsou možné klientské změny?',
          answer: 'Ano. Klientské změny je možné řešit v průběhu výstavby. Při podpisu smlouvy dostanete zásady pro provedení klientských změn.',
        },
        {
          _key: 'faq7',
          question: 'Jaká je dopravní dostupnost do Prahy?',
          answer: 'Hned u rezidenční čtvrti se nachází frekventovaná autobusová zastávka, odkud se dostanete na vlakové nádraží. Vlakový přímý spoj jede na Hlavní nádraží v Praze 58 min. Autem se dostanete na kraj Prahy za 51 minut do centra Prahy za cca 1 hodinu a 8 minut, záleží na dopravní situaci. Díky připojení Kutnohorska do integrovaného dopravního systému Prahy se do hlavního města pohodlně dostanete v pracovních dnech i o víkendu.',
        },
        {
          _key: 'faq8',
          question: 'Kutná hora je na seznamu UNESCO, nebude mě rušit přehnaný turistický ruch?',
          answer: 'Vzhledem k umístění projektu na kraji města u přírody s dobrou dopravní dostupností do centra určitě nikoliv. Naopak díky turistickému ruchu je velký tlak na poskytování kvalitních služeb, z kterého profitují i místní rezidenti.',
        },
      ],
      
      // === CTA SECTION ===
      ctaTitle: 'Máte další dotazy?',
      ctaDescription: 'Rádi vám odpovíme na všechny vaše otázky a pomůžeme s výběrem vhodného bytu nebo domu.',
      ctaPhone: '+420 724 218 841',
      ctaEmail: 'info@rezidenceusvanny.cz',
      
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
    console.log('   ✅ Platební kalendář (6 plateb: Záloha + 5 splátek)')
    console.log('   ✅ FAQ (8 otázek a odpovědí)')
    console.log('   ✅ CTA (nadpis, popis, telefon, email)')
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


