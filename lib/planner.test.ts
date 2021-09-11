import { FarmCount, FarmingStage, LackedItem } from './types'
import { planFarming } from './planner'

const ariesStage: FarmingStage = {
  name: 'Aries',
  cost: 10,
  itemDrops: [
    {
      name: 'alpha',
      probability: 0.5,
    },
  ],
}
const taurusStage: FarmingStage = {
  name: 'Taurus',
  cost: 10,
  itemDrops: [
    {
      name: 'beta',
      probability: 0.5,
    },
  ],
}
const geminiStage: FarmingStage = {
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

const maps: FarmingStage[] = [ariesStage, taurusStage, geminiStage]

describe('周回計画立案', () => {
  describe('計画立案', () => {
    it('必要アイテムがない場合は空の周回計画を返す', () => {
      const lackedItems: LackedItem[] = []
      const plan = planFarming(maps, lackedItems)
      const expected: FarmCount[] = []
      expect(plan).toEqual(expected)
    })

    it('アイテムが1つの場合は最高効率のマップを返す', () => {
      const lackedItems: LackedItem[] = [
        {
          name: 'alpha',
          count: 1,
        },
      ]

      const plan = planFarming(maps, lackedItems)
      const expected: FarmCount[] = [
        {
          farmingStage: ariesStage,
          count: 2,
        },
      ]
      expect(plan).toEqual(expected)
    })

    it('アイテムが2つ以上の場合は累計コストが最小の計画を立てる', () => {
      const lackedItems: LackedItem[] = [
        {
          name: 'alpha',
          count: 2,
        },
        {
          name: 'beta',
          count: 1,
        },
      ]

      const plan = planFarming(maps, lackedItems)
      const expected: FarmCount[] = [
        {
          farmingStage: geminiStage,
          count: 4,
        },
        {
          farmingStage: ariesStage,
          count: 2,
        },
      ]
      expect(plan).toEqual(expected)
    })

    it('要求数が0のアイテムは無視する', () => {
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

      const plan = planFarming(maps, lackedItems)
      const expected: FarmCount[] = [
        {
          farmingStage: ariesStage,
          count: 2,
        },
      ]
      expect(plan).toEqual(expected)
    })

    it('最小回数の周回であれば要求数をオーバーしてもよい', () => {
      const cancerStage: FarmingStage = {
        name: 'Cancer',
        cost: 1000,
        itemDrops: [
          {
            name: 'alpha',
            probability: 100,
          },
        ],
      }
      const lackedItems: LackedItem[] = [
        {
          name: 'alpha',
          count: 1,
        },
      ]
      const expected: FarmCount[] = [
        {
          farmingStage: cancerStage,
          count: 1,
        },
      ]

      const plan = planFarming([cancerStage], lackedItems)
      expect(plan).toEqual(expected)
    })

    it('周回でドロップしないアイテムが必要な場合Errorをthrowする', () => {
      const farmingStages = [ariesStage, taurusStage, geminiStage]
      const lackedItems: LackedItem[] = [
        {
          name: 'gamma',
          count: 100,
        },
      ]
      expect(() => planFarming(farmingStages, lackedItems)).toThrowError('周回では収集不可能')
    })
  })
})
