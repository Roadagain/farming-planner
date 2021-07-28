export type ItemDrop = {
  name: string
  probability: number
}

export type FarmingMap = {
  name: string
  cost: number
  itemDrops: ItemDrop[]
}
