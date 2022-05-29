import styled from 'styled-components'
import { useEffect, useCallback, useState } from 'react'
import { usePanelContext } from 'contexts/panelContext'
import mapPlaceholderUrl from 'assets/map-background.svg'
import { ReactComponent as MapIcon } from 'assets/map-icon.svg'
import { breakpoint } from 'themes/breakpoints'
import { Place, Supply, SupplyGroup } from 'contexts/types'
import TranslatedText from 'components/TranslatedText'
import { OrganizationsMap } from './Map'
import { TextInputPlaceholder, WrappedPlaces } from './components'
import Dialog from 'components/Dialog'
import SupplySearch, { SelectedSupplies } from './SupplySearch'
import omit from 'lodash.omit'
import FacebookShareButton from 'components/FacebookShareButton'
import { PrismicRichText } from '@prismicio/react'

export default ({ page }: { page: any }) => {
  const {
    fetchPlaces,
    places,
    selectedSupplies,
    selectedSuppliesGroup,
    setSelectedSupplies,
    setSelectedSuppliesGroup
  } = usePanelContext()
  const [groupedPlaces, setGroupedPlaces] = useState<Record<string, Place[]>>(
    {}
  )
  const [openMobileMap, setMobileMapOpened] = useState<boolean>(false)
  const mobileViewport = typeof window !== 'undefined' ? window.matchMedia('screen and (max-width: 992px)') : { matches: true }
  const [openOrganisationSearch, setOpenOrganisationSearch] =
    useState<boolean>(false)
  useEffect(() => {
    fetchPlaces()
  }, [selectedSupplies, selectedSuppliesGroup])

  useEffect(() => {
    setGroupedPlaces(groupPlaces())
  }, [places])

  const groupPlaces = useCallback(
    (): Record<string, Place[]> =>
      places.reduce(
        (acc, item) => (
          (acc[item.city] = [...(acc[item.city] || []), item]), acc
        ),
        {} as Record<string, Place[]>
      ),
    [places]
  )

  const toggleSelectedSupply = useCallback(
    (supply: Supply) => {
      const obj = selectedSupplies[supply.id]
        ? omit(selectedSupplies, [supply.id])
        : { ...selectedSupplies, [supply.id]: supply }
      setSelectedSupplies(obj)
    },
    [selectedSupplies]
  )

  const toggleSelectedSupplyGroup = useCallback(
    (supplyGroup: SupplyGroup) => {
      setSelectedSuppliesGroup(val =>
        val[supplyGroup.categoryProductsIds]
          ? omit(val, [supplyGroup.categoryProductsIds])
          : {
              ...val,
              [supplyGroup.categoryProductsIds]: supplyGroup
            }
      )
    },
    [selectedSuppliesGroup]
  )

  const unselectAllSelectedSupplies = useCallback(() => {
    setSelectedSupplies(omit(selectedSupplies, Object.keys(selectedSupplies)))
    setSelectedSuppliesGroup(
      omit(selectedSuppliesGroup, Object.keys(selectedSuppliesGroup))
    )
  }, [selectedSupplies])

  return (
    <>
      <Container>
        <ContentWrapper>
          <IntroductionWrapper>
            <StyledFacebookButton>
              <TranslatedText value="shareActiveCollections" />
            </StyledFacebookButton>
            <IntroductionTexts>
              <PageDesciption>
                <PrismicRichText field={page.title} />
              </PageDesciption>
              <TextInputPlaceholder
                onClick={() => setOpenOrganisationSearch(true)}
              />
            </IntroductionTexts>
            {openOrganisationSearch && (
              <DialogSupplySearch
                onClose={() => setOpenOrganisationSearch(false)}
              >
                <SupplySearch
                  placesNumber={places.length}
                  handleSeeOnMap={() => {
                    setOpenOrganisationSearch(false)
                    mobileViewport.matches && setMobileMapOpened(true)
                  }}
                  onClose={() => setOpenOrganisationSearch(false)}
                />
              </DialogSupplySearch>
            )}
          </IntroductionWrapper>
          <DisplayMobile>
            <ShowMapButton onClick={() => setMobileMapOpened(true)}>
              <TranslatedText value="showOnMap" />{' '}
              <MapIcon height="22px" style={{ marginLeft: '8px' }} />
            </ShowMapButton>
          </DisplayMobile>
          {(Object.keys(selectedSupplies).length > 0 ||
            Object.keys(selectedSuppliesGroup).length > 0) && (
            <SelectedSuppliesWrapper>
              <SelectedSupplies
                selectedSupplies={selectedSupplies}
                selectedSuppliesGroup={selectedSuppliesGroup}
                unselectAll={unselectAllSelectedSupplies}
                toggleSelectedSupply={toggleSelectedSupply}
                toggleSelectedSupplyGroup={toggleSelectedSupplyGroup}
              />
              <FoundPlacesNumber>
                <TranslatedText value="found" />: {places.length}
              </FoundPlacesNumber>
            </SelectedSuppliesWrapper>
          )}
          <PlacesList>
            {Object.keys(groupedPlaces).map((cityName, key) => (
              <div key={key}>
                <Title>
                  <MapIcon height="22px" style={{ marginRight: '8px' }} />
                  {cityName}
                </Title>
                <WrappedPlaces
                  places={groupedPlaces[cityName]}
                  initialNumber={6}
                />
              </div>
            ))}
          </PlacesList>
        </ContentWrapper>
        <DisplayDesktop>
          <OrganizationsMap places={places} />
        </DisplayDesktop>
        <DisplayMobile>
          {mobileViewport.matches && openMobileMap && (
            <Dialog onClose={() => setMobileMapOpened(false)}>
              <OrganizationsMap places={places} />
            </Dialog>
          )}
        </DisplayMobile>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  padding-bottom: 4.6rem;
  ${breakpoint.sm`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
    margin: 0 auto;
    padding-bottom: 0;
    overflow: hidden;
  `}
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  ${breakpoint.sm`
    height: 100%;
    overflow-y: auto;
    min-width: 58vw;
    box-shadow: ${({ theme }) => theme.boxShadows.medium};
    position: relative;
    z-index: 110;
  `}
`

const IntroductionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3rem 2.6rem 1rem;
  background-color: ${({ theme }) => theme.colors.grey200};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey300};
  ${breakpoint.sm`
    width: 100%;
  `}
`

const Title = styled.span`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem 1.5rem 1rem;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.68rem;
  font-weight: 500;
`

const PageDesciption = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center;
  line-height: 1.5;
  
  h1, h2, h3 {
    font-size: 17px;
    font-weight: 500;
  }
  strong {
    font-weight: 500;
  }
`

const ShowMapButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0.8rem 1.8rem;
  outline: none;
  background-color: transparent;
  background-image: url(${mapPlaceholderUrl});
  background-position: center center;
  background-size: cover;
  border-top: 2px solid white;
  color: black;
  font-size: 0.9rem;
  font-weight: 600;
`

const PlacesList = styled.div`
  padding: 1em 1em 2.1em 1em;
`

const DialogSupplySearch = styled(Dialog)`
  & > div {
    background-color: transparent;
    & > div {
      ${breakpoint.sm`
        width: 450px;
        max-height: 80%;
        box-shadow: ${({ theme }) => theme.boxShadows.medium};
      `}
    }
  }
`

const IntroductionTexts = styled.div`
  max-width: 4580px;
`

const SelectedSuppliesWrapper = styled.div`
  margin-top: 1.2rem;
  padding: 0 1rem;
  width: 100%;
`

const FoundPlacesNumber = styled.span`
  display: inline-block;
  text-decoration: underline;
`

const StyledFacebookButton = styled(FacebookShareButton)`
  max-width: 90%;
  cursor: pointer;
  z-index: 130;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  ${breakpoint.sm`
    bottom: 2rem;
    right: 1rem;
    left: unset;
    transform: unset;
    max-width: 35%;
  `}
`

const DisplayMobile = styled.div`
  ${breakpoint.sm`
    display: none;
  `}
`

const DisplayDesktop = styled.div`
  display: none;
  ${breakpoint.sm`
    display: flex;
    width: 100%;
  `}
`
