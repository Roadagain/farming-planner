import { FarmingStage } from './farming-stage'

export type ItemFarmingEfficiency = {
  name: string
  farmingStage: FarmingStage
  cost: number
}

export type StageFarmingEfficiency = {
  farmingStage: FarmingStage
  score: number
}
