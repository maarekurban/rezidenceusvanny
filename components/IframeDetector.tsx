'use client'

import { useEffect } from 'react'

/**
 * Detekuje jestli je stránka zobrazená v iframe (Sanity Preview)
 * a přidá CSS class na body
 */
export function IframeDetector() {
  useEffect(() => {
    // Zkontroluj jestli je stránka v iframe
    const isInIframe = window.self !== window.top
    
    if (isInIframe) {
      // Přidej class na body
      document.body.classList.add('in-iframe')
    } else {
      document.body.classList.add('not-in-iframe')
    }
  }, [])

  return null // Nic nerenderu, jen detectuji
}



