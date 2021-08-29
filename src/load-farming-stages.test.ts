import { loadDropItemNames, loadFarmingStages, loadFarmingStagesFromJson } from './load-farming-stages'
import { FarmingStage } from './types'
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
              unnecessaryProperty: "abcde",
            }
          ]
        },
      ]
      const expectedFarmingStages = [ariesStage]
      const farmingStages = loadFarmingStages(loadedFarmingStages)
      expect(farmingStages).toMatchObject(expectedFarmingStages)
    })
  })

  describe('JSON文字列を読み込んでDTOに加工', () => {
    it('JSON文字列からマップデータを読み込んでDTOに加工できる', () => {
      const expectedFarmingStages = [
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
      ]
      const farmingStages = loadFarmingStagesFromJson(JSON.stringify(sampleFarmingStages))
      expect(farmingStages).toMatchObject(expectedFarmingStages)
    })
  })

  describe('ステージデータからドロップアイテムの一覧を生成', () => {
    it('ステージデータからドロップアイテムを読み込んで重複のない一覧を生成できる', () => {
      const farmingStages = loadFarmingStages(sampleFarmingStages.farmingStages)
      const expectedDropItemNames = ['alpha', 'beta']

      const dropItemNames = loadDropItemNames(farmingStages)
      expect(dropItemNames).toMatchObject(expectedDropItemNames)
    })
  })
})
