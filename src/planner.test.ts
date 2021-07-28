import { FarmCount, FarmingMap, RequiredItem } from './types'
import { planFarming } from './planner'

const ariesMap: FarmingMap = {
  name: 'Aries',
  cost: 10,
  itemDrops: [
    {
      name: 'alpha',
      probability: 0.5,
    },
  ],
}
const taurusMap: FarmingMap = {
  name: 'Taurus',
  cost: 10,
  itemDrops: [
    {
      name: 'beta',
      probability: 0.5,
    },
  ],
}
const geminiMap: FarmingMap = {
  name: 'Gemini',
  cost: 8,
  itemDrops: [
    {
      name: 'alpha',
      probability: 0.25,
    },
    {
      name: 'beta',
      probability: 0.25,
    },
  ],
}

const maps: FarmingMap[] = [ariesMap, taurusMap, geminiMap]

describe('周回計画立案', () => {
  describe('計画立案', () => {
    it('必要アイテムがない場合は空の周回計画を返す', () => {
      const requiredItems: RequiredItem[] = []
      const plan = planFarming(maps, requiredItems)
      const expected: FarmCount[] = []
      expect(plan).toMatchObject(expected)
    })

    it('アイテムが1つの場合は最高効率のマップを返す', () => {
      const requiredItems: RequiredItem[] = [
        {
          name: 'alpha',
          count: 1,
        },
      ]

      const plan = planFarming(maps, requiredItems)
      const expected: FarmCount[] = [
        {
          farmingMap: ariesMap,
          count: 2,
        },
      ]
      expect(plan).toMatchObject(expected)
    })

    it('アイテムが2つ以上の場合は累計コストが最小の計画を立てる', () => {
      const requiredItems: RequiredItem[] = [
        {
          name: 'alpha',
          count: 2,
        },
        {
          name: 'beta',
          count: 1,
        },
      ]

      const plan = planFarming(maps, requiredItems)
      const expected: FarmCount[] = [
        {
          farmingMap: geminiMap,
          count: 4,
        },
        {
          farmingMap: ariesMap,
          count: 2,
        },
      ]
      expect(plan).toMatchObject(expected)
    })

    it('周回でドロップしないアイテムが必要な場合Errorをthrowする', () => {
      const farmingMaps = [ariesMap, taurusMap, geminiMap]
      const requiredItems: RequiredItem[] = [
        {
          name: 'gamma',
          count: 100,
        },
      ]
      expect(() => planFarming(farmingMaps, requiredItems)).toThrowError('周回では収集不可能')
    })
  })
})
