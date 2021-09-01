import { calcStageFarmingEfficiencies, calcMaxItemFarmingEfficencies } from './farming-efficiency-calculator'
import { FarmCount, FarmingStage, RequiredItem } from './types'

export const planFarming = (farmingStages: FarmingStage[], requiredItems: RequiredItem[]): FarmCount[] => {
  const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingStages)

  const farmingPlan: FarmCount[] = []
  const remainRequiredItems = new Map<string, number>(
    requiredItems.filter(({ count }) => count).map(({ name, count }) => [name, count]),
  )
  while (remainRequiredItems.size > 0) {
    // 現時点での最高効率マップを計算
    const newRequiredItems: RequiredItem[] = Array.from(remainRequiredItems.entries()).map(([name, count]) => ({
      name,
      count,
    }))
    const stageFarmingEfficiencies = calcStageFarmingEfficiencies(
      farmingStages,
      newRequiredItems,
      maxItemFarmingEfficencies,
    )
    const maxEfficientFarmingStage = stageFarmingEfficiencies.reduce((a, b) =>
      a.score >= b.score ? a : b,
    ).farmingStage

    // どれか1つが要求数0になるまでの周回数を計算
    const farmingCounts = maxEfficientFarmingStage.itemDrops
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
      farmingStage: maxEfficientFarmingStage,
      count: minFarmingCount,
    })

    // 計算した周回数で出てくる分だけ必要アイテムを減らす
    maxEfficientFarmingStage.itemDrops.forEach(({ name, probability }) => {
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
