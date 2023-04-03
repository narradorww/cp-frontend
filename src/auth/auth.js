import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

async function fetchUser(token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/protected`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user.user;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        return fetchUser(newToken);
      } else {
        console.error('Failed to refresh token:', error);
        return null;
      }
    } else {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  }
}

async function refreshToken() {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh_token`, {
      refreshToken: localStorage.getItem('refreshToken'),
    });

    localStorage.setItem('token', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
}

export { fetchUser, refreshToken };
