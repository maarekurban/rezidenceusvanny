import React from 'react'

/**
 * Parsuje nadpis s <strong> značkami a nahradí je za <span className="text-gradient">
 * 
 * Příklad:
 * "Kvalitní bydlení v <strong>UNESCO</strong> zóně"
 * →
 * <>Kvalitní bydlení v <span className="text-gradient">UNESCO</span> zóně</>
 * 
 * @param text - Text s případnými <strong> značkami
 * @returns React element s aplikovanými styly
 */
export function parseTitle(text: string | undefined | null) {
  if (!text) return null

  // Rozdělíme text na části podle <strong> značek
  const parts = text.split(/(<strong>.*?<\/strong>)/g)

  return (
    <>
      {parts.map((part, index) => {
        // Pokud je to <strong> značka, nahradíme ji za <span className="text-gradient">
        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
          const content = part.replace('<strong>', '').replace('</strong>', '')
          return (
            <span key={index} className="text-gradient">
              {content}
            </span>
          )
        }
        // Jinak vrátíme text s podporou pro nové řádky
        return part.split('\n').map((line, lineIndex, array) => (
          <React.Fragment key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < array.length - 1 && <br />}
          </React.Fragment>
        ))
      })}
    </>
  )
}

