import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './style.css'

import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import SavedJobs from './pages/SavedJobs.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import JobTracker from './pages/JobTracker.jsx'
import ResumeAnalyzer from './pages/ResumeAnalyzer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tracker" element={<JobTracker />} />
          <Route path="/analyzer" element={<ResumeAnalyzer />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)