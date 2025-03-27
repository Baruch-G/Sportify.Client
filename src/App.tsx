import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Events from './pages/Events'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/calendar" element={<div />} />
        <Route path="/map" element={<div />} />
        <Route path="/coaches" element={<div />} />
      </Routes>
    </>
  )
}

export default App
