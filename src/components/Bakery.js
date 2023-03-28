import React, { useState, useEffect } from 'react';

const Bakery = () => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await fetch('http://localhost:3001/auth/protected', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user.user);
        console.log('User data:', data.user);
      } else {
        console.error('Failed to fetch user data');
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
