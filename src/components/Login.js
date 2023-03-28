import React from 'react';

const Login = () => {

  const handleGoogleLogin = () => {
      console.log('handleGoogleLogin')
    window.location.href = 'http://localhost:3001/auth/google';
    console.log('handleGoogleLogin')
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3001/auth/facebook';
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Entrar com Google</button>
      <button onClick={handleFacebookLogin}>Entrar com Facebook</button>
    </div>
  );
};

export default Login;
