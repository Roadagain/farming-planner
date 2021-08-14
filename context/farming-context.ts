import { createContext } from 'react'
import { FarmCount, FarmingMap, RequiredItem } from '../src/types'

export type FarmingContextValue = {
  farmingMaps: FarmingMap[] | null
  setFarmingMaps: (farmingMaps: FarmingMap[]) => void
  requiredItems: RequiredItem[] | null
  setRequiredItems: (requiredItems: RequiredItem[]) => void
  farmingPlan: FarmCount[] | null
  setFarmingPlan: (farmingPlan: FarmCount[] | null) => void
}

const FarmingContext = createContext<FarmingContextValue>({
  farmingMaps: null,
  setFarmingMaps() {
    return
  },
  requiredItems: null,
  setRequiredItems() {
    return
  },
  farmingPlan: null,
  setFarmingPlan() {
    return
  }
})

export default FarmingContext
