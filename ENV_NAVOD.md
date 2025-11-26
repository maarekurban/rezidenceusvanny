# 🔐 Návod: Jak nastavit .env.local

## ✅ Soubor .env.local už je vytvořený!

Nachází se v root složce projektu:
```
rezidence-prototype/.env.local
```

---

## 📝 CO TEĎZÍŇÍŠ:

### 1️⃣ Otevři soubor `.env.local` v editoru

**V Cursoru:**
- Klikni na `File Explorer` vlevo
- Najdi soubor `.env.local` (je v root složce projektu)
- Klikni na něj → otevře se v editoru

**Nebo ručně:**
- Otevři složku projektu ve Finderu
- Najdi soubor `.env.local`
- Otevři ho v jakémkoliv textovém editoru

---

### 2️⃣ Jak vypadá soubor TEĎÉ (PŘED VYPLNĚNÍM):

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# SMTP Configuration (pro budoucí použití)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=info@rezidenceusvanny.cz
```

---

### 3️⃣ Získej API Token ze Sanity

**KROK ZA KROKEM:**

1. **Otevři prohlížeč** a jdi na: https://www.sanity.io/manage

2. **Přihlas se** (pokud nejsi přihlášený)

3. **Najdi projekt "Rezidence U sv. Anny"** (Project ID: eqq7fbzc)
   - Měl by být v seznamu projektů
   - Klikni na něj

4. **Klikni na "API"** v levém menu

5. **Klikni na "Tokens"**

6. **Klikni na "Add API token"** (modré tlačítko)

7. **Vyplň formulář:**
   - **Name:** `Website Production Token`
   - **Permissions:** Vyber **"Editor"** (nebo "Viewer" pokud chceš jen číst data)

8. **Klikni "Create"**

9. **DŮLEŽITÉ:** Token se ukáže **POUZE JEDNOU!**
   - Zkopíruj ho (Ctrl+C / Cmd+C)
   - Token vypadá nějak takto: `skAbC123dEfGhIjK456lMnOpQrS789tUvWxYz012`

---

### 4️⃣ Vlož token do `.env.local`

**PŘED (prázdný token):**
```bash
SANITY_API_TOKEN=
```

**PO (s tvojím tokenem):**
```bash
SANITY_API_TOKEN=skAbC123dEfGhIjK456lMnOpQrS789tUvWxYz012
```

**Kompletní soubor pak bude vypadat:**
```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skAbC123dEfGhIjK456lMnOpQrS789tUvWxYz012

# SMTP Configuration (pro budoucí použití)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=info@rezidenceusvanny.cz
```

---

### 5️⃣ Ulož soubor a restartuj server

1. **Ulož `.env.local`** (Ctrl+S / Cmd+S)

2. **Restartuj dev server:**
   - V terminálu zmáčkni `Ctrl+C` (zastaví server)
   - Pak spusť znovu: `npm run dev`

---

## 🎯 CO TAK VLASTNĚ DĚLÁŠ?

### Vysvětlení jednotlivých řádků:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
```
- **Co to je:** ID tvého Sanity projektu
- **Proč je potřeba:** Next.js tak ví, ke kterému Sanity projektu se má připojit
- **`NEXT_PUBLIC_`:** Znamená, že tato hodnota je veřejná (viditelná v prohlížeči)

```bash
NEXT_PUBLIC_SANITY_DATASET=production
```
- **Co to je:** Název datasetu (jako "databáze" ve které jsou data)
- **Proč je potřeba:** Sanity může mít více datasetů (production, staging, atd.)

```bash
SANITY_API_TOKEN=váš-tajný-token
```
- **Co to je:** Tajný klíč pro přístup do Sanity
- **Proč je potřeba:** Bez něj nemůžeš zapisovat/číst data
- **DŮLEŽITÉ:** Toto je TAJNÉ! Nikdy to nesdílej!

---

## ⚠️ DŮLEŽITÉ BEZPEČNOSTNÍ INFORMACE:

### ✅ CO SE DĚJE:

1. **`.env.local` je v `.gitignore`**
   - To znamená, že se NIKDY nenahraje na GitHub
   - Je jenom na tvém počítači

2. **Když děláš `git push`:**
   - `.env.local` zůstane na tvém počítači
   - Nikdo jiný ho neuvidí
   - Je to bezpečné! ✅

3. **Pro Vercel (production):**
   - Musíš přidat stejné hodnoty v Vercel dashboardu
   - Vercel má vlastní systém pro env variables
   - Je to také bezpečné! ✅

---

## 🔍 JAK OVĚŘIT, ŽE TO FUNGUJE:

### 1. Zkontroluj, že soubor existuje:
```bash
ls -la | grep .env.local
```

Měl by se ukázat:
```
-rw-r--r--  1 marekurban  staff  245  Nov 19 10:30 .env.local
```

### 2. Zkontroluj obsah (BEZ TOKENU - NEZDÍLEJ TO!):
```bash
cat .env.local | grep -v "TOKEN"
```

### 3. Otevři Studio:
```
http://localhost:3000/studio
```

Pokud se Studio načte a můžeš se přihlásit → **FUNGUJE TO!** ✅

---

## 🆘 ČASTÉ PROBLÉMY:

### ❌ "Soubor .env.local nevidím v editoru"
**Řešení:** Někdy se skryté soubory (začínají na `.`) nezobrazují.
- V Cursoru: `View` → `Show hidden files`
- V terminálu soubor existuje a funguje!

### ❌ "Změny se neprojevily"
**Řešení:** Musíš restartovat dev server:
```bash
# Zastav server (Ctrl+C)
# Spusť znovu:
npm run dev
```

### ❌ "Nemůžu najít API token v Sanity"
**Řešení:** 
1. Zkontroluj, že jsi přihlášený na správný účet
2. Zkontroluj, že máš přístup k projektu "Rezidence U sv. Anny"
3. Jdi přesně podle kroků výše

---

## 📚 SHRNUTÍ:

1. ✅ Soubor `.env.local` **už je vytvořený**
2. ⏳ **Otevři ho** v editoru
3. ⏳ **Získej API token** ze Sanity dashboardu
4. ⏳ **Vlož token** do souboru místo prázdného řádku
5. ⏳ **Ulož soubor**
6. ⏳ **Restartuj server**
7. ✅ **Otevři Studio** a přihlas se

---

## 🎉 PO DOKONČENÍ:

- ✅ Budeš moct přistupovat do Sanity Studio
- ✅ Budeš moct přidávat/upravovat byty
- ✅ Budeš moct nahrávat obrázky
- ✅ Vše je bezpečné a nesdílí se na Git

**Pokud máš jakékoliv problémy, napiš mi!** 🙂



