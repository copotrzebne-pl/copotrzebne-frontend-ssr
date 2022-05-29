/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGroupSupplies } from 'hooks/useGroupSupplies'
import { usePanelContext } from 'contexts/panelContext'
import TranslatedEntry from 'components/TranslatedEntry'
import Checkbox from 'components/Checkbox'
import omit from 'lodash.omit'
import { Supply, SupplyGroup } from 'contexts/types'
import TranslatedText from 'components/TranslatedText'
import { getTranslation, mapTranslationKeys } from 'utils/translation'
import { translations } from 'utils/translations'
import { useUserContext } from 'contexts/userContext'
import { ReactComponent as SearchIcon } from 'assets/search-icon.svg'
import mapPlaceholderUrl from 'assets/map-background.svg'
import { breakpoint } from 'themes/breakpoints'

const SupplySearchComponent = ({
  className,
  placesNumber,
  handleSeeOnMap,
  onClose
}: {
  className?: string
  placesNumber: number
  handleSeeOnMap: () => void
  onClose: () => void
}) => {
  const [contextMenuOpened, setContextMenuOpened] = useState<boolean>(false)
  const {
    supplies,
    selectedSupplies,
    selectedSuppliesGroup,
    setSelectedSupplies,
    setSelectedSuppliesGroup,
    fetchSupplies
  } = usePanelContext()
  const { language } = useUserContext()
  const { groupedSupplies, suppliesKeys, searchText, setSearchText } =
    useGroupSupplies(supplies)

  useEffect(() => {
    fetchSupplies()
  }, [])

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

  const unselectAllSelected = useCallback(() => {
    setSelectedSupplies(omit(selectedSupplies, Object.keys(selectedSupplies)))
    setSelectedSuppliesGroup(
      omit(selectedSuppliesGroup, Object.keys(selectedSuppliesGroup))
    )
  }, [selectedSupplies, selectedSuppliesGroup])

  return (
    <div className={className}>
      <FormGroup>
        <Label>
          <TranslatedText value="searchPlaceByName" />
        </Label>
        <SearchRow>
          <TextInput
            id="search"
            name="searchFilter"
            type="text"
            placeholder={getTranslation(
              language,
              translations['searchPlacePlaceholder']
            )}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onFocus={() => {
              setContextMenuOpened(false)
            }}
            isNotEmpty={searchText.length > 0}
          />
          {searchText.length > 0 && <ClearSearchIcon onClick={() => setSearchText('')} />}
          <SelectedSuppliesIcon
            onClick={onClose}
          >
            <SearchIcon height="20px" color="white" />
          </SelectedSuppliesIcon>
        </SearchRow>
        {Object.keys(selectedSupplies).length > 0 ||
          (Object.keys(selectedSuppliesGroup).length > 0 && (
            <SelectedSupplies
              selectedSupplies={selectedSupplies}
              selectedSuppliesGroup={selectedSuppliesGroup}
              unselectAll={unselectAllSelected}
              toggleSelectedSupply={toggleSelectedSupply}
              toggleSelectedSupplyGroup={toggleSelectedSupplyGroup}
            />
          ))}
      </FormGroup>
      <SuppliesList>
        {suppliesKeys.map((priorityNumber, key) => {
          if (!groupedSupplies[priorityNumber]) return null
          return (
            <div key={`supply-${priorityNumber}`}>
              <CategoryHeader>
                <Checkbox
                  id={`search_supply_group_${groupedSupplies[priorityNumber].categoryProductsIds}`}
                  value=""
                  checked={
                    !!selectedSuppliesGroup[
                      groupedSupplies[priorityNumber].categoryProductsIds
                    ]
                  }
                  onChange={_ =>
                    toggleSelectedSupplyGroup(groupedSupplies[priorityNumber])
                  }
                />{' '}
                <TranslatedEntry
                  entry={mapTranslationKeys(groupedSupplies[priorityNumber].supplies[0].category)}
                />
              </CategoryHeader>
              {groupedSupplies[priorityNumber].supplies.map(supply => (
                <SupplyWrapper key={supply.id}>
                  <Checkbox
                    id={`search_supply_${supply.id}`}
                    value=""
                    checked={!!selectedSupplies[supply.id]}
                    onChange={_ => toggleSelectedSupply(supply)}
                  />{' '}
                  <SupplyLabel htmlFor={`search_supply_${supply.id}`}>
                    <TranslatedEntry entry={supply.name} />
                  </SupplyLabel>
                </SupplyWrapper>
              ))}
            </div>
          )
        })}
      </SuppliesList>
      <ButtonWrapper>
        <ShowOnMapButton onClick={handleSeeOnMap}>
          {placesNumber > 0
            ? `${getTranslation(
                language,
                translations['showOnMap']
              )} (${placesNumber})`
            : getTranslation(language, translations['notFound'])}
        </ShowOnMapButton>
      </ButtonWrapper>
    </div>
  )
}

export default styled(SupplySearchComponent)`
  margin: 0;
  padding: 1rem 0.4rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  align-items: center;
  margin-top: 2rem;
  ${breakpoint.sm`
    margin-top: 1rem;
  `}
`

const Label = styled.label`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey600};
  margin-bottom: 0.4rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 1rem;
  width: calc(100% - 2.4rem);
  max-width: 500px;
`

const TextInput = styled.input<{ isNotEmpty: boolean }>`
  display: inline-block;
  width: calc(100% - 60px);
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 42px;
  padding: 0 1rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 0.7;
  }
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grey600};
  padding-right: ${props => props.isNotEmpty ? '2.3rem' : '0'};
`

const SuppliesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  max-height: calc(100% - 80px);
  overflow-y: auto;
  padding: 0 1.2rem 8rem 1.2rem;
`

const CategoryHeader = styled.span`
  font-weight: bold;
  display: flex;
  width: 100%;
  font-size: 1.05rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  color: #333333;
  border-radius: 12px;
  background-color: #0076ff1f;
  margin: 0.4rem -10px;
  padding-left: 10px;
`

const SupplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.6rem;
`

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  align-items: center;
`

const SelectedSuppliesIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 42px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.blue};
  svg {
    fill: white;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SupplyLabel = styled.label`
  cursor: pointer;
`

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #0076ff87;
  border-radius: 16px;
  padding: 0.4rem;
  padding-left: 0.8rem;
  margin-right: 1rem;
  white-space: nowrap;
  flex-shrink: 0;
`

const CloseIcon = styled.button`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
  border: none;
  background: white;
  color: black;
  transition: color 0.6s;
  margin-left: 0.4rem;
  padding: 0;
  &:after {
    content: '✕';
    font-size: 16px;
  }
  &:hover,
  &:focus {
    color: rgba(0, 0, 0, 0.4);
  }
`

const SelectedTags = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  flex-direction: row;
  min-height: 50px;
  align-items: center;
  margin-bottom: 0.4rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.2rem 3.4rem;
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
`

const ShowOnMapButton = styled.button`
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
  color: black;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 12px;
`

const RemoveAllButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey800};
  border-radius: 50%;
  flex-shrink: 0;
  & > button {
    margin-left: 0;
  }
`

const ClearSearchIcon = styled.button`
  width: 20px;
  height: 20px;
  background: transparent;
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
  padding: 0;
  font-size: 1.3rem;
  line-height: 1;
  &:after {
    content: '✕';
  }
`

export const SelectedSupplies = ({
  selectedSupplies,
  selectedSuppliesGroup,
  toggleSelectedSupply,
  toggleSelectedSupplyGroup,
  unselectAll
}: {
  selectedSupplies: Record<string, Supply>
  selectedSuppliesGroup: Record<string, SupplyGroup>
  toggleSelectedSupply: (supply: Supply) => void
  toggleSelectedSupplyGroup: (supply: SupplyGroup) => void
  unselectAll: () => void
}) => (
  <SelectedTags>
    <RemoveAllButton>
      <CloseIcon onClick={() => unselectAll()} />
    </RemoveAllButton>
    {Object.keys(selectedSuppliesGroup).map((groupId, key) => (
      <Row key={key}>
        <SelectedItem>
          <TranslatedEntry
            entry={selectedSuppliesGroup[groupId].supplies[0].category}
          />
          <CloseIcon
            onClick={() =>
              toggleSelectedSupplyGroup(selectedSuppliesGroup[groupId])
            }
          />
        </SelectedItem>
      </Row>
    ))}
    {Object.keys(selectedSupplies).map((supplyId, key) => (
      <Row key={key}>
        <SelectedItem>
          <TranslatedEntry entry={selectedSupplies[supplyId]} />
          <CloseIcon
            onClick={() => toggleSelectedSupply(selectedSupplies[supplyId])}
          />
        </SelectedItem>
      </Row>
    ))}
  </SelectedTags>
)
