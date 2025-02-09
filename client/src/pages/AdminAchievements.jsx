// src/pages/admin/AdminAchievements.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminAchievements = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    image: ''
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/achievements`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAchievements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [username, token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/achievements`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAchievements([...achievements, res.data]);
        setForm({ title: '', description: '', date: '', image: '' });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding achievement");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/achievements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAchievements(achievements.filter(ach => ach._id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting achievement");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Achievements</h1>
      <form onSubmit={handleAddAchievement} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
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
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInput}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleInput}
            className="w-full border rounded p-2"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Achievement
        </button>
      </form>
      <div>
        {achievements.length === 0 ? (
          <p>No achievements available.</p>
        ) : (
          achievements.map(ach => (
            <div key={ach._id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold">{ach.title}</h2>
                <p>{ach.description}</p>
              </div>
              <button
                onClick={() => handleDelete(ach._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAchievements;
