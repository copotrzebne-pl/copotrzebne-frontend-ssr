import { Place } from 'contexts/types'
import { useUserContext } from 'contexts/userContext'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import marker from 'assets/marker.svg'
import { Page, routes } from 'utils/routes'
import { PlaceBox } from 'components/PlaceBox'
import { breakpoint } from 'themes/breakpoints'
import { Link } from 'react-router-dom'
import { useRouter } from 'next/router'
import Button from 'components/Button'
import TranslatedText from 'components/TranslatedText'
import { useCheckIfAuthorized } from 'hooks/useCheckIfAuthorized'

const AdminPanel = ({ className }: { className?: string }) => {
  useCheckIfAuthorized()
  const { ownedPlaces, fetchOwnedPlaces } = useUserContext()
  const router = useRouter()
  const [groupedPlaces, setGroupedPlaces] = useState<
    Record<'inactive' | 'active', Record<string, Place[]>>
  >({ inactive: {}, active: {} })
  const [placeType, setPlaceType] = useState<'active' | 'inactive'>('active')

  useEffect(() => {
    fetchOwnedPlaces()
  }, [placeType])

  useEffect(() => {
    setGroupedPlaces(groupOwnedPlaces())
  }, [ownedPlaces, placeType])

  const groupOwnedPlaces = useCallback(
    (): Record<'inactive' | 'active', Record<string, Place[]>> =>
      ownedPlaces.reduce(
        (acc, item) => {
          if (item?.state === 1) {
            acc.active[item.city] = [...(acc.active[item.city] || []), item]
          }

          if (item?.state === 2) {
            acc.inactive[item.city] = [...(acc.inactive[item.city] || []), item]
          }

          return acc
        },
        { inactive: {}, active: {} } as Record<
          'inactive' | 'active',
          Record<string, Place[]>
        >
      ),
    [ownedPlaces]
  )

  return (
    <div className={className}>
      <PlacesWrapper>
        <ButtonWrapper>
          <Button onClick={() => router.push(routes[Page.CREATE_USER])}>
            <TranslatedText value="createUser" />
          </Button>
          <br />
          <Button onClick={() => router.push(routes[Page.BROWSE_ANNOUNCEMENTS])}>
            <TranslatedText value="addAnnouncement" />
          </Button>
          <br />
          <Button
            onClick={() =>
              router.push(routes[Page.MANAGE_PLACE].replace(':id', 'new'))
            }
          >
            <TranslatedText value="addPlace" />
          </Button>
        </ButtonWrapper>
        <PlacesWrapper>
          <TypeFilterWrapper>
            <Button
              onClick={() => setPlaceType('active')}
              disabled={placeType === 'active'}
            >
              <TranslatedText value="stateActive" />
            </Button>
            <Button
              onClick={() => setPlaceType('inactive')}
              disabled={placeType === 'inactive'}
            >
              <TranslatedText value="stateInactive" />
            </Button>
          </TypeFilterWrapper>
        </PlacesWrapper>
        {Object.keys(groupedPlaces[placeType]).map((cityName, key) => (
          <PlaceWrapper key={`${placeType}_${key}`}>
            <Title>
              <Marker src={marker} alt="marker" />
              {cityName}
            </Title>
            <PlacesWrapper>
              {groupedPlaces[placeType][cityName].map((place, index) => (
                <StyledLink
                  key={`${placeType}_${index}`}
                  to={`${routes[Page.MANAGE_PLACE].replace(
                    ':id',
                    place?.id || ''
                  )}`}
                >
                  <PlaceBox place={place} />
                </StyledLink>
              ))}
            </PlacesWrapper>
          </PlaceWrapper>
        ))}
      </PlacesWrapper>
    </div>
  )
}

export default styled(AdminPanel)`
  width: 100%;
`

const PlacesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  padding-bottom: 2.2rem;
  ${breakpoint.sm`
    padding-bottom: 1.2rem;
  `}
`

const PlaceWrapper = styled.div`
  width: 100%;
`

const StyledLink = styled(Link)`
  width: 100%;
`

const Title = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.68rem;
  padding: 2.6rem 1.2rem 1.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`

const Marker = styled.img`
  height: 25px;
  width: auto;
  display: inline-block;
  margin-right: 0.7rem;
  margin-bottom: 2px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2.2rem;
  padding: 0 1.2rem;
`

const TypeFilterWrapper = styled(ButtonWrapper)`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  padding: 0;
  button {
    background-color: #ff3e61;
    width: 45%;
  }
`
