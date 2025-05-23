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
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/map" element={<MapBase />} />
          <Route path="/coaches" element={<Coaches />} />
          {/* <Route path="/chat" element={<Chatbot />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/coaches/:coachId" element={<CoachProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
        </Routes>
        <ChatbotWidget />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
