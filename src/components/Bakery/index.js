import React, { useContext } from 'react';
import Avatar from '../../assets/img/avatarcp.png';
import { AuthContext } from '../../contexts/AuthContext';

function Bakery() {
  const { authenticated, handleLogout, user } = useContext(AuthContext);
  console.log('user:', user)

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <h1>Bakery</h1>
      {authenticated ? (
        <>
        <p>Bem vindo {user && user.displayName}</p> {/*Verifica se user é null antes de acessar a propriedade displayName*/}
        <button onClick={handleLogoutClick}>Logout</button>
        </>
      ) : (
        <p>You need to be authenticated to access this page</p>
      )}
    </div>
  );
}

export default Bakery;