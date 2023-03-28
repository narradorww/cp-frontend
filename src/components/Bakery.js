import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bakery = () => {
  const [user, setUser] = useState(null);
  const [retry, setRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    console.log('token de bakery', token)

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
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          token = await refreshToken();
          if (token) {
            setRetry(!retry); // Atualiza a variável retry para forçar o useEffect a ser executado novamente
          } else {
            console.error('Failed to fetch user data:', error);
          }
        } else {
          console.error('Failed to fetch user data:', error);
        }
      }
    } else {
      console.error('No token found');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Bakery useEffect');
    const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('refreshToken');
  
    if (isAuthenticated) {
      fetchUserData();
    } else {
      console.log('User is not authenticated');
      
    }
  }, []);
  

  return (
    <div>
      <h1>Bakery</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
           <h2>{user.displayName}</h2>
           <img src={user.photoURL} alt="User avatar" />
           <p>Email: {user.email}</p>
           <p>Username: {user.username}</p>
           <p>Created At: {user.createdAt}</p>
           <p>Updated At: {user.updatedAt}</p>
         </div>
      ) : (
        <p>User is not authenticated.</p>
      )}
    </div>
  );


  // return (
  //   <div>
  //     <h1>Bakery</h1>
  //     {user ? (
  //       <div>
  //         <h2>{user.displayName}</h2>
  //         <img src={user.photoURL} alt="User avatar" />
  //         <p>Email: {user.email}</p>
  //         <p>Username: {user.username}</p>
  //         <p>Created At: {user.createdAt}</p>
  //         <p>Updated At: {user.updatedAt}</p>
  //       </div>
  //     ) : (
  //       <p>Loading user data...</p>
  //     )}
  //   </div>
  // );
};

export default Bakery;
