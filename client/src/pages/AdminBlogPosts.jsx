// src/pages/admin/AdminBlogPosts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminBlogPosts = () => {
  const { username } = useParams();
  const { authState } = useAuth();
  const token = authState?.token;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Redirect to login if user is not authenticated after loading is complete
  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    coverImage: '',
    publishedDate: '',
    isPublished: false
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/blog-posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => { setPosts(res.data); setLoading(false); })
    .catch((err) => { console.error(err); setLoading(false); });
  }, [username, token]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
    };
    axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/blog-posts`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setPosts([...posts, res.data]);
      setForm({
        title: '',
        content: '',
        author: '',
        tags: '',
        coverImage: '',
        publishedDate: '',
        isPublished: false
      });
    })
    .catch((err) => { console.error(err); alert("Error adding blog post"); });
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/${username}/admin/blog-posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setPosts(posts.filter(post => post._id !== id));
    })
    .catch((err) => { console.error(err); alert("Error deleting blog post"); });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Blog Posts</h1>
      <form onSubmit={handleAddPost} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleInput} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block font-medium">Content</label>
          <textarea name="content" value={form.content} onChange={handleInput} className="w-full border rounded p-2" rows={4} required></textarea>
        </div>
        <div>
          <label className="block font-medium">Author</label>
          <input type="text" name="author" value={form.author} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Tags (comma-separated)</label>
          <input type="text" name="tags" value={form.tags} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Cover Image URL</label>
          <input type="text" name="coverImage" value={form.coverImage} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium">Published Date</label>
          <input type="date" name="publishedDate" value={form.publishedDate} onChange={handleInput} className="w-full border rounded p-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleInput} className="mr-2" />
          <label className="font-medium">Published</label>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Blog Post</button>
      </form>
      <div>
        {posts.length === 0 ? <p>No blog posts available.</p> :
          posts.map(post => (
            <div key={post._id} className="border rounded p-4 mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold">{post.title}</h2>
                <p>{post.content.substring(0, 100)}...</p>
              </div>
              <button onClick={() => handleDelete(post._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AdminBlogPosts;
