import { FarmingMap, Efficency, RequiredItem, FarmingPlan } from './types'

export const calcMaxEfficencies = (farmingMaps: FarmingMap[]): Map<string, Efficency> => {
  const maxEfficencies: Map<string, Efficency> = new Map()
  farmingMaps.forEach(farmingMap => {
    const { itemDrop, cost } = farmingMap
    Object.entries(itemDrop).forEach(([name, percentage]) => {
      const currentMaxEfficency = maxEfficencies.get(name)
      const currentEfficencyCost = cost / percentage
      if (!currentMaxEfficency || currentEfficencyCost < currentMaxEfficency.cost) {
        maxEfficencies.set(name, {
          farmingMap,
          cost: currentEfficencyCost
        })
      }
    })
  })

  return maxEfficencies
}

export const planFarming = (farmingMaps: FarmingMap[], requiredItems: RequiredItem[]): FarmingPlan => {
  const maxEfficencies = calcMaxEfficencies(farmingMaps)
  return requiredItems.map(requiredItem => {
    const { name, count } = requiredItem
    const efficency = maxEfficencies.get(name)

    if (!efficency) {
      return {
        name: 'unknown',
        count: Infinity
      }
    }
    return {
      name: efficency.farmingMap.name,
      count: Math.floor(count / efficency.farmingMap.itemDrop[name])
    }
  })
}
