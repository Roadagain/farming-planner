import { createContext } from 'react'
import { FarmCount, FarmingData, RequiredItem } from '../lib/types'

export type FarmingContextValue = {
  farmingData: FarmingData | null
  setFarmingData: (farmingData: FarmingData) => void
  requiredItems: RequiredItem[] | null
  setRequiredItems: (requiredItems: RequiredItem[]) => void
  farmingPlan: FarmCount[] | null
  setFarmingPlan: (farmingPlan: FarmCount[] | null) => void
}

const FarmingContext = createContext<FarmingContextValue>({
  farmingData: null,
  setFarmingData() {
    return
  },
  requiredItems: null,
  setRequiredItems() {
    return
  },
  farmingPlan: null,
  setFarmingPlan() {
    return
  },
})

export default FarmingContext
