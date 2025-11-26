# 🚀 SEO Production Checklist

**Až bude web na ostré doméně `rezidenceusvanny.cz`, udělej tyto kroky:**

---

## ✅ KROK 1: Zapnout indexování (DŮLEŽITÉ!)

### A) `app/layout.tsx`

Změň:
```typescript
robots: {
  index: false,  // ❌ Změň na: true
  follow: false, // ❌ Změň na: true
  nocache: true, // ❌ Smaž tento řádek
  googleBot: {
    index: false,  // ❌ Změň na: true
    follow: false, // ❌ Změň na: true
  },
},
```

**NA:**
```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
},
```

---

### B) `app/robots.ts`

Změň:
```typescript
rules: [
  {
    userAgent: '*',
    disallow: '/', // ❌ Smaž tento řádek
  },
],
// sitemap: ... // ❌ Odkomentuj sitemap
```

**NA:**
```typescript
rules: [
  {
    userAgent: '*',
    allow: '/',
    disallow: ['/studio/', '/api/'],
  },
],
sitemap: 'https://rezidenceusvanny.cz/sitemap.xml',
```

---

## ✅ KROK 2: Google Search Console

1. **Jdi na**: https://search.google.com/search-console
2. **Přidej web**: `rezidenceusvanny.cz`
3. **Ověř vlastnictví**: 
   - Download HTML soubor
   - Nahraj do `public/` složky
   - Nebo použij meta tag (přidej do `layout.tsx`)
4. **Odešli sitemap**: 
   - URL: `https://rezidenceusvanny.cz/sitemap.xml`
   - Klikni "Add Sitemap"

---

## ✅ KROK 3: Google Analytics (volitelné)

1. **Vytvoř GA4 property**
2. **Zkopíruj Measurement ID** (vypadá jako `G-XXXXXXXXXX`)
3. **Přidej do projektu**:

Vytvoř `app/GoogleAnalytics.tsx`:
```typescript
'use client'

import Script from 'next/script'

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
```

Přidej do `app/layout.tsx`:
```typescript
import { GoogleAnalytics } from './GoogleAnalytics'

// V <body>:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

---

## ✅ KROK 4: Resend Email Doména

Nezapomeň ověřit doménu v Resend (viz uložená poznámka):

1. **Jdi na**: https://resend.com/domains
2. **Přidej**: `rezidenceusvanny.cz`
3. **Přidej DNS záznamy** (TXT, MX)
4. **Změň v kódu**: `delivered@resend.dev` → `noreply@rezidenceusvanny.cz`

---

## ✅ KROK 5: Final checklist před spuštěním

- [ ] NOINDEX vypnutý (`layout.tsx`)
- [ ] robots.txt povoluje indexování
- [ ] Sitemap je aktivní
- [ ] Google Search Console připojená
- [ ] Meta tags zkontrolované (og:image, twitter:card)
- [ ] Resend doména ověřená
- [ ] Google Analytics (volitelné)
- [ ] Test všech formulářů
- [ ] Test všech stránek na mobilech

---

## 📝 Poznámky

### Klíčová slova pro SEO:
- byty kutná hora
- rodinné domy kutná hora
- byty unesco kutná hora
- nové byty kutná hora
- nízkoenergetické byty
- rezidence kutná hora

### Open Graph obrázek:
Aktuálně: `/images/DSC02932.jpg`
Doporučená velikost: 1200x630 px

---

## 🆘 Troubleshooting

### Web se neindexuje
1. Zkontroluj `robots.txt`: https://rezidenceusvanny.cz/robots.txt
2. Zkontroluj meta tags: View Page Source → `<meta name="robots"`
3. Google Search Console → URL Inspection
4. Počkej 1-2 týdny (indexování trvá)

### Sitemap nefunguje
1. Test: https://rezidenceusvanny.cz/sitemap.xml
2. Zkontroluj formát
3. Resubmit v Google Search Console

---

**Po dokončení všech kroků je web připravený pro produkci!** 🎉



