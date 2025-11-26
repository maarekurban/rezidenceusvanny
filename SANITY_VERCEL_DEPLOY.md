# 🚀 Sanity Studio na Vercel

## ✅ Ano, Sanity Studio bude dostupné na Vercelu!

Po deployi na Vercel bude Sanity Studio dostupné na adrese:

```
https://vaše-doména.vercel.app/studio
```

---

## 📋 Checklist před deployem

### 1️⃣ Environment Variables na Vercelu

V Vercel dashboardu přidejte tyto proměnné:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=eqq7fbzc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=váš-token-zde
```

**Jak přidat:**
1. Jděte na [vercel.com](https://vercel.com)
2. Otevřete váš projekt
3. **Settings** → **Environment Variables**
4. Přidejte všechny 3 proměnné
5. **Save**

### 2️⃣ CORS nastavení v Sanity

Sanity musí povolit požadavky z vaší Vercel domény:

1. Jděte na [sanity.io/manage](https://www.sanity.io/manage)
2. Otevřete projekt **"Rezidence U sv. Anny"** (eqq7fbzc)
3. Klikněte na **API** v menu
4. Klikněte na **CORS Origins**
5. Přidejte tyto URL:

```
http://localhost:3000
https://vaše-vercel-url.vercel.app
https://vaše-vlastní-doména.cz (pokud máte)
```

**Povolte:**
- ✅ Allow credentials

### 3️⃣ Deploy na Vercel

```bash
git add -A
git commit -m "Sanity CMS ready for production"
git push origin main
```

Vercel automaticky deployuje při push na main branch.

---

## 🎨 Použití Sanity Studio

### Na localhostu:
```
http://localhost:3000/studio
```

### Na Vercelu (po deployi):
```
https://vaše-doména.vercel.app/studio
```

### Přihlášení:
- Použijte stejný účet jako na sanity.io
- Podporuje Google, GitHub, email login

---

## 🔒 Zabezpečení

Sanity Studio je chráněno:
- ✅ Vyžaduje přihlášení
- ✅ Pouze autorizovaní uživatelé mohou upravovat
- ✅ Můžete přidat další editory v Sanity dashboardu

**Přidání dalších editorů:**
1. Sanity dashboard → **Project Settings**
2. **Members** → **Invite member**
3. Zadejte email a nastavte oprávnění (Admin/Editor/Viewer)

---

## 📊 Workflow po deployi

### Správa obsahu:
1. Otevřete `https://vaše-doména.vercel.app/studio`
2. Přihlaste se
3. Upravte byty, dokumenty, stránky
4. Změny se okamžitě projeví na webu ✨

### Automatické aktualizace:
- Data se fetchují při každém načtení stránky
- V produkci můžete zapnout CDN cache pro rychlost
- Můžete nastavit ISR (Incremental Static Regeneration) pro optimalizaci

---

## 🐛 Troubleshooting

### Studio se nenačítá na Vercelu
1. Zkontrolujte Environment Variables v Vercel
2. Zkontrolujte CORS nastavení v Sanity
3. Zkontrolujte konzoli v prohlížeči (F12)

### "Unauthorized" chyba
- Zkontrolujte, že jste přihlášeni na sanity.io
- Ověřte, že máte Editor oprávnění v projektu
- Zkontrolujte CORS origins

### Data se nezobrazují na webu
- Ověřte, že komponenty fetchují ze Sanity
- Zkontrolujte API token v Environment Variables
- Zkontrolujte GROQ queries v konzoli

---

## ⚡ Performance optimalizace

Pro produkční prostředí doporučuji:

### 1. Zapnout CDN v Sanity client

```typescript
// sanity/lib/client.ts
export const client = createClient({
  projectId: 'eqq7fbzc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // ✅ Změnit na true v produkci
})
```

### 2. Implementovat ISR (Incremental Static Regeneration)

```typescript
// V page.tsx
export const revalidate = 60 // Revalidovat každých 60 sekund
```

---

## 📝 Poznámky

- ✅ Sanity Studio funguje na Vercelu bez dalších nastavení
- ✅ Není potřeba samostatný hosting pro Studio
- ✅ Všechno je v jednom Next.js projektu
- ✅ Změny v Sanity se projeví okamžitě (nebo podle ISR nastavení)

---

**🎉 Po nastavení CORS a Environment Variables bude Studio plně funkční na Vercelu!**



