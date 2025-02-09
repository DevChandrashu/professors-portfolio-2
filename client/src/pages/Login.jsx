// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle changes in input fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      alert("Login Successful");
      setCredentials({ email: "", password: "" });
      navigate("/"); // Navigate to the home page or any desired page
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section (hidden on small screens) */}
        <div className="hidden md:block">
          <img
            src="/images/login.png"
            alt="Login illustration"
            className="object-cover h-full w-full"
          />
        </div>
        {/* Login Form Section */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
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
                value={credentials.password}
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
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-emerald-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
