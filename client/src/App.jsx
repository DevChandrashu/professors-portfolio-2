// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Portfolio from './pages/Portfolio';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import './App.css';

// This component wraps your routes and conditionally renders the NavBar
function AppRoutes() {
  const location = useLocation();
  // Don't show the NavBar on the home page ("/")
  const showNavbar = location.pathname !== '/';
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/:username" element={<Portfolio />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
