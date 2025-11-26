# 🎬 LIVE PREVIEW - NÁVOD K POUŽITÍ

**Nastaveno: 26. listopadu 2025**

---

## ✅ CO BYLO NASTAVENO:

1. ✅ **Plugin `sanity-plugin-iframe-pane`** nainstalován
2. ✅ **Structure config** vytvořen (`sanity/lib/structure.ts`)
3. ✅ **Sanity config** aktualizován s live preview
4. ✅ **Auto-mapping** URL pro všechny stránky

---

## 🎯 JAK TO FUNGUJE:

### **V Sanity Studio uvidíš 2 ZÁLOŽKY:**

```
┌─────────────────────────────────────┐
│ 📝 Editor  |  🌐 Web Preview        │ ← NOVÉ ZÁLOŽKY!
├─────────────────────────────────────┤
│  Tady píšeš  |  Tady vidíš výsledek │
└─────────────────────────────────────┘
```

### **Split Screen Editing:**

```
┌──────────────────┬──────────────────┐
│  SANITY STUDIO   │   ŽIV WEB        │
│                  │                  │
│ Badge:           │                  │
│ [TEST___]        │  Badge: TEST     │ ← Vidíš okamžitě!
│                  │                  │
│ Nadpis:          │                  │
│ [Nový text]      │  Nový text       │
│                  │                  │
│ [💾 Save]        │  [🔄 Refresh]    │
└──────────────────┴──────────────────┘
```

---

## 🚀 JAK TO POUŽÍT:

### **KROK 1: Otevři Sanity Studio**

```
http://localhost:3000/studio
```

### **KROK 2: Vyber dokument**

Např. "Homepage - Úvodní stránka"

### **KROK 3: Klikni na záložku "🌐 Web Preview"**

```
┌─────────────────────────────────┐
│ 📝 Editor  |  🌐 Web Preview    │ ← KLIKNI SEM!
└─────────────────────────────────┘
```

### **KROK 4: Uvidíš SPLIT SCREEN**

```
┌────────────┬────────────────────┐
│  Editor    │   Živý Web         │
│            │                    │
│  Tady      │   Tady vidíš       │
│  edituj    │   výsledek         │
└────────────┴────────────────────┘
```

### **KROK 5: Edituj & Vidíš změny**

1. **Změň text** v levém panelu (Editor)
2. **Klikni "Save"** (Ctrl+S / Cmd+S)
3. **Klikni tlačítko "🔄 Reload"** v pravém panelu
4. **Vidíš změnu okamžitě!** 🎉

---

## 📱 MOŽNOSTI ZOBRAZENÍ:

V pravém panelu (Web Preview) máš tlačítka:

```
[💻 Desktop] [📱 Mobile] [📱 Tablet] [🔄 Reload]
```

- **Desktop** = Počítačové zobrazení (1920px)
- **Mobile** = Mobilní zobrazení (375px)  
- **Tablet** = Tablet zobrazení (768px)
- **Reload** = Obnovit preview

---

## 🗺️ MAPOVÁNÍ STRÁNEK:

Preview automaticky otevře správnou stránku:

| Dokument v Sanity | URL Preview |
|-------------------|-------------|
| **Homepage - Úvodní stránka** | `http://localhost:3000/` |
| **Kontakt - Complete** | `http://localhost:3000/kontakt` |
| **Důležité informace - Complete** | `http://localhost:3000/dulezite-informace` |
| **Byty - Complete** | `http://localhost:3000/byty` |
| **Rodinné domy - Complete** | `http://localhost:3000/rodinne-domy` |
| **Apartment (jednotlivý byt)** | `http://localhost:3000/byty/A1-1` |

---

## 💡 TIPY PRO EFEKTIVNÍ PRÁCI:

### **1. Dva monitory** 🖥️🖥️
- **Monitor 1:** Sanity Studio (Editor)
- **Monitor 2:** Otevři web v samostatném okně

### **2. Split view v jednom okně**
- Použij záložku "Web Preview" v Studiu
- Vidíš oboje najednou

### **3. Rychlé klávesové zkratky**
- **Cmd+S / Ctrl+S** = Uložit
- **Cmd+R / Ctrl+R** = Refresh preview
- **Tab** = Přepnout mezi poli

### **4. Testuj na mobilním zobrazení**
- Klikni na 📱 Mobile v preview
- Uvidíš jak to vypadá na telefonu

---

## 🔧 POKROČILÉ NASTAVENÍ:

### **Změnit URL preview:**

Edituj `.env.local`:

```bash
# Development (výchozí)
NEXT_PUBLIC_PREVIEW_URL=http://localhost:3000

# Production
NEXT_PUBLIC_PREVIEW_URL=https://rezidenceusvanny.vercel.app
```

### **Auto-refresh (bez manuálního klikání):**

Pro automatické refreshování můžeš přidat webhook:
- Sanity → Webhooks → Add webhook
- URL: `http://localhost:3000/api/revalidate`
- Trigger: On publish

_(Toto nastavíme později, prozatím refresh ručně)_

---

## 🐛 ŘEŠENÍ PROBLÉMŮ:

### **❌ "Nelze načíst preview"**

**Řešení:**
1. Zkontroluj že dev server běží: `npm run dev`
2. Otevři `http://localhost:3000` v prohlížeči
3. Zkontroluj že port 3000 není obsazený

### **❌ "Preview se nerefreshuje"**

**Řešení:**
1. Klikni **manuálně** na 🔄 Reload button
2. Nebo refresh celé Studio (Cmd+R)
3. Zkontroluj že jsi klikl "Save" v editoru

### **❌ "Vidím starou verzi"**

**Řešení:**
1. Ujisti se, že jsi klikl **"Publish"** (ne jen Save)
2. Počkej 1-2 sekundy
3. Klikni 🔄 Reload

### **❌ "Split screen je moc malý"**

**Řešení:**
1. Klikni na ikonu fullscreen v pravém panelu
2. Nebo otevři web v samostatném okně

---

## 📊 WORKFLOW PRO EDITACI:

### **Typický postup:**

```
1. Otevři dokument (např. Homepage)
   ↓
2. Klikni na "🌐 Web Preview" záložku
   ↓
3. Uvidíš split screen (Editor | Web)
   ↓
4. Změň text v Editoru
   ↓
5. Klikni "Save" (Cmd+S)
   ↓
6. Klikni "🔄 Reload" v Web Preview
   ↓
7. ✅ Vidíš změnu!
   ↓
8. Pokud OK → Klikni "Publish"
   ↓
9. Změna je ŽIVĚ na webu!
```

---

## 🎥 VIDEO TUTORIÁL (Jak to vypadá):

### **1. Otevři Studio:**
```
http://localhost:3000/studio
```

### **2. V levém menu:**
```
→ Homepage - Úvodní stránka
```

### **3. Nahoře uvidíš:**
```
[📝 Editor] [🌐 Web Preview] ← Klikni tady!
```

### **4. Uvidíš:**
```
┌─────────────┬──────────────────┐
│   EDITOR    │   ŽIVÝ WEB       │
│             │                  │
│ 🎬 Hero     │  [Web se zobrazí]│
│  Badge:     │                  │
│  [____]     │  Badge text tady │
│             │                  │
│  Nadpis:    │  Nadpis text tady│
│  [____]     │                  │
└─────────────┴──────────────────┘
```

---

## ✅ TESTUJ TO HNED TEĎ:

### **Quick Test:**

1. Otevři: `http://localhost:3000/studio`
2. Klikni: "Homepage - Úvodní stránka"
3. Klikni: Záložka "🌐 Web Preview"
4. Změň: "Badge text" na "TEST 123"
5. Klikni: "Save" (Cmd+S)
6. Klikni: 🔄 Reload (v pravém panelu)
7. **Uvidíš "TEST 123" na webu!** 🎉

---

## 🎉 HOTOVO!

Teď máš **Live Preview** a vidíš změny okamžitě!

**Next steps:**
- Zkus editovat různé stránky
- Testuj na mobilním zobrazení
- Vyzkoušej všechny funkce

---

**Užij si editování!** 🚀

