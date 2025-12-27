import { useState } from 'react'
import List from './components/key'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Count:{count}</h1>
      <button onClick={()=>setCount(count-1)}>Decrement</button>
      <button onClick={()=>(setCount(count+1))}>Increment</button>
      <List/>


    </>
  )
}

export default App
