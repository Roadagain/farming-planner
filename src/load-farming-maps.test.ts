import { loadFarmingMapsFromJson } from './load-farming-maps'

describe('周回候補マップの読み込み', () => {
  describe('jsonを読み込んでDTOに加工', () => {
    it('jsonからマップデータを読み込んでDTOに加工できる', async () => {
      const expectedFarmingMaps = [
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
          name: 'Aries',
          cost: 30,
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
      const farmingMaps = await loadFarmingMapsFromJson('sample/farming-maps.json')
      expect(farmingMaps).toMatchObject(expectedFarmingMaps)
    })

    it('存在しないファイルを指定するとErrorをthrowする', () => {
      const filename = 'not-existed-file.json'
      expect(loadFarmingMapsFromJson(filename)).rejects.toThrowError()
    })
  })
})
