import { calcMapFarmingEfficiencies, calcMaxItemFarmingEfficencies } from './farming-efficiency-calculator'
import { FarmCount, FarmingMap, RequiredItem } from './types'

export const planFarming = (farmingMaps: FarmingMap[], requiredItems: RequiredItem[]): FarmCount[] => {
  const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingMaps)

  const farmingPlan: FarmCount[] = []
  const remainRequiredItems = new Map<string, number>(requiredItems.filter(({ count }) => count).map(({ name, count }) => [name, count]))
  while (remainRequiredItems.size > 0) {
    // 現時点での最高効率マップを計算
    const newRequiredItems: RequiredItem[] = Array.from(remainRequiredItems.entries()).map(([name, count]) => ({
      name,
      count,
    }))
    const mapFarmingEfficiencies = calcMapFarmingEfficiencies(farmingMaps, newRequiredItems, maxItemFarmingEfficencies)
    const maxEfficientFarmingMap = mapFarmingEfficiencies.reduce((a, b) => (a.score >= b.score ? a : b)).farmingMap

    // どれか1つが要求数0になるまでの周回数を計算
    const farmingCounts = maxEfficientFarmingMap.itemDrops
      .map(({ name, probability }) => {
        const requiredCount = remainRequiredItems.get(name) || 0
        return Math.ceil(requiredCount / probability)
      })
      .filter((farmingCount) => farmingCount > 0)
    if (farmingCounts.length === 0) {
      throw new Error('周回では収集不可能')
    }
    const minFarmingCount = Math.min(...farmingCounts)
    farmingPlan.push({
      farmingMap: maxEfficientFarmingMap,
      count: minFarmingCount,
    })

    // 計算した周回数で出てくる分だけ必要アイテムを減らす
    maxEfficientFarmingMap.itemDrops.forEach(({ name, probability }) => {
      const requiredCount = remainRequiredItems.get(name)
      const remainRequiredCount = requiredCount ? requiredCount - Math.floor(minFarmingCount * probability) : 0
      if (remainRequiredCount <= 0) {
        remainRequiredItems.delete(name)
        return
      }
      remainRequiredItems.set(name, remainRequiredCount)
    })
  }

  return farmingPlan
}
