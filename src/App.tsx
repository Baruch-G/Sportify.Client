import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import MapBase from './map/MapBase'
import StepperSignIn from './components/Register'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/calendar" element={<div />} />
        <Route path="/map" element={<MapBase />} />
        <Route path="/coaches" element={<div >coaches</div>} />
        <Route path="/register" element={<StepperSignIn />} />

      </Routes>
    </>
  )
}

export default App
