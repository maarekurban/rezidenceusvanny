# 📋 Project Brief Template
## Web Development with CMS

**Tento dokument vyplní Project Manager / Klient před zahájením vývoje**

---

## 📝 Základní Informace

| Položka | Odpověď |
|---------|---------|
| **Název projektu** | |
| **Typ webu** | □ Prezentační web<br>□ E-commerce<br>□ Real estate<br>□ Portfolio<br>□ Blog<br>□ Jiné: |
| **Cílová doména** | www.example.cz |
| **Launch date** | DD.MM.YYYY |
| **Jazyk** | □ Čeština<br>□ Angličtina<br>□ Více jazyků |
| **Kontaktní osoba** | Jméno, email, telefon |

---

## 🎨 Design & Obsah

### **Design Assets (co dodá grafik):**

- [ ] **Figma/Adobe XD file** s kompletním designem
- [ ] **Logo** (SVG + PNG, transparent background)
- [ ] **Barevná paleta** (HEX kódy)
- [ ] **Fonty** (názvy a odkazy na Google Fonts nebo lokální soubory)
- [ ] **Ikony** (SVG preferred)
- [ ] **Obrázky** (optimalizované, max 200 KB per image)
  - Hero images (1920x1080 px)
  - Product/Project images (800x600 px)
  - Thumbnails (400x300 px)
- [ ] **Videa** (MP4, max 10 MB)
- [ ] **Dokumenty** (PDF, DOC)

### **Obsah (co dodá klient):**

- [ ] **Všechny texty** ve Wordu/Google Docs
  - Homepage
  - O nás
  - Služby/Produkty
  - Kontakt
  - Footer info
- [ ] **SEO keywords** - 10-15 hlavních slov/frází
- [ ] **Meta descriptions** pro každou stránku (max 160 znaků)
- [ ] **Kontaktní údaje:**
  - Email (pro formuláře)
  - Telefon
  - Adresa
  - Sociální sítě (odkazy)
- [ ] **Google Analytics ID** (volitelné)
- [ ] **Facebook Pixel ID** (volitelné)

---

## 🗂️ Struktura Webu

**Vypište všechny stránky, které web bude obsahovat:**

### **Hlavní navigace:**
1. Homepage (/)
2. _______________ (/__________)
3. _______________ (/__________)
4. _______________ (/__________)
5. _______________ (/__________)
6. Kontakt (/kontakt)

### **Další stránky:**
- [ ] Blog / Novinky
- [ ] FAQ
- [ ] Privacy Policy / GDPR
- [ ] Kariéra / Jobs
- [ ] Jiné: _______________

### **Dynamic Content (opakující se struktury):**

Např. produkty, články, projekty, apartmány...

**Příklad pro real estate:**
```
Byty:
├── Listing page (/byty)
├── Detail page (/byty/[nazev-bytu])
└── Filtrování (dispozice, cena, plocha)
```

**Váš projekt:**
```
________________:
├── Listing page (/_______)
├── Detail page (/_______/[_____])
└── Funkce: _______________
```

---

## 📧 Formuláře & Interakce

### **Formuláře:**

- [ ] **Kontaktní formulář**
  - Pole: Jméno, Email, Telefon, Zpráva
  - Kam posílat: _______________@_______
  
- [ ] **Poptávkový formulář**
  - Pole: _______________
  - Kam posílat: _______________

- [ ] **Newsletter**
  - Integrace: Mailchimp / Mailerlite / jiné: _______

### **Interaktivní features:**

- [ ] Mapa (Google Maps / Mapy.cz)
- [ ] Galerie obrázků (Lightbox)
- [ ] Video player
- [ ] Filtrování produktů/projektů
- [ ] Search funkce
- [ ] Live chat
- [ ] Jiné: _______________

---

## 🎛️ CMS Požadavky

**Co chce klient editovat sám přes CMS?**

- [ ] **Texty** - všechny stránky
- [ ] **Obrázky** - všechny stránky
- [ ] **Produkty/Projekty** - přidávat, editovat, mazat
- [ ] **Blog články** - psát a publikovat
- [ ] **Novinky/Aktuality**
- [ ] **Dokumenty** (PDF download)
- [ ] **Ceny** - měnit ceníky
- [ ] **Kontakty** - upravovat údaje
- [ ] **SEO metadata** - titles, descriptions
- [ ] **Jiné:** _______________

### **Počet uživatelů CMS:**
- [ ] 1 uživatel
- [ ] 2-5 uživatelů
- [ ] 6+ uživatelů

### **Jazyková mutace CMS:**
- [ ] Čeština
- [ ] Angličtina
- [ ] Oboje

---

## 🔍 SEO & Marketing

### **SEO Základy:**

- [ ] **Google Search Console** - klient má účet?
  - Ano, přístup: _______________
  - Ne, vytvoříme nový
  
- [ ] **Google Analytics** - klient má účet?
  - Ano, Tracking ID: _______________
  - Ne, vytvoříme nový

- [ ] **Google My Business** - má klient profil?
  - Ano
  - Ne

### **Důležitá klíčová slova (Top 10):**

1. _______________
2. _______________
3. _______________
4. _______________
5. _______________
6. _______________
7. _______________
8. _______________
9. _______________
10. _______________

### **Konkurence (3-5 webů):**

1. www._______________ (co se nám líbí / co chybí)
2. www._______________ (co se nám líbí / co chybí)
3. www._______________ (co se nám líbí / co chybí)

---

## 🌐 Technické Požadavky

### **Hosting:**

- [ ] **Máme vyřešený** 
  - Provider: _______________
  - Přístupové údaje: _______________
  
- [ ] **Potřebujeme vyřešit**
  - Doporučení: Vercel (zdarma pro Next.js)

### **Doména:**

- [ ] **Máme doménu**
  - Registrátor: _______________
  - Přístup k DNS: _______________
  
- [ ] **Potřebujeme koupit**
  - Preferovaný název: _______________

### **Email:**

- [ ] **Máme firemní emaily** (info@firma.cz)
  - Provider: _______________
  
- [ ] **Potřebujeme nastavit**
  - Kolik emailů: _______________

### **SSL Certifikát:**

- [ ] Automaticky (Vercel/Netlify)
- [ ] Vlastní certifikát
- [ ] Potřebujeme poradit

---

## 📱 Mobilní & Responzivita

### **Prioritní zařízení:**

- [x] Desktop (1920px+)
- [x] Laptop (1366px)
- [x] Tablet (768px)
- [x] Mobile (375px - iPhone)

### **Testování:**

- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad
- [ ] Desktop (Chrome, Firefox, Edge)

---

## ⚡ Performance & Rychlost

### **Požadavky:**

- [ ] **Page load < 3 sec** (standard)
- [ ] **Page load < 1 sec** (premium)
- [ ] **Lighthouse score > 90**
- [ ] **Image optimization** (WebP format)
- [ ] **Lazy loading** obrázků

---

## 🔐 Bezpečnost & GDPR

### **Legal Pages:**

- [ ] **Ochrana osobních údajů** (GDPR)
  - Text dodá: Klient / Právník / Vygenerujeme
  
- [ ] **Podmínky použití**
  - Text dodá: Klient / Právník / Vygenerujeme

- [ ] **Cookie consent** banner
  - Ano, potřebujeme
  - Ne

### **Formuláře GDPR:**

- [ ] Checkbox "Souhlasím se zpracováním osobních údajů"
- [ ] Odkaz na GDPR dokument
- [ ] Double opt-in pro newsletter

---

## 💰 Budget & Timeline

### **Budget:**

- [ ] **Do 50k Kč** (základní prezentační web)
- [ ] **50-150k Kč** (pokročilý web s CMS)
- [ ] **150k+ Kč** (komplexní řešení, e-commerce)
- [ ] **Custom** (upřesníme po konzultaci)

### **Timeline:**

| Fáze | Termín | Zodpovědná osoba |
|------|--------|------------------|
| **Brief + konzultace** | DD.MM.YYYY | PM |
| **Design Mockup** | DD.MM.YYYY | Grafik |
| **Schválení designu** | DD.MM.YYYY | Klient |
| **Vývoj (frontend)** | DD.MM.YYYY | Developer |
| **CMS setup** | DD.MM.YYYY | Developer |
| **Obsah nahraný** | DD.MM.YYYY | Klient/Copywriter |
| **Testování** | DD.MM.YYYY | Developer + Klient |
| **Launch** | DD.MM.YYYY | Všichni |

---

## ✅ Pre-Development Checklist

**Před zahájením vývoje musí být hotové:**

- [ ] Tento brief kompletně vyplněný
- [ ] Design mockup schválený klientem
- [ ] Všechny texty napsané (min. 80%)
- [ ] Logo a brand assets dodané
- [ ] Obrázky vybrané a připravené
- [ ] Doména zaregistrovaná
- [ ] Hosting vyřešený (nebo plán)
- [ ] Kontaktní email aktivní
- [ ] CMS požadavky jasné
- [ ] SEO keywords definované

---

## 📞 Komunikace

### **Preferovaný způsob komunikace:**

- [ ] Email
- [ ] Slack / Teams
- [ ] Telefon / WhatsApp
- [ ] Weekly meetings (Online / Osobně)

### **Response time:**

- [ ] Urgentní záležitosti: do ___ hodin
- [ ] Běžné dotazy: do ___ dnů
- [ ] Review a schválení: do ___ dnů

---

## 🎯 Success Criteria

**Co znamená úspěch pro tento projekt?**

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

**KPIs (měřitelné cíle):**

- [ ] ___ návštěvníků za měsíc
- [ ] ___ poptávek z formulářů za měsíc
- [ ] Page speed score > ___
- [ ] Mobilní conversion rate > ___%
- [ ] Jiné: _______________

---

## 📝 Notes & Special Requirements

*Jakékoliv další informace, specifické požadavky, omezení, preference...*

_______________________________________________
_______________________________________________
_______________________________________________
_______________________________________________

---

## ✍️ Podpisy & Schválení

**Datum vyplnění:** _______________

**Vyplnil (PM/Klient):**
- Jméno: _______________
- Podpis: _______________

**Schválil (Developer/Agency):**
- Jméno: _______________
- Podpis: _______________
- Odhadovaný čas: ___ hodin / ___ týdnů
- Odhadovaná cena: ___ Kč

---

**📌 Tento dokument přiložte k zadání projektu spolu s DEVELOPMENT_GUIDE.md**

**🚀 Díky tomuto briefinhu bude vývoj rychlejší, levnější a bez překvapení!**


