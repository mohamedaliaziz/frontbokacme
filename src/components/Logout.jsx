// src/components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication token and redirect
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <h2>تسجيل الخروج</h2>
      <button className="btn btn-danger" onClick={handleLogout}>تسجيل الخروج</button>
    </div>
  );
};

export default Logout;
