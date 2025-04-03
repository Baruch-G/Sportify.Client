import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import MapBase from './map/MapBase'
import StepperSignIn from './components/Register'
import EventDetails from './components/EventData'
import Home from './pages/Home'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<div />} />
        <Route path="/map" element={<MapBase />} />
        <Route path="/coaches" element={<div >coaches</div>} />
        <Route path="/register" element={<StepperSignIn />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
      </Routes>
    </>
  )
}

export default App
