import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      // Armazene o accessToken e refreshToken onde desejar (e.g., localStorage, cookie, etc.)
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('token', localStorage.getItem('token') )
      console.log('refreshToken', localStorage.getItem('refreshToken') )

      console.log("vou navegar pra padaria");

      navigate('/bakery');
    } else {
      // Redirecionar para a página de login em caso de falha na autenticação
      // console.log('voltando para o login');
      // navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Redirecionando...</h1>
    </div>
  );
};

export default AuthRedirect;
