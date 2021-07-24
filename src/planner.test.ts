import { FarmingMap, RequiredItem, FarmingPlan } from './types'
import { planFarming } from './planner'

const maps: FarmingMap[] = [
  {
    name: 'Aries',
    cost: 10,
    itemDrops: {
      'alpha': 0.5,
    }
  },
  {
    name: 'Taurus',
    cost: 10,
    itemDrops: {
      'beta': 0.5,
    }
  },
  {
    name: 'Gemini',
    cost: 8,
    itemDrops: {
      'alpha': 0.25,
      'beta': 0.25
    }
  }
]

describe('周回計画ツール', () => {
  it('アイテムが1つの場合は最高効率のマップを返す', () => {
    const requiredItems: RequiredItem[] = [{
      name: 'alpha',
      count: 1,
    }]

    const plan = planFarming(maps, requiredItems)
    const expected: FarmingPlan = [{
      name: 'Aries',
      count: 2
    }]
    expect(plan).toMatchObject(expected)
  })

  it('アイテムが2つ以上の場合は累計コストが最小の計画を立てる', () => {
    const requiredItems: RequiredItem[] = [
      {
        name: 'alpha',
        count: 1,
      },
      {
        name: 'beta',
        count: 1,
      }
    ]

    const plan = planFarming(maps, requiredItems)
    const expected: FarmingPlan = [{
      name: 'Gemini',
      count: 4
    }]
    expect(plan).toMatchObject(expected)
  })
})
