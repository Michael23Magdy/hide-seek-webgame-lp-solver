import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-3xl font-bold text-blue-600 bg-amber-900">
      Hello Tailwind!
    </div>
  );
}

export default App
