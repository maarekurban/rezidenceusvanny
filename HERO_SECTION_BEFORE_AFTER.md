# 🔄 HERO SECTION - PŘED vs. PO

**Test: Refactoring Hero Section podle best practices**

---

## ❌ PŘED (starý způsob)

### **Jak to vypadalo:**

```typescript
fields: [
  // === HERO SECTION ===
  defineField({
    name: 'heroTitle',
    title: 'Hero - Hlavní nadpis',
    description: 'Použij <strong>text</strong> pro zvýraznění zlatou barvou',
    type: 'text',
    rows: 2,
    validation: Rule => Rule.required(),
  }),
  defineField({
    name: 'heroBadge',
    title: 'Hero - Badge text',
    type: 'string',
    initialValue: 'III. Etapa v prodeji',
  }),
  // ... další pole
]
```

### **Problémy:**

❌ Všechna pole v jednom dlouhém seznamu  
❌ Žádná organizace do sekcí  
❌ Minimální helper texty  
❌ Základní validace  
❌ Žádný preview  
❌ Obrázky bez Alt textu  
❌ Málo placeholderů  

---

## ✅ PO (best practices)

### **Jak to vypadá teď:**

```typescript
export default defineType({
  name: 'homepageComplete',
  title: 'Homepage - Úvodní stránka',
  type: 'document',
  
  // 🎨 PREVIEW
  preview: {
    select: { title: 'heroTitle', media: 'heroImage' },
    prepare({ title, media }) {
      return {
        title: title || 'Homepage (bez nadpisu)',
        subtitle: '🏠 Úvodní stránka webu',
        media: media
      }
    }
  },
  
  // 📑 FIELDSETS (ORGANIZACE)
  fieldsets: [
    {
      name: 'hero',
      title: '🎬 Hero Section',
      description: 'Úvodní obrazovka s velkým videem nebo obrázkem',
      options: { collapsible: true, collapsed: false }
    },
  ],
  
  fields: [
    // Všechna Hero pole jsou teď v jedné sekci!
    defineField({
      name: 'heroBadge',
      title: 'Badge text',
      type: 'string',
      fieldset: 'hero',  // 👈 Přiřazeno do sekce
      initialValue: 'III. Etapa v prodeji',
      placeholder: 'III. Etapa v prodeji',  // ✅ Placeholder!
      description: '💚 Malý text v zelené bublině...',  // ✅ Lepší popis!
      validation: Rule => Rule.max(50).warning('...')  // ✅ Warning!
    }),
    // ... další pole
  ]
})
```

### **Co je nové:**

✅ **Preview** - Náhled v seznamu dokumentů  
✅ **Fieldsets** - Hero Section jako sbalitelná sekce  
✅ **Emoji ikony** - Lepší vizuální orientace (🎬, 💚, 🖼️...)  
✅ **Helper texty** - Detailní popisy co do pole patří  
✅ **Placeholders** - Ukázkové hodnoty  
✅ **Lepší validace** - Warnings + error zprávy  
✅ **Alt text pro obrázky** - SEO a accessibility  
✅ **Hotspot** - Výběr důležité části obrázku  
✅ **Metadata** - LQIP (rychlé načtení)  
✅ **Conditional validation** - Alt je povinný jen když je obrázek  

---

## 📊 KONKRÉTNÍ ZMĚNY PO POLÍCH:

### **1. heroBadge**

**PŘED:**
```typescript
name: 'heroBadge',
title: 'Hero - Badge text',
type: 'string',
initialValue: 'III. Etapa v prodeji',
```

**PO:**
```typescript
name: 'heroBadge',
title: 'Badge text',  // ✅ Kratší (Hero je jasné z fieldset)
type: 'string',
fieldset: 'hero',  // ✅ V sekci
initialValue: 'III. Etapa v prodeji',
placeholder: 'III. Etapa v prodeji',  // ✅ NOVÉ
description: '💚 Malý text v zelené bublině...',  // ✅ Lepší popis
validation: Rule => Rule.max(50).warning('...')  // ✅ Warning
```

---

### **2. heroTitle**

**PŘED:**
```typescript
name: 'heroTitle',
title: 'Hero - Hlavní nadpis',
description: 'Použij <strong>text</strong> pro zvýraznění...',
type: 'text',
rows: 2,
validation: Rule => Rule.required(),
```

**PO:**
```typescript
name: 'heroTitle',
title: 'Hlavní nadpis',
type: 'text',
rows: 2,
fieldset: 'hero',  // ✅ V sekci
description: '✨ Použij <strong>text</strong> pro zvýraznění...',  // ✅ Emoji
placeholder: 'Moderní bydlení\\n<strong>v srdci UNESCO</strong>',  // ✅ Ukázka!
validation: Rule => Rule.required()
  .max(100)
  .error('Nadpis je povinný a nesmí být delší než 100 znaků')  // ✅ Vlastní zpráva
```

---

### **3. heroImage**

**PŘED:**
```typescript
name: 'heroImage',
title: 'Hero - Background obrázek',
type: 'image',
description: 'Pokud není vyplněno, použije se video',
options: { hotspot: true },
```

**PO:**
```typescript
name: 'heroImage',
title: 'Background obrázek',
type: 'image',
fieldset: 'hero',
description: '🖼️ Background obrázek místo videa. Doporučená velikost: 1920x1080px',  // ✅ Více info
options: {
  hotspot: true,
  metadata: ['lqip', 'palette']  // ✅ NOVÉ - rychlé načtení
},
// ✅ NOVÉ - Alt text field!
fields: [
  {
    name: 'alt',
    type: 'string',
    title: 'Alt text',
    description: '♿ Popis obrázku pro nevidomé a SEO',
    placeholder: 'Moderní rezidence v Kutné Hoře',
    validation: Rule => Rule.custom((alt, context) => {
      if (context.parent?.asset && !alt) {
        return 'Alt text je povinný pro SEO'
      }
      return true
    })
  }
]
```

---

### **4. heroStats**

**PŘED:**
```typescript
validation: Rule => Rule.max(3),
```

**PO:**
```typescript
validation: Rule => Rule.required()
  .min(3)
  .max(3)
  .error('Je potřeba přesně 3 statistiky')  // ✅ Jasná zpráva!
```

---

## 🎨 JAK TO VYPADÁ V SANITY STUDIO?

### **PŘED:**

```
┌─────────────────────────────────────┐
│ Homepage - Úvodní stránka           │
├─────────────────────────────────────┤
│ Hero - Hlavní nadpis                │
│ Hero - Badge text                   │
│ Hero - Popis                        │
│ Hero - Background obrázek           │
│ Hero - Video pozadí                 │
│ Hero - Statistiky                   │
│ O projektu - Badge text             │
│ O projektu - Nadpis                 │
│ ... (další 40+ polí)                │
└─────────────────────────────────────┘
```

**= Dlouhý seznam, těžko se orientuje**

---

### **PO:**

```
┌─────────────────────────────────────┐
│ Homepage - Úvodní stránka           │
├─────────────────────────────────────┤
│ ▼ 🎬 Hero Section                   │ ← KLIKNUTELNÉ
│   ├─ Badge text                     │
│   ├─ Hlavní nadpis                  │
│   ├─ Popis pod nadpisem             │
│   ├─ Background obrázek             │
│   │  └─ Alt text                    │ ← Vnořené!
│   ├─ Background video               │
│   └─ Statistiky (3 položky)        │
│                                     │
│ ▶ 📖 O Projektu                     │ ← SBALENÉ
│                                     │
│ ... (další sekce)                   │
└─────────────────────────────────────┘
```

**= Přehledné, organizované, sbalitelné!**

---

## 🔥 HLAVNÍ VÝHODY:

### **1. ORGANIZACE** 📑
- Pole jsou seskupená do logických sekcí
- Můžeš sbalit co nepotřebuješ
- Rychlejší navigace

### **2. LEPŠÍ UX** 💅
- Emoji ikony pro rychlou orientaci
- Placeholders ukazují co napsat
- Helper texty vysvětlují účel

### **3. VALIDACE** ✅
- Warnings místo errorů kde to dává smysl
- Vlastní chybové zprávy (ne generické)
- Conditional validace (Alt jen když je obrázek)

### **4. SEO & ACCESSIBILITY** ♿
- Alt texty jsou povinné
- Metadata pro rychlé načtení
- Lepší struktura dat

### **5. PREVIEW** 🖼️
- Vidíš náhled v seznamu dokumentů
- Emoji fallback když chybí obrázek
- Subtitle pro kontext

---

## 🎯 CO DĚLAT DÁLE?

### **KROK 1: Refresh Sanity Studio**

1. Otevři: `http://localhost:3000/studio`
2. Stiskni **Cmd+R** (Mac) nebo **Ctrl+R** (Win)
3. Najdi "Homepage - Úvodní stránka"

### **KROK 2: Porovnej**

**Staré:**
- Dlouhý seznam polí
- Žádné sekce

**Nové:**
- **🎬 Hero Section** (sbalitelná!)
- Všechna Hero pole pohromadě
- Emoji, placeholders, tooltips

### **KROK 3: Testuj funkce**

✅ **Sbalení/rozbalení** Hero Section  
✅ **Placeholder texty** při prázdných polích  
✅ **Validace** - zkus překročit 50 znaků u Badge  
✅ **Alt text** - nahraj obrázek a zkus nepyplnit Alt  
✅ **Preview** - podívej se jak vypadá v seznamu  

---

## 💬 ZPĚTNÁ VAZBA?

**Líbí se ti to?**

✅ **ANO** → Předěláme celou Homepage (všechny sekce)  
⚠️ **ČÁSTEČNĚ** → Řekni co upravit  
❌ **NE** → Vrátíme se k originálu (máme backup)  

---

**Konec srovnání**  
*Vytvořeno: 26. listopadu 2025*

