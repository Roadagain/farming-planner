import { FarmingStage } from './types'

export const loadFarmingStages = (loadedFarmingStages: FarmingStage[]): FarmingStage[] => {
  return loadedFarmingStages.map((farmingStage: FarmingStage): FarmingStage => {
    const { name, cost } = farmingStage
    const itemDrops = farmingStage.itemDrops.map(({ name, probability }) => ({ name, probability }))
    return {
      name,
      cost,
      itemDrops,
    }
  })
}

export const loadFarmingStagesFromJson = (jsonString: string): FarmingStage[] => {
  const loadedJson = JSON.parse(jsonString)
  return loadFarmingStages(loadedJson.farmingStages)
}

export const loadDropItemNames = (farmingStages: FarmingStage[]): string[] => {
  const duplicatableDropItemNames = farmingStages.flatMap(({ itemDrops }) => itemDrops.map(({ name }) => name))

  return Array.from(new Set(duplicatableDropItemNames))
}
