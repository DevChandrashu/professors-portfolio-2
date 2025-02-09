// src/pages/admin/AdminConferences.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminConferences = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  const loadingAuth = authState?.loading;
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    conferenceUrl: ''
  });

  useEffect(() => {
    // Wait for AuthContext to finish loading and for the token to be available
    if (!loadingAuth && token) {
      axios
        .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/conferences`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setConferences(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [username, token, loadingAuth]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddConference = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/conferences`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setConferences([...conferences, res.data]);
        setForm({ name: '', description: '', location: '', date: '', conferenceUrl: '' });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding conference");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/conferences/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setConferences(conferences.filter(conf => conf._id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting conference");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Conferences</h1>
      <form onSubmit={handleAddConference} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Conference Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
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
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleInput}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInput}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Conference URL</label>
          <input
            type="text"
            name="conferenceUrl"
            value={form.conferenceUrl}
            onChange={handleInput}
            className="w-full border rounded p-2"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Conference
        </button>
      </form>
      <div>
        {conferences.length === 0 ? (
          <p>No conferences available.</p>
        ) : (
          conferences.map(conf => (
            <div key={conf._id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold">{conf.name}</h2>
                <p>{conf.location} - {new Date(conf.date).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDelete(conf._id)}
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

export default AdminConferences;
