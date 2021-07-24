import { FarmingMap } from "./farming-map"

export type ItemFarmingEfficiency = {
  name: string
  farmingMap: FarmingMap
  cost: number
}

export type MapFarmingEfficiency = {
  farmingMap: FarmingMap
  score: number
}
