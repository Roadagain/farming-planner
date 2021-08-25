export type ItemDrop = {
  name: string
  probability: number
}

export type FarmingStage = {
  name: string
  cost: number
  itemDrops: ItemDrop[]
}
