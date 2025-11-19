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

async function importFamilyHousesPage() {
  try {
    console.log('🏡 Importuji Rodinné domy stránku...\n')

    // Upload hero image
    console.log('📸 Nahrávám hero obrázek...')
    const heroImage = await uploadImage('images/RD-A_vizualizace-zahrada-trava-min.jpg')

    // Upload gallery images (6 domů)
    console.log('📸 Nahrávám galerii domů...')
    const galleryImages = []
    const houseImages = [
      'images/RD-A_vizualizace-zahrada-trava-min.jpg',
      'images/KH_vizualizace_BD_04-min.jpg',
      'images/vizualizace_RD-C_01-min.jpg',
      'images/BD-1-16_vizualizace-01-min.jpg',
      'images/DSC02841.jpg',
      'images/DSC02745.jpg',
    ]
    
    for (let i = 0; i < houseImages.length; i++) {
      const img = await uploadImage(houseImages[i])
      if (img) {
        galleryImages.push({
          _key: `house${i + 1}`,
          ...img,
        })
      }
    }

    // Upload CTA image
    console.log('📸 Nahrávám CTA obrázek...')
    const ctaImage = await uploadImage('images/DSC02913.jpg')

    const familyHousesPageData = {
      _type: 'familyHousesPageComplete',
      _id: 'family-houses-page-complete-singleton',
      
      // === HERO SECTION ===
      heroBadge: 'Portfolio realizací',
      heroTitle: 'Realizace',
      heroTitleHighlight: 'rodinných domů',
      heroDescription: '14 moderních rodinných domů s pozemky až 613 m². Všechny domy jsou vyprodány a obývány spokojenými majiteli.',
      heroImage: heroImage,
      
      // === QUICK STATS ===
      statHousesCount: '14',
      statHousesLabel: 'Rodinných domů',
      statDispositions: '4-5+kk',
      statDispositionsLabel: 'Dispozice',
      statArea: '138-156',
      statAreaLabel: 'm² plocha',
      statPlot: '400-613',
      statPlotLabel: 'm² pozemek',
      
      // === SOLD OUT NOTICE ===
      soldOutTitle: 'Všechny rodinné domy jsou vyprodány',
      soldOutDescription1: 'Děkujeme za zájem! Rodinné domy z I. etapy jsou všechny prodány a obývány spokojenými majiteli.',
      soldOutDescription2: '✨ Aktuálně jsou k dispozici byty z III. etapy',
      soldOutButtonText: 'Prohlédnout dostupné byty →',
      soldOutButtonLink: '/byty',
      
      // === HOUSES GALLERY ===
      galleryBadge: 'Naše realizace',
      galleryTitle: 'Galerie',
      galleryTitleHighlight: 'rodinných domů',
      galleryDescription: 'Prohlédněte si naši realizaci moderních rodinných domů s individuálním designem a kvalitním provedením.',
      galleryImages: galleryImages,
      
      // === RELATED CONTENT - Byty CTA ===
      ctaBadge: 'Aktuálně v prodeji',
      ctaTitle: 'Byty III. etapy',
      ctaTitleHighlight: 'jsou k dispozici',
      ctaDescription: 'Máme k dispozici moderní byty s dispozicemi 1+kk až 5+kk v III. etapě projektu. Využijte předprodejových cen.',
      ctaImage: ctaImage,
      ctaButtonText: 'Zobrazit dostupné byty',
      ctaButtonLink: '/byty',
    }

    // Vytvoření nebo aktualizace dokumentu
    const result = await client.createOrReplace(familyHousesPageData)
    
    console.log('✅ Rodinné domy stránka úspěšně importována!')
    console.log(`   Document ID: ${result._id}`)
    console.log('\n📝 Importované sekce:')
    console.log('   ✅ Hero (badge, nadpis, popis, 4 statistiky, obrázek)')
    console.log('   ✅ Sold Out Notice (nadpis, 2 odstavce, tlačítko)')
    console.log('   ✅ Galerie (badge, nadpis, popis, 6 obrázků)')
    console.log('   ✅ CTA sekce (badge, nadpis, popis, obrázek, tlačítko)')
    console.log('\n💡 Nyní můžeš editovat všechny texty a obrázky v Sanity Studio!')
    console.log('   http://localhost:3000/studio')
    console.log('\n🎉 VŠECH 5 STRÁNEK KOMPLETNĚ NAIMPORTOVÁNO!')

  } catch (error) {
    console.error('❌ CHYBA při importu:', error)
    process.exit(1)
  }
}

// Spuštění
importFamilyHousesPage()

