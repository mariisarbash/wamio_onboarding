export type RentalType = 'breve' | 'lungo' | 'entrambi'
export type ListingType = 'appartamento' | 'stanza' | 'piu_stanze'
export type LeadStatus = 'qualificato' | 'non_adatto' | 'da_valutare'
export type BotTone = 'formale' | 'neutro' | 'amichevole' | 'premium'
export type ActionSuggested = 'contatta' | 'rifiuta' | 'richiedi_info'

export interface Property {
  id: string
  name: string
  listingType: ListingType
  rentalType: RentalType
  address: string
  zone: string
  floor: number
  elevator: boolean
  sqm: number
  rooms: number
  bathrooms: number
  maxGuests: number
  price: number
  deposit: number
  priceNegotiable: 'fisso' | 'trattabile' | 'parzialmente'
  expensesIncluded: string[]
  furnished: 'completamente' | 'parzialmente' | 'no'
  smokingAllowed: 'si' | 'no' | 'balcone'
  petsAllowed: 'si' | 'no' | 'dipende'
  availableFrom: string
  visitsAllowed: boolean
  photos: number
  botActive: boolean
  botTone: BotTone
  canSharePhotos: boolean
  escalationContact: string
  createdAt: string
  completionPercent: number
}

export interface Lead {
  id: string
  propertyId: string
  propertyName: string
  name: string
  whatsapp: string
  startDate: string
  duration: string
  budget?: string
  guests: number
  profile: 'studente' | 'lavoratore' | 'turista' | 'famiglia' | 'altro'
  documentsReady: 'si' | 'no' | 'non_specificato'
  residenceNeeded: 'si' | 'no' | 'non_specificato'
  visitRequested: boolean
  visitDays?: string
  status: LeadStatus
  actionSuggested: ActionSuggested
  firstContact: string
  lastUpdate: string
  summary: string
}

export interface Owner {
  id: string
  name: string
  nickname: string
  phone: string
  email: string
  language: 'italiano' | 'inglese' | 'altro'
  contactHours: string
  multipleProperties: boolean
  supportContact: string
}
