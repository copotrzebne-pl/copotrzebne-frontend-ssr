import { createContext, useEffect, useContext, useState, useCallback } from 'react'
import {
  User,
  UserContextValue,
  UserContextProviderProps,
  Place,
  PlaceDto,
  Language
} from './types'
import { API } from 'utils/endpoints'
import { getRestClient } from 'utils/restClient'
import { Page, routes } from 'utils/routes'
import { checkIfAuthorized } from 'utils/session'
import omit from 'lodash.omit'
import { useRouter } from 'next/router'

const DEFAULT_LANGUAGE = 'pl'

export const UserContext = createContext<UserContextValue | null>(null)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [authorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    setAuthorized(checkIfAuthorized())
  }, [])

  const [language, setLanguage] = useState<Language>(
    () =>
      (typeof window !== 'undefined' && window.localStorage.getItem('lang') ||
        typeof document !== 'undefined' && document?.documentElement?.lang ||
        DEFAULT_LANGUAGE) as Language
  )
  const [userValue, setUserValue] = useState<User | null>(null)
  const [ownedPlaces, setOwnedPlaces] = useState<(Place & { id: string })[]>([])
  const [errors, setError] = useState<Record<string, string>>({})
  const router = useRouter();
  const login = useCallback(
    async (userLogin: string, password: string) => {
      try {
        const client = await getRestClient(process.env.NEXT_PUBLIC_API_URL)
        const response = await client.post<null, Record<string, string>>(
          API.panel.login,
          { login: userLogin, password }
        )
        window.localStorage.setItem('_token', response.jwt)
        setAuthorized(true)
        router.push(routes[Page.PANEL])
      } catch {
        setError({ ...errors, login: 'Błąd logowania' })
      }
    },
    [errors, router]
  )
  const changeLanguage = (lang: string) => {
    setLanguage(lang as Language)
    window.localStorage.setItem('lang', lang)
  }

  const fetchUser = useCallback(async () => {
    const client = await getRestClient(process.env.NEXT_PUBLIC_API_URL)
    const response = await client.get<null, User>(API.panel.getUser)

    setUserValue(response)
  }, [])

  const fetchOwnedPlaces = useCallback(async () => {
    const client = await getRestClient(process.env.NEXT_PUBLIC_API_URL)
    const response = await client.get<null, (Place & { id: string })[]>(
      API.panel.getOwnedPlaces
    )

    setOwnedPlaces(response)
  }, [])

  const savePlace = useCallback(
    async (place: PlaceDto, redirectPath: string) => {
      const client = await getRestClient(process.env.NEXT_PUBLIC_API_URL)

      try {
        const placeFormatted = omit(
          {
            ...place,
            latitude: place.latitude ? parseFloat(place.latitude) : null,
            longitude: place.longitude ? parseFloat(place.longitude) : null
          },
          ['lastUpdatedAt', 'priority', 'nameSlug']
        )
        if (place.id !== 'new') {
          await client.patch<null, Place>(
            `${API.panel.savePlace}/${place.id}`,
            placeFormatted
          )
        } else {
          //remove empty values
          for (const key in placeFormatted) {
            if (placeFormatted[key as keyof typeof placeFormatted] === '') {
              delete placeFormatted[key as keyof typeof placeFormatted]
            }
          }
          delete placeFormatted.id
          await client.post<null, Place>(
            `${API.panel.savePlace}`,
            placeFormatted
          )
        }
      } catch {
        console.error('Error: place save error!')
        return
      }

      router.push(redirectPath)
    },
    []
  )

  const deletePlace = useCallback(async (placeId: string) => {
    const client = await getRestClient(process.env.NEXT_PUBLIC_API_URL)
    try {
      if (placeId) {
        await client.delete<null, Place>(
          API.panel.deletePlace.replace(':id', placeId)
        )
      }
    } catch {
      console.error('Error: place delete error!')
      return
    }

    router.push(routes[Page.PANEL])
  }, [])

  return (
    <UserContext.Provider
      value={{
        user: userValue,
        ownedPlaces,
        fetchUser,
        fetchOwnedPlaces,
        login,
        savePlace,
        deletePlace,
        authorized,
        language,
        changeLanguage,
        setAuthorized
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error(
      'You are outside UserContext! Make sure components are wrapped in proper provider.'
    )
  }

  return ctx
}
