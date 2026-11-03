import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './paginas/Home'
import Catalogo from './paginas/Catalogo'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Catalogo" element={<Catalogo />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
