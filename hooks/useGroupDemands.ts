import { Demand } from 'contexts/types'
import { useState, useCallback, useEffect } from 'react'

export function useGroupDemands(demands: Demand[]) {
  const [groupedDemands, setGroupedDemands] = useState<
    Record<number, Demand[]>
  >({})
  const [demandsKeys, setDemandsKeys] = useState<number[]>([])

  //group demands by category priority
  const groupDemands = useCallback(
    (demandsList: Demand[]): Record<string, Demand[]> =>
      demandsList.reduce(
        (acc, item) => (
          (acc[item.supply.category.priority] = [
            ...(acc[item.supply.category.priority] || []),
            item
          ]),
          acc
        ),
        {} as Record<number, Demand[]>
      ),
    []
  )

  useEffect(() => {
    if (demands.length > 0) {
      const grouped = groupDemands(demands)
      setGroupedDemands(grouped)
      setDemandsKeys(
        Object.keys(grouped)
          .map(key => parseInt(key))
          .sort((a, b) => (a < b ? -1 : 1))
      )
    }
  }, [demands])

  return {
    groupedDemands,
    demandsKeys
  }
}
