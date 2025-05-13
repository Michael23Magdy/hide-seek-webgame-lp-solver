import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import Layout from './Components/ui/Layout';
import { GameProvider } from './context/GameContext';


function App() {

  return (
    <GameProvider>
      <BrowserRouter>
        <Layout>
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
