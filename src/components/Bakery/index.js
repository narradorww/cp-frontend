import React, { useContext } from 'react';
import Avatar from '../../assets/img/avatarcp.png';
import { AuthContext } from '../../contexts/AuthContext';


function Bakery() {
  const { authenticated, handleLogout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <h1>Bakery</h1>
      {authenticated ? (
        <button onClick={handleLogoutClick}>Logout</button>
      ) : (
        <p>You need to be authenticated to access this page</p>
      )}
    </div>
  );
}

export default Bakery;


