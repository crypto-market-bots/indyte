import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ Component }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }
  return <Component />;

  // Render the protected content if the user is authenticated
};

export default Protected;
