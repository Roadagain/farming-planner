import { Button } from '@material-ui/core'
import React from 'react'
import FarmingContext from '../context/farming-context'
import { planFarming } from '../lib/planner'
import { LackedItem } from '../lib/types'

const GenerateFarmingPlanButton: React.FC = () => {
  const { farmingData, requiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const generateFarmingPlan = () => {
    if (!farmingData || !requiredItems) {
      return
    }
    const lackedItems: LackedItem[] = requiredItems.map(({ name, storedCount, requiredCount }) => ({
      name,
      count: Math.max(requiredCount - storedCount, 0),
    }))
    setFarmingPlan(planFarming(farmingData?.farmingStages, lackedItems))
  }

  return (
    <Button variant="contained" disabled={!farmingData || !requiredItems} onClick={generateFarmingPlan}>
      周回プラン生成
    </Button>
  )
}

export default GenerateFarmingPlanButton
