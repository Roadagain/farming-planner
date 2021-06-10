export type FarmingMap = {
  name: string
  cost: number
  itemDrop: {
    [K: string]: number
  }
}

export type Efficency = {
  farmingMap: FarmingMap
  cost: number
}
