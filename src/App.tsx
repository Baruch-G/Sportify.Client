import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import Calendar from './pages/calendar/Calendar'
import MapBase from './map/MapBase'
import StepperSignIn from './components/Register'
import EventDetails from './components/EventData'
import Home from './pages/Home'
import { ThemeProvider } from '@emotion/react'
import theme from './theme/Theme'
import AddEvent from './components/AddEvent'
import Chatbot from './components/ChatBot'
import ChatbotWidget from './components/ChatbotWidget'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<MapBase />} />
        <Route path="/coaches" element={<div >coaches</div>} />
        {/* <Route path="/chat" element={<Chatbot />} /> */}
        <Route path="/register" element={<StepperSignIn />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/add-event" element={<AddEvent />} />
      </Routes>
      <ChatbotWidget />
    </ThemeProvider>
  )
}

export default App
