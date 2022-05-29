import Button from 'components/Button'
import { PlaceBox } from 'components/PlaceBox'
import { usePanelContext } from 'contexts/panelContext'
import { useUserContext } from 'contexts/userContext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRouter } from 'next/router'
import { Page, routes } from 'utils/routes'
import styled from 'styled-components'

import trashIconUrl from 'assets/trash-icon.svg'
import { breakpoint } from 'themes/breakpoints'
import TranslatedEntry from 'components/TranslatedEntry'
import TranslatedText from 'components/TranslatedText'
import Dialog from 'components/Dialog'
import DemandComponent, { AddIcon } from 'views/Demands/components/Demand'
import UpdateDateButton from 'components/UpdateDateButton'
import LastUpdateDate from 'components/LastUpdateDate'
import PanelButton from 'components/PanelButton'
import { Language } from 'contexts/types'

const PlaceManagerPanel = ({ className }: { className?: string }) => {
  const { language, ownedPlaces, fetchOwnedPlaces } = useUserContext()
  const {
    demands,
    priorities,
    fetchPriorities,
    fetchDemands,
    saveDemand,
    removeDemand,
    removeAllDemands,
    updatePlaceLastUpdate
  } = usePanelContext()
  const [editedDemandId, setEditedDemandId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  useEffect(() => {
    if (ownedPlaces.length === 1 && ownedPlaces[0]?.id) {
      fetchDemands(ownedPlaces[0].id)
      fetchPriorities(ownedPlaces[0].id)
    }
  }, [ownedPlaces])

  return (
    <div className={className}>
      {ownedPlaces.length === 1 && (
        <>
          <SectionTitle>
            <TranslatedText value="loggedInAs" />
          </SectionTitle>
          <PlaceTitle>
            {ownedPlaces[0]?.name[language] ||
              ownedPlaces[0]?.name[Language.PL]}
          </PlaceTitle>
          <PanelButton
            onClick={() =>
              router.push(
                routes[Page.MANAGE_ADDRESS].replace(
                  ':id',
                  ownedPlaces[0].id || ''
                )
              )
            }
          >
            <TranslatedText value="editPlaceData" />
          </PanelButton>
          <PanelButton
            onClick={() => router.push(routes[Page.BROWSE_ANNOUNCEMENTS])}
          >
            <TranslatedText value="addAnnouncement" />
          </PanelButton>
          {demands.length === 0 && (
            <SectionTitle>
              <TranslatedText value="noDemandsReported" />
            </SectionTitle>
          )}
          <PanelButton
            onClick={() =>
              router.push(
                routes[Page.DEMANDS].replace(':id', ownedPlaces[0]?.id || '')
              )
            }
          >
            <TranslatedText value="addDemands" />
          </PanelButton>
          <LastUpdateDate lastUpdatedAt={ownedPlaces[0].lastUpdatedAt} />
          <UpdateDateButton
            onClick={async () => {
              await updatePlaceLastUpdate(ownedPlaces[0].id)
              await fetchOwnedPlaces()
            }}
            isDisabled={ownedPlaces[0].priority === 0}
          />

          <Demands>
            {demands.length > 0 && (
              <>
                <DemandsWrapper>
                  {demands.map((demand, index) => (
                    <>
                      <DemandBox
                        key={demand.id}
                        onClick={() => setEditedDemandId(demand.id)}
                      >
                        <DemandTitle>
                          <DemandContent>
                            <PriorityLabel>
                              <TranslatedEntry entry={demand.priority.name} />
                            </PriorityLabel>
                            <TranslatedEntry entry={demand.supply.name} />
                            {demand.comment && (
                              <PriorityLabel>{demand.comment}</PriorityLabel>
                            )}
                          </DemandContent>
                          <TrashIcon
                            src={trashIconUrl}
                            alt="remove"
                            onClick={() => removeDemand(demand.id)}
                          />
                        </DemandTitle>
                      </DemandBox>
                      {editedDemandId === demand.id && (
                        <Dialog onClose={() => setEditedDemandId('')}>
                          <div>
                            <DemandComponentStyled
                              placeId={ownedPlaces[0].id || ''}
                              supply={demand.supply}
                              priorities={priorities}
                              saveDemand={demandDto =>
                                saveDemand(demandDto).then(() =>
                                  setEditedDemandId('')
                                )
                              }
                              isSelected
                              isSaved
                              demand={demand}
                              onSelected={console.log}
                              buttonText="Zapisz"
                            />
                          </div>
                        </Dialog>
                      )}
                    </>
                  ))}
                </DemandsWrapper>
                {ownedPlaces[0]?.id && (
                  <RemoveAllDemandsButton
                    onClick={() => removeAllDemands(ownedPlaces[0]?.id || '')}
                  >
                    <TranslatedText value="finishCollection" />
                  </RemoveAllDemandsButton>
                )}
              </>
            )}
          </Demands>
        </>
      )}

      {ownedPlaces.length > 1 && (
        <PlacesWrapper>
          <MultipPlaceTitle>
            <TranslatedText value="managePlaces" />
          </MultipPlaceTitle>
          {ownedPlaces.map((place, index) => (
            <StyledLink
              key={index}
              to={`${routes[Page.MANAGE_PLACE].replace(
                ':id',
                place?.id || ''
              )}`}
            >
              <PlaceBox place={place} />
            </StyledLink>
          ))}
        </PlacesWrapper>
      )}
    </div>
  )
}

export default styled(PlaceManagerPanel)`
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 1.3;
  font-size: 0.95rem;
  color: #999999;
  margin: 2.8rem 0 0.4rem;
`

const PlaceTitle = styled.h3`
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 1.3;
  font-size: 1.9rem;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 1.2rem 0;
  padding: 0 1.2rem;
`

const MultipPlaceTitle = styled.h3`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  color: #1f2635;
  margin: 1rem 0 1.2rem 0;
  padding: 0 1.2rem;
`

const StyledLink = styled(Link)`
  width: 100%;
`

const PlacesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2.2rem 1rem 2.2rem;
  ${breakpoint.sm`
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  `}
`

const Demands = styled.div`
  width: 100%;
  margin-top: 2.2rem;
  padding: 0 2.2rem;
`

const DemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.2rem;
`

const DemandBox = styled.div`
  padding: 1rem 1.2rem;
  background-color: white;
  width: 100%;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  margin-bottom: 0.8rem;
  cursor: pointer;
`

const DemandTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PriorityLabel = styled.span`
  color: #999;
`

const RemoveAllDemandsButton = styled(Button)`
  margin-top: 0.8rem;
  margin-bottom: 2.2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.red};
  border: 1px solid ${({ theme }) => theme.colors.red};
`

const TrashIcon = styled.img`
  display: inline-block;
  padding: 0.3rem;
  height: 28px;
  width: auto;
  cursor: pointer;
`

const DemandContent = styled.div`
  display: flex;
  flex-direction: column;
`

const DemandComponentStyled = styled(DemandComponent)`
  box-shadow: none;
  ${AddIcon} {
    display: none;
  }
`
