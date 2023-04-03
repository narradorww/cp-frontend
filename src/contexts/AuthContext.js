import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);

  useEffect(() => {
    const isAuthenticated = accessToken && refreshToken;
    console.log('isAuthenticated:', isAuthenticated);
    setAuthenticated(isAuthenticated);
  }, [accessToken, refreshToken]);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email,
        password: password
      });

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);

    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh_token`, {
        refreshToken: refreshToken
      });

      localStorage.setItem('token', response.data.accessToken);
      setAccessToken(response.data.accessToken);

    } catch (error) {
      console.error('Failed to refresh token:', error);
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, accessToken, handleLogin, handleLogout, handleRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
