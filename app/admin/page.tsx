'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Container } from '@/components/Container'

// Data bytů - stejná jako v /app/byty/page.tsx
const apartmentsFallback = [
  { id: 1, number: '1.01', building: 'BD-B1', disposition: '2+kk' },
  { id: 2, number: '1.02', building: 'BD-B1', disposition: '2+kk' },
  { id: 3, number: '1.03', building: 'BD-B1', disposition: '5+kk' },
  { id: 4, number: '2.01', building: 'BD-B1', disposition: '2+kk' },
  { id: 5, number: '2.02', building: 'BD-B1', disposition: '1+kk' },
  { id: 6, number: '2.03', building: 'BD-B1', disposition: '3+kk' },
  { id: 7, number: '2.04', building: 'BD-B1', disposition: '3+kk' },
  { id: 8, number: '2.05', building: 'BD-B1', disposition: '1+kk' },
  { id: 9, number: '2.06', building: 'BD-B1', disposition: '2+kk' },
  { id: 10, number: '3.01', building: 'BD-B1', disposition: '2+kk' },
  { id: 11, number: '3.02', building: 'BD-B1', disposition: '1+kk' },
  { id: 12, number: '3.03', building: 'BD-B1', disposition: '3+kk' },
  { id: 13, number: '3.04', building: 'BD-B1', disposition: '3+kk' },
  { id: 14, number: '3.05', building: 'BD-B1', disposition: '1+kk' },
  { id: 15, number: '3.06', building: 'BD-B1', disposition: '2+kk' },
  { id: 16, number: '4.01', building: 'BD-B1', disposition: '4+kk' },
  { id: 17, number: '4.02', building: 'BD-B1', disposition: '3+kk' },
  { id: 18, number: '4.03', building: 'BD-B1', disposition: '3+kk' },
  { id: 19, number: '4.04', building: 'BD-B1', disposition: '1+kk' },
  { id: 20, number: '4.05', building: 'BD-B1', disposition: '2+kk' },
  { id: 21, number: '1.23', building: 'BD-A1', disposition: '4+kk' },
  { id: 22, number: '1.22', building: 'BD-A1', disposition: '1+kk' },
  { id: 23, number: '1.21', building: 'BD-A1', disposition: '1+kk' },
  { id: 24, number: '2.09', building: 'BD-A1', disposition: '2+kk' },
  { id: 25, number: '2.10', building: 'BD-A1', disposition: '2+kk' },
  { id: 26, number: '2.11', building: 'BD-A1', disposition: '4+kk' },
  { id: 27, number: '2.12', building: 'BD-A1', disposition: '2+kk' },
  { id: 28, number: '3.09', building: 'BD-A1', disposition: '2+kk' },
  { id: 29, number: '3.10', building: 'BD-A1', disposition: '2+kk' },
  { id: 30, number: '3.11', building: 'BD-A1', disposition: '2+kk' },
  { id: 31, number: '3.12', building: 'BD-A1', disposition: '1+kk' },
  { id: 32, number: '3.13', building: 'BD-A1', disposition: '1+kk' },
  { id: 33, number: '4.09', building: 'BD-A1', disposition: '2+kk' },
  { id: 34, number: '4.10', building: 'BD-A1', disposition: '2+kk' },
  { id: 35, number: '4.11', building: 'BD-A1', disposition: '4+kk' },
  { id: 36, number: '4.12', building: 'BD-A1', disposition: '2+kk' },
  { id: 37, number: '1.07', building: 'BD-A2', disposition: '1+kk' },
  { id: 38, number: '1.06', building: 'BD-A2', disposition: '1+kk' },
  { id: 39, number: '1.05', building: 'BD-A2', disposition: '4+kk' },
  { id: 40, number: '2.03', building: 'BD-A2', disposition: '2+kk' },
  { id: 41, number: '2.04', building: 'BD-A2', disposition: '4+kk' },
  { id: 42, number: '2.05', building: 'BD-A2', disposition: '2+kk' },
  { id: 43, number: '2.06', building: 'BD-A2', disposition: '2+kk' },
  { id: 44, number: '3.03', building: 'BD-A2', disposition: '3+kk' },
  { id: 45, number: '3.04', building: 'BD-A2', disposition: '3+kk' },
  { id: 46, number: '3.05', building: 'BD-A2', disposition: '2+kk' },
  { id: 47, number: '3.06', building: 'BD-A2', disposition: '2+kk' },
  { id: 48, number: '4.03', building: 'BD-A2', disposition: '2+kk' },
  { id: 49, number: '4.04', building: 'BD-A2', disposition: '4+kk' },
  { id: 50, number: '4.05', building: 'BD-A2', disposition: '2+kk' },
  { id: 51, number: '4.06', building: 'BD-A2', disposition: '2+kk' },
]

export default function AdminPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [statuses, setStatuses] = useState<Record<number, 'available' | 'sold'>>({})

  // Načtení statusů z API
  useEffect(() => {
    async function loadStatuses() {
      try {
        const response = await fetch('/api/admin/apartments')

        if (response.status === 401) {
          router.push('/admin/login')
          return
        }

        const data = await response.json()
        if (data.success) {
          setStatuses(data.data)
        }
      } catch (error) {
        console.error('Error loading statuses:', error)
        setMessage('Chyba při načítání dat')
      } finally {
        setIsLoading(false)
      }
    }

    loadStatuses()
  }, [router])

  const handleStatusChange = (apartmentId: number, status: 'available' | 'sold') => {
    setStatuses(prev => ({
      ...prev,
      [apartmentId]: status
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/apartments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statuses }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ Změny úspěšně uloženy a publikovány!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(`❌ ${data.message || 'Chyba při ukládání'}`)
      }
    } catch (error) {
      console.error('Error saving statuses:', error)
      setMessage('❌ Chyba při ukládání dat')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-grey-800 to-dark flex items-center justify-center">
        <div className="text-white text-xl">Načítání...</div>
      </div>
    )
  }

  // Group apartments by building
  const groupedApartments = apartmentsFallback.reduce((acc, apt) => {
    if (!acc[apt.building]) {
      acc[apt.building] = []
    }
    acc[apt.building].push(apt)
    return acc
  }, {} as Record<string, typeof apartmentsFallback>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-grey-800 to-dark py-8">
      <Container>
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-rezidence.png"
                alt="Rezidence U sv. Anny"
                width={150}
                height={60}
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                <p className="text-white/70 text-sm">Správa bytů - III. etapa</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Zobrazit web
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
              >
                Odhlásit se
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.includes('✅') ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'} text-white`}>
            {message}
          </div>
        )}

        {/* Apartments Grid */}
        <div className="space-y-8">
          {Object.entries(groupedApartments).map(([building, apts]) => (
            <div key={building} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/20">
                {building} ({apts.length} bytů)
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {apts.map((apt) => {
                  const currentStatus = statuses[apt.id] || 'available'

                  return (
                    <div
                      key={apt.id}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-gold-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-white font-bold text-lg">
                            {apt.building} {apt.number}
                          </div>
                          <div className="text-white/60 text-sm">{apt.disposition}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(apt.id, 'available')}
                          className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                            currentStatus === 'available'
                              ? 'bg-green-500 text-white shadow-lg'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          Volný
                        </button>
                        <button
                          onClick={() => handleStatusChange(apt.id, 'sold')}
                          className={`flex-1 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                            currentStatus === 'sold'
                              ? 'bg-red-500 text-white shadow-lg'
                              : 'bg-white/10 text-white/60 hover:bg-white/20'
                          }`}
                        >
                          Prodáno
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full px-8 py-4 bg-gold-primary hover:bg-gold-secondary text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            {isSaving ? 'Ukládání...' : 'Uložit a publikovat změny'}
          </button>
          <p className="text-white/60 text-sm text-center mt-3">
            Změny se projeví okamžitě na webu po uložení
          </p>
        </div>
      </Container>
    </div>
  )
}
