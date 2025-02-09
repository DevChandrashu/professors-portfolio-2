// src/pages/admin/AdminResearchPapers.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminResearchPapers = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    title: '',
    abstract: '',
    authors: '',
    publicationDate: '',
    journalOrConference: '',
    pdfUrl: '',
    keywords: ''
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/research-papers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => { setPapers(res.data); setLoading(false); })
    .catch((err) => { console.error(err); setLoading(false); });
  }, [username, token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPaper = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      authors: form.authors.split(',').map(a => a.trim()),
      keywords: form.keywords.split(',').map(k => k.trim()),
    };
    axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/research-papers`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setPapers([...papers, res.data]);
      setForm({
        title: '',
        abstract: '',
        authors: '',
        publicationDate: '',
        journalOrConference: '',
        pdfUrl: '',
        keywords: ''
      });
    })
    .catch((err) => { console.error(err); alert("Error adding research paper"); });
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/research-papers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setPapers(papers.filter(p => p._id !== id));
    })
    .catch((err) => { console.error(err); alert("Error deleting research paper"); });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Research Papers</h1>
      <form onSubmit={handleAddPaper} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleInput} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block font-medium">Abstract</label>
          <textarea name="abstract" value={form.abstract} onChange={handleInput} className="w-full border rounded p-2" rows={3} required></textarea>
        </div>
        <div>
          <label className="block font-medium">Authors (comma-separated)</label>
          <input type="text" name="authors" value={form.authors} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Publication Date</label>
          <input type="date" name="publicationDate" value={form.publicationDate} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Journal/Conference</label>
          <input type="text" name="journalOrConference" value={form.journalOrConference} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">PDF URL</label>
          <input type="text" name="pdfUrl" value={form.pdfUrl} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Keywords (comma-separated)</label>
          <input type="text" name="keywords" value={form.keywords} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Research Paper</button>
      </form>
      <div>
        {papers.length === 0 ? <p>No research papers available.</p> :
          papers.map(paper => (
            <div key={paper._id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold">{paper.title}</h2>
                <p>{paper.abstract}</p>
              </div>
              <button onClick={() => handleDelete(paper._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AdminResearchPapers;
