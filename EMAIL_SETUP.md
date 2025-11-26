# 📧 Nastavení odesílání e-mailů

Všechny kontaktní formuláře na webu jsou nyní připraveny odesílat data na **info@rezidenceusvanny.cz**.

## 📋 Které formuláře jsou implementovány

1. **Homepage** (`/`) - Obecný kontaktní formulář
2. **Detail bytu** (`/byty/[slug]`) - Poptávka konkrétního bytu (obsahuje číslo bytu)
3. **Důležité informace** (`/dulezite-informace`) - Kontaktní formulář
4. **Kontakt** (`/kontakt`) - Poptávkový formulář

## ⚙️ Jak to funguje

- Všechny formuláře odesílají data na API endpoint `/api/contact`
- Endpoint zatím pouze loguje data do konzole
- V každém e-mailu je informace o:
  - **Stránce**, ze které byla poptávka odeslána
  - **Čísle bytu** (u detailu bytu)
  - Jménu, telefonu, e-mailu a zprávě od zákazníka

## 🚀 Produkční nasazení - Možnosti

### Možnost 1: Resend (Doporučeno ✅)

**Výhody:** Nejjednodušší integrace, spolehlivé, moderní API

1. Zaregistrujte se na [resend.com](https://resend.com)
2. Ověřte doménu `rezidenceusvanny.cz`
3. Získejte API klíč
4. Nainstalujte Resend:
   ```bash
   npm install resend
   ```

5. Aktualizujte `/app/api/contact/route.ts`:
   ```typescript
   import { Resend } from 'resend'
   
   const resend = new Resend(process.env.RESEND_API_KEY)
   
   export async function POST(request: Request) {
     try {
       const data = await request.json()
       
       await resend.emails.send({
         from: 'web@rezidenceusvanny.cz',
         to: 'info@rezidenceusvanny.cz',
         subject: data.apartment 
           ? `Poptávka bytu ${data.apartment}` 
           : `Nová poptávka z ${data.page}`,
         html: `
           <h2>Nová poptávka</h2>
           <p><strong>Stránka:</strong> ${data.page}</p>
           ${data.apartment ? `<p><strong>Byt:</strong> ${data.apartment}</p>` : ''}
           <p><strong>Jméno:</strong> ${data.name}</p>
           <p><strong>Telefon:</strong> ${data.phone}</p>
           <p><strong>E-mail:</strong> ${data.email}</p>
           ${data.message ? `<p><strong>Zpráva:</strong><br>${data.message}</p>` : ''}
         `,
       })
       
       return NextResponse.json({ success: true })
     } catch (error) {
       return NextResponse.json({ success: false }, { status: 500 })
     }
   }
   ```

6. Přidejte do `.env.local`:
   ```
   RESEND_API_KEY=vaš_api_klíč
   ```

### Možnost 2: SendGrid

1. Zaregistrujte se na [sendgrid.com](https://sendgrid.com)
2. Ověřte doménu
3. Získejte API klíč
4. Nainstalujte:
   ```bash
   npm install @sendgrid/mail
   ```
5. Použijte podobný kód jako u Resend

### Možnost 3: Nodemailer (Vlastní SMTP)

Pokud máte vlastní SMTP server (např. od webhostingu):

1. Nainstalujte:
   ```bash
   npm install nodemailer
   ```

2. V `.env.local`:
   ```
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=info@rezidenceusvanny.cz
   SMTP_PASS=vaše_heslo
   ```

3. Aktualizujte `/app/api/contact/route.ts` s kódem z komentářů

## 🧪 Testování

1. Spusťte dev server: `npm run dev`
2. Vyplňte formulář na některé stránce
3. Zkontrolujte konzoli - měli byste vidět logované data
4. Po nasazení do produkce kontrolujte, zda e-maily přicházejí na info@rezidenceusvanny.cz

## 📝 Formát e-mailu

**Předmět:**
- "Poptávka bytu BD-B1 4.01" (u detailu bytu)
- "Nová poptávka z Homepage" (ostatní)

**Tělo e-mailu obsahuje:**
- Stránka: Homepage / Detail bytu / Důležité informace / Kontakt
- Byt: BD-B1 4.01 (pouze u detailu bytu)
- Jméno: Jan Novák
- Telefon: +420 123 456 789
- E-mail: jan.novak@email.cz
- Zpráva: Text zprávy od zákazníka

## ⚠️ Důležité

- Nezapomeňte přidat `.env.local` do `.gitignore`
- V produkci nastavte environment variables na Vercelu
- Otestujte odesílání před spuštěním

## 🔧 Vercel Environment Variables

Po nasazení na Vercel:

1. Jděte do Settings → Environment Variables
2. Přidejte:
   - `RESEND_API_KEY` (nebo odpovídající klíč pro vaši službu)
3. Redeploy aplikace

---

✅ **Vše je připraveno! Stačí jen vybrat službu a doplnit API klíč.**





