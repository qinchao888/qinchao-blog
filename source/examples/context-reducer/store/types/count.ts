export interface CountState {
  count: number
}

export type CountAction = {
  type: 'increment'
} | {
  type: 'decrement'
}
