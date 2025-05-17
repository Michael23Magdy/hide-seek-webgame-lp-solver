import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import Layout from './Components/ui/Layout';
import { GameProvider } from './context/GameContext';
import Title from "./assets/title.png"

function App() {

  return (
    <GameProvider>
      <BrowserRouter>
        <Layout>
          <div className="text-center">
            {/* <img src={TomJerry} className="w-40 m-auto" alt="" /> */}
            <img src={Title} className="h-24 m-auto" alt="" />
            {/* <h1 className="text-5xl font-bold mb-4 animate-pulse text-gray-800">Hide & Seek Game</h1> */}
            <h2 className="text-lg font-medium mb-4 text-gray-600">A fun strategy game with game theory principles!</h2>
          </div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/game' element={<GamePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App
