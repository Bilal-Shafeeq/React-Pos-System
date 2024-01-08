import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import POSPage from './pages/POSPage'
import "./style.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pos' element={<POSPage />} />
      </Routes>
    </Router>
  )
}

export default App