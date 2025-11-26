# ⚡ SANITY QUICK FIX GUIDE

**Tento dokument obsahuje rychlé návody jak opravit identifikované problémy.**

---

## 🔴 PROBLÉM #1: Chybějící data v Sanity

### **Řešení: Manuálně vyplnit v Sanity Studio**

#### **Krok 1: Otevřít Sanity Studio**
```
http://localhost:3000/studio
```
nebo
```
https://rezidenceusvanny.vercel.app/studio
```

#### **Krok 2: Vyplnit Homepage Complete**

1. V levém menu klikni na **"Homepage - Úvodní stránka"**
2. Najdi sekce s chybějícími obrázky:
   - **Hero Image** (pokud existuje pole)
   - **Tři Etapy - Background Image** → nahraj `/images/DSC02932.jpg`
   - **Why Buy - Background Image** → nahraj `/images/zobrazeni_domu.png`
3. Klikni **"Publish"** (vpravo nahoře)

#### **Krok 3: Vyplnit Důležité informace Complete**

1. V levém menu klikni na **"Důležité informace - Complete"**
2. Najdi sekci **"FAQ"**:
   - **FAQ Title**: `Často kladené <strong>otázky</strong>`
3. Najdi **"Payment Schedule"** (Platební kalendář):
   - Klikni **"Add item"** a vyplň 6 kroků:
     1. Záloha | 100 000 Kč | Rezervační záloha do 10 dnů...
     2. 20% z ceny | Platba do 30 dnů... | atd.
4. Najdi **"FAQ Items"**:
   - Klikni **"Add item"** a vyplň otázky/odpovědi
5. Klikni **"Publish"**

#### **Krok 4: Vyplnit Kontakt Complete**

1. V levém menu klikni na **"Kontakt - Complete"**
2. Vyplň:
   - **Agent 1 Name**: např. "Ing. Jana Nováková"
   - **Agent 1 Image**: nahraj foto
   - **Agent 1 Phone**: např. "+420 777 123 456"
   - **Agent 1 Email**: např. "jana@anomia.cz"
   - **Agent 2 Name**: např. "Bc. Petr Novák"
   - **Agent 2 Image**: nahraj foto
   - **Agent 2 Phone**: např. "+420 777 654 321"
   - **Agent 2 Email**: např. "petr@anomia.cz"
   - **Form Background Image**: nahraj vhodný obrázek
3. Klikni **"Publish"**

---

## 🔴 PROBLÉM #2: Cache strategie

### **Řešení: Opravit kód**

#### **Soubor: `app/page.tsx`** (Homepage)

**Najdi řádek 26:**
```typescript
const data = await client.fetch(`*[_type == "homepageComplete"][0]`)
```

**Změň na:**
```typescript
const data = await client.fetch(`*[_type == "homepageComplete"][0]`, {}, { cache: 'no-store' })
```

#### **Soubor: `app/kontakt/page.tsx`** (Kontakt)

**Najdi řádek 28:**
```typescript
const data = await client.fetch(`*[_type == "contactPageComplete"][0]{...}`)
```

**Změň na:**
```typescript
const data = await client.fetch(`*[_type == "contactPageComplete"][0]{...}`, {}, { cache: 'no-store' })
```

---

## 🔴 PROBLÉM #3: useCdn v produkci

### **Řešení: Dynamic CDN setting**

#### **Soubor: `sanity/lib/client.ts`**

**Najdi řádek 7:**
```typescript
useCdn: false, // Set to true in production for better performance
```

**Změň na:**
```typescript
useCdn: process.env.NODE_ENV === 'production',
```

---

## 🔴 PROBLÉM #4: Vercel Environment Variables

### **Řešení: Zkontrolovat Vercel Dashboard**

1. Jdi na https://vercel.com
2. Vyber projekt **"rezidence-prototype"**
3. Klikni na **Settings**
4. Klikni na **Environment Variables**
5. Zkontroluj že existují:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = eqq7fbzc
   NEXT_PUBLIC_SANITY_DATASET = production
   SANITY_API_TOKEN = sk6R21vel... (celý token)
   ```
6. Pokud chybí, přidej je
7. Po změně klikni na **Deployments** → **Redeploy** (na latest deployment)

---

## 🔴 PROBLÉM #5-7: Webhooks & Revalidation

### **Řešení: Implementovat později**

Tyto problémy nejsou kritické pro okamžité fungování. 

**Priorita:** Střední  
**Deadline:** Do týdne

---

## ✅ CHECKLIST OPRAV

### **KRITICKÉ (Udělat IHNED):**
- [ ] Vyplnit Homepage obrázky v Sanity Studio
- [ ] Vyplnit FAQ + Payment Schedule v Sanity Studio
- [ ] Vyplnit Agent data v Sanity Studio
- [ ] Opravit cache na Homepage (`app/page.tsx:26`)
- [ ] Opravit cache na Kontakt (`app/kontakt/page.tsx:28`)
- [ ] Zkontrolovat Vercel env variables

### **VYSOKÉ (Do 2 dnů):**
- [ ] Změnit `useCdn` na dynamic
- [ ] Commit + push změny na Git
- [ ] Vercel redeploy

### **STŘEDNÍ (Do týdne):**
- [ ] Implementovat webhooks
- [ ] Implementovat ISR
- [ ] Opravit import skripty

---

## 🧪 TESTOVÁNÍ PO OPRAVĚ

### **Test 1: Lokální test**
```bash
npm run dev
# Otevři: http://localhost:3000
# Zkontroluj že se zobrazují Sanity data
```

### **Test 2: Production test**
```bash
# Po deploy na Vercel:
# 1. Otevři https://rezidenceusvanny.vercel.app
# 2. Zkontroluj že se zobrazují správná data
# 3. Změň něco v Sanity Studio
# 4. Obnovit stránku (po 1 minutě)
# 5. Změna by se měla projevit
```

### **Test 3: Sanity Studio test**
```
# 1. Otevři Studio
# 2. Najdi Homepage Complete
# 3. Změň nějaký text
# 4. Klikni Publish
# 5. Refresh homepage
# 6. Změna by se měla projevit (pokud je cache opravena)
```

---

## 📞 POMOC

Pokud něco nefunguje:

1. Zkontroluj console v prohlížeči (F12)
2. Zkontroluj Vercel logs
3. Zkontroluj Sanity logs
4. Kontaktuj development team

---

**Good luck! 🚀**

