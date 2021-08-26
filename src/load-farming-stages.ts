import { FarmingStage } from './types'

export const loadFarmingStagesFromJson = async (jsonString: string): Promise<FarmingStage[]> => {
  const loadedJson = JSON.parse(jsonString)
  return loadedJson.farmingStages.map((farmingStage: FarmingStage): FarmingStage => {
    const { name, cost } = farmingStage
    const itemDrops = farmingStage.itemDrops.map(({ name, probability }) => ({ name, probability }))
    return {
      name,
      cost,
      itemDrops,
    }
  })
}