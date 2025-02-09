// src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css'; // Optional: import a CSS file for styling

const Home = () => {
  const { authState, logout } = useAuth();
  const isLoggedIn = authState && authState.user;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Portfolio Maker</h1>
        <p>Create your own professional portfolio easily and seamlessly!</p>
      </header>
      
      <div className="home-actions">
        {isLoggedIn ? (
          <>
            {/* The route uses the username from the URL parameter */}
            <Link to={`/${authState.user.username}`} className="btn btn-portfolio">
              See Portfolio
            </Link>
            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="btn btn-signup">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-login">
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
