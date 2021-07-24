import { calcMapFarmingEfficiencies, calcMaxItemFarmingEfficencies } from "./farming-efficiency-calculator"
import { ItemFarmingEfficiency, FarmingMap, RequiredItem, MapFarmingEfficiency } from "./types"

const ariesMap: FarmingMap = {
  name: 'Aries',
  cost: 10,
  itemDrops: {
    'alpha': 1,
  }
}
const taurusMap: FarmingMap = {
  name: 'Taurus',
  cost: 10,
  itemDrops: {
    'beta': 1,
  }
}
const geminiMap: FarmingMap = {
  name: 'Gemini',
  cost: 10,
  itemDrops: {
    'alpha': 0.8,
    'beta': 0.8,
  }
}

describe('周回効率計算', () => {
  describe('アイテムごとの最高効率計算', () => {
    it('各アイテムごとの最高効率マップが返る', () => {
      const farmingMaps = [ariesMap, taurusMap, geminiMap]
      const expectedMaxItemFarmingEfficiencies: ItemFarmingEfficiency[] = [
        {
          name: 'alpha',
          farmingMap: ariesMap,
          cost: 10
        },
        {
          name: 'beta',
          farmingMap: taurusMap,
          cost: 10,
        }
      ]
      const maxItemFarmingEfficiencies = calcMaxItemFarmingEfficencies(farmingMaps)
      const maxItemFarmingEfficienciesAsArray = Array.from(maxItemFarmingEfficiencies.values()).sort((a, b) => a.name.localeCompare(b.name))
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
        }
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingMaps)
      const expectedMapFarmingEfficiencies: MapFarmingEfficiency[] = [
        {
          farmingMap: ariesMap,
          score: 10
        },
        {
          farmingMap: taurusMap,
          score: 10
        },
        {
          farmingMap: geminiMap,
          score: 16
        }
      ]
      const mapFarmingEfficiencies = calcMapFarmingEfficiencies(farmingMaps, requiredItems, maxItemFarmingEfficencies)
      expect(mapFarmingEfficiencies).toMatchObject(expectedMapFarmingEfficiencies)
    })

    it('不要なアイテムはマップ効率の計算に含まれない', () => {
      const farmingMaps = [ariesMap, taurusMap, geminiMap]
      const requiredItems = [
        {
          name: 'alpha',
          count: 1,
        }
      ]
      const maxItemFarmingEfficencies = calcMaxItemFarmingEfficencies(farmingMaps)
      const expectedMapFarmingEfficiencies: MapFarmingEfficiency[] = [
        {
          farmingMap: ariesMap,
          score: 10
        },
        {
          farmingMap: taurusMap,
          score: 0
        },
        {
          farmingMap: geminiMap,
          score: 8
        }
      ]
      const mapFarmingEfficiencies = calcMapFarmingEfficiencies(farmingMaps, requiredItems, maxItemFarmingEfficencies)
      expect(mapFarmingEfficiencies).toMatchObject(expectedMapFarmingEfficiencies)
    })
  })
})
