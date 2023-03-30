import React from 'react';
import { StoreProvider } from './store/StoreProvider'
import { useCount } from './store/hooks'

const Child = () => {
  const { count, increment, decrement } = useCount()

  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}

function App() {
  return (
    <StoreProvider>
      <div>
        <Child />
      </div>
    </StoreProvider>
  );
}

export default App;
