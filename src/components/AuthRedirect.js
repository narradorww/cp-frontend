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
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/bakery');
    } else {
      // Redirecionar para a página de login em caso de falha na autenticação
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Redirecionando...</h1>
    </div>
  );
};

export default AuthRedirect;
