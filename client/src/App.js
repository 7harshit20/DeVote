import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import SignUp from './components/pages/SignUp'
import Election from './components/pages/Election'
import AuthState from './context/auth/AuthState'
import Poll from './components/pages/Poll'
import ElectionState from './context/election/ElectionState'
import ElectionForm from './components/layouts/ElectionForm'

const App = () => {
  return (
    <AuthState>
      <ElectionState>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/election' element={<Election />} />
            <Route exact path='/poll' element={<Poll />} />
            <Route exact path='/election/new' element={<ElectionForm />} />
          </Routes>
        </BrowserRouter>
      </ElectionState>
    </AuthState>
  )
}

export default App
