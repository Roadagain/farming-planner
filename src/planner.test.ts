import { FarmingMap, RequiredItem, FarmingPlan } from './types'
import { planFarming } from './planner'

const ariesMap = {
  name: 'Aries',
  cost: 10,
  itemDrops: {
    'alpha': 0.5,
  }
}
const taurusMap = {
  name: 'Taurus',
  cost: 10,
  itemDrops: {
    'beta': 0.5,
  }
}
const geminiMap = {
  name: 'Gemini',
  cost: 8,
  itemDrops: {
    'alpha': 0.25,
    'beta': 0.25
  }
}

const maps: FarmingMap[] = [ariesMap, taurusMap, geminiMap]

describe('周回計画ツール', () => {
  it('必要アイテムがない場合は空の周回計画を返す', () => {
    const requiredItems: RequiredItem[] = []
    const plan = planFarming(maps, requiredItems)
    const expected: FarmingPlan = []
    expect(plan).toMatchObject(expected)
  })

  it('アイテムが1つの場合は最高効率のマップを返す', () => {
    const requiredItems: RequiredItem[] = [{
      name: 'alpha',
      count: 1,
    }]

    const plan = planFarming(maps, requiredItems)
    const expected: FarmingPlan = [{
      farmingMap: ariesMap,
      count: 2
    }]
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
      }
    ]

    const plan = planFarming(maps, requiredItems)
    const expected: FarmingPlan = [
      {
        farmingMap: geminiMap,
        count: 4
      },
      {
        farmingMap: ariesMap,
        count: 2,
      }
    ]
    expect(plan).toMatchObject(expected)
  })
})
