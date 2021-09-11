export type RequiredItem = {
  name: string
  storedCount: number
  requiredCount: number
}

export type LackedItem = {
  name: string
  count: number
}
