import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_BASE_URL = 'http://localhost:3001';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, handleRefreshToken } = useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/protected`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        setUser(response.data.user.user);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleRefreshToken();
        } else {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    if (accessToken) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [accessToken, handleRefreshToken]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
