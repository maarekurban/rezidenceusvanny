# 🚀 Sanity CMS - Rychlý start

## ✅ Co je hotové

Sanity CMS je **plně nainstalován a nakonfigurován**! 🎉

### Vytvořené soubory:

```
📁 rezidence-prototype/
├── 📄 sanity.config.ts          # Hlavní konfigurace
├── 📁 sanity/
│   ├── 📁 schemas/
│   │   ├── apartment.ts         # Schéma pro byty
│   │   ├── document.ts          # Schéma pro dokumenty
│   │   ├── page.ts              # Schéma pro stránky
│   │   └── index.ts
│   └── 📁 lib/
│       ├── client.ts            # Sanity client
│       └── queries.ts           # GROQ queries
├── 📁 app/studio/
│   └── [[...index]]/
│       └── page.tsx             # Sanity Studio route
├── 📄 SANITY_SETUP.md           # Kompletní dokumentace
└── 📄 scripts/migrate-to-sanity.md  # Návod na migraci dat
```

---

## 🎯 Další kroky

### 1️⃣ Nastavte Environment Variables

Vytvořte soubor `.env.local` v root složce:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=váš-token-zde
```

**Jak získat API token:**
1. Jděte na [sanity.io/manage](https://www.sanity.io/manage)
2. Otevřete projekt "Rezidence U sv. Anny"
3. Klikněte na **API** v menu
4. Klikněte na **Tokens** → **Add API token**
5. Nastavte:
   - Name: "Website Editor"
   - Permissions: **Editor**
6. Zkopírujte token a vložte do `.env.local`

---

### 2️⃣ Otevřete Sanity Studio

Studio je dostupné na:

```
http://localhost:3000/studio
```

Po prvním otevření se přihlaste pomocí vašeho Sanity účtu.

---

### 3️⃣ Nahrajte data

Máte dvě možnosti:

#### A) Ruční import (jednodušší)
1. Otevřete Studio na `/studio`
2. Klikněte na **Byty** → **Create new**
3. Vyplňte data podle Excelu
4. Nahrajte obrázky z `/public/pudorysy/`

#### B) Automatický import (rychlejší)
- Postupujte podle `scripts/migrate-to-sanity.md`

---

## 📊 Datové typy ve Studio

### 🏠 Byty (Apartments)
- Všechny informace o bytech
- Půdorysy a fotografie
- Místnosti a venkovní prostory
- Stav (volný/rezervovaný/prodaný)

### 📄 Dokumenty (Documents)
- PDF soubory (PENB, standardy, zásady)
- Kategorizace
- Pořadí zobrazení

### 📝 Stránky (Pages)
- Dynamický obsah pro informační stránky
- SEO metadata
- Rich text editor

---

## 🔗 Integrace do Next.js

Po nahrání dat do Sanity aktualizujte komponenty:

```typescript
// Příklad: app/byty/page.tsx
import { client } from '@/sanity/lib/client'
import { apartmentsQuery } from '@/sanity/lib/queries'

export default async function ApartmentsPage() {
  const apartments = await client.fetch(apartmentsQuery)
  
  return (
    // Použijte data ze Sanity místo hardcoded
  )
}
```

---

## 📚 Dokumentace

- **[SANITY_SETUP.md](./SANITY_SETUP.md)** - Kompletní setup guide
- **[scripts/migrate-to-sanity.md](./scripts/migrate-to-sanity.md)** - Návod na migraci dat

---

## 🆘 Problémy?

### Studio se nenačítá
```bash
# Restartujte dev server
npm run dev
```

### Nemohu nahrát obrázky
- Zkontrolujte API token v `.env.local`
- Ujistěte se, že máte Editor oprávnění

### Data se nezobrazují
- Zkontrolujte, že dataset je "production"
- Ověřte project ID v `sanity.config.ts`

---

## ✨ Co dál?

1. ✅ Nastavit `.env.local`
2. ✅ Otevřít Studio na `/studio`
3. ✅ Přihlásit se do Sanity
4. ⏳ Nahrát data bytů
5. ⏳ Nahrát dokumenty (PDF)
6. ⏳ Aktualizovat komponenty pro fetching ze Sanity
7. ⏳ Otestovat vše na localhostu
8. ⏳ Deploy na production

---

**🎉 Sanity je připravený! Můžete začít přidávat obsah přes Studio.**

Pro více informací viz [SANITY_SETUP.md](./SANITY_SETUP.md)

