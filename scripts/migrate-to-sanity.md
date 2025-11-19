# Migrace dat do Sanity

## 📋 Přehled

Tento dokument popisuje, jak migrovat stávající data z Excelu do Sanity CMS.

---

## 🏠 Migrace bytů

### Ruční import přes Sanity Studio

1. Otevřete Sanity Studio: `http://localhost:3000/studio`
2. Klikněte na **Byty** → **Create new**
3. Vyplňte všechna pole podle dat z Excelu
4. Nahrajte obrázky:
   - Půdorys z `/public/pudorysy/`
   - Hero obrázek z `/public/images/DSC02913.jpg`
   - Umístění v areálu

### Automatizovaný import (doporučeno)

Pro rychlejší import vytvořte skript, který:
1. Přečte data z Excel souboru
2. Nahraje obrázky do Sanity
3. Vytvoří dokumenty přes Sanity Client

**Příklad skriptu** (vyžaduje nastavení):

```javascript
// scripts/import-apartments.js
const { createClient } = require('@sanity/client')
const fs = require('fs')

const client = createClient({
  projectId: 'eqq7fbzc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Váš import logika zde
```

---

## 📄 Migrace dokumentů

### PENB a další PDF

1. Otevřete Studio → **Dokumenty** → **Create new**
2. Pro každý dokument:
   - **Title**: např. "PENB A1"
   - **Category**: vyberte kategori
   - **File**: nahrajte PDF z `/public/dokumentace/`
   - **Order**: nastavte pořadí (1, 2, 3...)

Dokumenty k nahrání:
- PENB A1 → kategorie: "penb", order: 1
- PENB A2 → kategorie: "penb", order: 2
- PENB B1 → kategorie: "penb", order: 3
- Standard provedení a vybavení → kategorie: "standards", order: 4
- Zásady pro provádění klientských změn → kategorie: "rules", order: 5

---

## 🔄 Po migraci

Po úspěšné migraci dat do Sanity:

### 1. Aktualizujte komponenty

**app/byty/page.tsx** - Seznam bytů:

```typescript
import { client } from '@/sanity/lib/client'
import { apartmentsQuery } from '@/sanity/lib/queries'

export default async function ApartmentsPage() {
  const apartments = await client.fetch(apartmentsQuery)
  
  // Zbytek komponenty...
}
```

**app/byty/[slug]/page.tsx** - Detail bytu:

```typescript
import { client } from '@/sanity/lib/client'
import { apartmentBySlugQuery } from '@/sanity/lib/queries'

export default async function ApartmentDetail({ params }) {
  const apartment = await client.fetch(apartmentBySlugQuery, { 
    slug: params.slug 
  })
  
  // Zbytek komponenty...
}
```

**app/dulezite-informace/page.tsx** - Dokumenty:

```typescript
import { client } from '@/sanity/lib/client'
import { documentsQuery } from '@/sanity/lib/queries'

export default async function ImportantInfoPage() {
  const documents = await client.fetch(documentsQuery)
  
  // Zbytek komponenty...
}
```

### 2. Odstraňte hardcoded data

Po úspěšné migraci a testování smažte:
- Hardcoded `apartments` array z komponent
- Excel soubory z `/public/` (nebo přesuňte do archivu)

---

## ✅ Checklist

- [ ] Nastavit SANITY_API_TOKEN v `.env.local`
- [ ] Otevřít Sanity Studio a přihlásit se
- [ ] Nahrát všechny byty do Sanity
- [ ] Nahrát všechny obrázky bytů
- [ ] Nahrát všechny PDF dokumenty
- [ ] Otestovat fetching dat v Next.js
- [ ] Aktualizovat komponenty pro použití Sanity
- [ ] Nastavit CORS pro production doménu
- [ ] Otestovat celý flow na localhost
- [ ] Deploy na Vercel

---

## 🆘 Troubleshooting

### Studio se nenačítá
- Zkontrolujte, že `npm run dev` běží
- Zkontrolujte konzoli pro chyby
- Ujistěte se, že project ID je správné v `sanity.config.ts`

### Nemohu nahrát obrázky
- Zkontrolujte, že máte Editor práva v Sanity
- Ověřte API token v `.env.local`
- Ujistěte se, že soubory nejsou příliš velké (max ~10MB)

### Data se nezobrazují
- Zkontrolujte GROQ query v konzoli
- Ověřte, že dataset je "production"
- Ujistěte se, že CDN je vypnutý během developmentu (`useCdn: false`)

