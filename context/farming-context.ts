import { createContext } from 'react'
import { FarmingMap, RequiredItem } from '../src/types'

export type FarmingContextValue = {
  farmingMaps: FarmingMap[] | null
  setFarmingMaps: (farmingMaps: FarmingMap[]) => void
  requiredItems: RequiredItem[] | null
  setRequiredItems: (requiredItems: RequiredItem[]) => void
}

const FarmingContext = createContext<FarmingContextValue>({
  farmingMaps: null,
  setFarmingMaps() {
    return
  },
  requiredItems: null,
  setRequiredItems() {
    return
  }
})

export default FarmingContext
