import { Supply, SupplyGroup } from 'contexts/types'
import { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { getTranslation } from 'utils/translation'
import { useUserContext } from 'contexts/userContext'

export function useGroupSupplies(supplies: Supply[]) {
  const [groupedSupplies, setGroupedSupplies] = useState<
    Record<number, SupplyGroup>
  >({})
  const { language } = useUserContext()
  const [suppliesKeys, setSuppliesKeys] = useState<number[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [suppliesLoaded, setSuppliesLoaded] = useState<boolean>(false)

  //group supplies by category priority
  const groupSupplies = useCallback(
    (items: Supply[]): Record<number, SupplyGroup> => {
      const grouped = items.reduce(
        (acc, item) => (
          (acc[item.category.priority] = {
            categoryProductsIds: '',
            supplies: [...(acc[item.category.priority]?.supplies || []), item]
          }),
          acc
        ),
        {} as Record<string, SupplyGroup>
      )
      const groupedWithProductsIds = Object.keys(grouped).reduce((acc, val) => {
        acc[val] = {
          ...grouped[val],
          categoryProductsIds: grouped[val].supplies
            .map(supply => supply.id)
            .join(',')
        }
        return acc
      }, {} as Record<string, SupplyGroup>)
      return groupedWithProductsIds
    },
    []
  )

  useEffect(() => {
    if (!supplies.length) return
    setSuppliesLoaded(true)
  }, [supplies])

  useEffect(() => {
    const grouped = groupSupplies(supplies)
    setGroupedSupplies(grouped)
    setSuppliesKeys(
      Object.keys(grouped)
        .map(key => parseInt(key))
        .sort((a, b) => (a < b ? -1 : 1))
    )
  }, [supplies])

  const searchDebounced = useCallback(
    debounce(text => {
      if (!text) setGroupedSupplies(groupSupplies(supplies))
      setGroupedSupplies(
        groupSupplies(
          supplies.filter(supply =>
            getTranslation(language || 'pl', supply.name)
              ?.toLowerCase()
              .includes(text.toLowerCase())
          )
        )
      )
    }, 300),
    [language, supplies]
  )

  useEffect(() => {
    if (!suppliesLoaded) return
    searchDebounced(searchText)
  }, [suppliesLoaded, searchText])

  return {
    groupedSupplies,
    suppliesKeys,
    searchText,
    setSearchText
  }
}
