import { useContext } from 'react'
import { Context, ContextType } from '../context'

export const useCount = () => {
  const {
    countStore,
  } = useContext(Context) as ContextType

  const { store, dispatch } = countStore
  const { count } = store

  return {
    count,
    increment: () => dispatch({ type: 'increment'}),
    decrement: () => dispatch({ type: 'decrement'}),
  }
}
