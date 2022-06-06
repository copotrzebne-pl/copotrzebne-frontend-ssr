import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import DemandComponent from './components/Demand'
import TranslatedText from 'components/TranslatedText'
import TranslatedEntry from 'components/TranslatedEntry'
import { useGroupSupplies } from 'hooks/useGroupSupplies'
import { Demand } from 'contexts/types'
import { getTranslation } from 'utils/translation'
import { translations } from 'utils/translations'
import { useUserContext } from 'contexts/userContext'
import { useRouter } from 'next/router'
import { useCheckIfAuthorized } from 'hooks/useCheckIfAuthorized'

export default () => {
  const {
    priorities,
    supplies,
    selectedPlace,
    demands,
    fetchPlace,
    fetchDemands,
    fetchPriorities,
    fetchSupplies,
    saveDemand,
    clearDemands,
    clearSelectedPlace
  } = usePanelContext()
  useCheckIfAuthorized()
  const { language } = useUserContext()

  const router = useRouter()
  const { id } = router.query
  const { groupedSupplies, suppliesKeys, searchText, setSearchText } =
    useGroupSupplies(supplies)
  const [demandsMap, setDemandsMap] = useState<Record<string, Demand>>({})
  const [selectedSupplyId, setSelectedSupplyId] = useState<string | null>(null)

  useEffect(() => {
    const placeId = Array.isArray(id) ? id[0] : id 
    if (placeId) {
      fetchPlace(placeId)
      fetchDemands(placeId)
      fetchPriorities(placeId)
      fetchSupplies()
    }
    return () => {
      clearDemands()
      clearSelectedPlace()
    }
  }, [id])

  useEffect(() => {
    // prepare demands map for O1 access
    const map = demands.reduce(
      (acc, item) => ({ ...acc, [item.supply.id]: item }),
      {} as Record<string, Demand>
    )
    setDemandsMap(map)
  }, [demands])

  return (
    <Container>
      <PageTitle>
        <TranslatedText value="chooseCurrentDemands" />
      </PageTitle>
      <FormGroup>
        <Label>
          <TranslatedText value="search" />
        </Label>
        <TextInput
          id="search"
          type="text"
          name="searchFilter"
          autoComplete="false"
          placeholder={getTranslation(language, translations['search'])}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </FormGroup>
      <SuppliesWrapper>
        {suppliesKeys.map((priorityNumber, key) => {
          if (!groupedSupplies[priorityNumber]) return null
          return (
            <div key={key}>
              <CategoryHeader>
                <TranslatedEntry
                  entry={groupedSupplies[priorityNumber].supplies[0].category}
                />
              </CategoryHeader>
              {groupedSupplies[priorityNumber].supplies.map(supply => (
                <DemandComponent
                  key={supply.id}
                  placeId={selectedPlace?.id || ''}
                  supply={supply}
                  priorities={priorities}
                  saveDemand={saveDemand}
                  isSelected={supply.id === selectedSupplyId}
                  isSaved={!!demandsMap[supply.id]}
                  demand={demandsMap[supply.id]}
                  onSelected={(supplyId: string) =>
                    setSelectedSupplyId(supplyId)
                  }
                />
              ))}
            </div>
          )
        })}
      </SuppliesWrapper>
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

const SuppliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.8rem 1.2rem 3.4rem;
`

const CategoryHeader = styled.span`
  font-weight: bold;
  display: flex;
  width: 100%;
  font-size: 1.45rem;
  padding: 0.7rem 1.2rem;
  margin: 1rem 0;
  color: #333333;
  border-radius: 12px;
`

export const TextInput = styled.input`
  display: inline-block;
  width: 100%;
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 45px;
  padding: 0 1rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 0.7;
  }
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 400;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.2rem;
`
