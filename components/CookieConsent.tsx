'use client'

import { useState, useEffect } from 'react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Zkontrolovat, zda uživatel již souhlasil
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-slide-up">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Cookies
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tento web používá cookies pro zajištění základní funkčnosti a analytiku.
              Více informací najdete v našich{' '}
              <a href="/gdpr" className="text-blue-600 hover:underline">
                zásadách ochrany osobních údajů
              </a>.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-blue-600 text-white text-xs font-medium px-3 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Přijmout
          </button>
          <button
            onClick={declineCookies}
            className="flex-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Odmítnout
          </button>
        </div>
      </div>
    </div>
  )
}
