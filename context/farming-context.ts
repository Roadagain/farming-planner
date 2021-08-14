import { createContext } from 'react'
import { FarmingMap } from '../src/types'

export type FarmingContextValue = {
  farmingMaps: FarmingMap[] | null
  setFarmingMaps: (farmingMaps: FarmingMap[]) => void
}

const FarmingContext = createContext<FarmingContextValue>({
  farmingMaps: null,
  setFarmingMaps() {
    return
  },
})

export default FarmingContext
