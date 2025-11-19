import apartment from './apartment'
import pdfDocument from './document'
import page from './page'
import siteSettings from './siteSettings'
import homepageComplete from './homepage-complete'
import apartmentsPageComplete from './apartments-page-complete'
import importantInfoPageComplete from './important-info-page-complete'
import contactPage from './contactPage'

export const schemaTypes = [
  // Byty a dokumenty
  apartment,
  pdfDocument,
  
  // Stránky
  homepageComplete,
  apartmentsPageComplete,
  importantInfoPageComplete,
  contactPage,
  page,
  
  // Nastavení
  siteSettings,
]

