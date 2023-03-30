import { FC, ReactNode } from 'react'
import { Context } from './context'
import { useCountReducer } from './reducer/count'

interface ProviderProps {
  children?: ReactNode
}

export const StoreProvider: FC<ProviderProps> = (props) => {
  const { children } = props

  const stores = {
    countStore: useCountReducer(),
  }

  return <Context.Provider value={stores}>{children}</Context.Provider>
}

