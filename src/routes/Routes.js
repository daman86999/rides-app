import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginSignup from '../view/Login';
import Profile from '../view/Profile/Profile';
import Dashboard from '../view/Dashboard';
import DriverRides from '../view/DriverRides';
export function RoutesAll({ isAuthenticated }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={!isAuthenticated ? '/login' : '/dashboard'} />}
      />
      <Route path="/yourrides" element={<DriverRides />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
