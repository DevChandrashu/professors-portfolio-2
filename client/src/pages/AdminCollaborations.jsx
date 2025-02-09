// src/pages/admin/AdminCollaborations.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminCollaborations = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;

  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    collaboratorName: '',
    projectTitle: '',
    description: '',
    startDate: '',
    endDate: '',
    link: ''
  });

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/collaborations`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCollaborations(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching collaborations:', err);
          setLoading(false);
        });
    }
  }, [username, token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCollaboration = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/collaborations`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCollaborations([...collaborations, res.data]);
        setForm({
          collaboratorName: '',
          projectTitle: '',
          description: '',
          startDate: '',
          endDate: '',
          link: ''
        });
      })
      .catch((err) => {
        console.error('Error adding collaboration:', err);
        alert("Error adding collaboration");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/collaborations/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setCollaborations(collaborations.filter(collab => collab._id !== id));
      })
      .catch((err) => {
        console.error('Error deleting collaboration:', err);
        alert("Error deleting collaboration");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Collaborations</h1>
      <form onSubmit={handleAddCollaboration} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Collaborator Name</label>
          <input
            type="text"
            name="collaboratorName"
            value={form.collaboratorName}
            onChange={handleInput}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Project Title</label>
          <input
            type="text"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleInput}
            className="w-full border rounded p-2"
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
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleInput}
            className="w-full border rounded p-2"
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
          <label className="block font-medium">Link</label>
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleInput}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded transition-colors hover:bg-green-700"
        >
          Add Collaboration
        </button>
      </form>
      <div>
        {collaborations.length === 0 ? (
          <p>No collaborations available.</p>
        ) : (
          collaborations.map(collab => (
            <div
              key={collab._id}
              className="border rounded p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{collab.collaboratorName}</h2>
                {collab.projectTitle && (
                  <p>
                    <strong>Project:</strong> {collab.projectTitle}
                  </p>
                )}
                {collab.description && <p>{collab.description}</p>}
                <p>
                  {collab.startDate ? new Date(collab.startDate).toLocaleDateString() : ''} 
                  {collab.endDate ? ` - ${new Date(collab.endDate).toLocaleDateString()}` : ''}
                </p>
                {collab.link && (
                  <p>
                    <a
                      href={collab.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      More Info
                    </a>
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(collab._id)}
                className="bg-red-600 text-white px-3 py-1 rounded transition-colors hover:bg-red-700"
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

export default AdminCollaborations;
