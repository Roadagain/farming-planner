import { ItemFarmingEfficiency, FarmingMap, RequiredItem, MapFarmingEfficiency } from "./types"

export const calcMaxItemFarmingEfficencies = (farmingMaps: FarmingMap[]): Map<string, ItemFarmingEfficiency> => {
  const maxEfficencies: Map<string, ItemFarmingEfficiency> = new Map()
  farmingMaps.forEach(farmingMap => {
    const { itemDrops: itemDrop, cost } = farmingMap
    Object.entries(itemDrop).forEach(([name, percentage]) => {
      const currentMaxEfficency = maxEfficencies.get(name)
      const currentEfficencyCost = cost / percentage
      if (!currentMaxEfficency || currentEfficencyCost < currentMaxEfficency.cost) {
        maxEfficencies.set(name, {
          name,
          farmingMap,
          cost: currentEfficencyCost
        })
      }
    })
  })

  return maxEfficencies
}

export const calcMapFarmingEfficiencies = (farmingMaps: FarmingMap[]): MapFarmingEfficiency[] => {
  const maxItemFarmingEfficiencies = calcMaxItemFarmingEfficencies(farmingMaps)
  return farmingMaps.map(farmingMap => {
    const { cost, itemDrops } = farmingMap
    const itemCosts = Object.entries(itemDrops).map(([name, probability]) => {
      const maxEfficientCost = maxItemFarmingEfficiencies.get(name)?.cost || Infinity
      const currentEfficencyCost = cost / probability
      return cost * maxEfficientCost / currentEfficencyCost
    })
    const score = itemCosts.reduce((a, b) => a + b)

    return {
      farmingMap,
      score
    }
  })
}
