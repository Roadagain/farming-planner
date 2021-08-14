import { calcMapFarmingEfficiencies, calcMaxItemFarmingEfficencies } from './farming-efficiency-calculator'
import { ItemFarmingEfficiency, FarmingMap, MapFarmingEfficiency } from './types'

const ariesMap: FarmingMap = {
  name: 'Aries',
  cost: 10,
  itemDrops: [
    {
      name: 'alpha',
      probability: 1,
    },
  ],
}
const taurusMap: FarmingMap = {
  name: 'Taurus',
  cost: 10,
  itemDrops: [
    {
      name: 'beta',
      probability: 1,
    },
  ],
}
const geminiMap: FarmingMap = {
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
      const farmingMaps = [ariesMap, taurusMap, geminiMap]
      const expectedMaxItemFarmingEfficiencies: ItemFarmingEfficiency[] = [
        {
          name: 'alpha',
          farmingMap: ariesMap,
          cost: 10,
        },
        {
          name: 'beta',
          farmingMap: taurusMap,
          cost: 10,
        },
      ]
      const maxItemFarmingEfficiencies = calcMaxItemFarmingEfficencies(farmingMaps)
      const maxItemFarmingEfficienciesAsArray = Array.from(maxItemFarmingEfficiencies.values()).sort((a, b) =>
        a.name.localeCompare(b.name),
      )
      expect(maxItemFarmingEfficienciesAsArray).toMatchObject(expectedMaxItemFarmingEfficiencies)
    })
  })

  describe('マップごとの効率計算', () => {
    it('各アイテムの最高効率に基づいた各マップごとのスタミナ効率が返る', () => {
      const farmingMaps = [ariesMap, taurusMap, geminiMap]
      const requiredItems = [
        {
          name: 'alpha',
          count: 1,
        },
        {
          name: 'beta',
          count: 1,
        },
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingMaps)
      const expectedMapFarmingEfficiencies: MapFarmingEfficiency[] = [
        {
          farmingMap: ariesMap,
          score: 1,
        },
        {
          farmingMap: taurusMap,
          score: 1,
        },
        {
          farmingMap: geminiMap,
          score: 1.25,
        },
      ]
      const mapFarmingEfficiencies = calcMapFarmingEfficiencies(farmingMaps, requiredItems, maxItemFarmingEfficencies)
      expect(mapFarmingEfficiencies).toMatchObject(expectedMapFarmingEfficiencies)
    })

    it('要求外のドロップはマップ効率の計算に含まれない', () => {
      const farmingMaps = [ariesMap, taurusMap, geminiMap]
      const requiredItems = [
        {
          name: 'alpha',
          count: 1,
        },
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingMaps)
      const expectedMapFarmingEfficiencies: MapFarmingEfficiency[] = [
        {
          farmingMap: ariesMap,
          score: 1,
        },
        {
          farmingMap: taurusMap,
          score: 0,
        },
        {
          farmingMap: geminiMap,
          score: 0.625,
        },
      ]
      const mapFarmingEfficiencies = calcMapFarmingEfficiencies(farmingMaps, requiredItems, maxItemFarmingEfficencies)
      expect(mapFarmingEfficiencies).toMatchObject(expectedMapFarmingEfficiencies)
    })

    it('要求数が0のアイテムはマップ効率の計算に含まれない', () => {
      const farmingMaps = [ariesMap, taurusMap, geminiMap]
      const requiredItems = [
        {
          name: 'alpha',
          count: 1,
        },
        {
          name: 'beta',
          count: 0,
        }
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingMaps)
      const expectedMapFarmingEfficiencies: MapFarmingEfficiency[] = [
        {
          farmingMap: ariesMap,
          score: 1,
        },
        {
          farmingMap: taurusMap,
          score: 0,
        },
        {
          farmingMap: geminiMap,
          score: 0.625,
        },
      ]
      const mapFarmingEfficiencies = calcMapFarmingEfficiencies(farmingMaps, requiredItems, maxItemFarmingEfficencies)
      expect(mapFarmingEfficiencies).toMatchObject(expectedMapFarmingEfficiencies)
    })
  })
})
