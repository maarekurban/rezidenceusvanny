# 📦 Návod na import dat do Sanity

## ✅ Co je připraveno

Máš připravený automatický import skript, který:
- ✅ Načte všechny byty z Excelu
- ✅ Nahraje půdorysy a obrázky
- ✅ Vytvoří všechny byty v Sanity
- ✅ Přidá nová schémata pro správu webu

---

## 🚀 Jak spustit import

### **1. Ujisti se, že máš v `.env.local` API token**

Soubor `.env.local` musí obsahovat:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=tvůj-token-zde
```

### **2. Spusť import skript**

```bash
node scripts/import-apartments.js
```

### **3. Sleduj výstup**

Skript ti ukáže:
- Kolik bytů našel v Excelu
- Které byty importuje
- Které přeskakuje (prodané)
- Které obrázky nahrává
- Případné chyby

---

## 📊 Co bude importováno

### **Byty:**
- ✅ Základní info (číslo, dům, patro, dispozice)
- ✅ Plochy (podlahová, užitná)
- ✅ Cena
- ✅ Stav (k dispozici/rezervováno/prodáno)
- ✅ Místnosti s plochami
- ✅ Venkovní prostory (balkon, terasa, zahrada)
- ✅ Půdorysy (z `/public/pudorysy/`)
- ✅ Hero obrázek

### **Pouze volné byty:**
- Import přeskakuje byty se stavem "rezervováno" nebo "prodáno"
- Importují se pouze byty se stavem "volný"

---

## 🎨 Nová schémata v Sanity Studio

Po restartu serveru uvidíš v Sanity Studio nové sekce:

### **1. Nastavení webu** (`siteSettings`)
Můžeš editovat:
- Název webu
- Logo
- Kontaktní údaje (telefon, email, adresa)
- Realitní makléři (jméno, pozice, telefon, email, fotka)
- Sociální sítě (Facebook, Instagram)

### **2. Úvodní stránka** (`homepage`)
Můžeš editovat:
- Hero video
- Hlavní nadpis a podnadpis
- Statistiky (počet bytů, domů, energetická třída)
- Sekce O projektu (text, video)
- Výhody projektu
- Galerie obrázků

### **3. Byty** (`apartment`)
- Automaticky naimportované z Excelu
- Můžeš je dále upravovat

### **4. Dokumenty** (`pdfDocument`)
- PENB, standardy, zásady
- Můžeš nahrát PDF soubory

### **5. Stránky** (`page`)
- Pro další statické stránky

---

## 🔄 Jak to funguje

### **Import proces:**

1. **Načte Excel:** `Byty rezidence import 2.xlsx`
2. **Pro každý volný byt:**
   - Parsuje data (číslo bytu, plochy, místnosti, atd.)
   - Nahraje půdorys do Sanity
   - Nahraje hero obrázek
   - Vytvoří dokument v Sanity
3. **Výstup:** Seznam importovaných bytů

### **Duplikáty:**
- Skript používá `createOrReplace()` - pokud byt už existuje, přepíše ho
- ID je generováno z bytového domu a čísla bytu
- Můžeš skript spustit vícekrát bez obav

---

## ⚠️ Možné problémy a řešení

### **"No token provided"**
❌ **Problém:** Chybí API token v `.env.local`  
✅ **Řešení:** Zkontroluj, že máš vyplněný `SANITY_API_TOKEN`

### **"File not found"**
❌ **Problém:** Obrázek nebo Excel soubor nenalezen  
✅ **Řešení:** 
- Zkontroluj, že existuje `/public/Byty rezidence import 2.xlsx`
- Zkontroluj, že existují půdorysy v `/public/pudorysy/`

### **"Permission denied"**
❌ **Problém:** Nedostatečná práva API tokenu  
✅ **Řešení:** Vytvoř nový token s **Editor** oprávněními

### **"Network error"**
❌ **Problém:** Problém s připojením k Sanity  
✅ **Řešení:** Zkontroluj internetové připojení

---

## 📝 Po importu

### **1. Zkontroluj data v Sanity Studio**
```
http://localhost:3000/studio
```

Otevři sekci **Byty** a zkontroluj, že:
- ✅ Všechny byty jsou naimportované
- ✅ Obrázky se načítají
- ✅ Data jsou správná

### **2. Uprav Next.js stránky**

Teď když máš data v Sanity, můžeš:
- Upravit `/app/byty/page.tsx` aby fetchovalo ze Sanity
- Upravit `/app/byty/[slug]/page.tsx` aby fetchovalo detail ze Sanity
- Přidat fetching pro homepage content

### **3. Přidej další data**

V Sanity Studio můžeš nyní přidat:
- **Nastavení webu:** Logo, kontakty, makléři
- **Úvodní stránku:** Texty, galerie, videa
- **Dokumenty:** PENB, standardy, zásady

---

## 🎯 Shrnutí

```bash
# 1. Ujisti se, že máš API token v .env.local
# 2. Spusť import
node scripts/import-apartments.js

# 3. Zkontroluj Studio
http://localhost:3000/studio

# 4. Restartuj server pro nová schémata
# (pokud server už běží)
```

---

## 📚 Další kroky

Po úspěšném importu:
1. ✅ Aktualizuj Next.js komponenty pro fetching ze Sanity
2. ✅ Nahraj logo a další obrázky přes Studio
3. ✅ Vyplň texty a nastavení webu
4. ✅ Nahraj PDF dokumenty
5. ✅ Otestuj vše na localhostu
6. ✅ Deploy na Vercel

---

**🎉 Import je připravený! Stačí spustit příkaz a všechno se nahraje automaticky.**


