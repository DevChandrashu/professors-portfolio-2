import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Portfolio from './pages/Portfolio'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/logout" element = {<Logout/>} />
          <Route path="/:username" element = {<Portfolio/>} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
