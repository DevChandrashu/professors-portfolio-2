// src/pages/admin/AdminAwards.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminAwards = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    title: '',
    description: '',
    awardingInstitution: '',
    dateAwarded: '',
    image: ''
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/awards`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAwards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching awards:', err);
        setLoading(false);
      });
  }, [username, token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAward = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/awards`, form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAwards([...awards, res.data]);
        setForm({
          title: '',
          description: '',
          awardingInstitution: '',
          dateAwarded: '',
          image: ''
        });
      })
      .catch((err) => {
        console.error('Error adding award:', err);
        alert("Error adding award");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/awards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAwards(awards.filter(award => award._id !== id));
      })
      .catch((err) => {
        console.error('Error deleting award:', err);
        alert("Error deleting award");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Awards</h1>
      <form onSubmit={handleAddAward} className="space-y-4 mb-8">
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
          <label className="block font-medium">Awarding Institution</label>
          <input
            type="text"
            name="awardingInstitution"
            value={form.awardingInstitution}
            onChange={handleInput}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Date Awarded</label>
          <input
            type="date"
            name="dateAwarded"
            value={form.dateAwarded}
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
          Add Award
        </button>
      </form>
      <div>
        {awards.length === 0 ? (
          <p>No awards available.</p>
        ) : (
          awards.map(award => (
            <div key={award._id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold">{award.title}</h2>
                <p>{award.description}</p>
                {award.awardingInstitution && <p>{award.awardingInstitution}</p>}
                {award.dateAwarded && <p>{new Date(award.dateAwarded).toLocaleDateString()}</p>}
              </div>
              <button
                onClick={() => handleDelete(award._id)}
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

export default AdminAwards;
