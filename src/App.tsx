import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Events from './pages/Events'
import Calendar from './pages/calendar/Calendar'
import MapBase from './map/MapBase'
import Register from './components/Register'
import EventDetails from './components/EventData'
import Home from './pages/Home'
import { ThemeProvider } from '@emotion/react'
import theme from './theme/Theme'
import AddEvent from './components/AddEvent'
import ChatbotWidget from './components/ChatbotWidget'
import CoachProfile from './components/CoachProfile'
import Coaches from './components/Coaches'
import SignIn from './components/SignIn'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/map" element={<MapBase />} />
        <Route path="/coaches" element={<Coaches/>} />
        {/* <Route path="/chat" element={<Chatbot />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn  />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/coaches/:coachId" element={<CoachProfile />} />
      </Routes>
      <ChatbotWidget />
    </ThemeProvider>
  )
}

export default App
