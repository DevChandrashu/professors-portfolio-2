// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Portfolio Maker
        </Link>
        <div className="flex items-center space-x-4">
          {authState.user ? (
            <>
              {/* Admin Link: directs to the admin panel of the logged in user */}
              <Link
                to={`/${authState.user.username}/admin`}
                className="text-gray-800 hover:text-green-600"
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-gray-800 hover:text-green-600"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-gray-800 hover:text-green-600"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
