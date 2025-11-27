import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { verifyAuth } from '@/lib/auth'

const KV_KEY = 'apartments:status'

// Defaultní statusy odpovídající hardcoded datům v apartmentsFallback
const DEFAULT_STATUSES: Record<number, 'available' | 'sold'> = {
  1: 'sold', 2: 'available', 3: 'available', 4: 'sold', 5: 'sold',
  6: 'sold', 7: 'available', 8: 'sold', 9: 'sold', 10: 'sold',
  11: 'sold', 12: 'sold', 13: 'available', 14: 'sold', 15: 'sold',
  16: 'available', 17: 'sold', 18: 'available', 19: 'sold', 20: 'sold',
  21: 'available', 22: 'sold', 23: 'sold', 24: 'sold', 25: 'available',
  26: 'available', 27: 'sold', 28: 'sold', 29: 'available', 30: 'sold',
  31: 'sold', 32: 'sold', 33: 'sold', 34: 'available', 35: 'available',
  36: 'sold', 37: 'sold', 38: 'sold', 39: 'available', 40: 'sold',
  41: 'available', 42: 'available', 43: 'sold', 44: 'available', 45: 'sold',
  46: 'sold', 47: 'sold', 48: 'available', 49: 'available', 50: 'available',
  51: 'sold',
}

// Inicializace defaultních stavů pro všechny byty (ID 1-51)
async function initializeDefaultStatuses() {
  try {
    const existing = await kv.get(KV_KEY)
    if (existing) return existing

    // Při první inicializaci použijeme správné defaultní statusy
    await kv.set(KV_KEY, DEFAULT_STATUSES)
    return DEFAULT_STATUSES
  } catch (error) {
    // Pokud KV není dostupné, vrátíme fallback
    console.error('KV not available, using fallback statuses:', error)
    return DEFAULT_STATUSES
  }
}

// GET - Načtení všech statusů bytů
export async function GET(request: Request) {
  try {
    const isAuthenticated = await verifyAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Neautorizován' },
        { status: 401 }
      )
    }

    const statuses = await initializeDefaultStatuses()

    return NextResponse.json({
      success: true,
      data: statuses
    })
  } catch (error) {
    console.error('Error fetching apartment statuses:', error)
    return NextResponse.json(
      { success: false, message: 'Chyba při načítání dat' },
      { status: 500 }
    )
  }
}

// PUT - Aktualizace statusů bytů
export async function PUT(request: Request) {
  try {
    const isAuthenticated = await verifyAuth()
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Neautorizován' },
        { status: 401 }
      )
    }

    const { statuses } = await request.json()

    if (!statuses || typeof statuses !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Neplatná data' },
        { status: 400 }
      )
    }

    // Validace - všechny statusy musí být 'available' nebo 'sold'
    for (const [id, status] of Object.entries(statuses)) {
      if (status !== 'available' && status !== 'sold') {
        return NextResponse.json(
          { success: false, message: `Neplatný status pro byt ${id}` },
          { status: 400 }
        )
      }
    }

    // Uložení do KV
    await kv.set(KV_KEY, statuses)

    return NextResponse.json({
      success: true,
      message: 'Změny úspěšně uloženy'
    })
  } catch (error) {
    console.error('Error updating apartment statuses:', error)
    return NextResponse.json(
      { success: false, message: 'Chyba při ukládání dat' },
      { status: 500 }
    )
  }
}
