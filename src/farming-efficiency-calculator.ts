import { ItemFarmingEfficiency, FarmingMap, RequiredItem, MapFarmingEfficiency } from './types'

export const calcMaxItemFarmingEfficencies = (farmingMaps: FarmingMap[]): Map<string, ItemFarmingEfficiency> => {
  const maxEfficencies: Map<string, ItemFarmingEfficiency> = new Map()
  farmingMaps.forEach((farmingMap) => {
    const { itemDrops, cost } = farmingMap
    itemDrops.forEach(({ name, probability }) => {
      const mostEfficientMapCost = maxEfficencies.get(name)?.cost || Infinity
      const currentEfficiencyCost = cost / probability
      if (currentEfficiencyCost < mostEfficientMapCost) {
        maxEfficencies.set(name, {
          name,
          farmingMap,
          cost: currentEfficiencyCost,
        })
      }
    })
  })

  return maxEfficencies
}

export const calcMapFarmingEfficiencies = (
  farmingMaps: FarmingMap[],
  requiredItems: RequiredItem[],
  maxItemFarmingEfficiencies: Map<string, ItemFarmingEfficiency>,
): MapFarmingEfficiency[] => {
  const requiredItemNames = requiredItems.map(({ name }) => name)
  return farmingMaps.map((farmingMap) => {
    const { cost, itemDrops } = farmingMap
    const itemEfficiencyCosts = itemDrops.map(({ name, probability }) => {
      if (!requiredItemNames.includes(name)) {
        return 0
      }
      const maxEfficientCost = maxItemFarmingEfficiencies.get(name)?.cost || 0
      return maxEfficientCost * probability
    })
    const score = itemEfficiencyCosts.reduce((a, b) => a + b) / cost

    return {
      farmingMap,
      score,
    }
  })
}
