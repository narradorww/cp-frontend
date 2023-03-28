import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bakery = () => {
  const [user, setUser] = useState(null);

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/refresh_token', {
        refreshToken: localStorage.getItem('refreshToken')
      });

      localStorage.setItem('token', response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return null;
    }
  };

  const fetchUserData = async () => {
    let token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await axios.get('http://localhost:3001/auth/protected', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        setUser(response.data.user.user);
        console.log('User data:', response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          token = await refreshToken();
          if (token) {
            fetchUserData();
          } else {
            console.error('Failed to fetch user data:', error);
          }
        } else {
          console.error('Failed to fetch user data:', error);
        }
      }
    } else {
      console.error('No token found');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Bakery</h1>
      {user ? (
        <div>
            {console.log("olha esse arrombadinho", user)}
          <h2>{user.displayName}</h2>
          <img src={user.photoURL} alt="User avatar" />
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Created At: {user.createdAt}</p>
          <p>Updated At: {user.updatedAt}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Bakery;
