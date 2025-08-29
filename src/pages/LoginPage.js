//src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. On importe le 'hook' de navigation
import { login } from '../services/api'; // On importe la fonction 'login' de notre service API

function LoginPage() {
  const navigate = useNavigate(); // 2. On initialise le 'hook' pour pouvoir l'utiliser

  // États pour stocker les informations du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction appelée lors de la soumission du formulaire
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Appel à l'API
      const response = await login({ email, password });

      // Stockage des informations
      const { access_token, user } = response.data;
      localStorage.setItem('authToken', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // 3. LA REDIRECTION : on remplace l'ancienne alerte par ceci
      // On navigue vers la page du tableau de bord
      navigate('/dashboard');

    } catch (err) {
      // Gestion des erreurs
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message || 'Email ou mot de passe incorrect.');
      } else {
        setError('Une erreur est survenue. Veuillez vérifier votre connexion et réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Le JSX (HTML) pour afficher le formulaire avec le style OCP
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4 relative">
      {/* Motifs décoratifs OCP en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-green-200 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-32 w-24 h-24 border-2 border-green-200 transform rotate-45 opacity-20"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-green-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-green-200 transform rotate-45 opacity-20"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        {/* Header OCP */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-center relative">
          {/* Logo OCP */}
          <div className="inline-block mb-3">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <div className="text-xl font-bold text-green-600">OCP</div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Office Chérifien des Phosphates</h2>
          <p className="text-green-100 text-sm">Portail de Connexion</p>
          
          {/* Ornements décoratifs */}
          <div className="absolute top-3 right-3 w-6 h-6 border border-green-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border border-green-300 transform rotate-45 opacity-40"></div>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-r mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 flex-shrink-0"></div>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Adresse Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 shadow-sm"
                placeholder="prenom.nom@ocpgroup.ma"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 shadow-sm"
                placeholder="******************"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
          </form>

          {/* Lien mot de passe oublié */}
          <div className="mt-6 text-center">
            <a href=" " className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-200">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        {/* Footer avec informations OCP */}
        <div className="bg-gray-50 px-8 py-4 border-t">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Connexion sécurisée</span>
            </div>
            <div>OCP Group © 2025</div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">
              Leader mondial des solutions phosphatées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;