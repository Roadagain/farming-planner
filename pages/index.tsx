import { Container } from '@material-ui/core'
import React from 'react'
import FarmingPlanExplorer from '../components/FarmingPlanExplorer'
import FileLoader from '../components/FileLoader'
import GenerateFarmingPlanButton from '../components/GenerateFarmingPlanButton'
import RequiredItemsExplorer from '../components/RequiredItemsExplorer'
import FarmingContext from '../context/farming-context'
import { FarmCount, FarmingStage, RequiredItem } from '../src/types'

const IndexPage: React.FC = () => {
  const [farmingStages, setFarmingStages] = React.useState<FarmingStage[] | null>(null)
  const [requiredItems, setRequiredItems] = React.useState<RequiredItem[] | null>(null)
  const [farmingPlan, setFarmingPlan] = React.useState<FarmCount[] | null>(null)
  const farmingContextValue = {
    farmingStages,
    setFarmingStages,
    requiredItems,
    setRequiredItems,
    farmingPlan,
    setFarmingPlan,
  }

  return (
    <main>
      <Container maxWidth="xl">
        周回計画計算機
        <FarmingContext.Provider value={farmingContextValue}>
          <FileLoader text="Upload file" />
          {
            farmingStages ? <>
              <RequiredItemsExplorer />
              <GenerateFarmingPlanButton />
              <FarmingPlanExplorer />
            </> : null
          }
        </FarmingContext.Provider>
      </Container>
    </main>
  )
}

export default IndexPage
