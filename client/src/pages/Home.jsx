import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const { authState, logout } = useAuth();
  const isLoggedIn = authState && authState.user;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Portfolio Maker</h1>
        <p className="subtitle">Create your own professional portfolio easily and seamlessly!</p>
      </header>

      <div className="home-actions">
        {isLoggedIn ? (
          <>
            <Link to={`/${authState.user.username}`} className="btn btn-primary">
              View Your Portfolio
            </Link>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </>
        )}
      </div>

      <footer className="home-footer">
        <p>© 2023 Portfolio Maker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;