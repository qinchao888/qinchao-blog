import { createContext } from 'react'
import { useCountReducer } from './reducer/count'

export interface ContextType {
  countStore: ReturnType<typeof useCountReducer>
}

export const Context = createContext<ContextType | null>(null)
