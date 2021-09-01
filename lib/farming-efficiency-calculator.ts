import { ItemFarmingEfficiency, FarmingStage, RequiredItem, StageFarmingEfficiency } from './types'

export const calcMaxItemFarmingEfficencies = (farmingStages: FarmingStage[]): Map<string, ItemFarmingEfficiency> => {
  const maxEfficencies: Map<string, ItemFarmingEfficiency> = new Map()
  farmingStages.forEach((farmingStage) => {
    const { itemDrops, cost } = farmingStage
    itemDrops.forEach(({ name, probability }) => {
      const mostEfficientStageCost = maxEfficencies.get(name)?.cost || Infinity
      const currentEfficiencyCost = cost / probability
      if (currentEfficiencyCost < mostEfficientStageCost) {
        maxEfficencies.set(name, {
          name,
          farmingStage,
          cost: currentEfficiencyCost,
        })
      }
    })
  })

  return maxEfficencies
}

export const calcStageFarmingEfficiencies = (
  farmingStages: FarmingStage[],
  requiredItems: RequiredItem[],
  maxItemFarmingEfficiencies: Map<string, ItemFarmingEfficiency>,
): StageFarmingEfficiency[] => {
  const requiredItemNames = requiredItems.filter(({ count }) => count).map(({ name }) => name)
  return farmingStages.map((farmingStage) => {
    const { cost, itemDrops } = farmingStage
    const itemEfficiencyCosts = itemDrops.map(({ name, probability }) => {
      if (!requiredItemNames.includes(name)) {
        return 0
      }
      const maxEfficientCost = maxItemFarmingEfficiencies.get(name)?.cost || 0
      return maxEfficientCost * probability
    })
    const score = itemEfficiencyCosts.reduce((a, b) => a + b) / cost

    return {
      farmingStage,
      score,
    }
  })
}
