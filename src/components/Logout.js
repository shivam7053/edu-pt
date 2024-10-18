import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      {isLoggedIn && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </>
  );
};

export default LogoutButton;
