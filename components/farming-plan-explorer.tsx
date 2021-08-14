import { Grid } from '@material-ui/core'
import React from 'react'
import FarmingContext from '../context/farming-context'
import FarmingPlanItem from './farming-plan-item'

const FarmingPlanExplorer: React.FC = () => {
  const { farmingPlan } = React.useContext(FarmingContext)

  return (
    <Grid container>
      {farmingPlan?.map(farmCount => {
        return (
          <Grid item md={3} key={farmCount.farmingMap.name}>
            <FarmingPlanItem name={farmCount.farmingMap.name} count={farmCount.count} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default FarmingPlanExplorer
