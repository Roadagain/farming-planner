import { loadFarmingData } from './load-farming-data'
import { FarmingData } from './types'

const LAST_LOADED_DATA = 'LAST_LOADED_DATA'

export const loadFarmingDataFromLocalStorage = (): FarmingData | null => {
  const lastLoadedDataStr = localStorage.getItem(LAST_LOADED_DATA)
  if (!lastLoadedDataStr) {
    return null
  }

  try {
    return loadFarmingData(JSON.parse(lastLoadedDataStr))
  } catch (e) {
    console.error(e)
    return null
  }
}

export const saveFarmingDataToLocalStorage = (farmingData: FarmingData): void => {
  localStorage.setItem(LAST_LOADED_DATA, JSON.stringify(farmingData))
}
