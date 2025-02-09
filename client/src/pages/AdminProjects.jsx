// src/pages/admin/AdminProjects.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProjects = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }
  const [form, setForm] = useState({ title: '', description: '', technologies: '' });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => { setProjects(res.data); setLoading(false); })
    .catch((err) => { console.error(err); setLoading(false); });
  }, [username, token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/projects`, form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setProjects([...projects, res.data]);
      setForm({ title: '', description: '', technologies: '' });
    })
    .catch((err) => { console.error(err); alert("Error adding project"); });
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setProjects(projects.filter((p) => p._id !== id));
    })
    .catch((err) => { console.error(err); alert("Error deleting project"); });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>
      <form onSubmit={handleAddProject} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleInput} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleInput} className="w-full border rounded p-2" rows={3} required></textarea>
        </div>
        <div>
          <label className="block font-medium">Technologies (comma-separated)</label>
          <input type="text" name="technologies" value={form.technologies} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Project</button>
      </form>
      <div>
        {projects.length === 0 ? <p>No projects available.</p> :
          projects.map(project => (
            <div key={project._id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold">{project.title}</h2>
                <p>{project.description}</p>
              </div>
              <button onClick={() => handleDelete(project._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AdminProjects;
