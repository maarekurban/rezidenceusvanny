import apartment from './apartment'
import pdfDocument from './document'
import page from './page'
import siteSettings from './siteSettings'
import homepageComplete from './homepage-complete'
import importantInfoPage from './importantInfoPage'
import contactPage from './contactPage'
import apartmentsPage from './apartmentsPage'

export const schemaTypes = [
  // Byty a dokumenty
  apartment,
  pdfDocument,
  
  // Stránky
  homepageComplete,
  apartmentsPage,
  importantInfoPage,
  contactPage,
  page,
  
  // Nastavení
  siteSettings,
]

