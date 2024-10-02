import { useState } from 'react';
import './index.css'; // Make sure you import Tailwind or any other styles here

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1 className="text-red-500">Vite + React</h1>
    </div>
  );
}

export default App;
