import React from 'react'
import FileLoader from '../components/file-loader'
import FarmingContext from '../context/farming-context'
import { FarmingMap } from '../src/types'

const index: React.FC = () => {
  const [farmingMaps, setFarmingMaps] = React.useState<FarmingMap[] | null>(null)
  const farmingContextValue = {
    farmingMaps,
    setFarmingMaps
  }

  return <main>
    周回計画計算機
    <FarmingContext.Provider value={farmingContextValue}>
      <FileLoader text="Upload file" />
    </FarmingContext.Provider>
  </main>
}

export default index
