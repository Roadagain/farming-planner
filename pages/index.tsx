import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import FarmingPlanExplorer from '../components/FarmingPlanExplorer'
import FarmingDataLoader from '../components/FarmingDataLoader'
import GenerateFarmingPlanButton from '../components/GenerateFarmingPlanButton'
import RequiredItemsExplorer from '../components/RequiredItemsExplorer'
import FarmingContext from '../context/farming-context'
import { FarmCount, FarmingData, RequiredItem } from '../lib/types'
import { loadFarmingDataFromLocalStorage, loadRequiredItemsFromLocalStorage } from '../lib/local-storage'

const useStyles = makeStyles({
  container: {
    padding: 16,
  },
})

const IndexPage: React.FC = () => {
  const [farmingData, setFarmingData] = React.useState<FarmingData | null>(null)
  const [requiredItems, setRequiredItems] = React.useState<RequiredItem[] | null>(null)
  const [farmingPlan, setFarmingPlan] = React.useState<FarmCount[] | null>(null)
  const farmingContextValue = {
    farmingData,
    setFarmingData,
    requiredItems,
    setRequiredItems,
    farmingPlan,
    setFarmingPlan,
  }
  const classes = useStyles()
  React.useEffect(() => {
    const lastLoadedData = loadFarmingDataFromLocalStorage()
    if (lastLoadedData) {
      console.log('loaded data', lastLoadedData)
      setFarmingData(lastLoadedData)

      const savedRequiredItems = loadRequiredItemsFromLocalStorage(lastLoadedData.name)
      setRequiredItems(savedRequiredItems)
    } else {
      console.log('not loaded')
    }
  }, [])

  return (
    <FarmingContext.Provider value={farmingContextValue}>
      <Grid container spacing={2} direction="column" className={classes.container}>
        <Grid item>
          <FarmingDataLoader />
        </Grid>
        {farmingData ? (
          <>
            <Grid item>
              <RequiredItemsExplorer />
            </Grid>
            <Grid item>
              <GenerateFarmingPlanButton />
            </Grid>
            <Grid item>
              <FarmingPlanExplorer />
            </Grid>
          </>
        ) : null}
      </Grid>
    </FarmingContext.Provider>
  )
}

export default IndexPage
