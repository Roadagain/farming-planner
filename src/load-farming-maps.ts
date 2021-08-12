import { FarmingMap } from './types'

export const loadFarmingMapsFromJson = async (jsonString: string): Promise<FarmingMap[]> => {
  const loadedJson = JSON.parse(jsonString)
  return loadedJson.farmingMaps.map((farmingMap: FarmingMap): FarmingMap => {
    const { name, cost } = farmingMap
    const itemDrops = farmingMap.itemDrops.map(({ name, probability }) => ({ name, probability }))
    return {
      name,
      cost,
      itemDrops,
    }
  })
}
