// src/pages/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { register } = useAuth();

  // Handle changes in input fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Store the username for navigation before clearing state
      const regUsername = user.username;
      await register(user);
      alert("Registration Successful");
      setUser({
        username: "",
        email: "",
        password: "",
      });
      // Navigate to the portfolio page of the registered user
      navigate(`/${regUsername}`);
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section (hidden on small screens) */}
        <div className="hidden md:block">
          <img
            src="/images/register.png"
            alt="Registration illustration"
            className="object-cover h-full w-full"
          />
        </div>
        {/* Registration Form Section */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Register Now
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
