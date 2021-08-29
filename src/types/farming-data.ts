import { FarmingStage } from "./farming-stage";

export type ItemNameDatum = {
  id: number
  name: string
}
export type FarmingData = {
  farmingStages: FarmingStage[]
  items: ItemNameDatum[]
}
