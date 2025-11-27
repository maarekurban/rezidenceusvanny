import { kv } from '@vercel/kv'

const KV_KEY = 'apartments:status'

// Fallback statusy pro lokální vývoj (když KV není dostupné)
// Tyto statusy odpovídají hardcoded datům v apartmentsFallback
const FALLBACK_STATUSES: Record<number, 'available' | 'sold'> = {
  1: 'sold',
  2: 'available',
  3: 'available',
  4: 'sold',
  5: 'sold',
  6: 'sold',
  7: 'available',
  8: 'sold',
  9: 'sold',
  10: 'sold',
  11: 'sold',
  12: 'sold',
  13: 'available',
  14: 'sold',
  15: 'sold',
  16: 'available',
  17: 'sold',
  18: 'available',
  19: 'sold',
  20: 'sold',
  21: 'available',
  22: 'sold',
  23: 'sold',
  24: 'sold',
  25: 'available',
  26: 'available',
  27: 'sold',
  28: 'sold',
  29: 'available',
  30: 'sold',
  31: 'sold',
  32: 'sold',
  33: 'sold',
  34: 'available',
  35: 'available',
  36: 'sold',
  37: 'sold',
  38: 'sold',
  39: 'available',
  40: 'sold',
  41: 'available',
  42: 'available',
  43: 'sold',
  44: 'available',
  45: 'sold',
  46: 'sold',
  47: 'sold',
  48: 'available',
  49: 'available',
  50: 'available',
  51: 'sold',
}

export async function getApartmentStatus(apartmentId: number): Promise<'available' | 'sold'> {
  try {
    const statuses = await kv.get<Record<number, 'available' | 'sold'>>(KV_KEY)

    if (!statuses) {
      // Pokud ještě nejsou data v KV, použijeme fallback
      return FALLBACK_STATUSES[apartmentId] || 'available'
    }

    return statuses[apartmentId] || FALLBACK_STATUSES[apartmentId] || 'available'
  } catch (error) {
    console.error('Error fetching apartment status from KV:', error)
    // V případě chyby použijeme fallback
    return FALLBACK_STATUSES[apartmentId] || 'available'
  }
}

export async function getAllApartmentStatuses(): Promise<Record<number, 'available' | 'sold'>> {
  try {
    const statuses = await kv.get<Record<number, 'available' | 'sold'>>(KV_KEY)

    if (!statuses) {
      // Pokud ještě nejsou data v KV, vrátíme fallback statusy
      return FALLBACK_STATUSES
    }

    return statuses
  } catch (error) {
    console.error('Error fetching all apartment statuses from KV:', error)
    // V případě chyby použijeme fallback
    return FALLBACK_STATUSES
  }
}
