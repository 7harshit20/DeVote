import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import SignUp from './components/pages/SignUp'
import Elections from './components/routes/Elections/Elections'
import AuthState from './context/auth/AuthState'
import ElectionState from './context/election/ElectionState'
import ElectionForm from './components/routes/Elections/ElectionForm'
import GetElection from './components/routes/Elections/GetElection'
import Poll from './components/routes/Poll/Poll'
import CandidateDetail from './components/routes/Elections/Election/CandidateDetail'
import Vote from './components/routes/Elections/Election/Vote'
import Election from './components/routes/Elections/Election/Election'

const App = () => {
  return (
    <AuthState>
      <ElectionState>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/signup' element={<SignUp />} />

            <Route path='election' element={<Elections />}>
              <Route path='new' element={<ElectionForm />} />
              <Route index element={<GetElection />} />
              <Route path={':address'} element={<Election />} >
                <Route index element={<CandidateDetail />} />
                <Route path='vote' element={<Vote />} />
              </Route>
            </Route>

            <Route exact path='/poll' element={<Poll />} />


          </Routes>
        </BrowserRouter>
      </ElectionState>
    </AuthState >
  )
}

export default App
