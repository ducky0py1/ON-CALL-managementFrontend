// src/index.js - Main entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import App from './App'; // Protected layout with sidebar
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import AgentsPage from './pages/AgentsPage';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Main Router Component
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes - All under /app */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          {/* Nested protected routes */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="agents" element={<AgentsPage />} />
        </Route>
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);