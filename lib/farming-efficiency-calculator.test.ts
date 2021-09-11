import { calcStageFarmingEfficiencies, calcMaxItemFarmingEfficencies } from './farming-efficiency-calculator'
import { ItemFarmingEfficiency, FarmingStage, StageFarmingEfficiency, LackedItem } from './types'

const ariesStage: FarmingStage = {
  name: 'Aries',
  cost: 10,
  itemDrops: [
    {
      name: 'alpha',
      probability: 1,
    },
  ],
}
const taurusStage: FarmingStage = {
  name: 'Taurus',
  cost: 10,
  itemDrops: [
    {
      name: 'beta',
      probability: 1,
    },
  ],
}
const geminiStage: FarmingStage = {
  name: 'Gemini',
  cost: 8,
  itemDrops: [
    {
      name: 'alpha',
      probability: 0.5,
    },
    {
      name: 'beta',
      probability: 0.5,
    },
  ],
}

describe('周回効率計算', () => {
  describe('アイテムごとの最高効率計算', () => {
    it('各アイテムごとの最高効率マップが返る', () => {
      const farmingStages = [ariesStage, taurusStage, geminiStage]
      const expectedMaxItemFarmingEfficiencies: ItemFarmingEfficiency[] = [
        {
          name: 'alpha',
          farmingStage: ariesStage,
          cost: 10,
        },
        {
          name: 'beta',
          farmingStage: taurusStage,
          cost: 10,
        },
      ]
      const maxItemFarmingEfficiencies = calcMaxItemFarmingEfficencies(farmingStages)
      const maxItemFarmingEfficienciesAsArray = Array.from(maxItemFarmingEfficiencies.values()).sort((a, b) =>
        a.name.localeCompare(b.name),
      )
      expect(maxItemFarmingEfficienciesAsArray).toEqual(expectedMaxItemFarmingEfficiencies)
    })
  })

  describe('マップごとの効率計算', () => {
    it('各アイテムの最高効率に基づいた各マップごとのスタミナ効率が返る', () => {
      const farmingStages = [ariesStage, taurusStage, geminiStage]
      const lackedItems: LackedItem[] = [
        {
          name: 'alpha',
          count: 1,
        },
        {
          name: 'beta',
          count: 1,
        },
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingStages)
      const expectedStageFarmingEfficiencies: StageFarmingEfficiency[] = [
        {
          farmingStage: ariesStage,
          score: 1,
        },
        {
          farmingStage: taurusStage,
          score: 1,
        },
        {
          farmingStage: geminiStage,
          score: 1.25,
        },
      ]
      const stageFarmingEfficiencies = calcStageFarmingEfficiencies(
        farmingStages,
        lackedItems,
        maxItemFarmingEfficencies,
      )
      expect(stageFarmingEfficiencies).toEqual(expectedStageFarmingEfficiencies)
    })

    it('要求外のドロップはマップ効率の計算に含まれない', () => {
      const farmingStages = [ariesStage, taurusStage, geminiStage]
      const lackedItems: LackedItem[] = [
        {
          name: 'alpha',
          count: 1,
        },
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingStages)
      const expectedStageFarmingEfficiencies: StageFarmingEfficiency[] = [
        {
          farmingStage: ariesStage,
          score: 1,
        },
        {
          farmingStage: taurusStage,
          score: 0,
        },
        {
          farmingStage: geminiStage,
          score: 0.625,
        },
      ]
      const stageFarmingEfficiencies = calcStageFarmingEfficiencies(
        farmingStages,
        lackedItems,
        maxItemFarmingEfficencies,
      )
      expect(stageFarmingEfficiencies).toEqual(expectedStageFarmingEfficiencies)
    })

    it('要求数が0のアイテムはマップ効率の計算に含まれない', () => {
      const farmingStages = [ariesStage, taurusStage, geminiStage]
      const lackedItems: LackedItem[] = [
        {
          name: 'alpha',
          count: 1,
        },
        {
          name: 'beta',
          count: 0,
        },
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingStages)
      const expectedStageFarmingEfficiencies: StageFarmingEfficiency[] = [
        {
          farmingStage: ariesStage,
          score: 1,
        },
        {
          farmingStage: taurusStage,
          score: 0,
        },
        {
          farmingStage: geminiStage,
          score: 0.625,
        },
      ]
      const stageFarmingEfficiencies = calcStageFarmingEfficiencies(
        farmingStages,
        lackedItems,
        maxItemFarmingEfficencies,
      )
      expect(stageFarmingEfficiencies).toEqual(expectedStageFarmingEfficiencies)
    })
  })
})
