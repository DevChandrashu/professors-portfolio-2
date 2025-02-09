// src/pages/AdminDashboard.jsx

import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { username } = useParams();
  const { authState } = useAuth();

  // If still loading, show a loading indicator
  if (authState.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const sections = [
    { title: 'About', description: 'Edit your personal info and contact details.', path: 'about' },
    { title: 'Projects', description: 'Manage your projects – add, update, or delete projects.', path: 'projects' },
    { title: 'Research Papers', description: 'Manage your research publications.', path: 'research-papers' },
    { title: 'Conferences', description: 'Manage your conference participations.', path: 'conferences' },
    { title: 'Achievements', description: 'Edit your achievements and accolades.', path: 'achievements' },
    { title: 'Blog Posts', description: 'Write, edit, and remove your blog posts.', path: 'blog-posts' },
    { title: 'Teaching Experiences', description: 'Manage your teaching and course information.', path: 'teaching-experiences' },
    { title: 'Awards', description: 'Add or update awards you have received.', path: 'awards' },
    { title: 'Collaborations', description: 'Manage your research or project collaborations.', path: 'collaborations' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={`/${username}/admin/${section.path}`}
              className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
