import React from 'react'
import FileLoader from '../components/file-loader'
import RequiredItemsExplorer from '../components/required-items-explorer'
import FarmingContext from '../context/farming-context'
import { FarmingMap, RequiredItem } from '../src/types'

const index: React.FC = () => {
  const [farmingMaps, setFarmingMaps] = React.useState<FarmingMap[] | null>(null)
  const [requiredItems, setRequiredItems] = React.useState<RequiredItem[] | null>(null)
  const farmingContextValue = {
    farmingMaps,
    setFarmingMaps,
    requiredItems,
    setRequiredItems,
  }

  return (
    <main>
      周回計画計算機
      <FarmingContext.Provider value={farmingContextValue}>
        <FileLoader text="Upload file" />
        <RequiredItemsExplorer />
      </FarmingContext.Provider>
    </main>
  )
}

export default index
