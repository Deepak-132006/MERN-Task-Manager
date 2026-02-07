import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {Routes, Route} from 'react-router-dom'


const App = () => {

  return (
    <div>
      <Routes>
        {/* <Route path="/" element={</>}/> */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App