// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import './index.css';

// // 1. Importez tous les composants qui serviront de pages
// import App from './App'; // Notre "layout" principal avec la barre de navigation
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import ServicesPage from './pages/ServicesPage';
// import AgentsPage from './pages/AgentsPage';
// // Plus tard, vous importerez aussi AgentsPage, etc.

// // 2. La configuration du routeur est la partie la plus importante.
// // On crée une liste de toutes les routes de notre site.
// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "dashboard", element: <DashboardPage /> },
//       { path: "services", element: <ServicesPage /> },
//       { path: "agents", element: <AgentsPage /> }, // <-- 2. AJOUTER LA ROUTE ICI
//     ],
//   },
// ]);

// // 3. On récupère l'élément HTML racine de notre page
// const root = ReactDOM.createRoot(document.getElementById('root'));

// // 4. On dit à React de "rendre" (d'afficher) notre application,
// // mais au lieu d'afficher juste <App />, on lui dit d'utiliser notre routeur.
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
// src/main.js (ou src/index.js selon votre configuration)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Importation des composants
import App from './App'; // Layout protégé avec sidebar
import HomePage from './pages/HomePage'; // Page d'accueil publique
import LoginPage from './pages/LoginPage'; // Page de connexion
import ServicesPage from './pages/ServicesPage'; // Page des services (protégée)
import AgentsPage from './pages/AgentsPage'; // Page des agents (protégée)
import DashboardPage from './pages/DashboardPage'; // Page tableau de bord (protégée)

// Composant pour les routes protégées (avec sidebar)
function ProtectedLayout() {
  return <App />; // Votre App.js existant avec la sidebar
}

// Configuration principale du routeur
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique - Page d'accueil */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route publique - Connexion */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Routes protégées - avec layout sidebar */}
        <Route path="/dashboard" element={<ProtectedLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
        
        <Route path="/services" element={<ProtectedLayout />}>
          <Route index element={<ServicesPage />} />
        </Route>
        
        <Route path="/agents" element={<ProtectedLayout />}>
          <Route index element={<AgentsPage />} />
        </Route>
        
        {/* Route par défaut - redirection vers accueil */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// Note: Si vous utilisez src/index.js au lieu de src/main.js, renommez ce fichier en conséquence