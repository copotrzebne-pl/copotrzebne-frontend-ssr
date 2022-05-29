import { ReactNode } from 'react'
import { TranslatedField } from 'types/types'


export enum Language {
  PL = "pl",
  UA = "ua",
  EN = "en",
}

export type User = {
  role: string
  login: string
  id: string
}

export type Translations = {
  en?: string;
  pl?: string;
  ua?: string;
}

export type UserContextValue = {
  user: User | null
  ownedPlaces: (Place & { id: string })[]
  login: (login: string, password: string) => void
  fetchUser: () => void
  fetchOwnedPlaces: () => void
  savePlace: (place: PlaceDto, redirectRoute: string) => void
  deletePlace: (placeId: string) => void
  authorized: boolean
  language: Language
  changeLanguage: (lang: string) => void
  setAuthorized: (authorized: boolean) => void
}

export type UserContextProviderProps = {
  children: ReactNode
}

export type Priority = {
  id: string
  importance: number
  name: Translations
}

export type Category = {
  id: string;
  priority: number;
  name: Translations;
};

export type SupplyGroup = {
  categoryProductsIds: string
  supplies: Supply[]
}

export type Supply = {
  id: string;
  category: Category;
  name: Translations;
};

export type Demand = {
  id: string
  supply: Supply
  supplyId: string
  priority: Priority
  updatedAt: string
  comment?: string
}

export type DemandDTO = {
  id?: string
  comment?: string | null
  placeId: string
  supplyId: string
  priorityId: string
}

export type Place = {
  apartment: string
  buildingNumber: string
  city: string
  additionalDescription: string
  email: string
  id?: string
  latitude: string | null
  longitude: string | null
  name: TranslatedField
  phone: string
  street: string
  lastUpdatedAt: string
  workingHours: string
  state?: number
  priority?: number
  nameSlug: TranslatedField
  bankAccount: string | null
  bankAccountDescription: string | null
  demands?: Demand[]
  urgentDemands?: Demand[]
  placeLink?: PlaceLink
}

export type PlaceDto = {
  id?: string
  apartment: string
  buildingNumber: string
  city: string
  additionalDescription: string
  email: string
  latitude: string | null
  longitude: string | null
  name: TranslatedField
  phone: string
  street: string
  workingHours: string
  bankAccount: string | null
  bankAccountDescription: string | null
  placeLink?: PlaceLink
}

export type PlaceLink = {
  id?: string
  placeId?: string
  homepage: string
  facebook: string
  signup: string
  fundraising: string
}

export type DraftPlaceDto = Omit<PlaceDto, 'id' | 'latitude' | 'longitude'>

export type PanelContextValue = {
  places: Place[]
  selectedPlace: Place | null
  demands: Demand[]
  supplies: Supply[]
  priorities: Priority[]
  selectedSupplies: Record<string, Supply>
  selectedSuppliesGroup: Record<string, SupplyGroup>
  fetchPlaces: () => void
  fetchPlace: (placeId: string) => void
  updatePlaceLastUpdate: (placeId: string) => Promise<void>
  fetchDemands: (placeId: string) => void
  clearDemands: () => void
  clearSelectedPlace: () => void
  fetchPriorities: (placeId: string) => void
  fetchSupplies: () => void
  saveDemand: (demand: DemandDTO) => Promise<boolean>
  removeDemand: (demandId: string) => void
  removeAllDemands: (placeId: string) => void
  setSelectedSupplies: (selectedSupplies: Record<string, Supply>) => void
  setSelectedSuppliesGroup: (
    selectedSuppliesGroup: React.SetStateAction<Record<string, SupplyGroup>>
  ) => void
}

export type PanelContextProviderProps = {
  children: ReactNode
}

export type RequestPlaceContextValue = {
  isPlaceCreated: boolean
  place: DraftPlaceDto
  setPlaceValue: (
    key: keyof Omit<Place, 'id' | 'lastUpdatedAt' | 'latitude' | 'longitude'>,
    value: string | TranslatedField
  ) => void
  userEmail: string
  setUserEmail: (email: string) => void
  error: string | null
  setError: (error: string | null) => void
  savePlace: () => void
}
