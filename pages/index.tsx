import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import FarmingPlanExplorer from '../components/FarmingPlanExplorer'
import FarmingStagesLoader from '../components/FarmingStagesLoader'
import GenerateFarmingPlanButton from '../components/GenerateFarmingPlanButton'
import RequiredItemsExplorer from '../components/RequiredItemsExplorer'
import FarmingContext from '../context/farming-context'
import { FarmCount, FarmingStage, RequiredItem } from '../src/types'

const useStyles = makeStyles({
  container: {
    padding: 16,
  },
})

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
  const classes = useStyles()

  return (
    <FarmingContext.Provider value={farmingContextValue}>
      <Grid container spacing={2} direction="column" className={classes.container}>
        <Grid item>
          <FarmingStagesLoader />
        </Grid>
        {farmingStages ? (
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
