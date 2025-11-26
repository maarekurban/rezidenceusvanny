# Sanity CMS Setup

## 📋 Přehled

Tento projekt nyní využívá **Sanity.io** jako headless CMS pro správu:
- 🏠 **Bytů** - všechny informace o bytech včetně půdorysů a fotek
- 📄 **Dokumentů** - PENB, standardy, zásady a další PDF soubory
- 📝 **Stránek** - dynamický obsah pro informační stránky

---

## 🚀 Nastavení

### 1. Environment Variables

Vytvořte soubor `.env.local` v root složce projektu:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

### 2. Získání API tokenu

1. Přihlaste se na [sanity.io](https://www.sanity.io/)
2. Otevřete projekt "Rezidence U sv. Anny"
3. Jděte do **API** → **Tokens**
4. Vytvořte nový token s **Editor** oprávněními
5. Zkopírujte token a vložte do `.env.local` jako `SANITY_API_TOKEN`

### 3. Spuštění Sanity Studio

Studio je dostupné na: **http://localhost:3000/studio**

Po otevření se přihlaste pomocí vašeho Sanity účtu.

---

## 📊 Datové schéma

### Byty (Apartment)

```typescript
{
  number: string          // Číslo bytu (např. "1.01")
  building: string        // BD-A1, BD-A2, BD-B1
  floor: number           // Patro
  disposition: string     // Dispozice (např. "2+kk")
  floorArea: number       // Podlahová plocha v m²
  usableArea: number      // Užitná plocha v m²
  price: number           // Cena v Kč
  status: string          // available | reserved | sold
  
  rooms: [{               // Místnosti
    number: string
    area: number
  }]
  
  outdoorSpaces: [{       // Venkovní prostory
    type: string          // balcony | terrace | garden
    area: number
  }]
  
  floorPlan: image        // Půdorys
  heroImage: image        // Hlavní fotka
  locationInBuilding: image
  locationInArea: image
}
```

### Dokumenty (Document)

```typescript
{
  title: string           // Název dokumentu
  description: string     // Popis (volitelné)
  file: file             // PDF soubor
  category: string       // penb | standards | rules | other
  order: number          // Pořadí zobrazení
}
```

### Stránky (Page)

```typescript
{
  title: string          // Název stránky
  slug: slug             // URL slug
  content: block[]       // Rich text obsah
  seo: {
    metaTitle: string
    metaDescription: string
  }
}
```

---

## 🔄 Migrace dat z Excelu

Aktuální data bytů jsou hardcoded v komponentách:
- `app/byty/page.tsx` - seznam bytů
- `app/byty/[slug]/page.tsx` - detail bytu

Pro migraci dat do Sanity:

1. Otevřete **Sanity Studio** na `/studio`
2. Postupně vytvořte nové byty ručně, nebo
3. Použijte Sanity CLI pro import z JSON:

```bash
# Vytvořte JSON soubor z Excel dat
# Pak importujte pomocí Sanity CLI
npx sanity dataset import apartments.json production
```

---

## 🛠️ Integrace do Next.js

### Fetching dat

```typescript
import { client } from '@/sanity/lib/client'
import { apartmentsQuery } from '@/sanity/lib/queries'

// V Server Component
const apartments = await client.fetch(apartmentsQuery)

// V Client Component
const [apartments, setApartments] = useState([])
useEffect(() => {
  client.fetch(apartmentsQuery).then(setApartments)
}, [])
```

### Dostupné queries

- `apartmentsQuery` - všechny byty
- `availableApartmentsQuery` - jen volné byty
- `apartmentBySlugQuery` - detail bytu podle URL
- `documentsQuery` - všechny dokumenty
- `documentsByCategoryQuery` - dokumenty podle kategorie
- `pageBySlugQuery` - stránka podle URL

---

## 📝 Další kroky

1. ✅ Sanity je nainstalován a nakonfigurován
2. ⏳ Nahrajte data bytů do Sanity Studio
3. ⏳ Nahrajte dokumenty (PENB, standardy, atd.)
4. ⏳ Upravte komponenty pro fetching ze Sanity místo hardcoded dat
5. ⏳ Nastavte CORS v Sanity projektu pro production domain

---

## 🔒 CORS nastavení (Production)

V Sanity dashboardu:
1. Jděte do **API** → **CORS Origins**
2. Přidejte vaši production doménu (např. `https://rezidenceusvanny.cz`)
3. Přidejte localhost pro development: `http://localhost:3000`

---

## 📚 Dokumentace

- [Sanity Docs](https://www.sanity.io/docs)
- [Next.js + Sanity](https://www.sanity.io/docs/next)
- [GROQ Query Language](https://www.sanity.io/docs/groq)



