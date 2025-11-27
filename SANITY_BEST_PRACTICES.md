# 🎨 SANITY.IO BEST PRACTICES - KOMPLETNÍ PRŮVODCE

**Pro projekt: Rezidence U sv. Anny**  
**Datum: 26. listopadu 2025**

---

## 📋 OBSAH

1. [Základní koncepty](#základní-koncepty)
2. [Typy polí](#typy-polí)
3. [Vizuální editor (Portable Text)](#vizuální-editor-portable-text)
4. [Organizace polí (Fieldsets & Groups)](#organizace-polí-fieldsets--groups)
5. [Preview & Validace](#preview--validace)
6. [Obrázky & Media](#obrázky--media)
7. [Příklady: Špatně vs. Dobře](#příklady-špatně-vs-dobře)
8. [Praktická ukázka pro Homepage](#praktická-ukázka-pro-homepage)

---

## 1️⃣ ZÁKLADNÍ KONCEPTY

### **Co je Sanity Schema?**

Schema = **definice struktury** tvého obsahu. Říkáš Sanity:
- Jaká pole budou v editoru
- Jaké typy dat (text, obrázek, číslo...)
- Jak se budou zobrazovat
- Jaké validace

```typescript
// Základní struktura
export default defineType({
  name: 'homepage',              // ID dokumentu
  title: 'Homepage',              // Název v editoru
  type: 'document',               // Typ (document = samostatná stránka)
  fields: [                       // Pole
    defineField({
      name: 'title',              // ID pole
      title: 'Nadpis',            // Název v editoru
      type: 'string',             // Typ dat
    })
  ]
})
```

---

## 2️⃣ TYPY POLÍ

### **Textové typy:**

| Typ | Kdy použít | Ukázka |
|-----|------------|--------|
| `string` | Krátký text (1 řádek), max ~100 znaků | Nadpis, jméno, email |
| `text` | Delší text (textarea), jednoduchý | Krátký popis, meta description |
| `block` | **Vizuální editor** (tučné, odkazy, seznamy) | Článek, dlouhý popis |
| `array of blocks` | Více odstavců s vizuálním editorem | Blog post, dlouhý obsah |

#### **❌ ŠPATNĚ:**
```typescript
// Používáme string pro dlouhý text
defineField({
  name: 'description',
  type: 'string',  // ❌ Nemůžeš napsat víc než 1 řádek
})
```

#### **✅ DOBŘE:**
```typescript
// Pro krátký jednoduchý text
defineField({
  name: 'shortDescription',
  title: 'Krátký popis',
  type: 'text',
  rows: 3,  // 3 řádky
  validation: Rule => Rule.max(200)
})

// Pro bohatý text s formátováním
defineField({
  name: 'longDescription',
  title: 'Dlouhý popis',
  type: 'array',
  of: [{ type: 'block' }]  // ✅ Vizuální editor!
})
```

---

## 3️⃣ VIZUÁLNÍ EDITOR (PORTABLE TEXT)

### **Co je Portable Text?**

= **Vizuální editor jako Word**:
- ✅ Tučné, kurzíva, podtržené
- ✅ Nadpisy (H1, H2, H3...)
- ✅ Seznamy (odrážky, číslované)
- ✅ Odkazy
- ✅ Vlastní styly (zvýraznění zlatou barvou!)

### **Základní konfigurace:**

```typescript
defineField({
  name: 'content',
  title: 'Obsah',
  type: 'array',
  of: [
    {
      type: 'block',
      // Styly textu
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Citace', value: 'blockquote' },
      ],
      // Formátování
      marks: {
        // Dekorace (tučné, kurzíva...)
        decorators: [
          { title: 'Tučné', value: 'strong' },
          { title: 'Kurzíva', value: 'em' },
          { title: 'Zvýraznit zlatou', value: 'gold' },  // 🎨 Vlastní!
        ],
        // Anotace (odkazy...)
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Odkaz',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              }
            ]
          }
        ]
      }
    }
  ]
})
```

### **Jak renderovat na frontendu:**

```typescript
// Použij @portabletext/react
import { PortableText } from '@portabletext/react'

const components = {
  marks: {
    gold: ({ children }) => <span className="text-gradient">{children}</span>,
    link: ({ value, children }) => (
      <a href={value.href} target="_blank">{children}</a>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-4xl font-bold">{children}</h2>,
  }
}

// V komponenetu:
<PortableText value={pageData.content} components={components} />
```

### **✨ NÁŠE POTŘEBA: Zvýraznění zlatou barvou**

**V Sanity Schema:**
```typescript
marks: {
  decorators: [
    { title: 'Tučné', value: 'strong' },
    { title: '🌟 Zlaté', value: 'gold' },  // Uživatel uvidí tlačítko "Zlaté"
  ]
}
```

**Na frontendu:**
```typescript
// S Portable Text:
const components = {
  marks: {
    gold: ({ children }) => <span className="text-gradient">{children}</span>
  }
}

// Nebo náš současný způsob s parseTitle:
// Použije <strong> tag → parsuje na text-gradient
```

---

## 4️⃣ ORGANIZACE POLÍ (FIELDSETS & GROUPS)

### **Problém: Dlouhý seznam polí**

Když máš 50+ polí v jednom dokumentu, editor se ztratí.

### **Řešení 1: Fieldsets (Záložky)**

```typescript
export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  
  // 📑 Záložky (fieldsets)
  fieldsets: [
    {
      name: 'hero',
      title: '🎬 Hero Section',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'about',
      title: '📖 O Projektu',
      options: { collapsible: true, collapsed: true }  // Defaultně sbalené
    },
    {
      name: 'seo',
      title: '🔍 SEO',
      options: { collapsible: true, collapsed: true }
    }
  ],
  
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Nadpis',
      type: 'string',
      fieldset: 'hero',  // 👈 Přiřazeno do fieldset "hero"
    }),
    defineField({
      name: 'heroImage',
      title: 'Obrázek',
      type: 'image',
      fieldset: 'hero',  // 👈 Také v "hero"
    }),
    
    // About Section
    defineField({
      name: 'aboutTitle',
      title: 'Nadpis',
      type: 'string',
      fieldset: 'about',  // 👈 V "about"
    }),
  ]
})
```

### **Řešení 2: Groups (Vlastní struktura)**

```typescript
// V sanity.config.ts nebo schema
groups: [
  { name: 'content', title: 'Obsah', default: true },
  { name: 'media', title: 'Média' },
  { name: 'seo', title: 'SEO' }
]

// V polích:
defineField({
  name: 'heroImage',
  group: 'media',  // 👈 Přiřazeno do group "media"
})
```

### **✅ DOPORUČENÍ PRO NÁS:**

Pro Homepage použít **fieldsets** podle sekcí:
- 🎬 Hero Section
- 📖 O Projektu (UNESCO)
- 🏗️ Tři Etapy Výstavby
- 🏡 Kvalitní Bydlení
- 💎 Proč koupit
- 🗺️ Mapa
- 📋 Proces koupě
- 🖼️ Galerie
- ❓ FAQ
- 📞 Kontakt
- 🎥 Video
- 🔍 SEO & Metadata

---

## 5️⃣ PREVIEW & VALIDACE

### **Preview (Náhled v editoru)**

Uživatel vidí náhled dokumentu v seznamu:

```typescript
export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  
  // 🖼️ Náhled
  preview: {
    select: {
      title: 'heroTitle',           // Co zobrazit jako název
      subtitle: 'heroDescription',  // Podtitul
      media: 'heroImage'            // Obrázek
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Homepage (bez nadpisu)',
        subtitle: subtitle?.substring(0, 60) || 'Bez popisu',
        media: media || '🏠'  // Emoji fallback
      }
    }
  }
})
```

### **Validace**

```typescript
defineField({
  name: 'email',
  title: 'Email',
  type: 'string',
  validation: Rule => Rule.required()           // Povinné
    .email()                                     // Musí být validní email
    .error('Zadejte platný email')              // Vlastní chybová zpráva
})

defineField({
  name: 'description',
  title: 'Popis',
  type: 'text',
  validation: Rule => Rule.required()
    .min(50).max(200)                            // 50-200 znaků
    .warning('Doporučeno 100-150 znaků')        // Warning (ne error)
})

defineField({
  name: 'price',
  title: 'Cena',
  type: 'number',
  validation: Rule => Rule.required()
    .positive()                                  // Kladné číslo
    .integer()                                   // Celé číslo
    .min(1000000)
    .error('Cena musí být min. 1 000 000 Kč')
})
```

### **Helper texty & Placeholders**

```typescript
defineField({
  name: 'metaDescription',
  title: 'Meta Description',
  type: 'text',
  rows: 3,
  description: '📝 Popis pro vyhledávače (Google, Seznam). Optimální délka 120-160 znaků.',
  placeholder: 'Moderní byty v Kutné Hoře - městě UNESCO. Nízkoenergetické budovy...',
  validation: Rule => Rule.max(160)
})
```

---

## 6️⃣ OBRÁZKY & MEDIA

### **Obrázky (Image type)**

```typescript
defineField({
  name: 'heroImage',
  title: 'Hero obrázek',
  type: 'image',
  
  // Hotspot (uživatel vybere důležitou část pro crop)
  options: {
    hotspot: true,
    metadata: ['lqip', 'palette']  // Low Quality Image Placeholder + barvy
  },
  
  // Pole pro Alt text
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt text',
      description: 'Popis obrázku pro SEO a accessibility',
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Popisek',
      description: 'Volitelný popisek pod obrázkem'
    }
  ],
  
  validation: Rule => Rule.required()
})
```

### **Renderování na frontendu:**

```typescript
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

// Responsive image s hotspot
<Image
  src={urlFor(heroImage)
    .width(1920)
    .height(1080)
    .quality(90)
    .format('webp')
    .url()}
  alt={heroImage.alt || 'Hero obrázek'}
  fill
  className="object-cover"
/>
```

### **Video (YouTube/Vimeo nebo upload)**

```typescript
// YouTube/Vimeo URL
defineField({
  name: 'videoUrl',
  title: 'Video URL',
  type: 'url',
  description: 'YouTube nebo Vimeo URL',
  validation: Rule => Rule.uri({
    scheme: ['http', 'https']
  }).custom((url) => {
    if (!url) return true
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')) {
      return true
    }
    return 'Pouze YouTube nebo Vimeo URL'
  })
})

// Upload video souboru
defineField({
  name: 'videoFile',
  title: 'Video soubor',
  type: 'file',
  options: {
    accept: 'video/mp4,video/webm'
  }
})
```

### **📄 PDF Dokumenty**

```typescript
defineField({
  name: 'document',
  title: 'PDF dokument',
  type: 'file',
  options: {
    accept: 'application/pdf'
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Název dokumentu'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Popis'
    }
  ]
})
```

---

## 7️⃣ PŘÍKLADY: ŠPATNĚ VS. DOBŘE

### **PŘÍKLAD 1: Hero Section**

#### **❌ ŠPATNĚ (náš současný stav):**

```typescript
// Schema
fields: [
  { name: 'heroBadgeText', type: 'string' },      // ❌ Název nesedí s frontendem
  { name: 'heroTitle', type: 'string' },          // ❌ String místo text
  { name: 'heroSubtitle', type: 'string' },       // ❌ Jiný název než frontend
  { name: 'heroDescriptionLine2', type: 'string' }, // ❌ 2 pole místo 1
]

// Frontend očekává: heroBadge, heroDescription, heroDescriptionLine2
// Schema má: heroBadgeText, heroSubtitle
// ❌ NESOULAD!
```

#### **✅ DOBŘE:**

```typescript
fieldsets: [
  {
    name: 'hero',
    title: '🎬 Hero Section',
    options: { collapsible: true }
  }
],

fields: [
  defineField({
    name: 'heroBadge',  // ✅ Odpovídá frontendu
    title: 'Badge text',
    type: 'string',
    fieldset: 'hero',
    placeholder: 'III. Etapa v prodeji',
    initialValue: 'III. Etapa v prodeji',
    description: 'Malý text v zelené bublině'
  }),
  
  defineField({
    name: 'heroTitle',  // ✅ OK
    title: 'Hlavní nadpis',
    type: 'text',  // ✅ Text místo string
    rows: 2,
    fieldset: 'hero',
    description: 'Použij <strong>text</strong> pro zvýraznění zlatou barvou',
    validation: Rule => Rule.required()
  }),
  
  defineField({
    name: 'heroDescription',  // ✅ Odpovídá frontendu
    title: 'Popis',
    type: 'text',  // ✅ Víceřádkový
    rows: 3,
    fieldset: 'hero',
    placeholder: 'Objevte 131 bytů a 14 rodinných domů...',
    validation: Rule => Rule.max(300)
  }),
  
  defineField({
    name: 'heroImage',
    title: 'Background obrázek',
    type: 'image',
    fieldset: 'hero',
    description: '⚠️ Pokud není vyplněno, použije se video',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alt text',
        validation: Rule => Rule.required()
      }
    ]
  }),
]
```

---

### **PŘÍKLAD 2: Dlouhý obsah s vizuálním editorem**

#### **❌ ŠPATNĚ:**

```typescript
defineField({
  name: 'aboutDescription',
  type: 'string',  // ❌ Nemůžeš formátovat
})
```

**Uživatel nemůže:**
- Udělat tučné slovo
- Přidat odkaz
- Rozdělit do odstavců
- Vytvořit seznam

#### **✅ DOBŘE:**

```typescript
defineField({
  name: 'aboutDescription',
  title: 'Popis',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normální text', value: 'normal' },
        { title: 'H3', value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Tučné', value: 'strong' },
          { title: 'Kurzíva', value: 'em' },
          { title: '✨ Zlaté zvýraznění', value: 'gold' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Odkaz',
            fields: [
              { name: 'href', type: 'url', title: 'URL' }
            ]
          }
        ]
      },
      lists: [
        { title: 'Odrážky', value: 'bullet' },
        { title: 'Číslované', value: 'number' }
      ]
    }
  ]
})
```

**✅ Uživatel teď může:**
- 📝 Psát s formátováním
- 🔗 Přidat odkazy
- ✨ Zvýraznit text zlatou
- 📋 Vytvořit seznamy
- 🎨 Použít nadpisy

---

### **PŘÍKLAD 3: Conditional fields (zobrazí se jen když...)**

```typescript
defineField({
  name: 'showVideo',
  title: 'Zobrazit video sekci?',
  type: 'boolean',
  initialValue: true
}),

defineField({
  name: 'videoUrl',
  title: 'Video URL',
  type: 'url',
  // ✅ Zobrazí se jen když showVideo = true
  hidden: ({ document }) => !document?.showVideo,
  validation: Rule => Rule.custom((value, context) => {
    if (context.document?.showVideo && !value) {
      return 'Video URL je povinné když je video sekce aktivní'
    }
    return true
  })
})
```

---

## 8️⃣ PRAKTICKÁ UKÁZKA PRO HOMEPAGE

### **Současný problém - Hero Section:**

```
❌ heroBadgeText → Frontend očekává heroBadge
❌ heroSubtitle → Frontend očekává heroDescription
❌ 2 pole (heroDescription, heroDescriptionLine2) → Frontend musí spojovat
❌ Chybí heroImage
```

### **✅ SPRÁVNÉ SCHEMA:**

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageComplete',
  title: 'Homepage - Úvodní stránka',
  type: 'document',
  
  // 🎨 Preview (náhled v seznamu)
  preview: {
    select: {
      title: 'heroTitle',
      media: 'heroImage'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Homepage',
        subtitle: 'Úvodní stránka webu',
        media: media || '🏠'
      }
    }
  },
  
  // 📑 Fieldsets (seskupení polí do sekcí)
  fieldsets: [
    {
      name: 'hero',
      title: '🎬 Hero Section',
      description: 'Úvodní obrazovka s velkým videem/obrázkem',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'about',
      title: '📖 O Projektu (UNESCO)',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'stages',
      title: '🏗️ Tří Etapy Výstavby',
      options: { collapsible: true, collapsed: true }
    },
    // ... další sekce
  ],
  
  fields: [
    // ========================================
    // 🎬 HERO SECTION
    // ========================================
    defineField({
      name: 'heroBadge',
      title: 'Badge text',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'III. Etapa v prodeji',
      placeholder: 'III. Etapa v prodeji',
      description: '💚 Zelená bublina s červenou tečkou vpravo nahoře'
    }),
    
    defineField({
      name: 'heroTitle',
      title: 'Hlavní nadpis',
      type: 'text',
      rows: 2,
      fieldset: 'hero',
      description: '✨ Použij <strong>text</strong> pro zvýraznění zlatou barvou. Použij \\n pro nový řádek.',
      placeholder: 'Moderní bydlení\\n<strong>v srdci UNESCO</strong>',
      validation: Rule => Rule.required().max(100)
    }),
    
    defineField({
      name: 'heroDescription',
      title: 'Popis pod nadpisem',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
      description: 'Použij \\n pro nový řádek (automaticky se vytvoří <br>)',
      placeholder: 'Objevte 131 bytů a 14 rodinných domů v historické Kutné Hoře,\\nkde se moderní architektura setkává s bohatou historií',
      validation: Rule => Rule.max(300)
    }),
    
    defineField({
      name: 'heroImage',
      title: 'Background obrázek',
      type: 'image',
      fieldset: 'hero',
      description: '⚠️ Pokud není vyplněno, použije se video. Doporučená velikost: 1920x1080px',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Popis obrázku pro SEO',
          validation: Rule => Rule.required()
        }
      ]
    }),
    
    defineField({
      name: 'heroVideo',
      title: 'Background video',
      type: 'file',
      fieldset: 'hero',
      description: '🎥 MP4 video na pozadí (max 50MB). Pokud je vyplněn heroImage, video se nepoužije.',
      options: {
        accept: 'video/mp4'
      }
    }),
    
    defineField({
      name: 'heroStats',
      title: 'Statistiky (3 položky)',
      type: 'array',
      fieldset: 'hero',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'number',
            title: 'Číslo',
            type: 'string',
            description: 'Např. "131", "14", "B"',
            validation: Rule => Rule.required()
          },
          {
            name: 'label',
            title: 'Popisek',
            type: 'string',
            description: 'Např. "Bytů", "Rodinných domů"',
            validation: Rule => Rule.required()
          },
        ],
        preview: {
          select: {
            title: 'number',
            subtitle: 'label'
          }
        }
      }],
      validation: Rule => Rule.max(3).required()
    }),
    
    // ========================================
    // 📖 O PROJEKTU (UNESCO)
    // ========================================
    defineField({
      name: 'aboutBadge',
      title: 'Badge text',
      type: 'string',
      fieldset: 'about',
      initialValue: 'MĚSTO PAMÁTKY UNESCO',
    }),
    
    defineField({
      name: 'aboutTitle',
      title: 'Nadpis',
      type: 'text',
      rows: 2,
      fieldset: 'about',
      description: '✨ Použij <strong>text</strong> pro zvýraznění zlatou barvou',
    }),
    
    defineField({
      name: 'aboutDescription',
      title: 'Popis',
      type: 'array',
      fieldset: 'about',
      // ✅ VIZUÁLNÍ EDITOR!
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normální', value: 'normal' },
          ],
          marks: {
            decorators: [
              { title: 'Tučné', value: 'strong' },
              { title: 'Kurzíva', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Odkaz',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
                  }
                ]
              }
            ]
          },
          lists: []  // Žádné seznamy
        }
      ]
    }),
    
    // ... další sekce ...
  ]
})
```

---

## 📊 SROVNÁNÍ: PŘED vs. PO

### **PŘED (současný stav):**
❌ 50+ polí v jednom dlouhém seznamu  
❌ Používáme `string` místo `text` nebo `block`  
❌ Názvy polí nesedí s frontendem  
❌ Žádný vizuální editor  
❌ Žádné fieldsets  
❌ Málo validací a helper textů  
❌ Žádné preview  

### **PO (s best practices):**
✅ Pole organizovaná do sekcí (fieldsets)  
✅ Vizuální editor (Portable Text) pro dlouhé texty  
✅ Konzistentní názvy polí  
✅ Helper texty, placeholders, descriptions  
✅ Validace s chybovými zprávami  
✅ Preview v seznamu dokumentů  
✅ Conditional fields (zobrazí se jen když...)  
✅ Hotspot pro obrázky  

---

## 🎯 DOPORUČENÝ POSTUP

### **Fáze 1: Homepage (test)**
1. ✅ Přečti tuto dokumentaci
2. ✅ Předělej Homepage schema podle best practices
3. ✅ Otestuj v Sanity Studio
4. ✅ Uprav frontend rendering (Portable Text)
5. ✅ Vyplň data znovu

### **Fáze 2: Ostatní stránky**
1. Aplikuj stejný pattern na:
   - Důležité informace
   - Kontakt
   - Byty (stránka)
   - Rodinné domy

### **Fáze 3: Komponenty & Moduly**
1. Vytvoř reusable komponenty:
   - Hero Section (použitelný na více stránkách)
   - CTA Section
   - FAQ modul
   - Galerie modul

### **Fáze 4: Preview & Workflow**
1. Přidej preview pro všechny dokumenty
2. Nastav conditional fields
3. Vytvoř custom inputy (pokud potřeba)

---

## 📚 DALŠÍ ZDROJE

**Oficiální Sanity dokumentace:**
- Schema types: https://www.sanity.io/docs/schema-types
- Portable Text: https://www.sanity.io/docs/block-type
- Fieldsets: https://www.sanity.io/docs/object-type#fieldsets
- Validation: https://www.sanity.io/docs/validation
- Preview: https://www.sanity.io/docs/previews

**Naše dokumenty:**
- `SANITY_AUDIT_REPORT.md` - co je špatně
- `SANITY_QUICK_FIX_GUIDE.md` - rychlé opravy
- `DEVELOPMENT_GUIDE.md` - obecný guide

---

## ✅ CHECKLIST PRO NOVÉ SCHEMA

Když vytváříš nové schema, zkontroluj:

- [ ] **Názvy polí** odpovídají frontendu?
- [ ] **Typy polí** jsou správné? (`text` místo `string` pro delší texty)
- [ ] **Vizuální editor** (block) pro bohaté texty?
- [ ] **Fieldsets** pro organizaci polí?
- [ ] **Validace** pro povinná pole?
- [ ] **Helper texty** (`description`, `placeholder`)?
- [ ] **Preview** pro seznam dokumentů?
- [ ] **Obrázky** mají `alt` text pole?
- [ ] **Initial values** pro výchozí hodnoty?
- [ ] **Conditional fields** kde to dává smysl?

---

**Konec dokumentace**  
*Připraven k refactoringu? Řekni a začneme s Homepage! 🚀*



