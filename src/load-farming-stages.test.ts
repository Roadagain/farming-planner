import { readFile } from 'fs/promises'
import { loadFarmingStagesFromJson } from './load-farming-stages'

describe('周回候補マップの読み込み', () => {
  describe('JSON文字列を読み込んでDTOに加工', () => {
    it('JSON文字列からマップデータを読み込んでDTOに加工できる', async () => {
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
      const jsonString = await readFile('sample/farming-stages.json', 'utf-8')
      const farmingStages = await loadFarmingStagesFromJson(jsonString)
      expect(farmingStages).toMatchObject(expectedFarmingStages)
    })

    it('不適当なJSON文字列を渡すとErrorをthrowする', () => {
      const invalidJsonString = '{"test": "invalid json"}'
      expect(loadFarmingStagesFromJson(invalidJsonString)).rejects.toThrowError()
    })
  })
})