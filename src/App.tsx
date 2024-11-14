import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DefenseDashboard from './components/pages/DefenseDashboard';
import AttackDashboard from './components/pages/AttackDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppDispatch } from './redux/store'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="defense-dashboard"
          element={
            <ProtectedRoute>
              <DefenseDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="attack-dashboard"
          element={
            <ProtectedRoute>
              <AttackDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}