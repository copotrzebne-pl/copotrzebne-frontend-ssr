import React from 'react'
import { Language } from 'contexts/types'

export type Route = {
  path: string
  component: React.ComponentType
}

export type Translations = {
  id?: string
  pl?: string
  ua?: string
  en?: string
}

export type ItemMenu = {
  route: string
  translationKey: string
  action?: () => void
  hidden?: boolean
  highlighted?: boolean
}

export type AnnouncementComment = {
  id: string
  createdAt: string
  message: string
  updatedAt: string
}

export type InternalAnnouncement = {
  title: string
  message: string
  contactInfo: string
  startDate?: string
  endDate?: string
  createdAt: string
  id: string
  announcementComments: AnnouncementComment[]
  placeId: string
}

export type PublicAnnouncement = {
  id: string
  message: string
  placeId: string
  createdAt: string
}

export type TranslatedField = Record<Language, string>
