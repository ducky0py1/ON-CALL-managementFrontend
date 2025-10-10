// Fichier: src/App.js (Version Simplifiée)
import React from 'react';
import { Outlet } from 'react-router-dom';

// The App component is now just a simple container.
// It doesn't need to know about navigation or logging out.
function App() {
  return (
    <div>
      {/* This Outlet will render DashboardPage, SchedulePage, etc. */}
      <Outlet />
    </div>
  );
}

export default App;