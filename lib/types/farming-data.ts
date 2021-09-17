import { FarmingStage } from './farming-stage'

export type ItemNameDatum = {
  id: number
  name: string
}

export type FarmingData = {
  name: string
  farmingStages: FarmingStage[]
  items: ItemNameDatum[]
}
