import { FarmingMap, RequiredItem, FarmingPlan, FarmCount } from './types'

export const planFarming = (farmingMaps: FarmingMap[], requiredItems: RequiredItem[]): FarmingPlan => {
  return requiredItems.map(requiredItem => {
    const { count } = requiredItem
    const itemName = requiredItem.name
    const farmCounts: FarmCount[] = farmingMaps.map(({ name, itemDrop }) => ({
      name,
      count: itemDrop[itemName] ? Math.ceil(count / itemDrop[itemName]) : Infinity
    }))
    console.log(farmCounts)
    return farmCounts.reduce((a, b) => a.count < b.count ? a : b)
  })
}
