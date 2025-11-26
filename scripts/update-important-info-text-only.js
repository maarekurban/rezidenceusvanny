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

async function updateTextData() {
  try {
    console.log('📝 Aktualizuji textová data pro Platební kalendář a FAQ...\n')

    // Patch existing document - pouze textová data
    const result = await client
      .patch('important-info-page-complete-singleton')
      .set({
        // === PLATEBNÍ KALENDÁŘ ===
        paymentScheduleBadge: 'Flexibilní',
        paymentScheduleTitle: 'Splátkový <strong>kalendář</strong>',
        paymentScheduleDescription: 'Placení kupní ceny bytu probíhá postupně s tím, jak postupuje výstavba projektu. Po podpisu rezervační smlouvy podepisujete smlouvu o smlouvě budoucí kupní.',
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
        faqBadge: 'Máte otázky?',
        faqTitle: 'Nejčastější <strong>dotazy</strong>',
        faqDescription: 'Ze zkušeností z prvních dvou etap víme, co klienty nejčastěji zajímá. Pokud odpověď na otázku nenajdete, neváhejte kontaktovat náš prodejní tým.',
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
      })
      .commit()
    
    console.log('✅ Data úspěšně aktualizována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Aktualizované sekce:')
    console.log('   ✅ Platební kalendář (badge, nadpis, popis, 6 plateb)')
    console.log('   ✅ FAQ (badge, nadpis, popis, 8 otázek)')
    console.log('\n💡 Refresh stránku v prohlížeči a data se zobrazí!')
    console.log('   http://localhost:3000/dulezite-informace')

  } catch (error) {
    console.error('❌ CHYBA při aktualizaci:', error)
    process.exit(1)
  }
}

// Spuštění
updateTextData()


