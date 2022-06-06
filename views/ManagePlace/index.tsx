import { useEffect } from 'react'
import Button from 'components/Button'
import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { Page, routes } from 'utils/routes'
import LastUpdateDate from 'components/LastUpdateDate'
import UpdateDateButton from 'components/UpdateDateButton'
import { useUserContext } from 'contexts/userContext'
import { Language } from 'contexts/types'
import { useCheckIfAuthorized } from 'hooks/useCheckIfAuthorized'

export default () => {
  useCheckIfAuthorized()
  const router = useRouter()
  const { id } = router.query
  const placeId = Array.isArray(id) ? id[0] : id 
  const { language } = useUserContext()
  const {
    selectedPlace,
    fetchPlace,
    clearSelectedPlace,
    updatePlaceLastUpdate
  } = usePanelContext()

  useEffect(() => {
    placeId && placeId !== 'new' && fetchPlace(placeId)
    return () => {
      clearSelectedPlace()
    }
  }, [placeId])

  return (
    <Container>
      <PageTitle>
        {selectedPlace?.name[language] ||
          selectedPlace?.name[Language.PL] ||
          'Dodaj nowe miejsce'}
      </PageTitle>
      <StyledButton
        onClick={() =>
          router.push(routes[Page.MANAGE_ADDRESS].replace(':id', placeId || ''))
        }
      >
        {selectedPlace?.name ? (
          <TranslatedText value="editPlaceData" />
        ) : (
          <TranslatedText value="addPlace" />
        )}
      </StyledButton>
      {id && id !== 'new' && (
        <StyledButton
          onClick={() =>
            router.push(routes[Page.MANAGE_DEMANDS].replace(':id', placeId || ''))
          }
        >
          <TranslatedText value="editDemands" />
        </StyledButton>
      )}
      {id && id !== 'new' && selectedPlace && (
        <>
          <LastUpdateDate lastUpdatedAt={selectedPlace.lastUpdatedAt} />
          <UpdateDateButton
            onClick={() => updatePlaceLastUpdate(placeId as string)}
            isDisabled={selectedPlace.priority === 0}
          />
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const StyledButton = styled(Button)`
  width: auto;
  margin: 1.2rem 2.2rem;
  padding: 0.8rem 1.8rem;
`
