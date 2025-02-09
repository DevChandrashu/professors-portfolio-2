import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional: import a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Portfolio Maker</h1>
        <p>Create your own professional portfolio easily and seamlessly!</p>
      </header>
      
      <div className="home-actions">
        <Link to="/signup" className="btn btn-signup">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-login">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;
