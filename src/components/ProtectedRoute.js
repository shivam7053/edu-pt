import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Check if user is authenticated and has the correct role
  if (!token || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />; // Redirect to login if unauthorized
  }

  return children; // Render children if authenticated and authorized
}

export default ProtectedRoute;
