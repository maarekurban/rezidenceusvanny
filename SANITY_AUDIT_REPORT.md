# 🔍 SANITY.IO INTEGRACE - AUDIT REPORT

**Projekt:** Rezidence U sv. Anny  
**Datum auditu:** 26. listopadu 2025  
**Status:** ⚠️ PROBLÉMY IDENTIFIKOVÁNY

---

## 📊 EXECUTIVE SUMMARY

Sanity.io integrace má **7 kritických problémů**, které způsobují, že změny v Sanity Studio se nepropisují správně do veřejné verze webu. Problémy se týkají **chybějících dat**, **cache strategie** a **konfigurace**.

### ✅ CO FUNGUJE SPRÁVNĚ:
1. ✅ Sanity API připojení funguje
2. ✅ Environment variables jsou nastavené lokálně
3. ✅ Sanity Studio je dostupné na `/studio`
4. ✅ Schema definice jsou korektní
5. ✅ Frontend má fallback data
6. ✅ `parseTitle` helper funguje správně

### ❌ KRITICKÉ PROBLÉMY:
1. ❌ **Chybějící data v Sanity** (obrázky, texty)
2. ❌ **Nekonsistentní cache strategie** (Homepage & Kontakt)
3. ❌ **useCdn: false** v produkci (výkon)
4. ❌ **Chybějící Vercel environment variables** (pravděpodobně)
5. ❌ **Neúplné importy** dat do Sanity
6. ❌ **Chybějící revalidation strategie**
7. ❌ **Žádné webhooks** pro auto-update

---

## 🔴 PROBLÉM #1: CHYBĚJÍCÍ DATA V SANITY

### **Homepage Complete:**
| Pole | Status | Poznámka |
|------|--------|----------|
| `heroTitle` | ✅ | Data OK |
| `aboutTitle` | ✅ | Data OK |
| `videoUrl` | ✅ | Data OK |
| `heroImage` | ❌ | **CHYBÍ** |
| `stagesBackgroundImage` | ❌ | **CHYBÍ** |
| `whyBuyBackgroundImage` | ❌ | **CHYBÍ** |

### **Důležité informace Complete:**
| Pole | Status | Poznámka |
|------|--------|----------|
| `heroTitle` | ✅ | Data OK |
| `financingTitle` | ✅ | Data OK |
| `documentsTitle` | ✅ | Data OK |
| `paymentScheduleTitle` | ✅ | Data OK |
| `faqTitle` | ❌ | **CHYBÍ** |
| `paymentSchedule[]` | ❌ | **0 items** (mělo by být 6) |
| `faqItems[]` | ❌ | **0 items** (mělo by být 8) |
| `heroImage` | ✅ | Data OK |
| `documentsBackgroundImage` | ✅ | Data OK |
| `documents[]` | ✅ | 5 items |

### **Kontakt Complete:**
| Pole | Status | Poznámka |
|------|--------|----------|
| `heroTitle` | ✅ | Data OK |
| `agent1Name` | ❌ | **CHYBÍ** |
| `agent2Name` | ❌ | **CHYBÍ** |
| `agent1Image` | ❌ | **CHYBÍ** |
| `agent2Image` | ❌ | **CHYBÍ** |
| `formBackgroundImage` | ❌ | **CHYBÍ** |
| `heroImage` | ✅ | Data OK |

### **IMPACT:**
- 🔴 **VYSOKÝ** - Frontend zobrazuje fallback data místo Sanity dat
- 🔴 Změny v Sanity Studio se **neprojeví** na webu
- 🔴 Klient vidí **zastaralý obsah**

### **ROOT CAUSE:**
- Import skripty nedokončily nahrání všech dat
- Permission errors při uploadu obrázků
- Data nebyla manuálně doplněna v Sanity Studio

---

## 🔴 PROBLÉM #2: NEKONSISTENTNÍ CACHE STRATEGIE

### **Současný stav:**

| Stránka | Cache Strategie | Status |
|---------|----------------|--------|
| Homepage | `client.fetch()` **BEZ** `{ cache: 'no-store' }` | ❌ PROBLÉM |
| Kontakt | `client.fetch()` **BEZ** `{ cache: 'no-store' }` | ❌ PROBLÉM |
| Důležité informace | `client.fetch()` **S** `{ cache: 'no-store' }` | ✅ OK |
| Byty | `client.fetch()` **S** `{ cache: 'no-store' }` | ✅ OK |
| Rodinné domy | `client.fetch()` **S** `{ cache: 'no-store' }` | ✅ OK |

### **Problematický kód:**

**Homepage (`app/page.tsx:26`):**
```typescript
const data = await client.fetch(`*[_type == "homepageComplete"][0]`)
// ❌ CHYBÍ: { cache: 'no-store' }
```

**Kontakt (`app/kontakt/page.tsx:28`):**
```typescript
const data = await client.fetch(`*[_type == "contactPageComplete"][0]{...}`)
// ❌ CHYBÍ: { cache: 'no-store' }
```

### **IMPACT:**
- 🔴 **VYSOKÝ** - Data se cachují a **nerefreshují** při změně v Sanity
- 🔴 Klient musí **vymazat cache** nebo čekat na automatický revalidate
- 🔴 ISR (Incremental Static Regeneration) není nakonfigurovaný

### **ROOT CAUSE:**
- Nepozornost při implementaci
- Různé části kódu dělány v různých časech
- Chybějící konzistentní code review

---

## 🔴 PROBLÉM #3: useCdn: false V PRODUKCI

### **Současný stav:**

**`sanity/lib/client.ts:7`:**
```typescript
export const client = createClient({
  projectId: 'eqq7fbzc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // ❌ PROBLÉM - mělo by být dynamic
})
```

### **Správná konfigurace:**
```typescript
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqq7fbzc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // ✅ Dynamic podle prostředí
  token: process.env.SANITY_API_TOKEN,
})
```

### **IMPACT:**
- 🟡 **STŘEDNÍ** - Pomalejší načítání v produkci
- 🟡 Vyšší náklady na API requesty
- 🟡 Horší uživatelský zážitek (TTFB)

### **ROOT CAUSE:**
- Kód byl nastaven pro development
- Nepřevedeno do production módu

---

## 🔴 PROBLÉM #4: VERCEL ENVIRONMENT VARIABLES

### **Lokální prostředí:**
✅ `.env.local` obsahuje:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk6R21vel...
```

### **Vercel prostředí:**
❓ **NELZE OVĚŘIT** - nemám přístup k Vercel dashboardu

### **MOŽNÝ PROBLÉM:**
- ❌ Environment variables nejsou nastavené na Vercelu
- ❌ Nebo mají špatné hodnoty
- ❌ Nebo nejsou dostupné pro production build

### **IMPACT:**
- 🔴 **KRITICKÝ** - Pokud chybí na Vercelu, web **nemůže** načíst data ze Sanity
- 🔴 Frontend zobrazí pouze fallback data

### **OVĚŘENÍ:**
```bash
# V Vercel Dashboard -> Settings -> Environment Variables
# Zkontrolovat:
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk6R21vel... (volitelné pro read-only)
```

---

## 🔴 PROBLÉM #5: NEÚPLNÉ IMPORTY DAT

### **Import scripty:**
| Script | Status | Poznámka |
|--------|--------|----------|
| `import-homepage-complete.js` | ⚠️ | Nenahrál obrázky |
| `import-important-info-page-complete.js` | ⚠️ | Nenahrál FAQ data |
| `import-contact-page-complete.js` | ⚠️ | Nenahrál agent data |
| `update-important-info-text-only.js` | ❌ | Permission error |

### **Důvody selhání:**
1. **Permission errors** - API token nemá dostatečná práva
2. **Neúplné skripty** - některá data nebyla zahrnuta
3. **Manuální doplnění** - některá data měla být vyplněna ručně, ale nebyla

### **IMPACT:**
- 🔴 **VYSOKÝ** - Velká část obsahu chybí v Sanity
- 🔴 Klient nemůže upravovat celý obsah přes Sanity Studio

---

## 🔴 PROBLÉM #6: CHYBĚJÍCÍ REVALIDATION

### **Současný stav:**
- ❌ Žádná `revalidate` konfigurace
- ❌ Žádné ISR (Incremental Static Regeneration)
- ❌ Pouze `cache: 'no-store'` na některých stránkách

### **Doporučení:**
```typescript
// Option A: ISR s časovým revalidate
export const revalidate = 60 // revalidate každých 60 sekund

// Option B: On-demand revalidation přes webhook
// Sanity webhook -> Next.js API route -> revalidatePath()
```

### **IMPACT:**
- 🟡 **STŘEDNÍ** - Změny se projeví až po rebuild/redeploy
- 🟡 Nebo až po manuálním revalidate
- 🟡 Horší developer experience

---

## 🔴 PROBLÉM #7: CHYBĚJÍCÍ WEBHOOKS

### **Současný stav:**
- ❌ Žádné Sanity webhooks nakonfigurované
- ❌ Změny v Sanity nevyvolají auto-update webu

### **Doporučené řešení:**

#### **1. Vytvořit webhook endpoint v Next.js:**
```typescript
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { type, slug } = await request.json()
  
  if (type === 'homepageComplete') {
    await revalidatePath('/')
  } else if (type === 'contactPageComplete') {
    await revalidatePath('/kontakt')
  }
  
  return Response.json({ revalidated: true })
}
```

#### **2. Nastavit webhook v Sanity:**
- URL: `https://rezidenceusvanny.vercel.app/api/revalidate`
- Secret: generovaný token
- Trigger: On create/update/delete

### **IMPACT:**
- 🔴 **VYSOKÝ** - Bez webhooks musí klient čekat na rebuild
- 🔴 Změny se neprojeví okamžitě
- 🔴 Horší UX pro content editaci

---

## 📋 PRIORITY OPRAV

### **🔥 KRITICKÉ (Dělat ASAP):**
1. **Doplnit chybějící data v Sanity Studio** (manuálně)
   - Homepage: obrázky (heroImage, stagesBackgroundImage, whyBuyBackgroundImage)
   - Důležité informace: faqTitle, paymentSchedule items, faqItems
   - Kontakt: agent1/2 data, obrázky
2. **Ověřit Vercel environment variables**
   - Zkontrolovat že jsou správně nastavené
   - Redeploy pokud byly změněny
3. **Opravit cache strategii na Homepage & Kontakt**
   - Přidat `{ cache: 'no-store' }` do fetch calls

### **⚠️ VYSOKÉ (Dělat tento týden):**
4. **Změnit `useCdn` na dynamic**
   - `useCdn: process.env.NODE_ENV === 'production'`
5. **Implementovat Sanity webhooks**
   - Vytvořit `/api/revalidate` endpoint
   - Nastavit webhooks v Sanity projektu

### **📝 STŘEDNÍ (Dělat příští týden):**
6. **Implementovat ISR strategii**
   - Přidat `revalidate` config
   - Nebo on-demand revalidation
7. **Audit importních skriptů**
   - Opravit permission issues
   - Dokončit nahrání všech dat

---

## 🔧 TECHNICKÉ DETAILY

### **Testované endpointy:**
```
✅ API Connection: https://eqq7fbzc.api.sanity.io
✅ Studio: http://localhost:3000/studio
✅ Homepage: http://localhost:3000
✅ Kontakt: http://localhost:3000/kontakt
✅ Důležité informace: http://localhost:3000/dulezite-informace
```

### **Testované query:**
```groq
// Homepage
*[_type == "homepageComplete"][0]

// Important Info
*[_type == "importantInfoPageComplete"][0]

// Contact
*[_type == "contactPageComplete"][0]

// All types
array::unique(*[]._type)
```

### **Nalezené document types:**
```
- apartment
- apartmentsPage
- apartmentsPageComplete
- contactPageComplete
- familyHousesPageComplete
- homepage
- homepageComplete
- importantInfoPageComplete
- sanity.fileAsset
- sanity.imageAsset
- siteSettings
```

---

## 📖 DOPORUČENÍ PRO KLIENTA

### **Krátkodobé (do 24h):**
1. Otevřít Sanity Studio: `http://localhost:3000/studio` (nebo https://rezidenceusvanny.vercel.app/studio)
2. Vyplnit chybějící data manuálně:
   - Homepage Complete → doplnit obrázky
   - Important Info Page Complete → doplnit FAQ, Payment Schedule
   - Contact Page Complete → doplnit agent data
3. Po vyplnění kliknout **"Publish"**

### **Dlouhodobé (do týdne):**
1. Implementovat automatické webhooks
2. Nastavit monitoring pro Sanity data
3. Vytvořit dokumentaci pro content editory

---

## ✅ OVĚŘENÍ PO OPRAVĚ

Po implementaci oprav spustit:

```bash
# 1. Testovat lokálně
npm run dev

# 2. Testovat Sanity connection
node -e "const {createClient}=require('@sanity/client');const c=createClient({projectId:'eqq7fbzc',dataset:'production',apiVersion:'2024-01-01',useCdn:false});c.fetch('*[_type==\"homepageComplete\"][0]').then(d=>console.log('✅ Data:',d?'OK':'FAIL'))"

# 3. Testovat produkční build
npm run build
npm run start

# 4. Ověřit Vercel deployment
# Visit: https://rezidenceusvanny.vercel.app
```

---

## 📞 KONTAKT & PODPORA

Pro otázky ohledně tohoto auditu kontaktujte development team.

**Sanity Project ID:** `eqq7fbzc`  
**Dataset:** `production`  
**Vercel URL:** `https://rezidenceusvanny.vercel.app`

---

**Konec reportu**  
*Vygenerováno: 26. listopadu 2025*

