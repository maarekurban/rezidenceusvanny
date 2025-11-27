import { Container } from '@/components/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů a Cookies',
  robots: {
    index: false,
    follow: false,
  },
}

export default function GDPRPage() {
  return (
    <main className="bg-white">
      {/* Hero sekce s pozadím */}
      <section className="relative min-h-[400px] flex items-center justify-center">
        {/* Pozadí s obrázkem */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/DSC02913.jpg"
            alt="Rezidence U sv. Anny"
            className="w-full h-full object-cover"
          />
          {/* Tmavý overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Obsah */}
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ochrana osobních údajů
            </h1>
            <p className="text-lg text-white/90">
              Vaše soukromí je pro nás prioritou. Seznamte se s tím, jak zpracováváme
              vaše osobní údaje a používáme cookies.
            </p>
          </div>
        </Container>
      </section>

      {/* Obsah */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none space-y-8">
            {/* Úvod */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Základní informace
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Tyto webové stránky provozuje ANOMIA Real Estate pro projekt Rezidence U sv. Anny.
                Ochrana vašich osobních údajů je pro nás prioritou. Níže naleznete informace o tom,
                jaké údaje sbíráme, jak je zpracováváme a jak používáme cookies.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Používání cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Naše webové stránky používají cookies pro zajištění základní funkčnosti a zlepšení
                uživatelského zážitku.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                Jaké cookies používáme:
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Nezbytné cookies</h4>
                  <p className="text-gray-700 text-sm">
                    Ukládají vaše preference ohledně souhlasu s cookies. Tyto soubory jsou nezbytné
                    pro správné fungování webu.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Analytické cookies</h4>
                  <p className="text-gray-700 text-sm">
                    Pomáhají nám porozumět tomu, jak návštěvníci používají náš web, abychom mohli
                    stránky vylepšovat. Tyto cookies shromažďují anonymní informace.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                Soubory cookies můžete kdykoli odmítnout nebo smazat prostřednictvím nastavení
                vašeho prohlížeče.
              </p>
            </section>

            {/* Osobní údaje */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Zpracování osobních údajů
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Jaké údaje sbíráme:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Při vyplnění kontaktního formuláře zpracováváme následující údaje:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Jméno a příjmení</li>
                <li>E-mailová adresa</li>
                <li>Telefonní číslo</li>
                <li>Zpráva (pokud ji vyplníte)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                Účel zpracování:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vaše osobní údaje používáme výhradně pro:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Odpověď na váš dotaz</li>
                <li>Poskytnutí informací o nabízených bytech</li>
                <li>Komunikaci ohledně vaší poptávky</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
                Právní základ:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Údaje zpracováváme na základě vašeho souhlasu (čl. 6 odst. 1 písm. a) GDPR)
                a našeho oprávněného zájmu (čl. 6 odst. 1 písm. f) GDPR) na odpověď na vaše
                dotazy a poskytnutí požadovaných informací.
              </p>
            </section>

            {/* Uchovávání údajů */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Doba uchovávání údajů
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vaše osobní údaje uchováváme po dobu nezbytnou pro vyřízení vaší poptávky,
                maximálně však po dobu 2 let od posledního kontaktu. Poté jsou bezpečně smazány.
              </p>
            </section>

            {/* Práva subjektů */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Vaše práva
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                V souvislosti se zpracováním vašich osobních údajů máte následující práva:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Právo na přístup k osobním údajům</li>
                <li>Právo na opravu osobních údajů</li>
                <li>Právo na výmaz osobních údajů</li>
                <li>Právo na omezení zpracování</li>
                <li>Právo vznést námitku proti zpracování</li>
                <li>Právo na přenositelnost údajů</li>
                <li>Právo podat stížnost u Úřadu pro ochranu osobních údajů</li>
              </ul>
            </section>

            {/* Zabezpečení */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Zabezpečení údajů
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Všechny osobní údaje jsou chráněny pomocí standardních bezpečnostních opatření
                včetně šifrování, zabezpečeného přenosu dat (SSL/TLS) a omezení přístupu pouze
                pro oprávněné osoby.
              </p>
            </section>

            {/* Třetí strany */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Předávání údajů třetím stranám
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vaše osobní údaje nepředáváme třetím stranám pro marketingové účely.
                Údaje mohou být sdíleny pouze s našimi technickými poskytovateli služeb
                (hosting, e-mail), kteří jsou vázáni mlčenlivostí a zpracovávají údaje
                pouze v souladu s našimi pokyny.
              </p>
            </section>

            {/* Kontakt */}
            <section className="bg-gray-50 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Kontaktní údaje
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pro uplatnění vašich práv nebo pokud máte jakékoli dotazy ohledně zpracování
                osobních údajů, kontaktujte nás:
              </p>
              <div className="text-gray-700">
                <p className="font-semibold">ANOMIA Real Estate</p>
                <p>E-mail: <a href="mailto:info@rezidenceusvanny.cz" className="text-blue-600 hover:underline">info@rezidenceusvanny.cz</a></p>
              </div>
            </section>

            {/* Aktualizace */}
            <section className="text-sm text-gray-600 mt-8 pt-8 border-t border-gray-200">
              <p>
                Tyto zásady ochrany osobních údajů mohou být průběžně aktualizovány.
                Aktuální verze je vždy k dispozici na této stránce.
              </p>
              <p className="mt-2">
                Poslední aktualizace: {new Date().toLocaleDateString('cs-CZ')}
              </p>
            </section>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
