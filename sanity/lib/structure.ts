import { DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'

// Definice URL podle dokumentu
const getPreviewUrl = (doc: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_PREVIEW_URL || 'http://localhost:3000'
  
  // Mapování document type na URL
  let url = ''
  switch (doc._type) {
    case 'homepageComplete':
      url = `${baseUrl}/`
      break
    case 'contactPageComplete':
      url = `${baseUrl}/kontakt`
      break
    case 'importantInfoPageComplete':
      url = `${baseUrl}/dulezite-informace`
      break
    case 'apartmentsPageComplete':
      url = `${baseUrl}/byty`
      break
    case 'familyHousesPageComplete':
      url = `${baseUrl}/rodinne-domy`
      break
    case 'apartment':
      // Pro jednotlivé byty
      if (doc.building && doc.number) {
        url = `${baseUrl}/byty/${doc.building}-${doc.number.toLowerCase()}`
      } else {
        url = `${baseUrl}/byty`
      }
      break
    default:
      url = baseUrl
  }
  
  // ✅ Přidej query param pro skrytí headeru v iframe
  return `${url}${url.includes('?') ? '&' : '?'}preview=true`
}

// Resolver pro všechny dokumenty
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Typy dokumentů, které mají preview
  const typesWithPreview = [
    'homepageComplete',
    'contactPageComplete', 
    'importantInfoPageComplete',
    'apartmentsPageComplete',
    'familyHousesPageComplete',
    'apartment'
  ]

  if (typesWithPreview.includes(schemaType)) {
    return S.document().views([
      // Defaultní editor
      S.view.form(),
      
      // Preview pane (iframe s webem)
      S.view
        .component(Iframe)
        .options({
          url: (doc: any) => getPreviewUrl(doc),
          reload: {
            button: true, // Tlačítko pro manuální reload
          },
          defaultSize: 'desktop', // desktop | mobile | tablet
        })
        .id('webPreview')  // ✅ Přidáno ID bez speciálních znaků
        .title('Web Preview'),  // ✅ Bez emoji (způsobovalo error)
    ])
  }

  return S.document().views([S.view.form()])
}

