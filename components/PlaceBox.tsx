import { Place } from 'contexts/types'
import styled from 'styled-components'
import TranslatedText from 'components/TranslatedText'
import trashIconUrl from 'assets/trash-icon.svg'
import { useUserContext } from 'contexts/userContext'
import { useState } from 'react'
import { checkIfAuthorized } from 'utils/session'
import { formatDateWithTime } from 'utils/date'
import TranslatedEntry from './TranslatedEntry'
import { breakpoint } from 'themes/breakpoints'
import { Language } from 'contexts/types'

const PlaceBoxComponent = ({
  className,
  place
}: {
  className?: string
  place: Place
}) => {
  const { deletePlace } = useUserContext()
  const { user, language } = useUserContext()
  const [authorized] = useState<boolean>(() => checkIfAuthorized())

  return (
    <div className={className}>
      <PlaceNameAndAddress>
        <PlaceName place={place}>
          {place.name[language] || place.name[Language.PL] || ''}
        </PlaceName>
        {authorized && user?.role === 'admin' && (
          <TrashIcon
            src={trashIconUrl}
            alt="remove"
            onClick={() =>
              window.confirm('Czy na pewno usunąć organizację?')
                ? deletePlace(place.id || '')
                : place.id
            }
          />
        )}
        <PlaceDetails>
          {place.city || ''}, {place.street || ''} {place.buildingNumber || ''}
          {place.apartment ? `/${place.apartment}` : ''}
        </PlaceDetails>
        {place.workingHours && (
          <PlaceDetails>{place.workingHours || ''}</PlaceDetails>
        )}
        {place.additionalDescription && (
          <PlaceDetails>{place.additionalDescription || ''}</PlaceDetails>
        )}
      </PlaceNameAndAddress>
      {!place.lastUpdatedAt && (
        <LastUpdate>
          <TranslatedText value="noOngoingCollections" />
        </LastUpdate>
      )}
      {place.urgentDemands && place.urgentDemands.length > 0 && (
        <UrgentDemandsWrapper>
          <UrgentDemandsTitle>
            <TranslatedText value="urgentlyNeeded" /> (
            {place.urgentDemands.length})
          </UrgentDemandsTitle>
          <UrgentDemandsList>
            {place.urgentDemands.map((demand, key) => {
              return (
              <UrgentDemand key={key}>
                {/*TODO: fix translations */}
                <TranslatedEntry entry={demand.supply.name} />
              </UrgentDemand>
            )
            })}
          </UrgentDemandsList>
        </UrgentDemandsWrapper>
      )}
      {place.lastUpdatedAt && (
        <LastUpdate>
          <TranslatedText value="placeLastUpdate" />{' '}
          {`${place.lastUpdatedAt && formatDateWithTime(place.lastUpdatedAt)}`}
        </LastUpdate>
      )}
    </div>
  )
}

export const PlaceBox = styled(PlaceBoxComponent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem 1.2rem;
  background-color: white;
  width: 100%;
  height: 100%;

  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }
  overflow: hidden;
`

const PlaceName = styled.h3<{ place: Place }>`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.45;
  margin-bottom: 0.1rem;
  display: inline-block;
  width: 90%;
  color: ${props => (props.place.priority !== 0 ? '#1f2635' : '#8d99b2')};
`

const PlaceDetails = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.7rem;
  line-height: 1.2;
  font-weight: 500;
  color: #8d99b2;
`

const LastUpdate = styled.div`
  width: 100%;
  display: inline-block;
  text-align: end;
  font-size: 0.65rem;
  color: #8d99b2;
  padding-top: 0.2rem;
`
const TrashIcon = styled.img`
  display: inline-block;
  padding: 0.3rem;
  height: 28px;
  width: auto;
  cursor: pointer;
`

const PlaceNameAndAddress = styled.div``

const UrgentDemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const UrgentDemandsTitle = styled(PlaceDetails)`
  margin-top: 0.4rem;
  color: ${({ theme }) => theme.colors.blue};
`

const UrgentDemandsList = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  margin-top: 0.6rem;
  ${breakpoint.sm`
    overflow-x: hidden;
  `}
`

const UrgentDemand = styled.div`
  display: flex;
  padding: 0.2rem 0.4rem;
  background-color: #0076ff2b;
  border-radius: 8px;
  flex-shrink: 0;
  font-size: 0.75rem;
  margin-right: 0.4rem;
`
