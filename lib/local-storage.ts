import { loadFarmingData } from './load-farming-data'
import { FarmingData, RequiredItem } from './types'

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

export const saveRequiredItemsToLocalStorage = (name: string, requiredItems: RequiredItem[]): void => {
  localStorage.setItem(`${name}-requiredItems`, JSON.stringify(requiredItems))
}

export const loadRequiredItemsFromLocalStorage = (name: string): RequiredItem[] | null => {
  const requiredItemsStr = localStorage.getItem(`${name}-requiredItems`)
  if (!requiredItemsStr) {
    return null
  }

  try {
    const requiredItemsJson = JSON.parse(requiredItemsStr) as RequiredItem[]
    return requiredItemsJson.map(({ name, storedCount, requiredCount }) => ({
      name,
      storedCount,
      requiredCount
    }))
  } catch (e) {
    console.error(e)
    return null
  }
}
