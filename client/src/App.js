import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import SignUp from './components/pages/SignUp'
import Election from './components/pages/Election'
import AuthState from './context/auth/AuthState'
import Poll from './components/pages/Poll'

const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/election' element={<Election />} />
          <Route exact path='/poll' element={<Poll />} />
        </Routes>
      </BrowserRouter>
    </AuthState>
  )
}

export default App
