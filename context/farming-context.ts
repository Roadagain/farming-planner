import { createContext } from 'react'
import { FarmCount, FarmingStage, RequiredItem } from '../src/types'

export type FarmingContextValue = {
  farmingStages: FarmingStage[] | null
  setFarmingStages: (farmingStages: FarmingStage[]) => void
  requiredItems: RequiredItem[] | null
  setRequiredItems: (requiredItems: RequiredItem[]) => void
  farmingPlan: FarmCount[] | null
  setFarmingPlan: (farmingPlan: FarmCount[] | null) => void
}

const FarmingContext = createContext<FarmingContextValue>({
  farmingStages: null,
  setFarmingStages() {
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
