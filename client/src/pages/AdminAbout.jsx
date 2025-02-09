// src/pages/admin/AdminAbout.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminAbout = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  //console.log("token: ",token);

  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }
  
  const [about, setAbout] = useState({
    name: '',
    biography: '',
    profileImage: '',
    contactInfo: { email: '', phone: '', office: '' },
    socialLinks: { twitter: '', linkedin: '', github: '' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/about`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAbout(res.data || about);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [username, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if updating nested fields for contactInfo or socialLinks
    if (name.startsWith('contact.')) {
      const field = name.split('.')[1];
      setAbout((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [field]: value },
      }));
    } else if (name.startsWith('social.')) {
      const field = name.split('.')[1];
      setAbout((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [field]: value },
      }));
    } else {
      setAbout((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/about`, about, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert('About section updated successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Error updating About section');
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit About Section</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={about.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Biography</label>
          <textarea
            name="biography"
            value={about.biography}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Profile Image URL</label>
          <input
            type="text"
            name="profileImage"
            value={about.profileImage}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Contact Email</label>
          <input
            type="email"
            name="contact.email"
            value={about.contactInfo.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Contact Phone</label>
          <input
            type="text"
            name="contact.phone"
            value={about.contactInfo.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Office</label>
          <input
            type="text"
            name="contact.office"
            value={about.contactInfo.office}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Twitter</label>
          <input
            type="text"
            name="social.twitter"
            value={about.socialLinks.twitter}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">LinkedIn</label>
          <input
            type="text"
            name="social.linkedin"
            value={about.socialLinks.linkedin}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">GitHub</label>
          <input
            type="text"
            name="social.github"
            value={about.socialLinks.github}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminAbout;
