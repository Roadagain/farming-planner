import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import FarmingPlanExplorer from '../components/FarmingPlanExplorer'
import FarmingStagesLoader from '../components/FarmingStagesLoader'
import GenerateFarmingPlanButton from '../components/GenerateFarmingPlanButton'
import RequiredItemsExplorer from '../components/RequiredItemsExplorer'
import FarmingContext from '../context/farming-context'
import { FarmCount, FarmingData, RequiredItem } from '../src/types'

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

  return (
    <FarmingContext.Provider value={farmingContextValue}>
      <Grid container spacing={2} direction="column" className={classes.container}>
        <Grid item>
          <FarmingStagesLoader />
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
