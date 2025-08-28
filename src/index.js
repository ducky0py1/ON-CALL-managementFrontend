import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

// 1. Importez tous les composants qui serviront de pages
import App from './App'; // Notre "layout" principal avec la barre de navigation
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import AgentsPage from './pages/AgentsPage';
// Plus tard, vous importerez aussi AgentsPage, etc.

// 2. La configuration du routeur est la partie la plus importante.
// On crée une liste de toutes les routes de notre site.
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "agents", element: <AgentsPage /> }, // <-- 2. AJOUTER LA ROUTE ICI
    ],
  },
]);

// 3. On récupère l'élément HTML racine de notre page
const root = ReactDOM.createRoot(document.getElementById('root'));

// 4. On dit à React de "rendre" (d'afficher) notre application,
// mais au lieu d'afficher juste <App />, on lui dit d'utiliser notre routeur.
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);