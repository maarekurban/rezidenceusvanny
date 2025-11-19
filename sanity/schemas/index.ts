import apartment from './apartment'
import siteSettings from './siteSettings'
import homepageComplete from './homepage-complete'
import apartmentsPageComplete from './apartments-page-complete'
import importantInfoPageComplete from './important-info-page-complete'
import contactPageComplete from './contact-page-complete'
import familyHousesPageComplete from './family-houses-page-complete'

export const schemaTypes = [
  // Byty
  apartment,
  
  // Stránky
  homepageComplete,
  apartmentsPageComplete,
  familyHousesPageComplete,
  importantInfoPageComplete,
  contactPageComplete,
  
  // Nastavení
  siteSettings,
]

