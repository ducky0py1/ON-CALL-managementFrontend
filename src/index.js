// Fichier: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// --- Import all your PAGE components ---
// Paths start with './' because we are in the 'src' directory.
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // This is our main layout!

// --- Import all your VIEW components ---
// These are the smaller pieces that go inside the dashboard.
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { DashboardPeriods } from './components/dashboard/DashboardPeriods';
import { DashboardAgents } from './components/dashboard/DashboardAgents';
import { DashboardReports } from './components/dashboard/DashboardReports';
import { DashboardSettings } from './components/dashboard/DashboardSettings';

// The ProtectedRoute wrapper is perfect.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// The main router component
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- Protected Parent Route --- */}
        {/* All routes starting with "/app" will be protected */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          {/* --- Nested Child Routes --- */}
          {/* These will be rendered inside the <Outlet /> of DashboardPage */}
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="periods" element={<DashboardPeriods />} />
          <Route path="agents" element={<DashboardAgents />} />
          <Route path="reports" element={<DashboardReports />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

export default AppRouter;