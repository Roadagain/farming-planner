import { ItemFarmingEfficiency, FarmingMap, RequiredItem, MapFarmingEfficiency } from './types'

export const calcMaxItemFarmingEfficencies = (farmingMaps: FarmingMap[]): Map<string, ItemFarmingEfficiency> => {
  const maxEfficencies: Map<string, ItemFarmingEfficiency> = new Map()
  farmingMaps.forEach((farmingMap) => {
    const { itemDrops: itemDrop, cost } = farmingMap
    Object.entries(itemDrop).forEach(([name, percentage]) => {
      const mostEfficientMapCost = maxEfficencies.get(name)?.cost || Infinity
      const currentEfficiencyCost = cost / percentage
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
    const itemEfficiencyCosts = Object.entries(itemDrops).map(([name, probability]) => {
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
