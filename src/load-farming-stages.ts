import { FarmingData, FarmingStage, ItemNameDatum } from './types'

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

export const loadItems = (dropItemNameData: ItemNameDatum[]): ItemNameDatum[] => {
  return dropItemNameData.sort((a, b) => a.id - b.id)
}

export const loadFarmingDataFromJson = (jsonString: string): FarmingData => {
  const loadedJson = JSON.parse(jsonString)
  return {
    farmingStages: loadFarmingStages(loadedJson.farmingStages),
    items: loadItems(loadedJson.items),
  }
}
