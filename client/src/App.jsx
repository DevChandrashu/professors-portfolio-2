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
import AdminDashboard from './pages/AdminDashboard';
import AdminAbout from './pages/AdminAbout';
import AdminProjects from './pages/AdminProjects';
import AdminResearchPapers from './pages/AdminResearchPapers';
import AdminConferences from './pages/AdminConferences'
import AdminAchievements from './pages/AdminAchievements'
import AdminBlogPosts from './pages/AdminBlogPosts';
import AdminTeachingExperiences from './pages/AdminTeachingExperiences'
import AdminAwards from './pages/AdminAwards'
import AdminCollaborations from './pages/AdminCollaborations'

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
        <Route path="/:username/admin" element={<AdminDashboard />} />
        <Route path="/:username/admin/about" element={<AdminAbout />} />
        <Route path="/:username/admin/projects" element={<AdminProjects />} />
        <Route path="/:username/admin/research-papers" element={<AdminResearchPapers />} />
        <Route path="/:username/admin/conferences" element={<AdminConferences />} />
        <Route path="/:username/admin/achievements" element={<AdminAchievements />} />
        <Route path="/:username/admin/blog-posts" element={<AdminBlogPosts />} />
        <Route path="/:username/admin/teaching-experiences" element={<AdminTeachingExperiences />} />
        <Route path="/:username/admin/awards" element={<AdminAwards />} />
        <Route path="/:username/admin/collaborations" element={<AdminCollaborations />} />
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
