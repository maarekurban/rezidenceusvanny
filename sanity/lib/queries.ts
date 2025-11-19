import { groq } from 'next-sanity'

// Apartments queries
export const apartmentsQuery = groq`
  *[_type == "apartment"] | order(building asc, number asc) {
    _id,
    number,
    building,
    floor,
    disposition,
    floorArea,
    usableArea,
    price,
    status,
    "floorPlanUrl": floorPlan.asset->url,
  }
`

export const apartmentBySlugQuery = groq`
  *[_type == "apartment" && building + "-" + lower(number) == $slug][0] {
    _id,
    number,
    building,
    floor,
    disposition,
    floorArea,
    usableArea,
    price,
    status,
    rooms,
    outdoorSpaces,
    "floorPlanUrl": floorPlan.asset->url,
    "heroImageUrl": heroImage.asset->url,
    "locationInBuildingUrl": locationInBuilding.asset->url,
    "locationInAreaUrl": locationInArea.asset->url,
  }
`

export const availableApartmentsQuery = groq`
  *[_type == "apartment" && status == "available"] | order(building asc, number asc) {
    _id,
    number,
    building,
    floor,
    disposition,
    floorArea,
    usableArea,
    price,
    status,
    "floorPlanUrl": floorPlan.asset->url,
  }
`

// Documents queries
export const documentsQuery = groq`
  *[_type == "document"] | order(order asc) {
    _id,
    title,
    description,
    category,
    "fileUrl": file.asset->url,
  }
`

export const documentsByCategoryQuery = groq`
  *[_type == "document" && category == $category] | order(order asc) {
    _id,
    title,
    description,
    "fileUrl": file.asset->url,
  }
`

// Pages queries
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    content,
    seo,
  }
`

