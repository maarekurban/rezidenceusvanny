# 📧 Resend Email Setup Guide

Tento návod tě provede nastavením Resend pro odesílání emailů z kontaktních formulářů.

---

## 🚀 KROK 1: Vytvoření Resend účtu

1. **Jdi na**: https://resend.com/signup
2. **Registruj se** pomocí GitHub nebo emailu
3. **Ověř email** (pokud se registruješ emailem)

⏱️ **Čas: 2 minuty**

---

## 🔑 KROK 2: Získání API klíče

1. **Po přihlášení jdi na**: https://resend.com/api-keys
2. **Klikni na** "Create API Key"
3. **Zadej název**: `Rezidence U sv. Anny - Production`
4. **Permissions**: **Full Access** (nebo jen "Sending access")
5. **Klikni** "Add"
6. **ZKOPÍRUJ API klíč** (uvidíš ho jen jednou!)
   - Vypadá takto: `re_123abc456def789ghi012jkl345mno678`

⚠️ **DŮLEŽITÉ:** Ulož si API klíč - už ho neuvidíš!

⏱️ **Čas: 1 minuta**

---

## 💻 KROK 3: Přidání API klíče LOKÁLNĚ

### A) Otevři `.env.local` v projektu

```bash
# Otevři soubor .env.local (je v kořenové složce projektu)
```

### B) Přidej na konec souboru:

```env
# Resend API Key
RESEND_API_KEY=re_tvuj_api_klic_zde
```

**Příklad:**
```env
RESEND_API_KEY=re_123abc456def789ghi012jkl345mno678
```

### C) Restartuj development server

```bash
# Zastav server (Ctrl+C) a znovu spusť:
npm run dev
```

✅ **Hotovo!** Lokálně by teď měly fungovat emaily!

⏱️ **Čas: 2 minuty**

---

## ☁️ KROK 4: Přidání API klíče na VERCEL

### A) Jdi na Vercel Dashboard

1. **Otevři**: https://vercel.com/
2. **Vyber projekt**: `rezidenceusvanny`
3. **Klikni na**: **Settings** (nahoře)
4. **V levém menu klikni na**: **Environment Variables**

### B) Přidej novou environment variable

1. **Klikni na** "Add New"
2. **Key (Name)**: `RESEND_API_KEY`
3. **Value**: `re_tvuj_api_klic_zde` (zkopíruj z Resend)
4. **Environment**: Zaškrtni **všechny** (Production, Preview, Development)
5. **Klikni** "Save"

### C) Znovu nasaď projekt

**DŮLEŽITÉ:** Po přidání env variable musíš **redeploy**:

1. **Jdi na**: **Deployments** tab
2. **Vyber poslední deployment**
3. **Klikni na tři tečky** (⋯)
4. **Klikni** "Redeploy"
5. **Potvrď** "Redeploy"

⏱️ **Za 2-3 minuty** bude live s funkčními emaily!

---

## ✅ TESTOVÁNÍ

### Lokálně (localhost:3000)

1. **Jdi na**: http://localhost:3000
2. **Vyplň kontaktní formulář**
3. **Odešli**
4. **Zkontroluj** email na `info@rezidenceusvanny.cz`

### Na Vercelu (live web)

1. **Jdi na**: https://rezidenceusvanny.vercel.app/
2. **Vyplň kontaktní formulář**
3. **Odešli**
4. **Zkontroluj** email na `info@rezidenceusvanny.cz`

---

## 📧 POZNÁMKY

### **"From" adresa**

Aktuálně se používá:
```
from: 'Rezidence U sv. Anny <onboarding@resend.dev>'
```

**Pro produkci** (po ověření domény):
```
from: 'Rezidence U sv. Anny <noreply@rezidenceusvanny.cz>'
```

### **Limity (Free tier)**

- ✅ **100 emailů / den**
- ✅ **3,000 emailů / měsíc**
- ✅ **Více než dost** pro tento projekt!

### **Ověření domény (volitelné)**

Pokud chceš posílat z `@rezidenceusvanny.cz`:

1. **Jdi na**: https://resend.com/domains
2. **Klikni** "Add Domain"
3. **Zadej**: `rezidenceusvanny.cz`
4. **Přidej DNS záznamy** (ukáže ti Resend)
5. **Po ověření** změň `from` v `app/api/contact/route.ts`

⏱️ **Čas: 10 minut** (ale není to nutné hned)

---

## 🆘 TROUBLESHOOTING

### ❌ "Invalid API key"

- Zkontroluj, že API klíč je správně zkopírován
- Zkontroluj, že je v `.env.local` **bez mezer**
- Restartuj development server

### ❌ "Environment variable not found"

- Zkontroluj, že `RESEND_API_KEY` je v `.env.local`
- Na Vercelu: zkontroluj Environment Variables v Settings
- Po přidání na Vercel: musíš redeploy!

### ❌ Email nepřišel

- Zkontroluj **spam složku**
- Zkontroluj Resend logs: https://resend.com/logs
- Zkontroluj Vercel logs (pokud je to na produkci)

---

## 🎉 HOTOVO!

Emaily by měly fungovat! 🚀

**Máš problém?** Napiš na support nebo zkontroluj:
- Resend Dashboard: https://resend.com/emails
- Vercel Logs: Vercel Dashboard → Projekt → Runtime Logs

