import { FarmingMap } from './types'
import { readFile } from 'fs/promises'

export const loadFarmingMapsFromJson = async (filePath: string): Promise<FarmingMap[]> => {
  const loadedJson = JSON.parse(await readFile(filePath, 'utf-8'))
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
