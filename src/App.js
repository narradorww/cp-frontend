import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Bakery from './components/Bakery';
import AuthRedirect from './components/AuthRedirect';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route ath="/auth-redirect" element={AuthRedirect} />
        <Route path="/bakery" element={<Bakery/>} />
      </Routes>
    </Router>
  );
}

export default App;
