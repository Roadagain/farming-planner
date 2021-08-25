import { Button } from '@material-ui/core'
import React from 'react'
import FarmingContext from '../context/farming-context'
import { planFarming } from '../src/planner'

const GenerateFarmingPlanButton: React.FC = () => {
  const { farmingStages, requiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const generateFarmingPlan = () => {
    if (!farmingStages || !requiredItems) {
      return
    }
    setFarmingPlan(planFarming(farmingStages, requiredItems))
  }

  return (
    <Button variant="contained" disabled={!farmingStages || !requiredItems} onClick={generateFarmingPlan}>
      周回プラン生成
    </Button>
  )
}

export default GenerateFarmingPlanButton
