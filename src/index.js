// Fichier: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
// --- Import ALL top-level Page components ---
import HomePage from './pages/HomePage';
// import useAuth  from '../context/AuthContext';
import LoginPage from './pages/LoginPage';
import PublicCalendarPage from './pages/PublicCalendarPage';
import { DashboardPage } from './pages/DashboardPage'; // This is our main protected layout
import { SecretaryDashboardPage } from './pages/SecretaryDashboardPage';
// The ProtectedRoute component is perfect.
// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem('authToken');
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }
function ProtectedRoute({ children }) {
  const { token } = useAuth(); // <-- Get the token from our global state
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={<PublicCalendarPage />} />
        
        {/* --- The ONE Protected Route --- */}
        {/* All URLs starting with "/app" will be protected and will render the DashboardPage */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }/>
        

        <Route
         path="/secretary/dashboard"
          element={
          <ProtectedRoute>
            <SecretaryDashboardPage />
          </ProtectedRoute>
          }/>
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);

export default AppRouter;