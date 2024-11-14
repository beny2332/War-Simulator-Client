// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { DataStatus } from '../types/redux'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, status } = useAuth();

  if (status === DataStatus.LOADING) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;