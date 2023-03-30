import { useReducer, Reducer } from 'react'
import { CountState, CountAction } from '../types'

const reducer: Reducer<CountState, CountAction> = (state, action) => {
  const { type } = action
  const { count } = state
  switch (type) {
    case 'increment':
      return {
        ...state,
        count: count + 1
      }
    case 'decrement':
      return {
        ...state,
        count: count - 1
      }
    default:
      return state
  }
}

const initalValue = {
  count: 0
}

export const useCountReducer = () => {
  const [store, dispatch] = useReducer(reducer, initalValue)

  return {
    store,
    dispatch
  }
}
