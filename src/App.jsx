import { useState } from 'react'
import './App.css'
import { MyRoutes } from './routes/routes'

function App() {
  const [count, setCount] = useState(0)
  return <MyRoutes />;
}

export default App
