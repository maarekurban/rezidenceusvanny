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

async function importHomepageComplete() {
  try {
    console.log('🏠 Importuji KOMPLETNÍ Homepage data...\n')

    const homepageData = {
      _type: 'homepageComplete',
      _id: 'homepage-complete-singleton',
      
      // === HERO SECTION ===
      heroTitle: 'Moderní bydlení\n<strong>v srdci UNESCO</strong>',
      heroBadge: 'III. Etapa v prodeji',
      heroDescription: 'Objevte 131 bytů a 14 rodinných domů v historické Kutné Hoře,\nkde se moderní architektura setkává s bohatou historií',
      heroStats: [
        { _key: 'stat1', number: '131', label: 'Bytů' },
        { _key: 'stat2', number: '14', label: 'Rodinných domů' },
        { _key: 'stat3', number: 'B', label: 'Energetická třída' },
      ],
      
      // === O PROJEKTU (UNESCO MĚSTO) ===
      aboutBadge: 'MĚSTO PAMÁTKY UNESCO',
      aboutTitle: 'Nechte se uchvátit\n<strong>krásou</strong> Kutné Hory',
      aboutDescription: [
        {
          _key: 'block1',
          _type: 'block',
          children: [{
            _key: 'span1',
            _type: 'span',
            marks: [],
            text: 'Město zapsané na Seznam světového kulturního dědictví UNESCO ve středověku označované za stříbrnou pokladnici českého království s malebným historickým centrem, vinicemi a celou řadou kaváren, cukráren a restaurací.'
          }],
          markDefs: [],
          style: 'normal'
        },
        {
          _key: 'block2',
          _type: 'block',
          children: [{
            _key: 'span2',
            _type: 'span',
            marks: [],
            text: 'Díky připojení Kutnohorska do integrovaného dopravního systému Prahy se do hlavního města pohodlně dostanete přímo z Kutné Hory v pracovních dnech i o víkendu.'
          }],
          markDefs: [],
          style: 'normal'
        }
      ],
      aboutVideoUrl: 'https://www.youtube.com/embed/VVlxe2bvtlg?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&loop=1&playlist=VVlxe2bvtlg',
      
      // === TŘI ETAPY VÝSTAVBY ===
      stagesBadge: 'PRŮBĚH REALIZACE',
      stagesTitle: 'Tři etapy výstavby',
      stagesDescription: 'Projekt je realizován ve třech etapách. První dvě jsou dokončeny, třetí etapa je nyní v prodeji.',
      stages: [
        {
          _key: 'stage1',
          name: 'Etapa I',
          number: 51,
          status: 'Prodáno',
          description: 'První etapa byla kompletně vyprodána a předána majitelům v roce 2023.',
          features: ['Dispozice 1+kk až 4+kk', 'Kolaudováno 2023', 'Všechny byty obsazeny'],
          featured: false,
        },
        {
          _key: 'stage2',
          name: 'Etapa II',
          number: 36,
          status: 'Dokončování',
          description: 'Druhá etapa je vyprodána, probíhá finalizace a předání bytů.',
          features: ['Dispozice 2+kk až 5+kk', 'Kolaudace Q4 2025', 'Všechny byty prodány'],
          featured: false,
        },
        {
          _key: 'stage3',
          name: 'Etapa III',
          number: 51,
          status: 'V prodeji',
          description: 'Třetí etapa je nyní v předprodeji. Zajistěte si výhodné ceny!',
          features: ['Dispozice 1+kk až 5+kk', 'Zahájení stavby 2025', 'Předprodejové ceny'],
          featured: true,
        },
      ],
      
      // === KVALITNÍ BYDLENÍ V UNESCO ZÓNĚ ===
      qualityBadge: 'Exkluzivita čtvrti',
      qualityTitle: 'Kvalitní bydlení v <strong>UNESCO</strong> zóně',
      qualityDescription: 'Hlavním cílem projektu Rezidence u sv. Anny je vytvoření moderního a dostupného domova ve městě, jehož historické centrum je zapsané na seznamu UNESCO. Umístění v klidné části města s dobrou dopravní dostupností do centra vytváří potenciál pro naplnění bytových potřeb i těch nejnáročnějších klientů.',
      distances: [
        { _key: 'dist1', time: '1 min', label: 'Autobusová zastávka' },
        { _key: 'dist2', time: '4 min', label: 'Venkovní sportoviště' },
        { _key: 'dist3', time: '6 min', label: 'Škola' },
        { _key: 'dist4', time: '12 min', label: 'Historické centrum' },
      ],
      
      // === PROČ SI KOUPIT BYT (SERVICES) ===
      whyBuyBadge: 'HLAVNÍ VÝHODY PROJEKTU',
      whyBuyTitle: 'Proč si koupit byt\nv naší <strong>rezidenci?</strong>',
      servicesBadge: 'HLAVNÍ VÝHODY PROJEKTU',
      servicesTitle: 'Proč si koupit byt\nv naší rezidenci?',
      services: [
        {
          _key: 'service1',
          title: 'Moderní dispozice',
          description: 'Pečlivě navržené dispozice bytů s důrazem na funkčnost a maximální využití prostoru',
          linkText: 'Zobrazit byty',
          linkUrl: '/byty',
        },
        {
          _key: 'service2',
          title: 'Úsporné bydlení',
          description: 'Energetická třída B zajišťuje nízké náklady na vytápění a provoz vašeho bytu',
          linkText: 'Více informací',
          linkUrl: '/o-projektu',
        },
        {
          _key: 'service3',
          title: 'Kvalitní materiály',
          description: 'Používáme pouze prověřené materiály od renomovaných dodavatelů s dlouhou životností',
          linkText: 'Více informací',
          linkUrl: '/o-projektu',
        },
        {
          _key: 'service4',
          title: 'Kompletní vybavení',
          description: 'Parkovací stání, sklepy a možnost individuálních úprav podle vašich představ',
          linkText: 'Zobrazit byty',
          linkUrl: '/byty',
        },
      ],
      
      // === MAPA AREÁLU ===
      mapBadge: 'MĚSTO PAMÁTKY UNESCO',
      mapTitle: 'Areál rezidenční čtvrti U sv. Anny',
      
      // === JAK PROBÍHÁ KOUPĚ ===
      processBadge: 'JAK TO FUNGUJE',
      processTitle: 'Jak probíhá koupě bytu',
      processDescription: 'Proces koupě bytu rozdělen do jednoduchých kroků',
      processSteps: [
        {
          _key: 'step1',
          title: 'Výběr bytu',
          description: 'Prohlédněte si dostupné byty a vyberte ten, který vám nejvíce vyhovuje',
        },
        {
          _key: 'step2',
          title: 'Rezervace',
          description: 'Uhraďte rezervační zálohu 100.000 Kč a byt je váš',
        },
        {
          _key: 'step3',
          title: 'Financování',
          description: 'Pomůžeme s hypotékou a postupnými platbami dle harmonogramu',
        },
        {
          _key: 'step4',
          title: 'Předání klíčů',
          description: 'Po dokončení výstavby vám předáme klíče od vašeho nového domova',
        },
      ],
      
      // === FOTOGALERIE ===
      galleryBadge: 'DOKONČENÉ BYTY',
      galleryTitle: 'Prohlédněte si <strong>naši práci</strong>',
      galleryDescription: 'Vytvářeli jsme moderní bydlení s důrazem na kvalitu materiálů a detailní zpracování. Podívejte se na dokončené byty z I. a II. etapy.',
      
      // === FAQ ===
      faqBadge: 'FAQ',
      faqTitle: 'Často kladené otázky',
      faqDescription: 'Máte dotazy ohledně nákupu bytu? Najděte odpovědi na nejčastější otázky.',
      faqItems: [
        {
          _key: 'faq1',
          question: 'Jaké jsou možnosti financování?',
          answer: 'Nabízíme spolupráci s většinou bank, které poskytují hypotéky. Cena se platí postupně dle harmonogramu výstavby v 5 splátkách. Rezervační záloha činí 100.000 Kč.',
        },
        {
          _key: 'faq2',
          question: 'Kdy bude dokončena výstavba III. etapy?',
          answer: 'Zahájení výstavby III. etapy je plánováno na rok 2025. Předpokládaná kolaudace je v roce 2026.',
        },
        {
          _key: 'faq3',
          question: 'Jsou možné individuální úpravy bytů?',
          answer: 'Ano, v rámci možností nabízíme úpravy dispozic a standardů vybavení podle přání klienta. Více informací získáte po kontaktování našeho obchodního oddělení.',
        },
        {
          _key: 'faq4',
          question: 'Je k dispozici parkovací stání?',
          answer: 'Ano, ke každému bytu je možné zakoupit parkovací stání ve venkovním parkování. Cena parkovacího stání je 290.000 Kč včetně DPH.',
        },
        {
          _key: 'faq5',
          question: 'Jaká je energetická třída bytů?',
          answer: 'Všechny byty v projektu jsou v energetické třídě B, což zajišťuje nízké náklady na provoz a vytápění.',
        },
      ],
      
      // === KONTAKTNÍ FORMULÁŘ ===
      contactBadge: 'KONTAKTUJTE NÁS',
      contactTitle: 'Máte zájem o byt?',
      contactDescription: 'Vyplňte kontaktní formulář a my se vám ozveme do 24 hodin',
      contactEmail: 'info@rezidenceusvanny.cz',
      
      // === VIDEO SEKCE (PROČ BYDLET) ===
      videoBadge: 'PROČ SI VYBRAT TENTO PROJEKT',
      videoTitle: 'Proč bydlet v\nRezidenci U sv. Anny',
      videoUrl: 'https://www.youtube.com/embed/VVlxe2bvtlg',
      videoFeatures: [
        {
          _key: 'vfeat1',
          title: 'UNESCO lokalita',
          description: 'Bydlení v historickém městě zapsaném na Seznam světového kulturního dědictví UNESCO',
        },
        {
          _key: 'vfeat2',
          title: 'Výborná dostupnost',
          description: 'Díky integraci do PID systému se do Prahy dostanete pohodlně a rychle',
        },
        {
          _key: 'vfeat3',
          title: 'Moderní bydlení',
          description: 'Nízkoenergetické byty s promyšleným dispozičním řešením a kvalitním vybavením',
        },
        {
          _key: 'vfeat4',
          title: 'Kompletní občanská vybavenost',
          description: 'Školy, školky, obchody a veškeré služby v dosahu pěší chůze',
        },
      ],
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(homepageData)
    
    console.log('✅ KOMPLETNÍ Homepage data úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Importované sekce:')
    console.log('   ✅ Hero (title, subtitle, badge, 3 statistiky)')
    console.log('   ✅ O projektu UNESCO (title, 2 odstavce, video)')
    console.log('   ✅ Tři etapy výstavby (3 karty: 51, 36, 51 bytů)')
    console.log('   ✅ Kvalitní bydlení (title, popis, 4 vzdálenosti)')
    console.log('   ✅ Proč si koupit byt (4 services/výhody)')
    console.log('   ✅ Mapa areálu (title, badge)')
    console.log('   ✅ Jak probíhá koupě (4 kroky)')
    console.log('   ✅ Fotogalerie (title, popis)')
    console.log('   ✅ FAQ (title, 5 otázek)')
    console.log('   ✅ Kontakt formulář (title, email)')
    console.log('   ✅ Video sekce (title, 4 vlastnosti)')
    console.log('\n💡 Nyní můžeš editovat VŠECHNY sekce v Sanity Studio!')
    console.log('   http://localhost:3000/studio')
    console.log('\n🎨 VŠECHNY sekce z homepage jsou naimportovány!')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importHomepageComplete()

