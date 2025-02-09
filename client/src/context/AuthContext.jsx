// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the authentication context
export const AuthContext = createContext();
const URI = import.meta.env.VITE_SERVER_ENDPOINT
//console.log(URI);


// AuthProvider component wraps your app and provides auth state and functions
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    loading: true,
  });

  // On initial load, check for token and user info in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setAuthState({
        token,
        user: JSON.parse(storedUser),
        loading: false,
      });
    } else {
      setAuthState({
        token: null,
        user: null,
        loading: false,
      });
    }
  }, []);

  // Login function: authenticates the user and saves token & user data
  const login = async (credentials) => {
    try {
      // Post credentials to login endpoint
      const response = await axios.post(`${URI}/api/auth/login`, credentials);
      const token = response.data.token;
      const user = response.data.userData;
      //console.log(response.data);
      

      // Save token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Optionally, fetch the user profile from a secure endpoint
      const profileResponse = await axios.get(`/api/${user.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = profileResponse.data;

      // Update auth state
      setAuthState({ token, user, loading: false });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function: clears authentication state and localStorage
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ token: null, user: null, loading: false });
  };

  // Register function: creates a new user and then logs them in
  const register = async (data) => {
    try {
      // Post new user data to register endpoint
      const response = await axios.post(`${URI}/api/auth/register`, data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      //console.log(response.data);
      
      // Fetch the newly created user profile
      const profileResponse = await axios.get(`${URI}/api/${data.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data.user
      //console.log(profileResponse);
      localStorage.setItem('user', JSON.stringify(user));

      // Update auth state
      setAuthState({ token, user, loading: false });
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}
