import { client } from '@/sanity/lib/client'
import { Container } from '@/components/Container'
import ApartmentsTable from './ApartmentsTable'

async function getApartments() {
  const apartments = await client.fetch(`
    *[_type == "apartment" && status != "sold"] | order(number asc) {
      _id,
      number,
      building,
      floor,
      disposition,
      floorArea,
      price,
      status,
      outdoorSpaces[] {
        type,
        area
      }
    }
  `, {}, { cache: 'no-store' })
  
  return apartments
}

export default async function ApartmentsPage() {
  const apartments = await getApartments()

  return (
    <main>
      {/* Hero sekce */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/DSC02913.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <Container className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Volné byty
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Vyberte si svůj nový domov v rezidenci U sv. Anny
          </p>
        </Container>
      </section>

      {/* Tabulka bytů */}
      <section className="py-24 bg-white">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Aktuálně k dispozici: {apartments.length} {apartments.length === 1 ? 'byt' : apartments.length < 5 ? 'byty' : 'bytů'}
          </h2>
          <ApartmentsTable apartments={apartments} />
        </Container>
      </section>
    </main>
  )
}
