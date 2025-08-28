import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'

const App: React.FC = () => {
  return (
    <Router basename="/pokemon-react-app">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  )
}

export default App
