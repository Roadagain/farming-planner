import { calcMaxItemFarmingEfficencies } from './farming-efficiency-calculator'
import { FarmingMap, RequiredItem, FarmingPlan } from './types'

export const planFarming = (farmingMaps: FarmingMap[], requiredItems: RequiredItem[]): FarmingPlan => {
  const maxEfficencies = calcMaxItemFarmingEfficencies(farmingMaps)
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
      count: Math.floor(count / efficency.farmingMap.itemDrops[name])
    }
  })
}
