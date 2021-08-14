import { Button } from '@material-ui/core'
import React from 'react'
import FarmingContext from '../context/farming-context'
import { planFarming } from '../src/planner'

const GenerateFarmingPlanButton: React.FC = () => {
  const { farmingMaps, requiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const generateFarmingPlan = () => {
    if (!farmingMaps || !requiredItems) {
      return
    }
    setFarmingPlan(planFarming(farmingMaps, requiredItems))
  }

  return (
    <Button variant="contained" disabled={!farmingMaps || !requiredItems} onClick={generateFarmingPlan}>
      周回プラン生成
    </Button>
  )
}

export default GenerateFarmingPlanButton
