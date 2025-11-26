# 🎨 Vizuální průvodce: .env.local

## 📁 KDE NAJDU SOUBOR?

```
rezidence-prototype/
├── app/
├── components/
├── public/
├── sanity/
├── .env.local          ← ✅ TADY JE!
├── .gitignore
├── package.json
├── README.md
└── ...
```

---

## 🖥️ JAK TO VYPADÁ V CURSORU?

### 1. File Explorer (levá strana):

```
📁 REZIDENCE-PROTOTYPE
  📁 app
  📁 components  
  📁 public
  📁 sanity
  📄 .env.local         ← Klikni SEM
  📄 .gitignore
  📄 package.json
  📄 README.md
```

---

## 📝 JAK VYPADÁ OBSAH SOUBORU:

### ❌ PŘED VYPLNĚNÍM (TAK TO VYPADÁ TEĎ):

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                           ← PRÁZDNÉ!

# SMTP Configuration (pro budoucí použití)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=info@rezidenceusvanny.cz
```

### ✅ PO VYPLNĚNÍ (TAK TO MÁ VYPADAT):

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skAbC123dEfGhIjK456lMn  ← VYPLNĚNÉ!

# SMTP Configuration (pro budoucí použití)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=info@rezidenceusvanny.cz
```

---

## 🔐 JAK ZÍSKAT API TOKEN - KROK ZA KROKEM:

### Krok 1: Otevři Sanity Dashboard
```
🌐 https://www.sanity.io/manage
```

### Krok 2: Najdi svůj projekt
```
Projekty →
  📦 Rezidence U sv. Anny
     (Project ID: eqq7fbzc)
```

### Krok 3: Přejdi na API
```
Levé menu:
  🏠 Dashboard
  🔧 API              ← Klikni SEM
  👥 Members
  ⚙️ Settings
```

### Krok 4: Vytvoř token
```
API →
  🔑 Tokens → Add API token
  
  📝 Formulář:
     Name: Website Production Token
     Permissions: ● Editor  ← Vyber toto
     
  [Create] ← Klikni
```

### Krok 5: Zkopíruj token
```
⚠️ ZOBRAZÍ SE JENOM JEDNOU!

Token: skAbC123dEfGhIjK456lMn...
       └─────────────────────┘
         Zkopíruj celé!
         
[📋 Copy token]
```

---

## 🎬 CO DĚLAT S TOKENEM:

### 1. Otevři `.env.local` v editoru

### 2. Najdi tento řádek:
```bash
SANITY_API_TOKEN=
                 ↑ kurzor sem
```

### 3. Vlož token (Ctrl+V):
```bash
SANITY_API_TOKEN=skAbC123dEfGhIjK456lMn
```

### 4. Ulož soubor (Ctrl+S nebo Cmd+S)

### 5. Restartuj server:
```bash
# V terminálu:
# 1. Zastav (Ctrl+C)
# 2. Spusť znovu:
npm run dev
```

---

## ✅ JAK POZNAT, ŽE TO FUNGUJE?

### Test 1: Otevři Studio
```
http://localhost:3000/studio
```

**✅ Úspěch:** Studio se načte a můžeš se přihlásit  
**❌ Chyba:** "Unauthorized" nebo "Invalid token"

### Test 2: Zkontroluj console
```bash
# V terminálu by NEMĚLA být chyba:
✅ Ready in 2.5s
✅ Local: http://localhost:3000
```

### Test 3: Přihlas se do Studio
```
http://localhost:3000/studio

1. Klikni "Sign in"
2. Vyber Google / GitHub / Email
3. Přihlaš se
4. ✅ Uvidíš Sanity Studio dashboard!
```

---

## 🎯 CO SE DĚJE POD POKLIČKOU?

### Když spustíš `npm run dev`:

1. Next.js načte `.env.local`
2. Přečte všechny proměnné
3. Použije je v aplikaci
4. Připojí se k Sanity s API tokenem

### Když otevřeš `/studio`:

1. Studio se načte
2. Zkontroluje API token
3. Připojí se k Sanity projektu (eqq7fbzc)
4. Načte data z datasetu "production"
5. ✅ Můžeš spravovat obsah!

---

## 🔒 BEZPEČNOST:

### ✅ CO JE BEZPEČNÉ:

```bash
# Tyto proměnné JSOU veřejné (začínají NEXT_PUBLIC_):
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc    ✅ OK
NEXT_PUBLIC_SANITY_DATASET=production     ✅ OK
```

### ⚠️ CO MUSÍ ZŮSTAT TAJNÉ:

```bash
# Tato proměnná je TAJNÁ:
SANITY_API_TOKEN=skAbC123...    ⚠️ NIKDY NESDÍLEJ!
```

### 🛡️ Jak je to chráněné?

1. `.env.local` je v `.gitignore`
   ```
   ✅ NEnahrává se na GitHub
   ✅ Zůstává jen na tvém počítači
   ```

2. Token je v Sanity chráněný
   ```
   ✅ Můžeš ho kdykoliv smazat
   ✅ Můžeš vytvořit nový
   ```

---

## 🆘 ŘEŠENÍ PROBLÉMŮ:

### "Nevidím soubor .env.local v editoru"

**Možná příčina:** Skryté soubory (začínají na `.`) nejsou zobrazené

**Řešení:**
1. V Cursoru: `View` → `Show hidden files`
2. Nebo použij terminál:
   ```bash
   cat .env.local
   ```

---

### "Změny se neprojevily"

**Možná příčina:** Server si pamatuje staré nastavení

**Řešení:**
```bash
# 1. Zastav server
Ctrl+C

# 2. Spusť znovu
npm run dev

# 3. Otevři znovu
http://localhost:3000/studio
```

---

### "Studio hází chybu 'Unauthorized'"

**Možná příčina:** Token není správný nebo není vyplněný

**Řešení:**
1. Zkontroluj, že token je vyplněný:
   ```bash
   cat .env.local | grep SANITY_API_TOKEN
   ```
   
   Mělo by být:
   ```bash
   SANITY_API_TOKEN=skAbC123...  ← NĚCO za rovnítkem!
   ```

2. Zkontroluj, že jsi zkopíroval celý token
3. Zkus vytvořit nový token v Sanity

---

### "Token se mi ztratil"

**Možná příčina:** Zavřel jsi okno s tokenem

**Řešení:**
```
Sanity nikdy neukazuje token podruhé.

✅ Musíš vytvořit NOVÝ token:
   1. Jdi na sanity.io/manage
   2. API → Tokens
   3. Add API token
   4. Tentokrát si ho HNED zkopíruj!
```

---

## 📚 SOUHRN - 5 KROKŮ:

```
1️⃣ Otevři .env.local v editoru
2️⃣ Jdi na sanity.io/manage a získej token
3️⃣ Vlož token do souboru
4️⃣ Ulož soubor (Ctrl+S)
5️⃣ Restartuj server (Ctrl+C → npm run dev)
```

---

## 🎉 HOTOVO!

Po dokončení budeš moct:
- ✅ Přistupovat do Sanity Studio
- ✅ Přidávat nové byty
- ✅ Upravovat existující byty
- ✅ Nahrávat obrázky a PDF
- ✅ Spravovat celý obsah webu

**Vše bezpečně a bez obav!** 🚀



