import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Compadre Padeiro</Link>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Cadastrar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
