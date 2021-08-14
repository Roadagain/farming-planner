import React from 'react'
import FarmingPlanExplorer from '../components/farming-plan-explorer'
import FileLoader from '../components/file-loader'
import GenerateFarmingPlanButton from '../components/generate-farming-plan-button'
import RequiredItemsExplorer from '../components/required-items-explorer'
import FarmingContext from '../context/farming-context'
import { FarmCount, FarmingMap, RequiredItem } from '../src/types'

const index: React.FC = () => {
  const [farmingMaps, setFarmingMaps] = React.useState<FarmingMap[] | null>(null)
  const [requiredItems, setRequiredItems] = React.useState<RequiredItem[] | null>(null)
  const [farmingPlan, setFarmingPlan] = React.useState<FarmCount[] | null>(null)
  const farmingContextValue = {
    farmingMaps,
    setFarmingMaps,
    requiredItems,
    setRequiredItems,
    farmingPlan,
    setFarmingPlan,
  }

  return (
    <main>
      周回計画計算機
      <FarmingContext.Provider value={farmingContextValue}>
        <FileLoader text="Upload file" />
        <RequiredItemsExplorer />
        <GenerateFarmingPlanButton />
        <FarmingPlanExplorer />
      </FarmingContext.Provider>
    </main>
  )
}

export default index
