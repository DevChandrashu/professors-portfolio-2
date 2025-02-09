// src/pages/admin/AdminTeachingExperiences.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminTeachingExperiences = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  const [teachingExperiences, setTeachingExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    courseTitle: '',
    institution: '',
    description: '',
    startDate: '',
    endDate: '',
    courseImage: ''
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/teaching-experiences`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setTeachingExperiences(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching teaching experiences:', err);
      setLoading(false);
    });
  }, [username, token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/teaching-experiences`, form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setTeachingExperiences([...teachingExperiences, res.data]);
      setForm({
        courseTitle: '',
        institution: '',
        description: '',
        startDate: '',
        endDate: '',
        courseImage: ''
      });
    })
    .catch((err) => {
      console.error('Error adding teaching experience:', err);
      alert("Error adding teaching experience");
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/teaching-experiences/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setTeachingExperiences(teachingExperiences.filter(exp => exp._id !== id));
    })
    .catch((err) => {
      console.error('Error deleting teaching experience:', err);
      alert("Error deleting teaching experience");
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Teaching Experiences</h1>
      <form onSubmit={handleAddExperience} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Course Title</label>
          <input
            type="text"
            name="courseTitle"
            value={form.courseTitle}
            onChange={handleInput}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Institution</label>
          <input
            type="text"
            name="institution"
            value={form.institution}
            onChange={handleInput}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInput}
            className="w-full border rounded p-2"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleInput}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleInput}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Course Image URL</label>
          <input
            type="text"
            name="courseImage"
            value={form.courseImage}
            onChange={handleInput}
            className="w-full border rounded p-2"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Teaching Experience
        </button>
      </form>
      <div>
        {teachingExperiences.length === 0 ? (
          <p>No teaching experiences available.</p>
        ) : (
          teachingExperiences.map(exp => (
            <div key={exp._id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold">{exp.courseTitle}</h2>
                <p>{exp.institution}</p>
                <p>{exp.description}</p>
                <p>
                  {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
              </div>
              <button onClick={() => handleDelete(exp._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTeachingExperiences;
