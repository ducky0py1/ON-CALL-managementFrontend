// src/App.js - Layout protégé avec sidebar (mis à jour)
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  // Vérification de l'authentification pour les routes protégées
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Si pas de token, redirection vers la page d'accueil (pas directement login)
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Redirection vers la page d'accueil après déconnexion
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Barre latérale de navigation OCP - inchangée */}
      <aside className="w-72 bg-gradient-to-b from-green-800 to-green-900 text-white shadow-2xl relative overflow-hidden">
        {/* Motifs décoratifs en arrière-plan */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-4 w-16 h-16 border-2 border-green-300 rounded-full"></div>
          <div className="absolute top-32 left-4 w-12 h-12 border-2 border-green-300 transform rotate-45"></div>
          <div className="absolute bottom-20 right-8 w-20 h-20 border-2 border-green-300 rounded-full"></div>
        </div>

        <div className="p-6 relative z-10">
          {/* Header avec logo OCP */}
          <div className="mb-8 text-center border-b border-green-600 pb-6">
            <div className="bg-white rounded-full p-4 shadow-lg inline-block mb-3">
              <div className="text-2xl font-bold text-green-600">OCP</div>
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Gestion Astreinte</h1>
            <p className="text-green-200 text-sm">Office Chérifien des Phosphates</p>
          </div>

          {/* Navigation principale */}
          <nav className="mb-8">
            <h2 className="text-green-200 text-xs uppercase tracking-wider font-semibold mb-4 px-2">
              Navigation
            </h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/dashboard" 
                  className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-green-700 hover:bg-opacity-50 transition-all duration-200 group"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300 transition-colors"></div>
                  <span className="font-medium">Tableau de Bord</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-green-700 hover:bg-opacity-50 transition-all duration-200 group"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300 transition-colors"></div>
                  <span className="font-medium">Services</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/agents" 
                  className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-green-700 hover:bg-opacity-50 transition-all duration-200 group"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300 transition-colors"></div>
                  <span className="font-medium">Agents</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Lien de retour vers l'accueil - NOUVEAU */}
          <div className="mb-6">
            <Link 
              to="/"
              className="flex items-center px-4 py-2 text-green-200 hover:text-white hover:bg-green-700 hover:bg-opacity-30 rounded-lg transition-all duration-200 text-sm"
            >
              <div className="mr-3">←</div>
              <span>Retour à l'accueil</span>
            </Link>
          </div>

          {/* Section d'informations système */}
          <div className="bg-green-700 bg-opacity-30 rounded-lg p-4 mb-6 border border-green-600">
            <h3 className="text-green-200 text-xs uppercase tracking-wider font-semibold mb-3">
              Statut Système
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-100">Serveur</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-300 text-xs">En ligne</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-100">Base de données</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-300 text-xs">Connecté</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-100">Dernière synchro</span>
                <span className="text-green-300 text-xs">{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de déconnexion en bas */}
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={handleLogout} 
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
          >
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded mr-2"></div>
              Déconnexion
            </div>
          </button>
        </div>
      </aside>

      {/* Contenu principal de la page */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header du contenu principal */}
        <div className="bg-white shadow-sm border-b border-green-100 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-700 rounded-full mr-3"></div>
              <h2 className="text-gray-800 font-semibold">Espace de Gestion OCP</h2>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Système opérationnel</span>
              </div>
              <div className="text-gray-500">
                {new Date().toLocaleDateString('fr-MA', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Zone de contenu avec padding */}
        <div className="p-8">
          <Outlet /> {/* Les pages (Dashboard, Services, Agents) s'affichent ici */}
        </div>

        {/* Footer discret */}
        <div className="bg-gray-50 border-t border-green-100 px-8 py-4 mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded mr-2 flex items-center justify-center">
                <span className="text-white text-xs font-bold">OCP</span>
              </div>
              <span>Office Chérifien des Phosphates - Système de Gestion</span>
            </div>
            <div>
              Version 2.1.4 • {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;