# 🚀 Complete Web Development Guide
## Next.js + Sanity CMS + Email Integration

**Tento dokument obsahuje vše, co potřebuješ vědět pro rychlý a bezchybný vývoj moderního webu s CMS.**

---

## 📋 Table of Contents

1. [Technologický Stack](#technologický-stack)
2. [Projektová Struktura](#projektová-struktura)
3. [Initial Setup](#initial-setup)
4. [Sanity CMS Integration](#sanity-cms-integration)
5. [TypeScript Best Practices](#typescript-best-practices)
6. [Email Formuláře (Resend)](#email-formuláře-resend)
7. [SEO Setup](#seo-setup)
8. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
9. [Deployment Checklist](#deployment-checklist)
10. [Timeline & Estimates](#timeline--estimates)

---

## 🛠️ Technologický Stack

### **Doporučený Stack (Ověřený na produkci)**

```
Frontend:
├── Next.js 15+ (App Router)
├── React 18+
├── TypeScript
├── Tailwind CSS
└── Turbopack (build tool)

CMS:
├── Sanity.io (Headless CMS)
├── Sanity Studio (Visual editor)
└── GROQ (Query language)

Email:
├── Resend (Email API)
└── Next.js API Routes

Hosting:
├── Vercel (Frontend + API)
└── Sanity Cloud (CMS)

Development:
├── Git/GitHub
├── VS Code / Cursor
└── Node.js 18+
```

### **Proč právě tyto technologie?**

| Technologie | Důvod |
|------------|-------|
| **Next.js** | SSR, SEO, API routes, Image optimization |
| **Sanity** | Intuitivní CMS, real-time, flexibilní schema |
| **TypeScript** | Type safety, méně bugů, lepší DX |
| **Tailwind** | Rychlý styling, responsive, maintainable |
| **Resend** | Jednoduchý email, dobrá deliverability |
| **Vercel** | Zero-config deployment, perfect for Next.js |

---

## 📁 Projektová Struktura

```
rezidence-project/
├── app/
│   ├── layout.tsx              # Globální layout + SEO metadata
│   ├── page.tsx                # Homepage (client component)
│   ├── globals.css             # Globální styly
│   ├── byty/
│   │   ├── layout.tsx          # SEO metadata pro /byty
│   │   ├── page.tsx            # Listing bytů
│   │   └── [slug]/
│   │       └── page.tsx        # Detail bytu (dynamic route)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # API endpoint pro formuláře
│   ├── robots.ts               # robots.txt (dynamic)
│   ├── sitemap.ts              # sitemap.xml (dynamic)
│   └── studio/
│       └── [[...index]]/
│           └── page.tsx        # Sanity Studio route
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   └── Button.tsx
├── lib/
│   └── parseTitle.tsx          # Helper funkce
├── sanity/
│   ├── lib/
│   │   ├── client.ts           # Sanity client konfigurace
│   │   ├── image.ts            # Image URL builder
│   │   └── queries.ts          # GROQ queries (volitelné)
│   └── schemas/
│       ├── index.ts            # Export všech schémat
│       ├── homepage-complete.ts
│       ├── apartments-page-complete.ts
│       └── apartment.ts
├── scripts/
│   ├── import-homepage-complete.js
│   └── import-all-apartments.js
├── public/
│   ├── images/
│   └── dokumentace/
├── .env.local                  # Environment variables (NEVER commit!)
├── .env.local.example          # Template for .env
├── next.config.ts
├── sanity.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎬 Initial Setup

### **1. Vytvoření Next.js projektu**

```bash
# Vytvoř nový projekt
npx create-next-app@latest rezidence-project

# Vyber:
✅ TypeScript: Yes
✅ ESLint: Yes
✅ Tailwind CSS: Yes
✅ src/ directory: No
✅ App Router: Yes
✅ Turbopack: Yes
✅ Import alias: @/* (default)

cd rezidence-project
```

### **2. Instalace závislostí**

```bash
# Sanity
npm install next-sanity @sanity/client @sanity/image-url sanity

# Email
npm install resend

# Další užitečné
npm install @portabletext/react    # Pro rich text z Sanity
npm install date-fns               # Formátování dat (volitelné)
```

### **3. Vytvoření .env.local**

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token_here
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production

# Resend Email API
RESEND_API_KEY=re_your_api_key_here
```

### **4. Git setup**

```bash
git init
git add .
git commit -m "Initial commit"

# Vytvoř GitHub repo a pushni
git remote add origin https://github.com/username/project.git
git push -u origin main
```

---

## 🎨 Sanity CMS Integration

### **Krok 1: Inicializace Sanity**

```bash
npm create sanity@latest -- \
  --template sanity-io/sanity-template-nextjs-clean \
  --project your-project-id \
  --dataset production
```

**⚠️ DŮLEŽITÉ:** Vytvoř nejdřív projekt na https://sanity.io/manage

### **Krok 2: Sanity Client Setup**

**`sanity/lib/client.ts`:**
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // Pro write operations
})
```

**`sanity/lib/image.ts`:**
```typescript
import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### **Krok 3: Schema Design Best Practices**

#### **✅ DOBRÉ - Kompletní Page Schema:**

```typescript
// sanity/schemas/homepage-complete.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageComplete',
  title: 'Homepage - Úvodní stránka',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero - Hlavní nadpis',
      description: 'Použij <strong>text</strong> pro zvýraznění zlatou barvou',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero - Obrázek pozadí',
      type: 'image',
      options: {
        hotspot: true, // Umožní crop
      },
    }),
    // Services (Array of objects)
    defineField({
      name: 'services',
      title: 'Služby/Výhody',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', validation: Rule => Rule.required() },
          { name: 'description', type: 'text', rows: 3 },
          { name: 'icon', type: 'image' },
        ],
      }],
    }),
  ],
})
```

#### **❌ ŠPATNÉ - Rozdělené fieldy:**

```typescript
// ❌ NEDĚLEJTE TOTO:
defineField({
  name: 'heroTitle',
  type: 'string',
}),
defineField({
  name: 'heroTitleHighlight',  // ❌ Extra field
  type: 'string',
}),
defineField({
  name: 'heroTitleEnd',        // ❌ Extra field
  type: 'string',
}),
```

**Důvod:** Složité pro editaci, duplicita, horší UX.

**✅ MÍSTO TOHO:**
```typescript
defineField({
  name: 'heroTitle',
  description: 'Použij <strong>text</strong> pro zvýraznění',
  type: 'text',
})
```

### **Krok 4: Nested Objects - KRITICKÉ!**

#### **✅ SPRÁVNĚ - Generic object v array:**

```typescript
defineField({
  name: 'rooms',
  type: 'array',
  of: [{
    type: 'object',  // ✅ Generic 'object', NE pojmenovaný type!
    fields: [
      { name: 'number', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'area', type: 'number' },
    ],
  }],
})
```

#### **❌ ŠPATNĚ - Pojmenovaný type:**

```typescript
// ❌ NEDĚLEJTE:
defineField({
  name: 'rooms',
  type: 'array',
  of: [{
    name: 'room',     // ❌ name v 'of' array
    type: 'object',
    fields: [...]
  }],
})
```

**Import data format:**
```javascript
// ✅ SPRÁVNĚ:
rooms: [
  { _key: 'room1', _type: 'object', number: '1', name: 'Obývací pokoj', area: 25 }
]

// ❌ ŠPATNĚ:
rooms: [
  { _key: 'room1', _type: 'room', ... }  // ❌ _type: 'room' nefunguje
]
```

### **Krok 5: Image Fields - BEZ validace**

```typescript
// ✅ SPRÁVNĚ - Image fieldy jsou optional by default:
defineField({
  name: 'heroImage',
  type: 'image',
  options: {
    hotspot: true,
  },
  // ❌ NEPŘIDÁVEJ: validation: (Rule) => Rule.optional()
})
```

**Důvod:** `Rule.optional()` není podporováno pro image fieldy → build error.

### **Krok 6: Import Script Template**

```javascript
// scripts/import-homepage.js
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function importHomepage() {
  const data = {
    _type: 'homepageComplete',
    _id: 'homepage-complete-singleton',
    heroTitle: 'Moderní bydlení\n<strong>v srdci UNESCO</strong>',
    services: [
      {
        _key: 'service1',
        title: 'Moderní dispozice',
        description: 'Text...',
      },
    ],
  }

  const result = await client.createOrReplace(data)
  console.log('✅ Imported:', result._id)
}

importHomepage()
```

**Spuštění:**
```bash
node scripts/import-homepage.js
```

---

## 🔷 TypeScript Best Practices

### **1. Explicitní typy pro .map() a .reduce()**

#### **❌ CHYBA (Build error):**
```typescript
apartments.map((apt) => (     // ❌ Parameter 'apt' implicitly has 'any' type
  <div>{apt.name}</div>
))

total = items.reduce((sum, item) => sum + item.price, 0)  // ❌ Error
```

#### **✅ OPRAVA:**
```typescript
apartments.map((apt: any) => (
  <div>{apt.name}</div>
))

total = items.reduce((sum: number, item: any) => sum + item.price, 0)
```

### **2. React Hooks - Pořadí je důležité!**

#### **❌ CHYBA:**
```typescript
export default function Page() {
  if (loading) return <div>Loading...</div>  // ❌ Conditional return

  const [state, setState] = useState(false)  // ❌ Hook po return!
}
```

#### **✅ OPRAVA:**
```typescript
export default function Page() {
  const [state, setState] = useState(false)  // ✅ Hooks VŽDY nahoře

  if (loading) return <div>Loading...</div>  // ✅ Conditional return až potom
}
```

### **3. Form Reset Fix**

#### **❌ PROBLÉM:**
```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  await fetch('/api/contact', ...)
  e.currentTarget.reset()  // ❌ Error: currentTarget is null
}
```

#### **✅ ŘEŠENÍ:**
```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const form = e.currentTarget  // ✅ Uložit PŘED await
  
  await fetch('/api/contact', ...)
  
  form.reset()  // ✅ Použít uloženou referenci
}
```

---

## 📧 Email Formuláře (Resend)

### **Setup (5 minut)**

#### **1. Registrace:**
- https://resend.com/signup
- Zdarma: 100 emailů/den, 3000/měsíc

#### **2. API klíč:**
- https://resend.com/api-keys
- Zkopíruj klíč (začíná `re_`)
- Přidej do `.env.local`:
```env
RESEND_API_KEY=re_your_key_here
```

#### **3. API Route:**

**`app/api/contact/route.ts`:**
```typescript
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    await resend.emails.send({
      from: 'Your Site <delivered@resend.dev>',
      to: ['info@yoursite.cz'],
      replyTo: data.email,
      subject: `Nová poptávka - ${data.name}`,
      html: `
        <h2>Nová poptávka</h2>
        <p><strong>Jméno:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Zpráva:</strong> ${data.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { success: false, message: 'Chyba při odesílání' },
      { status: 500 }
    )
  }
}
```

#### **4. Frontend Form:**

```typescript
'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget

    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      page: 'Homepage',
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage('✅ Odesláno!')
        form.reset()
      } else {
        setMessage('❌ Chyba při odesílání')
      }
    } catch (error) {
      setMessage('❌ Chyba sítě')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" required placeholder="Jméno" />
      <input name="email" type="email" required placeholder="Email" />
      <textarea name="message" placeholder="Zpráva" />
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Odesílám...' : 'Odeslat'}
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}
```

### **Produkční Tip: Vlastní doména**

Po spuštění na ostré doméně:
1. Jdi na https://resend.com/domains
2. Přidej svou doménu
3. Přidej DNS záznamy (TXT, MX)
4. Změň `from: 'delivered@resend.dev'` → `from: 'noreply@yoursite.cz'`

**Proč:** Lepší deliverability, méně SPAMu.

---

## 🔍 SEO Setup

### **1. Globální Metadata (layout.tsx)**

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.cz'),
  title: {
    default: 'Your Site | Slogan',
    template: '%s | Your Site',
  },
  description: 'Main description for SEO',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://yoursite.cz',
    siteName: 'Your Site',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: false,  // false pro dev, true pro produkci
    follow: false,
  },
}
```

### **2. robots.txt (app/robots.ts)**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',  // Pro dev prostředí
        // allow: '/',  // Pro produkci
        // disallow: ['/studio/', '/api/'],
      },
    ],
    // sitemap: 'https://yoursite.cz/sitemap.xml',  // Aktivuj na produkci
  }
}
```

### **3. sitemap.xml (app/sitemap.ts)**

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yoursite.cz'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]
}
```

---

## ⚠️ Common Pitfalls & Solutions

### **1. Sanity Studio - Prázdná Data**

**Problém:** Data jsou v Sanity, ale Studio je neukazuje.

**Příčina:** Mismatch mezi `_type` v datech a schema definicí.

**Řešení:**
- ✅ Array objekty MUSÍ mít `_type: 'object'`
- ❌ NE `_type: 'room'` nebo custom název
- ✅ Hard refresh Sanity Studio po změně schémat (Cmd+Shift+R)

### **2. TypeScript Build Errors**

**Problém:** `Parameter 'x' implicitly has an 'any' type`

**Řešení:** Přidej explicitní typy:
```typescript
.map((item: any) => ...)
.reduce((sum: number, item: any) => ...)
```

### **3. Image Validation Error**

**Problém:** `Property 'optional' does not exist on type 'ImageRule'`

**Řešení:** NESNAŽ SE validovat image fieldy:
```typescript
// ❌ ŠPATNĚ:
defineField({
  type: 'image',
  validation: (Rule) => Rule.optional(),  // ❌ Error!
})

// ✅ SPRÁVNĚ:
defineField({
  type: 'image',
  // Žádná validace - image jsou optional by default
})
```

### **4. Email Deliverability**

**Problém:** Emaily se odesílají, ale nedorazí.

**Řešení:**
1. Zkontroluj SPAM složku
2. Použij `delivered@resend.dev` místo `onboarding@`
3. Přidej `replyTo: data.email`
4. **Na produkci:** Ověř vlastní doménu v Resend

### **5. Hydration Errors**

**Problém:** Rozdíl mezi server/client renderem.

**Časté příčiny:**
- `<video>` tag
- `<iframe>` tag
- Date formátování
- localStorage/sessionStorage

**Řešení:**
```typescript
<video suppressHydrationWarning autoPlay muted loop>
  ...
</video>
```

### **6. Environment Variables na Vercelu**

**Problém:** Funguje lokálně, nefunguje na Vercelu.

**Řešení:**
1. Přidej všechny env vars v Vercel Settings → Environment Variables
2. Zaškrtni **všechny** environments (Production, Preview, Development)
3. **DŮLEŽITÉ:** Redeploy po přidání env vars!

---

## 🚀 Deployment Checklist

### **Pre-Launch Checklist:**

#### **📝 Kód:**
- [ ] Všechny TODO/FIXME komentáře vyřešeny
- [ ] Console.log() odstraněny/nahrazeny
- [ ] Linter errors = 0
- [ ] TypeScript errors = 0
- [ ] Build prochází lokálně (`npm run build`)

#### **🎨 Sanity:**
- [ ] Všechny schema vytvořeny
- [ ] Import scripty spuštěny
- [ ] Data zkontrolována v Sanity Studio
- [ ] Obrázky nahrány a optimalizované

#### **📧 Email:**
- [ ] Resend API klíč nastavený (lokálně + Vercel)
- [ ] Formuláře testovány
- [ ] Emaily dorazí do správné schránky
- [ ] Email design vypadá dobře

#### **🔍 SEO (pro dev):**
- [ ] `robots: index: false` (layout.tsx)
- [ ] `robots.txt: disallow: /`
- [ ] Open Graph metadata nastavená

#### **☁️ Vercel:**
- [ ] Projekt vytvořený a propojený s GitHubem
- [ ] Environment variables nastavené:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `NEXT_PUBLIC_SANITY_API_VERSION`
  - [ ] `SANITY_API_TOKEN`
  - [ ] `RESEND_API_KEY`
- [ ] Všechny env vars zaškrtnuté pro Production
- [ ] První deployment úspěšný

#### **🧪 Testing:**
- [ ] Všechny stránky načítají
- [ ] Všechny linky fungují
- [ ] Formuláře odesílají
- [ ] Mobilní responsive
- [ ] Rychlost načítání OK (Lighthouse)

---

### **Production Launch Checklist:**

#### **🌐 Doména:**
- [ ] Custom doména nastavená na Vercelu
- [ ] DNS záznamy aktualizované
- [ ] SSL certifikát aktivní (auto na Vercelu)
- [ ] www redirect nastaven (volitelné)

#### **🔍 SEO (aktivace):**
- [ ] Změnit `robots: index: true` (layout.tsx)
- [ ] Změnit `robots.txt: allow: '/'`
- [ ] Aktivovat sitemap
- [ ] Přidat do Google Search Console
- [ ] Odeslat sitemap v GSC

#### **📧 Email (produkce):**
- [ ] Ověřit doménu v Resend
- [ ] Přidat DNS záznamy pro Resend
- [ ] Změnit `from:` na vlastní doménu
- [ ] Testovat email deliverability

#### **📊 Analytics (volitelné):**
- [ ] Google Analytics nastavený
- [ ] Meta Pixel (volitelné)
- [ ] Cookie consent (GDPR)

#### **🔐 Security:**
- [ ] `.env.local` v `.gitignore`
- [ ] Žádné hardcoded secrets v kódu
- [ ] CORS správně nastavený v Sanity
- [ ] Rate limiting na API routes (volitelné)

---

## ⏱️ Timeline & Estimates

### **Realistické odhady pro podobný projekt:**

| Fáze | Čas | Poznámky |
|------|-----|----------|
| **Setup projektu** | 1-2 hodiny | Next.js + Sanity inicializace |
| **Design implementace** | 3-5 dní | Komponenty, layout, styling |
| **Sanity schemas** | 1-2 dny | Design schémat, testing |
| **Sanity import scripty** | 1 den | Data import, debugging |
| **Sanity→Frontend integrace** | 2-3 dny | Fetching, transformace dat |
| **Email formuláře** | 4-6 hodin | Resend setup, testování |
| **SEO setup** | 2-3 hodiny | Metadata, robots, sitemap |
| **Testing & bugfixing** | 1-2 dny | Cross-browser, mobile, edge cases |
| **Deployment** | 2-4 hodiny | Vercel setup, env vars |
| **Production setup** | 4-6 hodin | Doména, email, analytics |

**CELKEM: ~2-3 týdny** (pro zkušeného vývojáře)

### **Tipsy pro zrychlení:**

1. **Používej tento guide** - ušetříš 50% času na debugging
2. **Testuj průběžně** - nečekej na konec
3. **Commit často** - můžeš se vrátit k funkční verzi
4. **TypeScript strict mode** - najde chyby brzy
5. **Sanity import scripty** - rychlejší než ruční zadávání
6. **Resend od začátku** - ne až na konci
7. **SEO metadata hned** - ne jako "nice to have"

---

## 🎓 Best Practices Summary

### **DO's ✅**

1. **TypeScript:** Explicitní typy všude
2. **Sanity:** Kompletní page schemas, ne fragmenty
3. **Components:** Reusable, single responsibility
4. **Git:** Commit často, meaningful messages
5. **Testing:** Test každou stránku/feature hned
6. **Mobile-first:** Design i testování
7. **Env variables:** .env.local.example pro dokumentaci
8. **Error handling:** Try-catch všude, kde je I/O
9. **Loading states:** Pro každý async operation
10. **Documentation:** Komentuj komplexní logiku

### **DON'Ts ❌**

1. **Commit .env.local** - nikdy!
2. **Hardcode hodnoty** - použij constants/config
3. **Skip TypeScript errors** - oprav je hned
4. **Komplexní komponenty** - rozděl na menší
5. **Inline styles** - použij Tailwind classes
6. **Console.log() v produkci** - clean před deploy
7. **Optimističnost** - počítej s fail states
8. **Velké obrázky** - optimalizuj před nahráním
9. **Zanedbaný mobile** - 60%+ trafficu je mobile
10. **Bez testing** - najdeš bugy až v produkci

---

## 📚 Užitečné Resources

### **Dokumentace:**
- Next.js: https://nextjs.org/docs
- Sanity: https://www.sanity.io/docs
- Resend: https://resend.com/docs
- Tailwind: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### **Tools:**
- Sanity Studio: `http://localhost:3000/studio`
- Vercel Dashboard: https://vercel.com/dashboard
- Resend Dashboard: https://resend.com/emails
- Google Search Console: https://search.google.com/search-console

### **Testing:**
- Lighthouse: Chrome DevTools
- Mobile testing: Chrome DevTools responsive mode
- Email testing: Resend logs + test inbox

---

## 🆘 Troubleshooting Decision Tree

```
Build fails?
├─ TypeScript error?
│  └─ Add explicit types to .map()/.reduce()
├─ Import error?
│  └─ Check file paths, use @/* alias
└─ Sanity error?
   └─ Check schema definition

Sanity data missing?
├─ In database but not in Studio?
│  └─ Check _type (must be 'object' for arrays)
├─ In Studio but not on frontend?
│  └─ Check GROQ query, check client config
└─ Import fails?
   └─ Check token permissions (must be Editor)

Email not sending?
├─ Error in logs?
│  └─ Check RESEND_API_KEY env var
├─ Sending but not receiving?
│  └─ Check spam folder, verify domain
└─ Form not submitting?
   └─ Check API route, check CORS

Deploy fails?
├─ Build error?
│  └─ Run npm run build locally first
├─ Env vars missing?
│  └─ Add in Vercel Settings, then redeploy
└─ Domain not working?
   └─ Check DNS records, wait 24h for propagation
```

---

## 💬 Final Tips

1. **Read error messages carefully** - TypeScript errors jsou přesné
2. **Google je tvůj přítel** - ale ověř, že řešení je pro Next.js App Router
3. **Sanity logs** - užitečné pro debugging import scriptů
4. **Vercel logs** - Real-time, ukazují přesné errory
5. **Test na mobile devices** - ne jen DevTools simulator
6. **Ask for help early** - ušetříš hodiny debuggingu
7. **Document your decisions** - proč jsi zvolil X místo Y
8. **Keep it simple** - komplexita přijde později
9. **Security first** - env variables, CORS, input validation
10. **Performance matters** - optimalizuj obrázky, lazy load

---

## 🎉 Gratuluji!

Pokud jsi dočetl až sem, máš vše, co potřebuješ pro úspěšný projekt!

**Tento guide ti ušetří dny práce a desítky hodin debuggování.**

**Good luck! 🚀**

---

*Vytvořeno na základě reálného projektu Rezidence U sv. Anny*
*Všechny chyby, řešení a best practices ověřeny v praxi*


