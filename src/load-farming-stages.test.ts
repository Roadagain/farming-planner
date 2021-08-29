import { loadItems, loadFarmingStages, loadFarmingDataFromJson } from './load-farming-stages'
import { FarmingData, FarmingStage } from './types'
import sampleFarmingStages from '../sample/farming-stages.json'

describe('周回候補マップの読み込み', () => {
  describe('objectの配列を受け取ってDTOに加工', () => {
    it('objectからステージデータに必要な情報だけ抜き出してDTOに加工できる', () => {
      const ariesStage: FarmingStage = {
        name: 'Aries',
        cost: 20,
        itemDrops: [
          {
            name: 'alpha',
            probability: 1.5,
          },
        ],
      }
      const loadedFarmingStages = [
        {
          ...ariesStage,
          unnecessaryProperty: 10,
          itemDrops: [
            {
              ...ariesStage.itemDrops[0],
              unnecessaryProperty: 'abcde',
            },
          ],
        },
      ]
      const expectedFarmingStages = [ariesStage]
      const farmingStages = loadFarmingStages(loadedFarmingStages)
      expect(farmingStages).toMatchObject(expectedFarmingStages)
    })
  })

  describe('objectからアイテムの一覧を生成', () => {
    it('objectからアイテムを読み込んで重複のない一覧を生成できる', () => {
      const expectedDropItems = [
        {
          id: 1,
          name: 'alpha',
        },
        {
          id: 2,
          name: 'beta',
        },
      ]

      const dropItems = loadItems(sampleFarmingStages.items)
      expect(dropItems).toMatchObject(expectedDropItems)
    })

    it('ドロップアイテムの一覧はID順にソートされている', () => {
      const alphaItem = {
        id: 2,
        name: 'alpha',
      }
      const betaItem = {
        id: 1,
        name: 'beta',
      }
      const dropItemNameData = [alphaItem, betaItem]
      const expectedDropItems = [betaItem, alphaItem]

      const dropItems = loadItems(dropItemNameData)
      expect(dropItems).toMatchObject(expectedDropItems)
    })
  })

  describe('JSON文字列を読み込んでDTOに加工', () => {
    it('JSON文字列からマップデータを読み込んでDTOに加工できる', () => {
      const expectedFarmingData: FarmingData = {
        farmingStages: [
          {
            name: 'Aries',
            cost: 20,
            itemDrops: [
              {
                name: 'alpha',
                probability: 1.5,
              },
            ],
          },
          {
            name: 'Taurus',
            cost: 20,
            itemDrops: [
              {
                name: 'beta',
                probability: 1.2,
              },
            ],
          },
          {
            name: 'Gemini',
            cost: 20,
            itemDrops: [
              {
                name: 'alpha',
                probability: 0.8,
              },
              {
                name: 'beta',
                probability: 0.8,
              },
            ],
          },
        ],
        items: [
          {
            id: 1,
            name: 'alpha',
          },
          {
            id: 2,
            name: 'beta',
          },
        ],
      }
      const farmingData = loadFarmingDataFromJson(JSON.stringify(sampleFarmingStages))
      expect(farmingData).toMatchObject(expectedFarmingData)
    })
  })
})
